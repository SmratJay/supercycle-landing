// USD1 Meme Directory types
export type Usd1Relationship = "PAIR" | "ROTATION" | "OBSERVED"
export type CycleRole = "STARTER" | "SETTLEMENT" | "ECHO"
export type LaunchOrigin = "BONK" | "pump.fun" | "other"

export interface DirectoryEntry {
  id: string
  name: string
  mint: string
  launchOrigin: LaunchOrigin
  usd1Relationship: Usd1Relationship
  cycleRole: CycleRole
  observationNote: string
  verified: boolean
  addedAt: number
}

export interface DirectoryFilters {
  cycleRole?: CycleRole
  usd1Relationship?: Usd1Relationship
  launchOrigin?: LaunchOrigin
  verified?: boolean
}
