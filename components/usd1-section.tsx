"use client"

export default function Usd1Section() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-yellow-400 to-transparent opacity-60 pointer-events-none" />

      <div className="max-w-2xl w-full z-10 text-center">
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-yellow-400/20 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-white animate-fade-in-up delay-100">Why USD1?</h2>

          <div className="space-y-8 mb-12">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light animate-fade-in-up delay-200">
              Because every pump ends somewhere stable.
              <br />
              <span className="text-yellow-400 font-semibold">USD1 is just where it lands.</span>
            </p>
          </div>

          <div className="border-t border-yellow-400/40 pt-8 animate-fade-in-up delay-300">
            <p className="text-gray-400 text-sm uppercase tracking-widest">
              Volatility gets attention. Stability keeps score.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
