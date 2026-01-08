"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState<string | null>(null)
  const [chartOpen, setChartOpen] = useState(false)
  const [swapOpen, setSwapOpen] = useState(false)
  const [comingSoonOpen, setComingSoonOpen] = useState(false)

  const buttons = [
    { id: "buy", label: "BUY SUPERCYCLE", onClick: () => setSwapOpen(true) },
    { id: "chart", label: "VIEW CHART", onClick: () => setChartOpen(true) },
    { id: "enter", label: "ENTER THE CYCLE", onClick: () => setComingSoonOpen(true) },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="max-w-4xl w-full text-center z-10">
        {/* Main headline with backdrop */}
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-8 border border-yellow-400/20 animate-fade-in">
          <h1 className="text-7xl md:text-8xl font-bold mb-8 tracking-tight leading-none">
            <span className="bg-gradient-to-b from-yellow-300 to-yellow-600 bg-clip-text text-transparent animate-fade-in-up delay-100">
              Welcome to the
            </span>
            <br />
            <span className="text-white animate-fade-in-up delay-200">SUPERCYCLE</span>
          </h1>

          {/* Subtext */}
          <div className="mb-12 space-y-2 text-base md:text-lg text-gray-300 animate-fade-in-up delay-300">
            <p>memecoin on solana</p>
            <p className="text-yellow-400">powered by vibes</p>
            <p>settled in usd1</p>
          </div>

          {/* Buttons with hierarchy */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-fade-in-up delay-400">
            {/* Primary CTA - Buy */}
            <button
              onClick={buttons[0].onClick}
              onMouseEnter={() => setIsHovered("buy")}
              onMouseLeave={() => setIsHovered(null)}
              className="group relative px-10 py-5 text-base font-bold uppercase tracking-widest transition-all duration-300 border-2 bg-yellow-400 text-black border-yellow-400 hover:bg-yellow-500 animate-button-pulse overflow-hidden"
            >
              <span className="relative z-10">{buttons[0].label}</span>
              {/* Cursor glow effect */}
              <div className="absolute inset-0 bg-gradient-radial from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            {/* Secondary CTA - View Chart */}
            <button
              onClick={buttons[1].onClick}
              onMouseEnter={() => setIsHovered("chart")}
              onMouseLeave={() => setIsHovered(null)}
              className={`group relative px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 border-2 overflow-hidden ${
                isHovered === "chart"
                  ? "bg-yellow-400 text-black border-yellow-400"
                  : "bg-transparent text-white border-white hover:border-yellow-400"
              }`}
            >
              <span className="relative z-10">{buttons[1].label}</span>
              {isHovered === "chart" && (
                <div className="absolute inset-0 bg-gradient-radial from-white/20 via-transparent to-transparent" />
              )}
            </button>
            
            {/* Tertiary CTA - Enter */}
            <button
              onClick={buttons[2].onClick}
              onMouseEnter={() => setIsHovered("enter")}
              onMouseLeave={() => setIsHovered(null)}
              className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 border border-yellow-400/40 ${
                isHovered === "enter"
                  ? "bg-yellow-400/10 text-yellow-400 border-yellow-400"
                  : "bg-transparent text-gray-400 hover:text-yellow-400 hover:border-yellow-400"
              }`}
            >
              {buttons[2].label}
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center gap-2 animate-fade-in delay-500">
          <div className="text-gray-400 text-xs uppercase tracking-widest">Scroll to explore</div>
          <div className="flex flex-col items-center animate-scroll-bounce">
            <div className="w-6 h-10 border-2 border-yellow-400/40 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Chart Dialog */}
      <Dialog open={chartOpen} onOpenChange={setChartOpen}>
        <DialogContent className="max-w-[98vw] w-[98vw] h-[98vh] bg-black border-2 border-yellow-400 p-0 gap-0 flex flex-col">
          <DialogHeader className="px-4 pt-3 pb-2 bg-black border-b border-yellow-400/30 flex-shrink-0">
            <DialogTitle className="text-lg font-bold text-yellow-400 uppercase tracking-wider">SUPERCYCLE Chart</DialogTitle>
          </DialogHeader>
          <div className="flex-1 w-full" style={{ height: 'calc(98vh - 50px)' }}>
            <iframe
              src="https://dexscreener.com/solana/hRjhzK323Z6vZ6TgkLgdzR9b9MAy92pRnztE3XRbonk?embed=1&theme=dark"
              className="w-full h-full border-0"
              style={{ display: 'block' }}
              allow="clipboard-write"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Swap Dialog */}
      <Dialog open={swapOpen} onOpenChange={setSwapOpen}>
        <DialogContent className="max-w-[600px] w-[95vw] h-[95vh] max-h-[800px] bg-black border-2 border-yellow-400 p-0 gap-0 overflow-auto">
          <DialogHeader className="px-4 pt-3 pb-2 bg-black border-b border-yellow-400/30 flex-shrink-0 sticky top-0 z-10">
            <DialogTitle className="text-lg font-bold text-yellow-400 uppercase tracking-wider">Buy SUPERCYCLE</DialogTitle>
          </DialogHeader>
          <div className="w-full flex-1 min-h-[600px] overflow-auto">
            <iframe
              src="https://raydium.io/swap/?inputMint=sol&outputMint=hRjhzK323Z6vZ6TgkLgdzR9b9MAy92pRnztE3XRbonk"
              className="w-full h-full min-h-[600px] border-0"
              style={{ display: 'block' }}
              allow="clipboard-write"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Coming Soon Dialog */}
      <Dialog open={comingSoonOpen} onOpenChange={setComingSoonOpen}>
        <DialogContent className="max-w-[500px] bg-black border-2 border-yellow-400">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-yellow-400 uppercase tracking-wider text-center">Coming Soon</DialogTitle>
          </DialogHeader>
          <div className="py-8 text-center">
            <p className="text-xl md:text-2xl text-white font-semibold">
              Hang on tight, the devs are cooking 👷
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
