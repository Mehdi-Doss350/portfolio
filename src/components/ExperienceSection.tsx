import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { Link } from 'react-router-dom'
import { Calendar, ArrowUpRight } from 'lucide-react'
import { GlitchText } from '@/components/GlitchText'
import { EXPERIENCES, type Experience } from '@/data/experiences'

function ExperienceCard({ exp, index, inView }: { exp: Experience; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false)
  const Icon = exp.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.15 + index * 0.12, ease: 'easeOut' }}
    >
      <Link
        to={`/experience/${exp.id}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative flex flex-col sm:flex-row gap-0 sm:gap-5 border overflow-hidden transition-colors duration-300"
        style={{
          borderColor: hovered ? `${exp.color}55` : 'rgba(232,244,253,0.1)',
          background: hovered ? `${exp.color}06` : 'rgba(13,31,53,0.4)',
        }}
      >
        {/* Cover image */}
        <div className="relative h-52 sm:h-auto sm:w-80 shrink-0 overflow-hidden bg-slate-950/60">
          <img
            src={exp.image}
            alt={exp.role}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(to right, transparent 60%, rgba(2,11,24,0.9))',
              opacity: hovered ? 0.4 : 0.7,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative min-w-0 flex-1 p-6 md:p-7">
          {/* Corner brackets, consistent with the rest of the site */}
          <span className="pointer-events-none absolute top-2 right-2 h-4 w-4 border-t border-r transition-colors duration-300"
            style={{ borderColor: hovered ? exp.color : 'rgba(0,229,255,0.25)' }} />
          <span className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b border-r transition-colors duration-300"
            style={{ borderColor: hovered ? exp.color : 'rgba(0,229,255,0.25)' }} />

          <div className="flex items-start gap-4">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300"
              style={{
                borderColor: hovered ? exp.color : 'rgba(232,244,253,0.15)',
                color: hovered ? exp.color : 'rgba(232,244,253,0.7)',
                background: hovered ? `${exp.color}12` : 'transparent',
              }}
            >
              <Icon size={18} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="font-orbitron text-base font-bold tracking-[0.02em] text-foreground">
                  {exp.role}
                </h3>
                <span
                  className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.12em]"
                  style={{ color: hovered ? exp.color : 'rgba(232,244,253,0.4)' }}
                >
                  <Calendar size={10} />
                  {exp.duration}
                </span>
              </div>

              <div className="mt-1 font-inter text-sm" style={{ color: hovered ? exp.color : 'rgba(232,244,253,0.7)' }}>
                {exp.org}
              </div>

              <p className="mt-3 font-inter text-sm leading-relaxed" style={{ color: 'rgba(232,244,253,0.6)' }}>
                {exp.summary}
              </p>

              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {exp.highlights.slice(0, 2).map(item => (
                    <li key={item} className="flex items-start gap-2.5 font-inter text-sm" style={{ color: 'rgba(232,244,253,0.55)' }}>
                      <span
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full transition-colors duration-300"
                        style={{ background: hovered ? exp.color : 'rgba(0,229,255,0.5)' }}
                      />
                      {item}
                    </li>
                  ))}
                  {exp.highlights.length > 2 && (
                    <li className="font-inter text-xs pl-4" style={{ color: hovered ? exp.color : 'rgba(232,244,253,0.4)' }}>
                      +{exp.highlights.length - 2} more
                    </li>
                  )}
                </ul>
              )}

              <div
                className="mt-4 inline-flex items-center gap-1.5 font-orbitron text-[11px] uppercase tracking-[0.15em] transition-colors duration-300"
                style={{ color: hovered ? exp.color : 'rgba(232,244,253,0.4)' }}
              >
                View details
                <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-4 md:py-8 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 25% 40%, rgba(123,47,255,0.03) 0%, transparent 55%), radial-gradient(ellipse at 75% 60%, rgba(0,229,255,0.03) 0%, transparent 55%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-8 md:mb-10"
        >
          <div className="hud-label mb-3">SECTION_04 / TRACK RECORD</div>
          <GlitchText
            text="EXPERIENCE"
            as="h2"
            scramble={false}
            className="text-3xl md:text-5xl font-black tracking-[0.1em] text-foreground"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 text-sm md:text-base font-inter max-w-none md:whitespace-nowrap"
            style={{ color: 'rgba(232,244,253,0.55)' }}
          >
            Beyond engineering: leadership, communication, and teaching roles that shaped how I work with people, not just code.
          </motion.p>
        </motion.div>

        {/* Experience cards */}
        <div className="space-y-5">
          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}