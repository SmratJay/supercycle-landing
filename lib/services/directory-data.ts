import { DirectoryEntry, DirectoryFilters } from "@/lib/types/directory"

// Seeded directory entries
const SEED_ENTRIES: DirectoryEntry[] = [
  {
    id: "1",
    name: "BONK",
    mint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    launchOrigin: "BONK",
    usd1Relationship: "PAIR",
    cycleRole: "STARTER",
    observationNote: "Primary liquidity anchor. Consistent USD1 pairing activity.",
    verified: true,
    addedAt: Date.now() - 30 * 24 * 60 * 60 * 1000 // 30 days ago
  },
  {
    id: "2",
    name: "SUPERCYCLE",
    mint: "hRjhzK323Z6vZ6TgkLgdzR9b9MAy92pRnztE3XRbonk",
    launchOrigin: "pump.fun",
    usd1Relationship: "PAIR",
    cycleRole: "SETTLEMENT",
    observationNote: "Native USD1 pair. Observational thesis token.",
    verified: true,
    addedAt: Date.now() - 20 * 24 * 60 * 60 * 1000
  },
  {
    id: "3",
    name: "WIF",
    mint: "mock_wif",
    launchOrigin: "other",
    usd1Relationship: "ROTATION",
    cycleRole: "SETTLEMENT",
    observationNote: "Heavy rotation activity during settling phases.",
    verified: true,
    addedAt: Date.now() - 25 * 24 * 60 * 60 * 1000
  },
  {
    id: "4",
    name: "POPCAT",
    mint: "mock_popcat",
    launchOrigin: "other",
    usd1Relationship: "PAIR",
    cycleRole: "ECHO",
    observationNote: "Follows primary cycle movements with 2-3 day lag.",
    verified: true,
    addedAt: Date.now() - 15 * 24 * 60 * 60 * 1000
  },
  {
    id: "5",
    name: "MEW",
    mint: "mock_mew",
    launchOrigin: "other",
    usd1Relationship: "OBSERVED",
    cycleRole: "ECHO",
    observationNote: "Emerging USD1 activity. Monitoring for pattern confirmation.",
    verified: true,
    addedAt: Date.now() - 10 * 24 * 60 * 60 * 1000
  },
  {
    id: "6",
    name: "PENG",
    mint: "mock_peng",
    launchOrigin: "pump.fun",
    usd1Relationship: "ROTATION",
    cycleRole: "STARTER",
    observationNote: "High velocity rotation during heating phases.",
    verified: true,
    addedAt: Date.now() - 12 * 24 * 60 * 60 * 1000
  },
  {
    id: "7",
    name: "RETARDIO",
    mint: "mock_retardio",
    launchOrigin: "pump.fun",
    usd1Relationship: "OBSERVED",
    cycleRole: "STARTER",
    observationNote: "Pump.fun graduate with growing USD1 presence.",
    verified: true,
    addedAt: Date.now() - 8 * 24 * 60 * 60 * 1000
  },
  {
    id: "8",
    name: "GIGA",
    mint: "mock_giga",
    launchOrigin: "other",
    usd1Relationship: "PAIR",
    cycleRole: "SETTLEMENT",
    observationNote: "Established pair. Acts as cycle stabilizer.",
    verified: true,
    addedAt: Date.now() - 18 * 24 * 60 * 60 * 1000
  }
]

export class DirectoryDataService {
  private entries: DirectoryEntry[] = [...SEED_ENTRIES]

  getAll(filters?: DirectoryFilters): DirectoryEntry[] {
    let filtered = [...this.entries]

    if (filters?.cycleRole) {
      filtered = filtered.filter(e => e.cycleRole === filters.cycleRole)
    }

    if (filters?.usd1Relationship) {
      filtered = filtered.filter(e => e.usd1Relationship === filters.usd1Relationship)
    }

    if (filters?.launchOrigin) {
      filtered = filtered.filter(e => e.launchOrigin === filters.launchOrigin)
    }

    if (filters?.verified !== undefined) {
      filtered = filtered.filter(e => e.verified === filters.verified)
    }

    // Sort by addedAt descending
    return filtered.sort((a, b) => b.addedAt - a.addedAt)
  }

  getById(id: string): DirectoryEntry | undefined {
    return this.entries.find(e => e.id === id)
  }

  getStats() {
    return {
      total: this.entries.length,
      verified: this.entries.filter(e => e.verified).length,
      byRole: {
        STARTER: this.entries.filter(e => e.cycleRole === "STARTER").length,
        SETTLEMENT: this.entries.filter(e => e.cycleRole === "SETTLEMENT").length,
        ECHO: this.entries.filter(e => e.cycleRole === "ECHO").length
      },
      byRelationship: {
        PAIR: this.entries.filter(e => e.usd1Relationship === "PAIR").length,
        ROTATION: this.entries.filter(e => e.usd1Relationship === "ROTATION").length,
        OBSERVED: this.entries.filter(e => e.usd1Relationship === "OBSERVED").length
      }
    }
  }
}

export const directoryDataService = new DirectoryDataService()
