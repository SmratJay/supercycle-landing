"use client"

export default function SectionDivider() {
  return (
    <div className="relative w-full h-32 flex items-center justify-center overflow-hidden">
      {/* Main horizontal line with glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-linear-to-r from-transparent via-yellow-400 to-transparent animate-divider-glow" />
      </div>

      {/* Center geometric element */}
      <div className="relative z-10 flex items-center justify-center gap-8">
        {/* Left particles */}
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-yellow-400 rotate-45 animate-particle-float" style={{ animationDelay: '0s' }} />
          <div className="w-1.5 h-1.5 bg-yellow-400 rotate-45 animate-particle-float" style={{ animationDelay: '0.5s' }} />
          <div className="w-1 h-1 bg-yellow-400 rotate-45 animate-particle-float" style={{ animationDelay: '1s' }} />
        </div>

        {/* Center hexagon */}
        <div className="relative">
          <div className="w-8 h-8 bg-black border-2 border-yellow-400 rotate-45 animate-cosmic-pulse">
            <div className="absolute inset-0 bg-yellow-400/20 blur-md" />
          </div>
          {/* Inner dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
        </div>

        {/* Right particles */}
        <div className="flex gap-2">
          <div className="w-1 h-1 bg-yellow-400 rotate-45 animate-particle-float" style={{ animationDelay: '1.5s' }} />
          <div className="w-1.5 h-1.5 bg-yellow-400 rotate-45 animate-particle-float" style={{ animationDelay: '2s' }} />
          <div className="w-2 h-2 bg-yellow-400 rotate-45 animate-particle-float" style={{ animationDelay: '2.5s' }} />
        </div>
      </div>

      {/* Top accent line */}
      <div className="absolute top-8 left-1/4 right-1/4 h-px bg-yellow-400/20" />
      {/* Bottom accent line */}
      <div className="absolute bottom-8 left-1/3 right-1/3 h-px bg-yellow-400/20" />
    </div>
  )
}
