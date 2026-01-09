"use client"

import { useState, useRef } from "react"
import { MANIFESTO_QUOTES, ManifestoBackground } from "@/lib/types/manifesto"
import html2canvas from "html2canvas"

export function ManifestoTool() {
  const [selectedQuote, setSelectedQuote] = useState(MANIFESTO_QUOTES[0])
  const [background, setBackground] = useState<ManifestoBackground>("cosmic")
  const [isExporting, setIsExporting] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const backgroundStyles = {
    cosmic: "bg-gradient-to-br from-black via-zinc-900 to-black",
    black: "bg-black",
    gold: "bg-gradient-to-br from-yellow-900 via-yellow-950 to-black"
  }

  const handleExport = async () => {
    if (!cardRef.current) return

    setIsExporting(true)

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false
      })

      const blob = await new Promise<Blob | null>(resolve => 
        canvas.toBlob(resolve, "image/png")
      )

      if (blob) {
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.download = `supercycle-${Date.now()}.png`
        link.href = url
        link.click()
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="bg-zinc-950/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-8">
      <h2 className="text-2xl font-bold mb-4 text-yellow-500">
        Manifesto Screenshot Tool
      </h2>
      <p className="text-zinc-400 text-sm mb-6">
        Turn SUPERCYCLE&apos;s belief into shareable cultural artifacts.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          {/* Quote Selection */}
          <div>
            <label className="text-sm font-semibold text-zinc-400 mb-2 block">
              Select Quote
            </label>
            <div className="space-y-2 max-h-100 overflow-y-auto pr-2">
              {MANIFESTO_QUOTES.map(quote => (
                <button
                  key={quote.id}
                  onClick={() => setSelectedQuote(quote)}
                  className={`
                    w-full text-left p-3 rounded-lg text-sm transition-all border
                    ${selectedQuote.id === quote.id
                      ? "bg-yellow-950/30 border-yellow-800/50 text-white"
                      : "bg-zinc-900/30 border-zinc-800/30 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
                    }
                  `}
                >
                  <div className="text-xs text-zinc-600 mb-1 uppercase tracking-wide">
                    {quote.category}
                  </div>
                  {quote.text}
                </button>
              ))}
            </div>
          </div>

          {/* Background Selection */}
          <div>
            <label className="text-sm font-semibold text-zinc-400 mb-2 block">
              Background Style
            </label>
            <div className="flex gap-2">
              {(["cosmic", "black", "gold"] as ManifestoBackground[]).map(bg => (
                <button
                  key={bg}
                  onClick={() => setBackground(bg)}
                  className={`
                    flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all border capitalize
                    ${background === bg
                      ? "bg-yellow-950/30 border-yellow-800/50 text-yellow-400"
                      : "bg-zinc-900/30 border-zinc-800/30 text-zinc-500 hover:border-zinc-700"
                    }
                  `}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? "Exporting..." : "Export as PNG"}
          </button>
        </div>

        {/* Preview */}
        <div>
          <label className="text-sm font-semibold text-zinc-400 mb-2 block">
            Preview
          </label>
          <div className="relative">
            <div
              ref={cardRef}
              className={`
                ${backgroundStyles[background]}
                aspect-square rounded-2xl p-12 flex flex-col items-center justify-center
                border-2 border-zinc-800
                relative overflow-hidden
              `}
            >
              {/* Grain overlay */}
              {background === "cosmic" && (
                <div className="absolute inset-0 opacity-[0.015] pointer-events-none grain-overlay" />
              )}

              {/* Quote */}
              <div className="relative z-10 text-center">
                <p className="text-2xl md:text-3xl font-bold text-white leading-tight mb-8">
                  {selectedQuote.text}
                </p>

                {/* Watermark */}
                <div className="flex items-center justify-center gap-2 text-yellow-500/60">
                  <div className="h-px w-8 bg-yellow-500/30" />
                  <span className="text-sm font-black tracking-wider">SUPERCYCLE</span>
                  <div className="h-px w-8 bg-yellow-500/30" />
                </div>
              </div>

              {/* Background decoration */}
              {background === "cosmic" && (
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-500 rounded-full blur-3xl" />
                  <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-yellow-600 rounded-full blur-3xl" />
                </div>
              )}

              {background === "gold" && (
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
