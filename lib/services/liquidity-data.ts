import { LiquiditySnapshot, Usd1Pool, LiquidityTrend } from "@/lib/types/liquidity"

// Mock liquidity data service
export class LiquidityDataService {
  private currentTrend: LiquidityTrend = "UP"
  private lastUpdate = Date.now()
  
  // Simulate trending patterns
  private trendCycle = 0
  private readonly TREND_DURATION = 45000 // 45 seconds per trend

  private mockPools: Usd1Pool[] = [
    {
      memeName: "BONK",
      memeMint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
      pairAddress: "mock_bonk_usd1",
      liquidityUsd1: 12500000,
      volume24h: 8500000
    },
    {
      memeName: "SUPERCYCLE",
      memeMint: "hRjhzK323Z6vZ6TgkLgdzR9b9MAy92pRnztE3XRbonk",
      pairAddress: "mock_supercycle_usd1",
      liquidityUsd1: 8200000,
      volume24h: 4100000
    },
    {
      memeName: "WIF",
      memeMint: "mock_wif",
      pairAddress: "mock_wif_usd1",
      liquidityUsd1: 6800000,
      volume24h: 3200000
    },
    {
      memeName: "POPCAT",
      memeMint: "mock_popcat",
      pairAddress: "mock_popcat_usd1",
      liquidityUsd1: 4500000,
      volume24h: 2100000
    },
    {
      memeName: "MEW",
      memeMint: "mock_mew",
      pairAddress: "mock_mew_usd1",
      liquidityUsd1: 3200000,
      volume24h: 1800000
    }
  ]

  getSnapshot(): LiquiditySnapshot {
    const elapsed = Date.now() - this.lastUpdate
    
    // Cycle through trends: UP -> FLAT -> DOWN -> FLAT -> repeat
    if (elapsed > this.TREND_DURATION) {
      const trends: LiquidityTrend[] = ["UP", "FLAT", "DOWN", "FLAT"]
      this.trendCycle = (this.trendCycle + 1) % trends.length
      this.currentTrend = trends[this.trendCycle]
      this.lastUpdate = Date.now()
    }

    // Add some variation to liquidity amounts
    const pools = this.mockPools.map(pool => ({
      ...pool,
      liquidityUsd1: pool.liquidityUsd1 * (0.95 + Math.random() * 0.1)
    }))

    const totalLiquidity = pools.reduce((sum, pool) => sum + pool.liquidityUsd1, 0)

    // Sort by liquidity and take top 5
    const topPairs = pools.sort((a, b) => b.liquidityUsd1 - a.liquidityUsd1).slice(0, 5)

    // Simulate 24h change
    const changeMap: Record<LiquidityTrend, number> = {
      UP: 5 + Math.random() * 10, // +5% to +15%
      FLAT: -2 + Math.random() * 4, // -2% to +2%
      DOWN: -5 - Math.random() * 10 // -5% to -15%
    }

    return {
      totalLiquidity,
      trend: this.currentTrend,
      topPairs,
      lastUpdated: Date.now(),
      changePercent24h: changeMap[this.currentTrend]
    }
  }
}

export const liquidityDataService = new LiquidityDataService()
