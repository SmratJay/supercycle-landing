"use client"

import { useEffect, useState } from "react"
import { CycleState, CycleStatusData } from "@/lib/types/cycle"
import { RotationVisual } from "@/components/rotation-visual"
import { LiquiditySnapshotCard } from "@/components/liquidity-snapshot"
import { MemeDirectory } from "@/components/meme-directory"
import { ManifestoTool } from "@/components/manifesto-tool"

export default function UtilitiesPage() {
  const [cycleData, setCycleData] = useState<CycleStatusData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCycleStatus()
    // Refresh every 30 seconds in demo mode
    const interval = setInterval(fetchCycleStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  async function fetchCycleStatus() {
    try {
      const res = await fetch("/api/cycle/status")
      if (!res.ok) throw new Error("Failed to fetch cycle status")
      const data = await res.json()
      setCycleData(data)
      setLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Same cosmic background pattern from landing */}
      <div className="fixed inset-0 bg-linear-to-b from-black via-zinc-950 to-black" />
      
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-linear-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            SUPERCYCLE OBSERVATORY
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Real-time observation of the cycle&apos;s natural rhythms.
            We observe, not predict.
          </p>
          <a
            href="/"
            className="inline-block text-sm text-yellow-500 hover:text-yellow-400 transition-colors"
          >
            ← Back to main page
          </a>
        </div>

        {/* Utility Grid */}
        <div className="max-w-6xl mx-auto space-y-8">
          {/* First Row: Two columns */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Cycle Status Indicator */}
            <div className="bg-zinc-950/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-500">
              Cycle Status Indicator
            </h2>
            <p className="text-zinc-400 text-sm mb-6">
              Observes USD1 settlement patterns and meme ecosystem behavior.
              Weather, not signals.
            </p>

            {loading && (
              <div className="text-center py-8">
                <div className="inline-block w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {error && (
              <div className="bg-red-950/20 border border-red-800/50 rounded-lg p-4 text-red-400">
                {error}
              </div>
            )}

            {cycleData && (
              <div className="space-y-6">
                {/* Current State Badge */}
                <div className="flex items-center justify-center">
                  <CycleStateBadge state={cycleData.currentState} confidence={cycleData.confidence} />
                </div>

                {/* Signals Breakdown */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
                    Observed Signals
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <SignalItem label="USD1 Flow" value={cycleData.signals.usd1Flow} />
                    <SignalItem label="Liquidity" value={cycleData.signals.liquidityTrend} />
                    <SignalItem label="Meme Volume" value={cycleData.signals.memeVolume} />
                    <SignalItem label="Volatility" value={cycleData.signals.volatility} />
                  </div>
                </div>

                {/* Last Updated */}
                <div className="text-xs text-zinc-600 text-center">
                  Last updated: {new Date(cycleData.lastUpdated).toLocaleTimeString()}
                </div>
              </div>
            )}
          </div>

            {/* Liquidity Snapshot */}
            <LiquiditySnapshotCard />
          </div>

          {/* Second Row: Full width rotation visual */}
          <div className="bg-zinc-950/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-500">
              Meme → USD1 Rotation
            </h2>
            <p className="text-zinc-400 text-sm mb-8">
              How attention becomes value, and value becomes memory.
              The SUPERCYCLE thesis visualized.
            </p>

            {loading && (
              <div className="text-center py-16">
                <div className="inline-block w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {error && (
              <div className="bg-red-950/20 border border-red-800/50 rounded-lg p-4 text-red-400">
                {error}
              </div>
            )}

            {cycleData && (
              <div className="max-w-xl mx-auto">
                <RotationVisual cycleState={cycleData.currentState} className="h-96" />
              </div>
            )}
          </div>

          {/* Third Row: Meme Directory (Full width) */}
          <div>
            <MemeDirectory />
          </div>

          {/* Fourth Row: Manifesto Tool (Full width) */}
          <div>
            <ManifestoTool />
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper components
function CycleStateBadge({ state, confidence }: { state: CycleState; confidence: number }) {
  const stateConfig = {
    HEATING: {
      color: "from-orange-500 to-amber-600",
      bgGlow: "shadow-orange-500/50",
      label: "HEATING",
      icon: "🔥"
    },
    ACCELERATING: {
      color: "from-yellow-400 to-yellow-600",
      bgGlow: "shadow-yellow-500/50",
      label: "ACCELERATING",
      icon: "⚡"
    },
    SETTLING: {
      color: "from-cyan-400 to-blue-500",
      bgGlow: "shadow-cyan-500/50",
      label: "SETTLING",
      icon: "🌊"
    },
    RESETTING: {
      color: "from-purple-500 to-indigo-600",
      bgGlow: "shadow-purple-500/50",
      label: "RESETTING",
      icon: "🔄"
    }
  }

  const config = stateConfig[state]

  return (
    <div className="relative group">
      <div
        className={`
          px-8 py-4 rounded-full
          bg-linear-to-r ${config.color}
          shadow-lg ${config.bgGlow}
          animate-pulse-slow
          transition-all duration-500
        `}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{config.icon}</span>
          <div className="text-left">
            <div className="text-sm font-bold text-white">
              {config.label}
            </div>
            <div className="text-xs text-white/70">
              {Math.round(confidence * 100)}% confidence
            </div>
          </div>
        </div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-black border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-300 whitespace-nowrap">
          Based on observed USD1 settlement behavior
        </div>
      </div>
    </div>
  )
}

function SignalItem({ label, value }: { label: string; value: string }) {
  const getValueColor = (val: string) => {
    if (val === "IN" || val === "UP" || val === "HIGH") return "text-green-400"
    if (val === "OUT" || val === "DOWN" || val === "LOW") return "text-red-400"
    if (val === "EXPANDING") return "text-yellow-400"
    if (val === "COMPRESSING") return "text-blue-400"
    return "text-zinc-400"
  }

  return (
    <div className="bg-zinc-900/50 rounded-lg px-3 py-2">
      <div className="text-zinc-500 text-xs mb-1">{label}</div>
      <div className={`font-semibold ${getValueColor(value)}`}>{value}</div>
    </div>
  )
}
