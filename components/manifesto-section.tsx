"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function ManifestoSection() {
  const [comingSoonOpen, setComingSoonOpen] = useState(false)

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,215,0,0.1),transparent_50%)] pointer-events-none" />

      <div className="max-w-4xl w-full z-10">
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-yellow-400/20 animate-fade-in">
          <div className="space-y-16 text-center">
          {/* Manifesto block 1 */}
          <div className="space-y-6">
            <p className="text-3xl md:text-5xl font-black text-white leading-relaxed animate-fade-in-up delay-100">There is no top.</p>
            <p className="text-3xl md:text-5xl font-black text-white leading-relaxed opacity-80 animate-fade-in-up delay-200">There is no bottom.</p>
            <p className="text-3xl md:text-5xl font-black text-yellow-400 leading-relaxed animate-fade-in-up delay-300">There is only the cycle.</p>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 py-8 animate-fade-in delay-400">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-yellow-400/30" />
            <div className="w-1 h-1 bg-yellow-400 rounded-full" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-yellow-400/30" />
          </div>

          {/* Manifesto block 2 */}
          <div className="space-y-6">
            <p className="text-3xl md:text-5xl font-black text-white leading-relaxed animate-fade-in-up delay-100">Memes start it.</p>
            <p className="text-3xl md:text-5xl font-black text-white leading-relaxed opacity-80 animate-fade-in-up delay-200">
              Liquidity sustains it.
            </p>
            <p className="text-3xl md:text-5xl font-black text-yellow-400 leading-relaxed animate-fade-in-up delay-300">Conviction keeps it alive.</p>
          </div>

          {/* CTA */}
          <div className="pt-12 animate-fade-in-up delay-400">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-8">Ready to join the supercycle?</p>
            <button 
              onClick={() => setComingSoonOpen(true)}
              className="px-12 py-5 text-lg font-bold uppercase tracking-widest border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300"
            >
              Enter Now
            </button>
          </div>
          </div>
        </div>
      </div>

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
