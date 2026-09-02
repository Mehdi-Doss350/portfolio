import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { Github, Linkedin, Mail, FileText, MapPin, Phone } from 'lucide-react'

const PHOTO_URL = '/mehdi.png'

const TIMELINE = [
  {
    id: 'bac',
    title: 'Baccalaureate',
    org: '',
    detail: 'Mathematics specialization',
    year: '2022',
    side: 'left' as const,
    color: '#00E5FF',
  },
  {
    id: 'fsm',
    title: 'Faculty of Sciences of Monastir',
    org: 'Preparatory for Engineering Studies',
    detail: '',
    year: '2022 – 2024',
    side: 'right' as const,
    color: '#7B2FFF',
  },
  {
    id: 'ensi',
    title: 'ENSI',
    org: 'Computer Science Engineering',
    detail: '',
    year: '2024 – Present',
    side: 'right' as const,
    color: '#00E5FF',
  },
  {
    id: 'SWconsulting',
    title: 'SWconsulting',
    org: 'Summer Internship',
    detail: 'Artificial Intelligence',
    year: '2025',
    side: 'left' as const,
    color: '#7B2FFF',
  },
  {
    id: 'Hutchinson',
    title: 'Hutchinson',
    org: 'Summer Internship',
    detail: 'Software Engineer',
    year: '2026',
    side: 'right' as const,
    color: '#00E5FF',
  },
]

const SOCIAL_LINKS = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/Mehdi-Doss350', color: '#00E5FF' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mehdi-doss-a79025317/', color: '#00E5FF' },
  { icon: Mail, label: 'Email', href: 'mailto:mehdi.doss@ensi-uma.tn', color: '#00E5FF' },
  { icon: Phone, label: 'Phone', href: 'tel:+21699352520', color: '#00E5FF' },
]

function TimelineNode({
  item,
  index,
  inView,
}: {
  item: typeof TIMELINE[0]
  index: number
  inView: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.2 + index * 0.12, ease: 'easeOut' }}
      className="relative flex items-start gap-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'none' }}
    >
      {/* Left content */}
      <div className="w-[calc(50%-20px)] pr-6 text-right">
        {item.side === 'left' ? (
          <TimelineContent item={item} hovered={hovered} />
        ) : (
          <span
            className="font-orbitron text-xs tracking-[0.2em] block pt-1"
            style={{ color: 'rgba(0,229,255,0.5)' }}
          >
            {item.year}
          </span>
        )}
      </div>

      {/* Centre dot */}
      <div className="relative flex flex-col items-center shrink-0" style={{ width: 40 }}>
        <motion.div
          className="relative z-10 flex items-center justify-center"
          style={{ width: 22, height: 22 }}
          animate={hovered ? { scale: 1.25 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="w-5 h-5 flex items-center justify-center"
            style={{
              borderRadius: '50%',
              border: `1.5px solid ${item.color}`,
              background: hovered ? item.color : `${item.color}18`,
              boxShadow: hovered ? `0 0 14px ${item.color}70` : `0 0 6px ${item.color}30`,
              transition: 'all 0.2s ease',
            }}
          >
            {/* Checkmark SVG */}
            <svg viewBox="0 0 12 12" width="10" height="10">
              <polyline
                points="2,6 5,9 10,3"
                fill="none"
                stroke={hovered ? '#020B18' : item.color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Right content */}
      <div className="w-[calc(50%-20px)] pl-6 text-left">
        {item.side === 'right' ? (
          <TimelineContent item={item} hovered={hovered} />
        ) : (
          <span
            className="font-orbitron text-xs tracking-[0.2em] block pt-1"
            style={{ color: 'rgba(0,229,255,0.5)' }}
          >
            {item.year}
          </span>
        )}
      </div>
    </motion.div>
  )
}

function TimelineContent({
  item,
  hovered,
}: {
  item: typeof TIMELINE[0]
  hovered: boolean
}) {
  return (
    <div
      className="py-2 px-3 border transition-all duration-300"
      style={{
        borderColor: hovered ? `${item.color}50` : 'rgba(0,229,255,0.08)',
        background: hovered ? `${item.color}07` : 'transparent',
      }}
    >
      <div
        className="font-orbitron text-sm font-bold tracking-[0.05em] leading-tight"
        style={{ color: hovered ? item.color : 'rgba(232,244,253,0.9)' }}
      >
        {item.title}
      </div>
      {item.org && (
        <div
          className="font-inter text-xs mt-0.5 leading-snug"
          style={{ color: 'rgba(232,244,253,0.55)' }}
        >
          {item.org}
        </div>
      )}
      {item.detail && (
        <div
          className="font-inter text-xs mt-0.5 leading-snug"
          style={{ color: 'rgba(232,244,253,0.4)' }}
        >
          {item.detail}
        </div>
      )}
    </div>
  )
}

