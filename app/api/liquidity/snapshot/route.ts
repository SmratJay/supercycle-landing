import { NextResponse } from "next/server"
import { liquidityDataService } from "@/lib/services/liquidity-data"

// Cache for 5 minutes
let cachedData: any = null
let lastUpdate = 0
const CACHE_DURATION = 5 * 60 * 1000

export async function GET() {
  try {
    const now = Date.now()
    
    if (cachedData && now - lastUpdate < CACHE_DURATION) {
      return NextResponse.json(cachedData)
    }

    const snapshot = liquidityDataService.getSnapshot()
    
    cachedData = snapshot
    lastUpdate = now

    return NextResponse.json(snapshot)
  } catch (error) {
    console.error("Error fetching liquidity snapshot:", error)
    return NextResponse.json(
      { error: "Failed to fetch liquidity snapshot" },
      { status: 500 }
    )
  }
}
