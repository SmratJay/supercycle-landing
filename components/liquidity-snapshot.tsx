"use client"

import { useEffect, useState } from "react"
import { LiquiditySnapshot } from "@/lib/types/liquidity"

export function LiquiditySnapshotCard() {
  const [snapshot, setSnapshot] = useState<LiquiditySnapshot | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSnapshot()
    const interval = setInterval(fetchSnapshot, 30000) // Update every 30s
    return () => clearInterval(interval)
  }, [])

  async function fetchSnapshot() {
    try {
      const res = await fetch("/api/liquidity/snapshot")
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      setSnapshot(data)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching liquidity:", err)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-zinc-950/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-8">
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  if (!snapshot) {
    return (
      <div className="bg-zinc-950/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-8">
        <div className="text-red-400 text-center">Failed to load snapshot</div>
      </div>
    )
  }

  const getTrendIcon = () => {
    switch (snapshot.trend) {
      case "UP":
        return "↑"
      case "DOWN":
        return "↓"
      case "FLAT":
        return "→"
    }
  }

  const getTrendLabel = () => {
    switch (snapshot.trend) {
      case "UP":
        return "Accumulating"
      case "DOWN":
        return "Distributing"
      case "FLAT":
        return "Stable"
    }
  }

  const getTrendColor = () => {
    switch (snapshot.trend) {
      case "UP":
        return "text-green-400"
      case "DOWN":
        return "text-red-400"
      case "FLAT":
        return "text-zinc-400"
    }
  }

  return (
    <div className="bg-zinc-950/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-8">
      <h2 className="text-2xl font-bold mb-4 text-yellow-500">
        USD1 Liquidity Snapshot
      </h2>
      <p className="text-zinc-400 text-sm mb-6">
        Evidence that settlement behavior is real.
      </p>

      <div className="space-y-6">
        {/* Total Liquidity */}
        <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800/30">
          <div className="text-xs text-zinc-500 mb-1">Total USD1 Liquidity</div>
          <div className="text-2xl font-bold text-white mb-1">
            ${(snapshot.totalLiquidity / 1000000).toFixed(1)}M
          </div>
          <div className={`text-sm flex items-center gap-2 ${getTrendColor()}`}>
            <span className="text-2xl">{getTrendIcon()}</span>
            <span>{getTrendLabel()}</span>
            {snapshot.changePercent24h !== 0 && (
              <span className="text-xs text-zinc-600">
                {snapshot.changePercent24h > 0 ? "+" : ""}
                {snapshot.changePercent24h.toFixed(1)}% (24h)
              </span>
            )}
          </div>
        </div>

        {/* Top Pairs */}
        <div>
          <div className="text-sm font-semibold text-zinc-400 mb-3">Top Pairs</div>
          <div className="space-y-2">
            {snapshot.topPairs.map((pool, idx) => (
              <div
                key={pool.pairAddress}
                className="bg-zinc-900/30 rounded-lg px-4 py-3 border border-zinc-800/20 hover:border-zinc-700/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-zinc-600 text-xs font-mono">#{idx + 1}</div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {pool.memeName} / USD1
                      </div>
                      <div className="text-xs text-zinc-500 font-mono truncate max-w-[200px]">
                        {pool.memeMint.slice(0, 8)}...
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-zinc-300">
                      ${(pool.liquidityUsd1 / 1000000).toFixed(2)}M
                    </div>
                    <div className="text-xs text-zinc-600">
                      Vol: ${(pool.volume24h / 1000000).toFixed(1)}M
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-xs text-zinc-600 text-center pt-2 border-t border-zinc-800/30">
          Last updated: {new Date(snapshot.lastUpdated).toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}
