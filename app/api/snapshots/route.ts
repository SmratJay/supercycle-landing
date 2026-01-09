import { NextResponse } from "next/server"
import { snapshotStore } from "@/lib/services/snapshot-store"

/**
 * View recent snapshots for debugging
 * GET /api/snapshots?limit=10
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "10", 10)

    const snapshots = await snapshotStore.getHistory(24)

    return NextResponse.json({
      success: true,
      count: snapshots.length,
      snapshots: snapshots.slice(0, limit).map(s => ({
        id: s.id,
        timestamp: s.timestamp,
        timestampReadable: new Date(s.timestamp).toISOString(),
        usd1Liquidity: s.usd1_total_liquidity,
        liquidityTrend: s.liquidity_trend,
        memeVolume: s.meme_volume,
        volatility: s.volatility,
        signals: s.signals
      }))
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, {
      status: 500
    })
  }
}
