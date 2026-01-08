import { NextResponse } from "next/server"
import { mockDataService } from "@/lib/services/mock-data"
import { cycleClassifier } from "@/lib/engine/cycle-classifier"
import type { CycleStatusData } from "@/lib/types/cycle"

// Cache for 15 minutes (in production this would be updated by cron job)
let cachedData: CycleStatusData | null = null
let lastUpdate = 0
const CACHE_DURATION = 15 * 60 * 1000 // 15 minutes

export async function GET() {
  try {
    const now = Date.now()
    
    // Return cached data if still fresh
    if (cachedData && now - lastUpdate < CACHE_DURATION) {
      return NextResponse.json(cachedData)
    }

    // Get current phase data from mock service
    const phaseData = mockDataService.getCurrentPhaseData()
    
    // Classify state using engine
    const classification = cycleClassifier.classifyState(phaseData.signals)
    
    // Get historical states
    const history = mockDataService.getHistoricalStates(10)

    // Build response
    const statusData: CycleStatusData = {
      currentState: classification.state,
      lastUpdated: now,
      confidence: classification.confidence,
      signals: phaseData.signals,
      stateHistory: history,
      // Include classification votes for transparency
      metadata: {
        votes: classification.votes
      }
    }

    // Cache result
    cachedData = statusData
    lastUpdate = now

    return NextResponse.json(statusData)
  } catch (error) {
    console.error("Error fetching cycle status:", error)
    return NextResponse.json(
      { error: "Failed to fetch cycle status" },
      { status: 500 }
    )
  }
}
