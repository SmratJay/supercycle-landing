"use client"
import { useEffect, useRef } from "react"
import HeroSection from "@/components/hero-section"
import NarrativeSection from "@/components/narrative-section"
import CycleSection from "@/components/cycle-section"
import Usd1Section from "@/components/usd1-section"
import ManifestoSection from "@/components/manifesto-section"
import SectionDivider from "@/components/section-divider"

export default function Home() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY
        // Negative transform to keep image at top and hide from bottom
        parallaxRef.current.style.transform = `translateY(-${scrolled * 0.3}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="relative bg-black text-white overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
          style={{
            backgroundImage: "url(/blackhole.png)",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="absolute inset-0 bg-black/65" />
        {/* Grain overlay */}
        <div className="absolute inset-0 grain-overlay" />
        {/* Cosmic vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/80" />

        {/* Scrolling SUPERCYCLE watermark texts - appear after parallax scroll */}
        <div className="absolute top-[80vh] left-0 right-0 pointer-events-none select-none z-10" style={{ height: '500vh' }}>
          <div className="flex flex-col items-center space-y-64 py-32">
            <div className="text-[150px] md:text-[300px] font-black text-yellow-600/10 whitespace-nowrap">SUPERCYCLE</div>
            <div className="text-[150px] md:text-[300px] font-black text-yellow-600/10 whitespace-nowrap">SUPERCYCLE</div>
            <div className="text-[150px] md:text-[300px] font-black text-yellow-600/10 whitespace-nowrap">SUPERCYCLE</div>
            <div className="text-[150px] md:text-[300px] font-black text-yellow-600/10 whitespace-nowrap">SUPERCYCLE</div>
            <div className="text-[150px] md:text-[300px] font-black text-yellow-600/10 whitespace-nowrap">SUPERCYCLE</div>
            <div className="text-[150px] md:text-[300px] font-black text-yellow-600/10 whitespace-nowrap">SUPERCYCLE</div>
          </div>
        </div>
      </div>

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
        <HeroSection />
        <SectionDivider />
        <NarrativeSection />
        <SectionDivider />
        <CycleSection />
        <SectionDivider />
        <Usd1Section />
        <SectionDivider />
        <ManifestoSection />
      </div>
    </main>
  )
}
