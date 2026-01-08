import { CycleState, CycleSignals, StateVote } from "@/lib/types/cycle"

export class CycleClassifier {
  private stateHistory: Array<{ state: CycleState; timestamp: number }> = []
  private readonly STATE_STABILITY_THRESHOLD = 6 * 60 * 60 * 1000 // 6 hours in ms
  
  /**
   * Classify current cycle state based on observed signals
   * Uses rule-based voting system - no predictions, only observations
   */
  classifyState(signals: CycleSignals): {
    state: CycleState
    confidence: number
    votes: StateVote[]
  } {
    const votes: StateVote[] = []

    // HEATING SIGNALS
    // Early phase: USD1 leaving, liquidity dropping, low activity
    if (signals.usd1Flow === "OUT" && signals.liquidityTrend === "DOWN") {
      votes.push({
        state: "HEATING",
        weight: 2,
        reason: "USD1 outflow + liquidity declining"
      })
    }

    if (signals.memeVolume === "LOW" && signals.volatility === "STABLE") {
      votes.push({
        state: "HEATING",
        weight: 1,
        reason: "Low activity, stable volatility"
      })
    }

    if (signals.usd1Flow === "OUT" && signals.memeVolume === "MEDIUM") {
      votes.push({
        state: "HEATING",
        weight: 1.5,
        reason: "USD1 outflow with rising meme activity"
      })
    }

    // ACCELERATING SIGNALS
    // Peak phase: High activity, expanding volatility, flat/rising USD1
    if (signals.memeVolume === "HIGH" && signals.volatility === "EXPANDING") {
      votes.push({
        state: "ACCELERATING",
        weight: 2,
        reason: "High meme activity + expanding volatility"
      })
    }

    if (signals.usd1Flow === "FLAT" && signals.liquidityTrend === "UP") {
      votes.push({
        state: "ACCELERATING",
        weight: 1.5,
        reason: "Stable USD1 flow + rising liquidity"
      })
    }

    if (signals.memeVolume === "HIGH" && signals.liquidityTrend === "UP") {
      votes.push({
        state: "ACCELERATING",
        weight: 2,
        reason: "Peak activity + liquidity growth"
      })
    }

    // SETTLING SIGNALS
    // Cooling phase: USD1 returning, volatility compressing
    if (signals.usd1Flow === "IN" && signals.volatility === "COMPRESSING") {
      votes.push({
        state: "SETTLING",
        weight: 2,
        reason: "USD1 inflow + volatility compression"
      })
    }

    if (signals.usd1Flow === "IN" && signals.memeVolume === "MEDIUM") {
      votes.push({
        state: "SETTLING",
        weight: 1.5,
        reason: "USD1 returning, activity cooling"
      })
    }

    if (signals.liquidityTrend === "DOWN" && signals.volatility === "COMPRESSING") {
      votes.push({
        state: "SETTLING",
        weight: 1,
        reason: "Liquidity declining, volatility compressing"
      })
    }

    // RESETTING SIGNALS
    // Reset phase: USD1 high, meme volume low, stable
    if (signals.usd1Flow === "IN" && signals.memeVolume === "LOW") {
      votes.push({
        state: "RESETTING",
        weight: 1.5,
        reason: "USD1 accumulating, low meme activity"
      })
    }

    if (signals.volatility === "STABLE" && signals.liquidityTrend === "UP") {
      votes.push({
        state: "RESETTING",
        weight: 2,
        reason: "Stable volatility + rising USD1 liquidity"
      })
    }

    if (signals.memeVolume === "LOW" && signals.liquidityTrend === "UP") {
      votes.push({
        state: "RESETTING",
        weight: 1.5,
        reason: "Low activity + USD1 rebuilding"
      })
    }

    // Compute winner using weighted voting
    const { winner, confidence } = this.computeWinner(votes)
    
    // Apply stability rule: only update if state is dominant for sufficient time
    const finalState = this.applyStabilityRule(winner)

    return {
      state: finalState,
      confidence,
      votes
    }
  }

  /**
   * Weighted voting: sum weights per state, winner is highest
   */
  private computeWinner(votes: StateVote[]): { winner: CycleState; confidence: number } {
    const totals: Record<CycleState, number> = {
      HEATING: 0,
      ACCELERATING: 0,
      SETTLING: 0,
      RESETTING: 0
    }

    let maxWeight = 0
    votes.forEach(vote => {
      totals[vote.state] += vote.weight
      maxWeight += vote.weight
    })

    // Find state with highest weight
    let winner: CycleState = "HEATING"
    let winnerWeight = 0

    Object.entries(totals).forEach(([state, weight]) => {
      if (weight > winnerWeight) {
        winnerWeight = weight
        winner = state as CycleState
      }
    })

    // Confidence is winner's weight / total weight
    const confidence = maxWeight > 0 ? winnerWeight / maxWeight : 0.5

    return { winner, confidence }
  }

  /**
   * Stability rule: state must be dominant for 6+ hours to change
   * In demo mode, we'll relax this for quick observation
   */
  private applyStabilityRule(candidateState: CycleState): CycleState {
    const now = Date.now()
    
    // Add current observation
    this.stateHistory.push({ state: candidateState, timestamp: now })

    // Keep only recent history (last 12 hours)
    const cutoff = now - 12 * 60 * 60 * 1000
    this.stateHistory = this.stateHistory.filter(h => h.timestamp > cutoff)

    // In demo mode, relax to 30 seconds instead of 6 hours
    const DEMO_THRESHOLD = 30 * 1000
    const threshold = process.env.NODE_ENV === "development" ? DEMO_THRESHOLD : this.STATE_STABILITY_THRESHOLD

    // Check if candidate has been dominant for threshold period
    const recentHistory = this.stateHistory.filter(h => h.timestamp > now - threshold)
    
    if (recentHistory.length === 0) return candidateState

    // Count occurrences
    const counts: Record<CycleState, number> = {
      HEATING: 0,
      ACCELERATING: 0,
      SETTLING: 0,
      RESETTING: 0
    }

    recentHistory.forEach(h => counts[h.state]++)

    // If candidate is most common, return it
    const candidateCount = counts[candidateState]
    const maxCount = Math.max(...Object.values(counts))

    if (candidateCount === maxCount) {
      return candidateState
    }

    // Otherwise, return previous dominant state (tie-breaking rule)
    const previous = this.stateHistory[this.stateHistory.length - 2]
    return previous ? previous.state : candidateState
  }
}

// Singleton instance
export const cycleClassifier = new CycleClassifier()
