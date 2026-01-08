import { NextResponse } from "next/server"
import { mockDataService } from "@/lib/services/mock-data"

export async function GET(request: Request) {
  try {
    // Get query params
    const { searchParams } = new URL(request.url)
    const count = parseInt(searchParams.get("count") || "20", 10)

    // Validate count
    if (count < 1 || count > 100) {
      return NextResponse.json(
        { error: "Count must be between 1 and 100" },
        { status: 400 }
      )
    }

    // Get historical states
    const history = mockDataService.getHistoricalStates(count)

    return NextResponse.json({
      history,
      count: history.length
    })
  } catch (error) {
    console.error("Error fetching cycle history:", error)
    return NextResponse.json(
      { error: "Failed to fetch cycle history" },
      { status: 500 }
    )
  }
}
