import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { NeuralCanvas } from '@/components/NeuralCanvas'
import { GlitchText } from '@/components/GlitchText'

const IDENTITY_WORDS = ['AI ENGINEER', 'COMPUTER VISION', 'ROBOTICS', 'SOFTWARE']
const HEX_CHARS = '0123456789ABCDEF'

function randomChar(pool: string) {
  return pool[Math.floor(Math.random() * pool.length)]
}

/** Cyan/magenta/yellow offset copies of the name for a chromatic-aberration glitch look. */
function GlitchEcho({ text, glitching }: { text: string; glitching: boolean }) {
  const layers = [
    { color: '#00E5FF', x: glitching ? -3 : -1, y: 0 },
    { color: '#FF2ED1', x: glitching ? 3 : 1, y: glitching ? -1 : 0 },
    { color: '#FFE600', x: 0, y: glitching ? 1 : 0 },
  ]
  return (
    <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
      {layers.map((l, i) => (
        <div
          key={i}
          className="absolute inset-0 flex items-center justify-center text-4xl md:text-7xl lg:text-8xl font-black tracking-[0.1em] font-orbitron"
          style={{
            color: l.color,
            opacity: 0.35,
            mixBlendMode: 'screen',
            transform: `translate(${l.x}px, ${l.y}px)`,
            transition: 'transform 0.08s linear',
            clipPath: glitching && i === 1 ? 'inset(20% 0 35% 0)' : undefined,
          }}
        >
          {text}
        </div>
      ))}
    </div>
  )
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 600], [0, -120])
  const contentY = useTransform(scrollY, [0, 600], [0, 60])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  const [hexReadout, setHexReadout] = useState('0000-0000')
  const [glitching, setGlitching] = useState(false)

  // Ticking "hacking" readout
  useEffect(() => {
    const id = setInterval(() => {
      const hex = Array.from({ length: 8 }).map(() => randomChar(HEX_CHARS)).join('')
      setHexReadout(`${hex.slice(0, 4)}-${hex.slice(4)}`)
    }, 250)
    return () => clearInterval(id)
  }, [])

  // Occasional brief glitch pulse on the name — infrequent and short, never rapid strobing
  useEffect(() => {
    const id = setInterval(() => {
      setGlitching(true)
      setTimeout(() => setGlitching(false), 140)
    }, 4200)
    return () => clearInterval(id)
  }, [])

  // Cursor-reactive spotlight, updated via CSS variables to avoid re-renders
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      spotlightRef.current?.style.setProperty('--mx', `${x}%`)
      spotlightRef.current?.style.setProperty('--my', `${y}%`)
    }
    el.addEventListener('mousemove', handleMove)
    return () => el.removeEventListener('mousemove', handleMove)
  }, [])

  const scrollToProjects = () => {
    const el = document.getElementById('projects')
    if (el) {
      const navOffset = 72
      const top = el.getBoundingClientRect().top + window.scrollY - navOffset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '.')

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
      style={{ background: '#020B18' }}
    >
      <style>{`
        @keyframes scan-border {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        .scan-btn {
          position: relative;
          background: linear-gradient(90deg, transparent, rgba(0,229,255,0.5), transparent);
          background-size: 200% 100%;
          animation: scan-border 2.4s linear infinite;
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .tagline-shift {
          background-size: 200% auto;
          animation: gradient-shift 4s ease-in-out infinite;
        }

        @keyframes chip-flicker {
          0%, 92%, 100% { opacity: 1; }
          94% { opacity: 0.4; }
          96% { opacity: 1; }
        }
      `}</style>

      {/* Cursor-reactive spotlight */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(0,229,255,0.08), transparent 70%)',
        }}
      />

      {/* Neural network canvas - parallax background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <NeuralCanvas
          className="opacity-70"
          nodeCount={90}
          maxDistance={160}
          speed={0.35}
          interactive={true}
        />
      </motion.div>

      {/* Scan line effect */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div
          className="absolute w-full h-0.5 opacity-10"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.8), transparent)',
            animation: 'scan-line 8s linear infinite',
          }}
        />
        <div
          className="absolute h-full w-0.5 opacity-[0.06]"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(123,47,255,0.8), transparent)',
            animation: 'scan-line 11s linear infinite reverse',
            left: '30%',
          }}
        />
      </div>

      {/* Scanline texture */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)',
        }}
      />

      {/* Corner HUD elements */}
      <div className="absolute top-20 left-6 md:left-12 z-10 pointer-events-none">
        <div className="hud-label mb-1">SYS.STATUS</div>
        <div className="font-orbitron text-xs text-primary opacity-70">● ONLINE</div>
      </div>
      <div className="absolute top-20 right-6 md:right-12 z-10 pointer-events-none text-right">
        <div className="hud-label mb-1">DATE.STAMP</div>
        <div className="font-orbitron text-xs text-primary opacity-70">{dateStr}</div>
      </div>
      <div className="absolute bottom-24 left-6 md:left-12 z-10 pointer-events-none">
        <div className="hud-label">LOC.COORD</div>
        <div className="font-orbitron text-xs" style={{ color: 'rgba(0,229,255,0.4)' }}>
          48.8566°N / 2.3522°E
        </div>
      </div>
      <div className="absolute bottom-24 right-6 md:right-12 z-10 pointer-events-none text-right">
        <div className="hud-label">SIGNAL</div>
        <div className="font-orbitron text-xs tabular-nums" style={{ color: 'rgba(0,229,255,0.4)' }}>
          {hexReadout}
        </div>
      </div>

      {/* Corner brackets */}
      <div className="absolute top-16 left-4 md:top-20 md:left-8 z-10 w-8 h-8 pointer-events-none"
        style={{ borderTop: '1px solid rgba(0,229,255,0.3)', borderLeft: '1px solid rgba(0,229,255,0.3)' }}
      />
      <div className="absolute top-16 right-4 md:top-20 md:right-8 z-10 w-8 h-8 pointer-events-none"
        style={{ borderTop: '1px solid rgba(0,229,255,0.3)', borderRight: '1px solid rgba(0,229,255,0.3)' }}
      />
      <div className="absolute bottom-16 left-4 md:bottom-20 md:left-8 z-10 w-8 h-8 pointer-events-none"
        style={{ borderBottom: '1px solid rgba(0,229,255,0.3)', borderLeft: '1px solid rgba(0,229,255,0.3)' }}
      />
      <div className="absolute bottom-16 right-4 md:bottom-20 md:right-8 z-10 w-8 h-8 pointer-events-none"
        style={{ borderBottom: '1px solid rgba(0,229,255,0.3)', borderRight: '1px solid rgba(0,229,255,0.3)' }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        style={{ y: contentY, opacity }}
      >
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-12 md:w-24" style={{ background: 'rgba(0,229,255,0.4)' }} />
          <span className="font-orbitron text-xs tracking-[0.35em] uppercase"
            style={{ color: 'rgba(0,229,255,0.7)' }}>
            INITIALIZING SYSTEM
          </span>
          <div className="h-px w-12 md:w-24" style={{ background: 'rgba(0,229,255,0.4)' }} />
        </motion.div>

        {/* Name, with RGB-split glitch echo layered behind it */}
        <div className="relative mb-4">
          <GlitchEcho text="MEHDI DOSS" glitching={glitching} />
          <GlitchText
            text="MEHDI DOSS"
            as="h1"
            delay={600}
            className="relative text-4xl md:text-7xl lg:text-8xl font-black tracking-[0.1em] text-foreground"
          />
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mb-6"
        >
          <h2
            className="tagline-shift text-xl md:text-3xl lg:text-4xl font-black tracking-[0.08em] gradient-text font-orbitron"
          >
            I BUILD MACHINES THAT SEE, THINK, AND ACT.
          </h2>
        </motion.div>

        {/* Identity chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12"
        >
          {IDENTITY_WORDS.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3 + i * 0.1 }}
              className="font-orbitron text-xs md:text-sm tracking-[0.2em] px-3 py-1"
              style={{
                border: '1px solid rgba(0,229,255,0.25)',
                color: 'rgba(232,244,253,0.65)',
                animation: `chip-flicker ${5 + i * 1.3}s ease-in-out infinite`,
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="cyber-btn scan-btn" onClick={scrollToProjects} data-cursor="hover">
            EXPLORE PROJECTS
          </button>
          <button
            className="font-orbitron text-xs tracking-[0.2em] py-3 px-8 border border-muted-foreground/20 text-muted-foreground hover:text-foreground hover:border-foreground/40 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] transition-all duration-200"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ cursor: 'none' }}
          >
            CONNECT
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
      >
        <span className="hud-label text-center">SCROLL</span>
        <motion.div
          className="w-px h-12"
          style={{ background: 'linear-gradient(to bottom, rgba(0,229,255,0.6), transparent)' }}
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}