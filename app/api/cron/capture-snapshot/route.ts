import { NextResponse } from "next/server"
import { snapshotStore } from "@/lib/services/snapshot-store"
import { sql } from "@vercel/postgres"

/**
 * Cron job endpoint: captures USD1 ecosystem snapshot
 * Runs every 15 minutes via Vercel Cron
 * 
 * Configure in vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/capture-snapshot",
 *     "schedule": "*\/15 * * * *"
 *   }]
 * }
 */
export async function GET(request: Request) {
  const startTime = Date.now()

  try {
    // Verify cron secret for security
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")
    
    if (token !== process.env.CRON_SECRET) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Capture snapshot
    const snapshot = await snapshotStore.captureSnapshot()

    // Log successful execution
    const executionTime = Date.now() - startTime
    await logCronJob("capture-snapshot", "SUCCESS", `Captured snapshot at ${new Date().toISOString()}`, executionTime)

    return NextResponse.json({
      success: true,
      snapshot: {
        timestamp: snapshot.timestamp,
        usd1Liquidity: snapshot.usd1_total_liquidity,
        signals: snapshot.signals
      },
      executionTime
    })
  } catch (error) {
    const executionTime = Date.now() - startTime
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    
    console.error("Snapshot capture failed:", error)
    
    // Log failed execution
    await logCronJob("capture-snapshot", "FAILED", errorMessage, executionTime)

    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        executionTime
      },
      { status: 500 }
    )
  }
}

async function logCronJob(
  jobName: string,
  status: string,
  message: string,
  executionTimeMs: number
): Promise<void> {
  try {
    await sql`
      INSERT INTO cron_logs (job_name, status, message, execution_time_ms)
      VALUES (${jobName}, ${status}, ${message}, ${executionTimeMs})
    `
  } catch (error) {
    console.error("Failed to log cron job:", error)
  }
}
