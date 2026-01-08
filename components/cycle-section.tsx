"use client"

export default function CycleSection() {
  const cycle = ["MEME", "HYPE", "LIQUIDITY", "STABLE"]

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/20 to-transparent pointer-events-none" />

      <div className="w-full z-10 max-w-5xl mx-auto">
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-yellow-400/20 animate-fade-in">
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-2 md:gap-4 mb-16">
          {cycle.map((item, index) => (
            <div key={item} className="flex items-center gap-2 md:gap-4">
              <div className={`text-center animate-fade-in-up delay-${(index + 1) * 100}`}>
                <div className="text-2xl md:text-5xl font-black text-white tracking-tight">{item}</div>
                <div className="h-1 w-12 bg-yellow-400 mx-auto mt-2" />
              </div>
              {index < cycle.length - 1 && <div className="hidden md:block text-yellow-400 text-3xl font-light">→</div>}
            </div>
          ))}
          <div className="md:hidden w-full text-center">
            <div className="text-yellow-400 text-2xl font-light">↓</div>
          </div>
          <div className="text-center animate-fade-in-up delay-500">
            <div className="text-2xl md:text-5xl font-black text-yellow-400 tracking-tight">MEME</div>
            <div className="text-xs uppercase text-gray-400 mt-2">cycle repeats</div>
          </div>
        </div>

        <div className="text-center px-4 animate-fade-in-up delay-500">
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-6">The cycle doesn&apos;t end. It upgrades.</h3>
          <p className="text-gray-400 text-xs uppercase tracking-widest">(this time with usd1)</p>
        </div>
        </div>
      </div>
    </section>
  )
}
