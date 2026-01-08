import { NextResponse } from "next/server"
import { heliusClient } from "@/lib/services/helius-client"

/**
 * Test Helius connection without database
 * Useful for verifying API key works
 */
export async function GET() {
  try {
    // Test 1: Health check
    const isHealthy = await heliusClient.healthCheck()
    
    // Test 2: Try to fetch USD1 liquidity (will return 0 if no data, but connection works)
    let liquidityTest = { success: false, value: 0, error: null as any }
    try {
      const liquidity = await heliusClient.getUsd1TotalLiquidity()
      liquidityTest = { success: true, value: liquidity, error: null }
    } catch (error) {
      liquidityTest = { 
        success: false, 
        value: 0, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }
    }

    return NextResponse.json({
      success: isHealthy,
      timestamp: new Date().toISOString(),
      tests: {
        healthCheck: isHealthy,
        liquidityFetch: liquidityTest
      },
      message: isHealthy 
        ? "Helius connection successful!" 
        : "Helius connection failed - check API key"
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to test Helius connection"
    }, {
      status: 500
    })
  }
}
