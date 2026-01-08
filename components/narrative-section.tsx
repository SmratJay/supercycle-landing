"use client"

export default function NarrativeSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Multiple SUPERCYCLE watermarks filling the background */}
      <div className="absolute inset-0 flex flex-col justify-start pt-8 pb-8 space-y-16 pointer-events-none overflow-hidden">
        <div className="text-[100px] md:text-[180px] font-black text-yellow-600/8 text-center whitespace-nowrap leading-none select-none">
          SUPERCYCLE
        </div>
        <div className="text-[100px] md:text-[180px] font-black text-yellow-600/8 text-center whitespace-nowrap leading-none select-none">
          SUPERCYCLE
        </div>
        <div className="text-[100px] md:text-[180px] font-black text-yellow-600/8 text-center whitespace-nowrap leading-none select-none">
          SUPERCYCLE
        </div>
        <div className="text-[100px] md:text-[180px] font-black text-yellow-600/8 text-center whitespace-nowrap leading-none select-none">
          SUPERCYCLE
        </div>
        <div className="text-[100px] md:text-[180px] font-black text-yellow-600/8 text-center whitespace-nowrap leading-none select-none">
          SUPERCYCLE
        </div>
      </div>

      <div className="max-w-2xl w-full z-10 text-center">
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-yellow-400/20 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-white animate-fade-in-up delay-100">You've Seen This Before</h2>

          <div className="text-xl md:text-2xl text-gray-300 space-y-6 font-light leading-relaxed">
            <p className="animate-fade-in-up delay-200">First it's a meme.</p>
            <p className="animate-fade-in-up delay-300">Then it's just for fun.</p>
            <p className="text-yellow-400 font-semibold animate-fade-in-up delay-400">Then it's &quot;why is this still going up?&quot;</p>
          </div>
        </div>
      </div>
    </section>
  )
}
