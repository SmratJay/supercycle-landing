import { NextResponse } from "next/server"
import { directoryDataService } from "@/lib/services/directory-data"
import type { DirectoryFilters } from "@/lib/types/directory"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    const filters: DirectoryFilters = {}
    
    const cycleRole = searchParams.get("cycleRole")
    if (cycleRole === "STARTER" || cycleRole === "SETTLEMENT" || cycleRole === "ECHO") {
      filters.cycleRole = cycleRole
    }

    const usd1Relationship = searchParams.get("usd1Relationship")
    if (usd1Relationship === "PAIR" || usd1Relationship === "ROTATION" || usd1Relationship === "OBSERVED") {
      filters.usd1Relationship = usd1Relationship
    }

    const launchOrigin = searchParams.get("launchOrigin")
    if (launchOrigin === "BONK" || launchOrigin === "pump.fun" || launchOrigin === "other") {
      filters.launchOrigin = launchOrigin
    }

    const verified = searchParams.get("verified")
    if (verified !== null) {
      filters.verified = verified === "true"
    }

    const entries = directoryDataService.getAll(filters)
    const stats = directoryDataService.getStats()

    return NextResponse.json({
      entries,
      stats,
      filters
    })
  } catch (error) {
    console.error("Error fetching directory:", error)
    return NextResponse.json(
      { error: "Failed to fetch directory" },
      { status: 500 }
    )
  }
}