export function WhoAmISection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, margin: '-80px' })
  const timelineInView = useInView(timelineRef, { once: true, margin: '-60px' })

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  })
  const lineScaleY = useTransform(scrollYProgress, [0.1, 0.85], [0, 1])

  const [imgError, setImgError] = useState(false)

  return (
    <section
      id="whoami"
      ref={containerRef}
      className="relative py-4 md:py-8 overflow-hidden"
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(0,229,255,0.03) 0%, transparent 55%), radial-gradient(ellipse at 70% 50%, rgba(123,47,255,0.03) 0%, transparent 55%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Two-column layout — items-stretch so both columns share the same row height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-stretch">

          {/* ── LEFT: Profile card (unchanged) ── */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="flex justify-center md:justify-start"
          >
            <div
              className="relative w-full max-w-[28rem] border p-8 flex flex-col items-center gap-6"
              style={{
                borderColor: 'rgba(0,229,255,0.18)',
                background: 'rgba(13,31,53,0.6)',
                boxShadow: '0 0 40px rgba(0,229,255,0.05)',
              }}
            >
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-5 h-5 pointer-events-none"
                style={{ borderTop: '1px solid rgba(0,229,255,0.4)', borderLeft: '1px solid rgba(0,229,255,0.4)' }} />
              <div className="absolute top-2 right-2 w-5 h-5 pointer-events-none"
                style={{ borderTop: '1px solid rgba(0,229,255,0.4)', borderRight: '1px solid rgba(0,229,255,0.4)' }} />
              <div className="absolute bottom-2 left-2 w-5 h-5 pointer-events-none"
                style={{ borderBottom: '1px solid rgba(0,229,255,0.4)', borderLeft: '1px solid rgba(0,229,255,0.4)' }} />
              <div className="absolute bottom-2 right-2 w-5 h-5 pointer-events-none"
                style={{ borderBottom: '1px solid rgba(0,229,255,0.4)', borderRight: '1px solid rgba(0,229,255,0.4)' }} />

              {/* Circular profile photo */}
              <div className="relative">
                <div
                  className="w-40 h-40 md:w-44 md:h-44 overflow-hidden"
                  style={{
                    borderRadius: '50%',
                    border: '2px solid rgba(0,229,255,0.35)',
                    boxShadow: '0 0 24px rgba(0,229,255,0.2)',
                  }}
                >
                  {!imgError ? (
                    <img
                      src={PHOTO_URL}
                      alt="Mehdi Doss"
                      className="w-full h-full object-cover"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    /* Fallback avatar */
                    <div
                      className="w-full h-full flex items-center justify-center font-orbitron text-3xl font-black"
                      style={{ background: 'rgba(0,229,255,0.08)', color: '#00E5FF' }}
                    >
                      MD
                    </div>
                  )}
                </div>
                {/* Pulse ring */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ borderRadius: '50%', border: '1px solid rgba(0,229,255,0.25)' }}
                  animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              {/* Name & title */}
              <div className="text-center">
                <div className="font-orbitron text-lg font-black tracking-[0.12em] text-foreground mb-1">
                  MEHDI DOSS
                </div>
                <div
                  className="font-orbitron text-xs tracking-[0.2em]"
                  style={{ color: '#00E5FF' }}
                >
                  AI ENGINEER
                </div>
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  <MapPin size={10} style={{ color: 'rgba(0,229,255,0.5)' }} />
                  <span
                    className="font-inter text-xs"
                    style={{ color: 'rgba(232,244,253,0.4)' }}
                  >
                    Tunisia
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p
                className="font-inter text-sm leading-relaxed text-center"
                style={{ color: 'rgba(232,244,253,0.65)' }}
              >
                Hi, I'm a final-year Computer Science Engineering student at ENSI Manouba, passionate about robotics, aeronautics, autonomous systems, and agentic AI. I enjoy building projects that combine robotics, drones, and AI to solve real problems.
              </p>

              {/* CV button */}
              <a
                href="/Mehdi_Doss_AI_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-btn w-full text-center flex items-center justify-center gap-2"
                style={{ cursor: 'none' }}
                data-cursor="hover"
              >
                <FileText size={13} />
                CLICK TO VIEW MY CV
              </a>

              {/* Social links */}
              <div className="flex items-center gap-4">
                {SOCIAL_LINKS.map(link => {
                  const Icon = link.icon
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center transition-all duration-200"
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        border: `1.5px solid ${link.color}50`,
                        color: link.color,
                        background: `${link.color}0c`,
                        cursor: 'none',
                      }}
                      aria-label={link.label}
                      data-cursor="hover"
                    >
                      <Icon size={16} />
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Timeline — stretched to fill the same height as the card ── */}
          <motion.div
            ref={timelineRef}
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
            className="relative h-full flex flex-col"
          >
            <div className="hud-label mb-8">EDUCATION & EXPERIENCE</div>

            {/* Timeline track + animated fill — flex-1 so it consumes all remaining height */}
            <div className="relative flex-1">
              {/* Static background line */}
              <div
                className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
                style={{ background: 'rgba(0,229,255,0.1)' }}
              />
              {/* Animated fill */}
              <motion.div
                className="absolute left-1/2 top-0 w-px origin-top -translate-x-1/2"
                style={{
                  scaleY: lineScaleY,
                  background: 'linear-gradient(to bottom, #00E5FF, #7B2FFF)',
                  transformOrigin: 'top',
                  height: '100%',
                }}
              />

              {/* Nodes — justify-between spreads the 5 entries evenly across the full height */}
              <div className="relative h-full flex flex-col justify-between py-2">
                {TIMELINE.map((item, i) => (
                  <TimelineNode
                    key={item.id}
                    item={item}
                    index={i}
                    inView={timelineInView}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}