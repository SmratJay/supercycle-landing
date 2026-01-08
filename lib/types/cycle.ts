// Core cycle state types
export type CycleState = "HEATING" | "ACCELERATING" | "SETTLING" | "RESETTING"
export type FlowDirection = "IN" | "OUT" | "FLAT"
export type Trend = "UP" | "DOWN" | "FLAT"
export type VolumeLevel = "HIGH" | "MEDIUM" | "LOW"
export type VolatilityState = "EXPANDING" | "COMPRESSING" | "STABLE"

// USD1 flow data
export interface Usd1Flow {
  timestamp: number
  netFlowDirection: FlowDirection
  volumeUsd: number
}

// Liquidity snapshot
export interface LiquiditySnapshot {
  totalUsd1Liquidity: number
  trend: Trend
  timestamp: number
}

// Meme asset definition
export interface MemeAsset {
  name: string
  mint: string
  launchOrigin: "BONK" | "pump.fun" | "other"
  usd1PairAddress: string
}

// Cycle signals
export interface CycleSignals {
  usd1Flow: FlowDirection
  liquidityTrend: Trend
  memeVolume: VolumeLevel
  volatility: VolatilityState
}

// State history entry
export interface StateHistoryEntry {
  state: CycleState
  timestamp: number
  confidence: number
}

// Main cycle status data
export interface CycleStatusData {
  currentState: CycleState
  lastUpdated: number
  confidence: number
  signals: CycleSignals
  stateHistory: StateHistoryEntry[]
  description?: string
  metadata?: {
    votes?: StateVote[]
  }
}

// Vote for state classification
export interface StateVote {
  state: CycleState
  weight: number
  reason: string
}
