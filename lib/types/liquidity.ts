// USD1 liquidity types
export type LiquidityTrend = "UP" | "DOWN" | "FLAT"

export interface Usd1Pool {
  memeName: string
  memeMint: string
  pairAddress: string
  liquidityUsd1: number
  volume24h: number
}

export interface LiquiditySnapshot {
  totalLiquidity: number
  trend: LiquidityTrend
  topPairs: Usd1Pool[]
  lastUpdated: number
  changePercent24h: number
}
