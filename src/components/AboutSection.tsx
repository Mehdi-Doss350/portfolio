import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'motion/react'
import { GlitchText } from '@/components/GlitchText'

const IDENTITY_BLOCKS = [
  {
    domain: 'PERCEPTION',
    color: '#00E5FF',
    description:
      'Teaching machines to see the world — from raw pixels to semantic understanding. Object detection, semantic segmentation, depth estimation, optical flow.',
  },
  {
    domain: 'INTELLIGENCE',
    color: '#7B2FFF',
    description:
      'Building the reasoning layer — deep neural architectures, transformers, generative models, reinforcement learning. Making systems that don\'t just process but understand.',
  },
  {
    domain: 'CODE',
    color: '#00E5FF',
    description:
      'Engineering-grade software that bridges research and reality. Python, C++, embedded firmware. Production-ready, optimized, maintainable.',
  },
  {
    domain: 'HARDWARE',
    color: '#7B2FFF',
    description:
      'Deploying intelligence to the edge — microcontrollers, GPUs, FPGAs, autonomous platforms. Where compute meets the physical world.',
  },
  {
    domain: 'ACTION',
    color: '#00E5FF',
    description:
      'Closing the loop — robotic actuators, autonomous navigation, real-time control systems. Building machines that don\'t just think, but move.',
  },
]

function IdentityBlock({
  domain,
  color,
  description,
  index,
}: {
  domain: string
  color: string
  description: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
      className="relative p-6 border-l-2"
      style={{
        borderLeftColor: color,
        background: `linear-gradient(90deg, ${color}08, transparent)`,
      }}
    >
      <div
        className="font-orbitron text-xs tracking-[0.3em] mb-2 font-black"
        style={{ color }}
      >
        {String(index + 1).padStart(2, '0')} / {domain}
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,244,253,0.65)' }}>
        {description}
      </p>
    </motion.div>
  )
}

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ['0%', '100%'])
  const inView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 md:py-40 overflow-hidden"
    >
      {/* Ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 50%, rgba(123,47,255,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24"
        >
          <div className="hud-label mb-3">SECTION_02 / IDENTITY</div>
          <GlitchText
            text="WHO I AM"
            as="h2"
            scramble={false}
            className="text-3xl md:text-5xl font-black tracking-[0.1em] text-foreground"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left: Philosophy */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p
                className="text-2xl md:text-3xl font-orbitron font-bold leading-tight mb-6"
                style={{ color: '#00E5FF' }}
              >
                "I BUILD MACHINES THAT SEE, THINK, AND ACT."
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(232,244,253,0.7)' }}>
                I'm an AI Engineer at the intersection of perception, intelligence, and hardware. My work doesn't live in one domain — it spans the entire stack: from raw sensor data to deployed autonomous systems.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(232,244,253,0.55)' }}>
                I believe the most interesting problems exist at the boundaries: where computer vision meets robotics, where ML research becomes embedded firmware, where software intelligence drives physical action in the real world.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="grid grid-cols-2 gap-4 mt-8"
            >
              {[
                { label: 'DOMAINS', value: '5+' },
                { label: 'STACK DEPTH', value: 'FULL' },
                { label: 'APPROACH', value: 'END-TO-END' },
                { label: 'MODE', value: 'BUILDER' },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="p-4 border"
                  style={{ borderColor: 'rgba(0,229,255,0.15)', background: 'rgba(0,229,255,0.03)' }}
                >
                  <div className="hud-label mb-1">{stat.label}</div>
                  <div className="font-orbitron text-lg font-bold text-primary">{stat.value}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Identity pipeline */}
          <div className="relative">
            {/* Animated vertical line */}
            <div
              className="absolute left-0 top-0 bottom-0 w-px"
              style={{ background: 'rgba(0,229,255,0.08)' }}
            >
              <motion.div
                className="w-full bg-primary"
                style={{ height: lineHeight }}
              />
            </div>

            <div className="pl-6 space-y-6">
              {IDENTITY_BLOCKS.map((block, i) => (
                <IdentityBlock key={block.domain} {...block} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
