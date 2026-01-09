"use client"

import { useEffect, useState } from "react"
import { DirectoryEntry, DirectoryFilters, CycleRole, Usd1Relationship, LaunchOrigin } from "@/lib/types/directory"

export function MemeDirectory() {
  const [entries, setEntries] = useState<DirectoryEntry[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<DirectoryFilters>({})

  useEffect(() => {
    fetchDirectory()
  }, [filters])

  async function fetchDirectory() {
    try {
      const params = new URLSearchParams()
      if (filters.cycleRole) params.set("cycleRole", filters.cycleRole)
      if (filters.usd1Relationship) params.set("usd1Relationship", filters.usd1Relationship)
      if (filters.launchOrigin) params.set("launchOrigin", filters.launchOrigin)

      const res = await fetch(`/api/directory?${params.toString()}`)
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      setEntries(data.entries)
      setStats(data.stats)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching directory:", err)
      setLoading(false)
    }
  }

  const handleFilterChange = (key: keyof DirectoryFilters, value: any) => {
    setFilters(prev => {
      const newFilters = { ...prev }
      if (newFilters[key] === value) {
        delete newFilters[key]
      } else {
        newFilters[key] = value
      }
      return newFilters
    })
  }

  const getRoleColor = (role: CycleRole) => {
    switch (role) {
      case "STARTER": return "text-orange-400 bg-orange-950/30 border-orange-800/30"
      case "SETTLEMENT": return "text-cyan-400 bg-cyan-950/30 border-cyan-800/30"
      case "ECHO": return "text-purple-400 bg-purple-950/30 border-purple-800/30"
    }
  }

  const getRelationshipColor = (rel: Usd1Relationship) => {
    switch (rel) {
      case "PAIR": return "text-green-400"
      case "ROTATION": return "text-yellow-400"
      case "OBSERVED": return "text-zinc-400"
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

  return (
    <div className="bg-zinc-950/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-8">
      <h2 className="text-2xl font-bold mb-2 text-yellow-500">
        USD1 Meme Directory
      </h2>
      <p className="text-zinc-400 text-sm mb-6">
        A map of memes that participate in settlement, not a ranking.
      </p>

      {/* Disclaimer */}
      <div className="bg-yellow-950/20 border border-yellow-800/30 rounded-lg p-4 mb-6">
        <div className="text-yellow-400 text-xs font-semibold mb-1">⚠️ DISCLAIMER</div>
        <div className="text-zinc-400 text-xs leading-relaxed">
          This directory observes on-chain behavior. It does not endorse or recommend assets.
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-3">
        <div>
          <div className="text-xs text-zinc-500 mb-2">Cycle Role</div>
          <div className="flex gap-2 flex-wrap">
            {(["STARTER", "SETTLEMENT", "ECHO"] as CycleRole[]).map(role => (
              <button
                key={role}
                onClick={() => handleFilterChange("cycleRole", role)}
                className={`
                  px-3 py-1 rounded-full text-xs font-semibold transition-all
                  ${filters.cycleRole === role
                    ? getRoleColor(role)
                    : "text-zinc-500 bg-zinc-900/30 border border-zinc-800/30 hover:border-zinc-700"
                  }
                `}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-zinc-500 mb-2">USD1 Relationship</div>
          <div className="flex gap-2 flex-wrap">
            {(["PAIR", "ROTATION", "OBSERVED"] as Usd1Relationship[]).map(rel => (
              <button
                key={rel}
                onClick={() => handleFilterChange("usd1Relationship", rel)}
                className={`
                  px-3 py-1 rounded-full text-xs font-semibold transition-all border
                  ${filters.usd1Relationship === rel
                    ? `${getRelationshipColor(rel)} bg-zinc-900/50 border-zinc-700`
                    : "text-zinc-500 bg-zinc-900/30 border-zinc-800/30 hover:border-zinc-700"
                  }
                `}
              >
                {rel}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-zinc-500 mb-2">Launch Origin</div>
          <div className="flex gap-2 flex-wrap">
            {(["BONK", "pump.fun", "other"] as LaunchOrigin[]).map(origin => (
              <button
                key={origin}
                onClick={() => handleFilterChange("launchOrigin", origin)}
                className={`
                  px-3 py-1 rounded-full text-xs font-semibold transition-all border
                  ${filters.launchOrigin === origin
                    ? "text-yellow-400 bg-zinc-900/50 border-zinc-700"
                    : "text-zinc-500 bg-zinc-900/30 border-zinc-800/30 hover:border-zinc-700"
                  }
                `}
              >
                {origin}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="bg-zinc-900/30 rounded-lg p-3 mb-6 flex items-center gap-6 text-xs">
          <div>
            <span className="text-zinc-500">Total: </span>
            <span className="text-white font-semibold">{stats.total}</span>
          </div>
          <div>
            <span className="text-zinc-500">Verified: </span>
            <span className="text-green-400 font-semibold">{stats.verified}</span>
          </div>
          <div>
            <span className="text-zinc-500">Showing: </span>
            <span className="text-yellow-400 font-semibold">{entries.length}</span>
          </div>
        </div>
      )}

      {/* Entries */}
      <div className="space-y-3 max-h-150 overflow-y-auto">
        {entries.map(entry => (
          <div
            key={entry.id}
            className="bg-zinc-900/30 rounded-lg p-4 border border-zinc-800/20 hover:border-zinc-700/40 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-white">{entry.name}</h3>
                  {entry.verified && (
                    <span className="text-green-400 text-xs">✓</span>
                  )}
                </div>
                <div className="text-xs text-zinc-500 font-mono mb-2">
                  {entry.mint.slice(0, 12)}...{entry.mint.slice(-8)}
                </div>
              </div>
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold border ${getRoleColor(entry.cycleRole)}`}>
                  {entry.cycleRole}
                </span>
              </div>
            </div>

            <div className="flex gap-4 mb-2 text-xs">
              <div>
                <span className="text-zinc-600">USD1: </span>
                <span className={getRelationshipColor(entry.usd1Relationship)}>
                  {entry.usd1Relationship}
                </span>
              </div>
              <div>
                <span className="text-zinc-600">Origin: </span>
                <span className="text-zinc-400">{entry.launchOrigin}</span>
              </div>
            </div>

            <p className="text-sm text-zinc-400 italic leading-relaxed">
              {entry.observationNote}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
