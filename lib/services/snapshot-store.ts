import { sql } from "@vercel/postgres"
import { CycleSignals, CycleState, StateHistoryEntry } from "@/lib/types/cycle"
import { heliusClient } from "./helius-client"
import { signalDeriver } from "@/lib/engine/signal-deriver"

interface Snapshot {
  id?: number
  timestamp: number
  usd1_total_liquidity: number
  usd1_net_flow: number
  liquidity_trend: string
  meme_volume: string
  volatility: string
  signals: CycleSignals
  raw_data: any
}

/**
 * Captures and stores observational snapshots of the USD1 ecosystem
 * Updates every 15 minutes via cron
 */
export class SnapshotStore {
  /**
   * Capture a new snapshot of current USD1 ecosystem state
   */
  async captureSnapshot(): Promise<Snapshot> {
    try {
      // 1. Fetch raw data from Helius
      const [totalLiquidity, netFlowData] = await Promise.all([
        heliusClient.getUsd1TotalLiquidity(),
        heliusClient.getUsd1NetFlow24h()
      ])

      // 2. Get previous snapshot for comparison
      const previousSnapshot = await this.getLatest()
      const previousLiquidity = previousSnapshot?.usd1_total_liquidity || totalLiquidity

      // 3. Derive signals from raw metrics
      const rawMetrics = {
        usd1Liquidity: totalLiquidity,
        previousUsd1Liquidity: previousLiquidity,
        memeVolume24h: 5000000, // TODO: Calculate from pool volumes
        usd1NetFlow: netFlowData.netFlow,
        priceVolatility: 0.15 // TODO: Calculate from price history
      }

      const signals = signalDeriver.deriveAllSignals(rawMetrics)

      // 4. Create snapshot object
      const snapshot: Snapshot = {
        timestamp: Date.now(),
        usd1_total_liquidity: totalLiquidity,
        usd1_net_flow: netFlowData.netFlow,
        liquidity_trend: signals.liquidityTrend,
        meme_volume: signals.memeVolume,
        volatility: signals.volatility,
        signals,
        raw_data: {
          heliusData: {
            totalLiquidity,
            netFlow: netFlowData
          },
          derivedAt: new Date().toISOString()
        }
      }

      // 5. Store in database
      await this.save(snapshot)

      return snapshot
    } catch (error) {
      console.error("Error capturing snapshot:", error)
      throw error
    }
  }

  /**
   * Save snapshot to database
   */
  private async save(snapshot: Snapshot): Promise<void> {
    try {
      await sql`
        INSERT INTO snapshots (
          timestamp,
          usd1_total_liquidity,
          usd1_net_flow,
          liquidity_trend,
          meme_volume,
          volatility,
          raw_data
        ) VALUES (
          to_timestamp(${snapshot.timestamp / 1000}),
          ${snapshot.usd1_total_liquidity},
          ${snapshot.usd1_net_flow},
          ${snapshot.liquidity_trend},
          ${snapshot.meme_volume},
          ${snapshot.volatility},
          ${JSON.stringify(snapshot.raw_data)}::jsonb
        )
      `
    } catch (error) {
      console.error("Error saving snapshot:", error)
      throw error
    }
  }

  /**
   * Get the most recent snapshot
   */
  async getLatest(): Promise<Snapshot | null> {
    try {
      const result = await sql`
        SELECT * FROM snapshots
        ORDER BY timestamp DESC
        LIMIT 1
      `

      if (result.rows.length === 0) return null

      return this.mapRowToSnapshot(result.rows[0])
    } catch (error) {
      console.error("Error fetching latest snapshot:", error)
      return null
    }
  }

  /**
   * Get snapshot history for last N hours
   */
  async getHistory(hours: number = 24): Promise<Snapshot[]> {
    try {
      const result = await sql`
        SELECT * FROM snapshots
        WHERE timestamp > NOW() - INTERVAL '${hours} hours'
        ORDER BY timestamp DESC
      `

      return result.rows.map(row => this.mapRowToSnapshot(row))
    } catch (error) {
      console.error("Error fetching snapshot history:", error)
      return []
    }
  }

  /**
   * Calculate trend from historical snapshots
   */
  async calculateTrend(metric: keyof Snapshot, hours: number = 24): Promise<"UP" | "DOWN" | "FLAT"> {
    const history = await this.getHistory(hours)
    
    if (history.length < 2) return "FLAT"

    const values = history.map(s => s[metric] as number).filter(v => typeof v === "number")
    
    if (values.length < 2) return "FLAT"

    const recent = values.slice(0, Math.ceil(values.length / 2))
    const older = values.slice(Math.ceil(values.length / 2))

    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length
    const olderAvg = older.reduce((a, b) => a + b, 0) / older.length

    const change = ((recentAvg - olderAvg) / olderAvg) * 100

    if (change > 5) return "UP"
    if (change < -5) return "DOWN"
    return "FLAT"
  }

  /**
   * Get state history for classifier
   */
  async getStateHistory(count: number = 10): Promise<StateHistoryEntry[]> {
    try {
      const result = await sql`
        SELECT cycle_state, confidence, started_at as timestamp
        FROM state_history
        ORDER BY started_at DESC
        LIMIT ${count}
      `

      return result.rows.map(row => ({
        state: row.cycle_state as CycleState,
        timestamp: new Date(row.timestamp).getTime(),
        confidence: parseFloat(row.confidence)
      }))
    } catch (error) {
      console.error("Error fetching state history:", error)
      return []
    }
  }

  /**
   * Map database row to Snapshot object
   */
  private mapRowToSnapshot(row: any): Snapshot {
    return {
      id: row.id,
      timestamp: new Date(row.timestamp).getTime(),
      usd1_total_liquidity: parseFloat(row.usd1_total_liquidity),
      usd1_net_flow: parseFloat(row.usd1_net_flow),
      liquidity_trend: row.liquidity_trend,
      meme_volume: row.meme_volume,
      volatility: row.volatility,
      signals: {
        usd1Flow: row.raw_data?.signals?.usd1Flow || "FLAT",
        liquidityTrend: row.liquidity_trend,
        memeVolume: row.meme_volume,
        volatility: row.volatility
      },
      raw_data: row.raw_data
    }
  }
}

// Singleton instance
export const snapshotStore = new SnapshotStore()
