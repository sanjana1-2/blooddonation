import React from 'react'
import { motion } from 'framer-motion'

const BloodyWaterEffect = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
      {/* SVG Filters for Liquid Effect */}
      <svg className="hidden">
        <defs>
          <filter id="fluid-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" />
          </filter>
        </defs>
      </svg>

      {/* Floating Watercolor Blobs */}
      <motion.div
        className="watercolor-blob bloody-gradient w-[600px] h-[600px] -top-20 -left-20 animate-drift"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="watercolor-blob bloody-gradient w-[500px] h-[500px] top-1/2 -right-20 animate-drift-reverse"
        style={{ background: 'radial-gradient(circle, rgba(244, 63, 94, 0.3) 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="watercolor-blob bloody-gradient w-[400px] h-[400px] bottom-0 left-1/4 animate-drift"
        style={{ background: 'radial-gradient(circle, rgba(190, 18, 60, 0.25) 0%, transparent 60%)' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Water ripple subtle overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.1)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)] mix-blend-overlay" />
    </div>
  )
}

export default BloodyWaterEffect
