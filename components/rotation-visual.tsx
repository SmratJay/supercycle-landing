"use client"

import { CycleState } from "@/lib/types/cycle"
import { useEffect, useState } from "react"

interface RotationVisualProps {
  cycleState: CycleState
  className?: string
}

export function RotationVisual({ cycleState, className = "" }: RotationVisualProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine active paths based on cycle state
  const getActivePaths = () => {
    switch (cycleState) {
      case "HEATING":
        return {
          memeToLiquidity: true,
          liquidityToMeme: false,
          liquidityToUsd1: false,
          usd1ToLiquidity: false,
          label: "Attention dominant"
        }
      case "ACCELERATING":
        return {
          memeToLiquidity: true,
          liquidityToMeme: true,
          liquidityToUsd1: false,
          usd1ToLiquidity: false,
          label: "Momentum building"
        }
      case "SETTLING":
        return {
          memeToLiquidity: false,
          liquidityToMeme: false,
          liquidityToUsd1: true,
          usd1ToLiquidity: false,
          label: "Settlement active"
        }
      case "RESETTING":
        return {
          memeToLiquidity: false,
          liquidityToMeme: false,
          liquidityToUsd1: false,
          usd1ToLiquidity: true,
          label: "Memory formation"
        }
    }
  }

  const paths = getActivePaths()

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 0.1))" }}
      >
        {/* Define arrow markers */}
        <defs>
          {/* Active arrow (yellow glow) */}
          <marker
            id="arrowhead-active"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3, 0 6"
              fill="#facc15"
              style={{ filter: "drop-shadow(0 0 4px rgba(250, 204, 21, 0.8))" }}
            />
          </marker>

          {/* Inactive arrow (subtle gray) */}
          <marker
            id="arrowhead-inactive"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#3f3f46" />
          </marker>

          {/* Animated gradient for active paths */}
          <linearGradient id="active-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#facc15" stopOpacity="0.2">
              <animate
                attributeName="offset"
                values="0;1;0"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#facc15" stopOpacity="0.8">
              <animate
                attributeName="offset"
                values="0;1;0"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#facc15" stopOpacity="0.2">
              <animate
                attributeName="offset"
                values="0;1;0"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>

        {/* NODES */}
        
        {/* MEME (top) */}
        <g transform="translate(200, 80)">
          <circle
            r="45"
            fill={paths.memeToLiquidity ? "#18181b" : "#09090b"}
            stroke={paths.memeToLiquidity ? "#facc15" : "#3f3f46"}
            strokeWidth="2"
            className={paths.memeToLiquidity ? "animate-pulse-slow" : ""}
          />
          <text
            textAnchor="middle"
            y="8"
            fill={paths.memeToLiquidity ? "#facc15" : "#71717a"}
            fontSize="20"
            fontWeight="bold"
          >
            MEME
          </text>
        </g>

        {/* LIQUIDITY (center) */}
        <g transform="translate(200, 200)">
          <circle
            r="55"
            fill="#18181b"
            stroke={
              paths.memeToLiquidity || paths.liquidityToMeme || paths.liquidityToUsd1 || paths.usd1ToLiquidity
                ? "#facc15"
                : "#3f3f46"
            }
            strokeWidth="3"
            className={
              paths.memeToLiquidity || paths.liquidityToMeme || paths.liquidityToUsd1 || paths.usd1ToLiquidity
                ? "animate-pulse-slow"
                : ""
            }
            style={{
              filter:
                paths.memeToLiquidity || paths.liquidityToMeme || paths.liquidityToUsd1 || paths.usd1ToLiquidity
                  ? "drop-shadow(0 0 15px rgba(250, 204, 21, 0.5))"
                  : "none"
            }}
          />
          <text
            textAnchor="middle"
            y="-5"
            fill="#facc15"
            fontSize="16"
            fontWeight="bold"
          >
            LIQUIDITY
          </text>
          <text
            textAnchor="middle"
            y="15"
            fill="#71717a"
            fontSize="12"
          >
            POOL
          </text>
        </g>

        {/* USD1 (bottom) */}
        <g transform="translate(200, 320)">
          <circle
            r="45"
            fill={paths.liquidityToUsd1 || paths.usd1ToLiquidity ? "#18181b" : "#09090b"}
            stroke={paths.liquidityToUsd1 || paths.usd1ToLiquidity ? "#facc15" : "#3f3f46"}
            strokeWidth="2"
            className={paths.liquidityToUsd1 || paths.usd1ToLiquidity ? "animate-pulse-slow" : ""}
          />
          <text
            textAnchor="middle"
            y="8"
            fill={paths.liquidityToUsd1 || paths.usd1ToLiquidity ? "#facc15" : "#71717a"}
            fontSize="20"
            fontWeight="bold"
          >
            USD1
          </text>
        </g>

        {/* PATHS/ARROWS */}

        {/* MEME → LIQUIDITY (top to center, slightly curved right) */}
        <path
          d="M 220 120 Q 240 160 210 165"
          fill="none"
          stroke={paths.memeToLiquidity ? "url(#active-gradient)" : "#3f3f46"}
          strokeWidth={paths.memeToLiquidity ? "3" : "2"}
          strokeDasharray={paths.memeToLiquidity ? "0" : "5,5"}
          markerEnd={paths.memeToLiquidity ? "url(#arrowhead-active)" : "url(#arrowhead-inactive)"}
          opacity={paths.memeToLiquidity ? "1" : "0.3"}
        >
          {paths.memeToLiquidity && (
            <animate
              attributeName="stroke-dashoffset"
              values="0;20"
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </path>

        {/* LIQUIDITY → MEME (center to top, slightly curved left) */}
        <path
          d="M 190 165 Q 160 160 180 120"
          fill="none"
          stroke={paths.liquidityToMeme ? "url(#active-gradient)" : "#3f3f46"}
          strokeWidth={paths.liquidityToMeme ? "3" : "2"}
          strokeDasharray={paths.liquidityToMeme ? "0" : "5,5"}
          markerEnd={paths.liquidityToMeme ? "url(#arrowhead-active)" : "url(#arrowhead-inactive)"}
          opacity={paths.liquidityToMeme ? "1" : "0.3"}
        >
          {paths.liquidityToMeme && (
            <animate
              attributeName="stroke-dashoffset"
              values="0;20"
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </path>

        {/* LIQUIDITY → USD1 (center to bottom, slightly curved right) */}
        <path
          d="M 210 245 Q 240 280 210 285"
          fill="none"
          stroke={paths.liquidityToUsd1 ? "url(#active-gradient)" : "#3f3f46"}
          strokeWidth={paths.liquidityToUsd1 ? "3" : "2"}
          strokeDasharray={paths.liquidityToUsd1 ? "0" : "5,5"}
          markerEnd={paths.liquidityToUsd1 ? "url(#arrowhead-active)" : "url(#arrowhead-inactive)"}
          opacity={paths.liquidityToUsd1 ? "1" : "0.3"}
        >
          {paths.liquidityToUsd1 && (
            <animate
              attributeName="stroke-dashoffset"
              values="0;20"
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </path>

        {/* USD1 → LIQUIDITY (bottom to center, slightly curved left) */}
        <path
          d="M 190 285 Q 160 280 190 245"
          fill="none"
          stroke={paths.usd1ToLiquidity ? "url(#active-gradient)" : "#3f3f46"}
          strokeWidth={paths.usd1ToLiquidity ? "3" : "2"}
          strokeDasharray={paths.usd1ToLiquidity ? "0" : "5,5"}
          markerEnd={paths.usd1ToLiquidity ? "url(#arrowhead-active)" : "url(#arrowhead-inactive)"}
          opacity={paths.usd1ToLiquidity ? "1" : "0.3"}
        >
          {paths.usd1ToLiquidity && (
            <animate
              attributeName="stroke-dashoffset"
              values="0;20"
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </path>
      </svg>

      {/* State label */}
      {mounted && (
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <div
            className={`
              inline-block px-4 py-2 rounded-full text-sm font-semibold
              bg-gradient-to-r from-yellow-500/20 to-yellow-600/20
              border border-yellow-500/30
              text-yellow-400
              animate-fade-in
            `}
          >
            {paths.label}
          </div>
        </div>
      )}
    </div>
  )
}
