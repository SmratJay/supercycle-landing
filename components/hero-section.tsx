"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState<string | null>(null)
  const [chartOpen, setChartOpen] = useState(false)
  const [swapOpen, setSwapOpen] = useState(false)
  const [comingSoonOpen, setComingSoonOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const contractAddress = "hRjhzK323Z6vZ6TgkLgdzR9b9MAy92pRnztE3XRbonk"

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

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
          {/* USD1 Bike Logo */}
          <div className="flex justify-center mb-4 animate-fade-in">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <Image
                src="/IMG_5413.PNG"
                alt="USD1 Bike Logo"
                fill
                className="object-contain drop-shadow-[0_0_25px_rgba(255,215,0,0.3)] animate-float"
                priority
              />
            </div>
          </div>

          <h1 className="flex flex-col items-center justify-center mb-8 tracking-tight leading-none space-y-3">
            <span className="text-white text-5xl md:text-7xl font-bold uppercase tracking-wider animate-fade-in-up delay-100">
              Welcome to the
            </span>
            {/* 3D SUPERCYCLE Image with chromatic glitch effect */}
            <div className="relative inline-block animate-fade-in-up delay-200">
              <div className="relative w-[450px] h-[130px] md:w-[1000px] md:h-[220px]">
                <Image
                  src="/IMG_5417.PNG"
                  alt="SUPERCYCLE"
                  fill
                  className="object-contain drop-shadow-[0_0_35px_rgba(255,215,0,0.5)]"
                  priority
                  quality={100}
                  unoptimized
                />
                {/* Chromatic aberration layers */}
                <div className="absolute inset-0 mix-blend-screen opacity-15">
                  <Image
                    src="/IMG_5417.PNG"
                    alt=""
                    fill
                    className="object-contain"
                    quality={100}
                    unoptimized
                    style={{ filter: 'hue-rotate(90deg)', transform: 'translate(-2px, 0)' }}
                  />
                </div>
                <div className="absolute inset-0 mix-blend-screen opacity-15">
                  <Image
                    src="/IMG_5417.PNG"
                    alt=""
                    fill
                    className="object-contain"
                    quality={100}
                    unoptimized
                    style={{ filter: 'hue-rotate(-90deg)', transform: 'translate(2px, 0)' }}
                  />
                </div>
              </div>
            </div>
          </h1>

          {/* Subtext */}
          <div className="mb-12 space-y-2 text-base md:text-lg text-gray-300 animate-fade-in-up delay-300">
            <p>memecoin on solana</p>
            <p className="text-yellow-400">powered by vibes</p>
            <p>settled in usd1</p>
          </div>

          {/* Contract Address */}
          <div className="mb-8 animate-fade-in-up delay-400">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Contract Address</p>
            <button
              onClick={copyToClipboard}
              className="group relative px-4 py-3 bg-black/40 border border-yellow-400/30 rounded-lg hover:border-yellow-400 transition-all duration-300 overflow-hidden"
            >
              <div className="flex items-center gap-2">
                <span className="text-yellow-400/80 group-hover:text-yellow-400 text-sm md:text-base font-mono transition-colors">
                  {contractAddress.slice(0, 6)}...{contractAddress.slice(-6)}
                </span>
                <svg 
                  className="w-4 h-4 text-yellow-400/60 group-hover:text-yellow-400 transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              {/* Hover effect */}
              <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            {/* Copied message */}
            {copied && (
              <p className="text-yellow-400 text-xs mt-2 animate-fade-in">
                ✓ Copied to clipboard
              </p>
            )}
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
