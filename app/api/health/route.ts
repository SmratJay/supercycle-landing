import { NextResponse } from "next/server"
import { heliusClient } from "@/lib/services/helius-client"
import { snapshotStore } from "@/lib/services/snapshot-store"

/**
 * Health check endpoint for monitoring system status
 */
export async function GET() {
  try {
    const checks = {
      helius: false,
      database: false,
      latestSnapshot: null as any
    }

    // Check Helius connection
    try {
      checks.helius = await heliusClient.healthCheck()
    } catch (error) {
      console.error("Helius health check failed:", error)
    }

    // Check database and get latest snapshot
    try {
      const latest = await snapshotStore.getLatest()
      checks.database = latest !== null
      checks.latestSnapshot = latest ? {
        timestamp: latest.timestamp,
        age: Date.now() - latest.timestamp,
        signals: latest.signals
      } : null
    } catch (error) {
      console.error("Database health check failed:", error)
    }

    const allHealthy = checks.helius && checks.database

    return NextResponse.json({
      status: allHealthy ? "healthy" : "degraded",
      timestamp: Date.now(),
      checks
    }, {
      status: allHealthy ? 200 : 503
    })
  } catch (error) {
    return NextResponse.json({
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error"
    }, {
      status: 500
    })
  }
}
