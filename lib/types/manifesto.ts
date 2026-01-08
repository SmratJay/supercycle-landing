// Manifesto screenshot tool types
export type ManifestoBackground = "cosmic" | "black" | "gold"

export interface ManifestoQuote {
  id: string
  text: string
  category: "cycle" | "settlement" | "narrative" | "philosophy"
}

export const MANIFESTO_QUOTES: ManifestoQuote[] = [
  {
    id: "1",
    text: "There is no top. There is only the cycle.",
    category: "cycle"
  },
  {
    id: "2",
    text: "Memes start it. Stables remember it.",
    category: "settlement"
  },
  {
    id: "3",
    text: "USD1 is not a currency. It is a settlement layer for attention.",
    category: "settlement"
  },
  {
    id: "4",
    text: "Every meme season ends in liquidity. Every liquidity phase births new memes.",
    category: "cycle"
  },
  {
    id: "5",
    text: "We observe, not predict. We map, not trade.",
    category: "philosophy"
  },
  {
    id: "6",
    text: "The cycle doesn't care about your timeline. It moves like weather.",
    category: "cycle"
  },
  {
    id: "7",
    text: "Volatility is not noise. It is the heartbeat of the cycle.",
    category: "narrative"
  },
  {
    id: "8",
    text: "Settlement is not an exit. It is memory formation.",
    category: "settlement"
  },
  {
    id: "9",
    text: "The SUPERCYCLE is not a token. It is a thesis.",
    category: "philosophy"
  },
  {
    id: "10",
    text: "Attention becomes value. Value becomes memory. Memory becomes the next cycle.",
    category: "narrative"
  }
]
