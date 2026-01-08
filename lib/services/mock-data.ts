import { CycleState, FlowDirection, Trend, VolumeLevel, VolatilityState } from "@/lib/types/cycle"

// Simulates realistic cycle behavior patterns
export class MockCycleDataService {
  private currentPhase: number = 0
  private phaseStartTime: number = Date.now()
  
  // Each phase lasts ~30 seconds in demo mode for quick observation
  private readonly PHASE_DURATION = 30000

  // Cycle phases simulate natural progression
  private phases = [
    {
      state: "HEATING" as CycleState,
      signals: {
        usd1Flow: "OUT" as FlowDirection,
        liquidityTrend: "DOWN" as Trend,
        memeVolume: "LOW" as VolumeLevel,
        volatility: "STABLE" as VolatilityState
      }
    },
    {
      state: "HEATING" as CycleState,
      signals: {
        usd1Flow: "OUT" as FlowDirection,
        liquidityTrend: "FLAT" as Trend,
        memeVolume: "MEDIUM" as VolumeLevel,
        volatility: "EXPANDING" as VolatilityState
      }
    },
    {
      state: "ACCELERATING" as CycleState,
      signals: {
        usd1Flow: "FLAT" as FlowDirection,
        liquidityTrend: "UP" as Trend,
        memeVolume: "HIGH" as VolumeLevel,
        volatility: "EXPANDING" as VolatilityState
      }
    },
    {
      state: "ACCELERATING" as CycleState,
      signals: {
        usd1Flow: "FLAT" as FlowDirection,
        liquidityTrend: "UP" as Trend,
        memeVolume: "HIGH" as VolumeLevel,
        volatility: "EXPANDING" as VolatilityState
      }
    },
    {
      state: "SETTLING" as CycleState,
      signals: {
        usd1Flow: "IN" as FlowDirection,
        liquidityTrend: "FLAT" as Trend,
        memeVolume: "MEDIUM" as VolumeLevel,
        volatility: "COMPRESSING" as VolatilityState
      }
    },
    {
      state: "SETTLING" as CycleState,
      signals: {
        usd1Flow: "IN" as FlowDirection,
        liquidityTrend: "DOWN" as Trend,
        memeVolume: "LOW" as VolumeLevel,
        volatility: "COMPRESSING" as VolatilityState
      }
    },
    {
      state: "RESETTING" as CycleState,
      signals: {
        usd1Flow: "IN" as FlowDirection,
        liquidityTrend: "UP" as Trend,
        memeVolume: "LOW" as VolumeLevel,
        volatility: "STABLE" as VolatilityState
      }
    },
    {
      state: "RESETTING" as CycleState,
      signals: {
        usd1Flow: "FLAT" as FlowDirection,
        liquidityTrend: "UP" as Trend,
        memeVolume: "LOW" as VolumeLevel,
        volatility: "STABLE" as VolatilityState
      }
    }
  ]

  getCurrentPhaseData() {
    const elapsed = Date.now() - this.phaseStartTime
    
    // Auto-advance phases for demo
    if (elapsed > this.PHASE_DURATION) {
      this.currentPhase = (this.currentPhase + 1) % this.phases.length
      this.phaseStartTime = Date.now()
    }

    return {
      ...this.phases[this.currentPhase],
      phaseNumber: this.currentPhase,
      timeInPhase: elapsed,
      phaseProgress: elapsed / this.PHASE_DURATION
    }
  }

  getHistoricalStates(count: number = 5) {
    const history = []
    const now = Date.now()
    
    for (let i = count - 1; i >= 0; i--) {
      const phaseIndex = (this.currentPhase - i + this.phases.length) % this.phases.length
      history.push({
        state: this.phases[phaseIndex].state,
        timestamp: now - (i * this.PHASE_DURATION),
        confidence: 0.75 + Math.random() * 0.2 // 75-95% confidence
      })
    }
    
    return history
  }

  // Simulate USD1 metrics
  getUsd1Metrics() {
    const phase = this.phases[this.currentPhase]
    
    return {
      totalLiquidity: 50000000 + Math.random() * 10000000, // $50-60M
      flowVolume24h: 5000000 + Math.random() * 5000000, // $5-10M
      netFlow: phase.signals.usd1Flow === "IN" ? 500000 : phase.signals.usd1Flow === "OUT" ? -500000 : 0
    }
  }

  // Simulate meme market metrics
  getMemeMetrics() {
    const phase = this.phases[this.currentPhase]
    
    const volumeMap: Record<VolumeLevel, number> = {
      HIGH: 20000000 + Math.random() * 10000000,
      MEDIUM: 8000000 + Math.random() * 4000000,
      LOW: 2000000 + Math.random() * 2000000
    }

    return {
      totalVolume24h: volumeMap[phase.signals.memeVolume],
      activeTokens: phase.signals.memeVolume === "HIGH" ? 150 : phase.signals.memeVolume === "MEDIUM" ? 80 : 30,
      avgVolatility: phase.signals.volatility === "EXPANDING" ? 0.25 : phase.signals.volatility === "COMPRESSING" ? 0.08 : 0.15
    }
  }
}

// Singleton instance
export const mockDataService = new MockCycleDataService()
