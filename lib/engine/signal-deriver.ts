import { FlowDirection, Trend, VolumeLevel, VolatilityState } from "@/lib/types/cycle"

interface RawMetrics {
  usd1Liquidity: number
  previousUsd1Liquidity: number
  memeVolume24h: number
  usd1NetFlow: number
  priceVolatility: number
}

/**
 * Converts raw numerical data into directional signals
 * This is where "meaning" starts to emerge from data
 */
export class SignalDeriver {
  /**
   * Derive USD1 flow direction from net flow amount
   */
  deriveUsd1Flow(netFlow: number, threshold: number = 100000): FlowDirection {
    // Threshold = $100k in/out to trigger directional signal
    if (netFlow > threshold) return "IN"
    if (netFlow < -threshold) return "OUT"
    return "FLAT"
  }

  /**
   * Derive liquidity trend from current vs previous snapshots
   */
  deriveLiquidityTrend(current: number, previous: number): Trend {
    if (previous === 0) return "FLAT"
    
    const changePercent = ((current - previous) / previous) * 100
    
    // +5% = meaningful increase
    if (changePercent > 5) return "UP"
    
    // -5% = meaningful decrease
    if (changePercent < -5) return "DOWN"
    
    return "FLAT"
  }

  /**
   * Derive meme volume level from 24h volume
   */
  deriveMemeVolume(volume24h: number): VolumeLevel {
    // Thresholds based on USD1 ecosystem observation
    if (volume24h > 10_000_000) return "HIGH"      // >$10M = peak activity
    if (volume24h > 3_000_000) return "MEDIUM"     // $3-10M = moderate
    return "LOW"                                   // <$3M = quiet
  }

  /**
   * Derive volatility state from price movement patterns
   */
  deriveVolatility(
    priceChanges: number[],
    window: number = 24
  ): VolatilityState {
    if (priceChanges.length < window) return "STABLE"
    
    // Calculate standard deviation of recent price changes
    const recentChanges = priceChanges.slice(-window)
    const mean = recentChanges.reduce((a, b) => a + b, 0) / recentChanges.length
    const variance = recentChanges.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / recentChanges.length
    const stdDev = Math.sqrt(variance)
    
    // Compare to historical baseline
    const historicalStdDev = this.calculateHistoricalStdDev(priceChanges)
    
    if (stdDev > historicalStdDev * 1.5) return "EXPANDING"
    if (stdDev < historicalStdDev * 0.5) return "COMPRESSING"
    return "STABLE"
  }

  /**
   * Calculate moving average trend
   */
  calculateMovingAverage(values: number[], window: number = 4): number {
    if (values.length < window) return values[values.length - 1] || 0
    
    const recentValues = values.slice(-window)
    return recentValues.reduce((a, b) => a + b, 0) / window
  }

  /**
   * Determine if trend is strengthening or weakening
   */
  assessTrendStrength(values: number[]): "STRENGTHENING" | "WEAKENING" | "STEADY" {
    if (values.length < 3) return "STEADY"
    
    const recent = values.slice(-3)
    const isIncreasing = recent[2] > recent[1] && recent[1] > recent[0]
    const isDecreasing = recent[2] < recent[1] && recent[1] < recent[0]
    
    if (isIncreasing) return "STRENGTHENING"
    if (isDecreasing) return "WEAKENING"
    return "STEADY"
  }

  /**
   * Private helper to calculate historical baseline volatility
   */
  private calculateHistoricalStdDev(values: number[]): number {
    if (values.length === 0) return 0
    
    const mean = values.reduce((a, b) => a + b, 0) / values.length
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length
    return Math.sqrt(variance)
  }

  /**
   * Aggregate all signals from raw metrics
   */
  deriveAllSignals(current: RawMetrics, history: RawMetrics[] = []) {
    return {
      usd1Flow: this.deriveUsd1Flow(current.usd1NetFlow),
      liquidityTrend: this.deriveLiquidityTrend(
        current.usd1Liquidity,
        current.previousUsd1Liquidity
      ),
      memeVolume: this.deriveMemeVolume(current.memeVolume24h),
      volatility: this.deriveVolatility(
        history.map(h => h.priceVolatility).concat([current.priceVolatility])
      )
    }
  }
}

// Singleton instance
export const signalDeriver = new SignalDeriver()
