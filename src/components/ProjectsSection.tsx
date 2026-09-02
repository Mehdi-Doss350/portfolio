import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { Link } from 'react-router-dom'
import { GlitchText } from '@/components/GlitchText'
import { Github, ExternalLink } from 'lucide-react'
import { PROJECTS } from '@/data/projects'

// Color now encodes MEANING (category) instead of decorating cards at random.
// Three tones only, each tied to a domain — extend the keyword lists as your
// project tags evolve, everything else falls back to the neutral cyan brand tone.
const CATEGORIES = {
  vision: { label: 'COMPUTER VISION', color: '#00E5FF', keywords: ['cv', 'yolo', 'opencv', 'detection', 'vision', 'ocr'] },
  genai: { label: 'GENERATIVE AI', color: '#B78CFF', keywords: ['llm', 'rag', 'langgraph', 'genai', 'prompt', 'mcp', 'agent'] },
  edge: { label: 'EDGE / ROBOTICS', color: '#FFB020', keywords: ['edge', 'raspberry', 'esp32', 'robot', 'quantiz', 'tflite', 'onnx'] },
}
const DEFAULT_CATEGORY = { label: 'SYSTEM', color: '#00E5FF' }

function getCategory(tags: string[] = []) {
  const lower = tags.map(t => t.toLowerCase())
  for (const key of Object.keys(CATEGORIES) as (keyof typeof CATEGORIES)[]) {
    const def = CATEGORIES[key]
    if (def.keywords.some(k => lower.some(t => t.includes(k)))) return def
  }
  return DEFAULT_CATEGORY
}

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: typeof PROJECTS[0]
  index: number
  inView: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const category = getCategory(project.tags)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.08 + index * 0.09, ease: 'easeOut' }}
      className="relative flex flex-col h-full overflow-hidden"
      style={{
        border: `1px solid ${hovered ? `${category.color}59` : 'rgba(0,229,255,0.1)'}`,
        background: 'rgba(6,18,38,0.85)',
        boxShadow: hovered ? `0 8px 40px ${category.color}1a` : 'none',
        transition: 'border-color 0.25s, box-shadow 0.25s',
        cursor: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/projects/${project.id}`} className="block focus:outline-none focus:ring-2 focus:ring-cyan-400/60" aria-label={`Open ${project.title}`}>
        {/* Header: dark, matches card body — accent lives in the top hairline + category tag, not a colored block */}
        <div
          className="px-5 pt-4 pb-3 flex items-start justify-between gap-2 shrink-0 relative"
          style={{ background: 'rgba(4,12,26,0.9)' }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-200"
            style={{ background: category.color, opacity: hovered ? 1 : 0.55 }}
          />
          <div className="flex flex-col gap-1.5 min-w-0">
            <span
              className="font-orbitron text-[0.6rem] font-bold tracking-[0.16em]"
              style={{ color: category.color }}
            >
              {category.label}
            </span>
            <h3 className="font-orbitron text-sm md:text-base font-black tracking-[0.04em] text-white leading-tight truncate">
              {project.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 shrink-0 pt-0.5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center justify-center w-7 h-7 transition-all duration-200"
                style={{
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(232,244,253,0.85)',
                  cursor: 'none',
                }}
                aria-label="GitHub"
              >
                <Github size={13} />
              </a>
            )}
            {project.kaggle && (
              <a
                href={project.kaggle}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center justify-center w-7 h-7 transition-all duration-200"
                style={{
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(232,244,253,0.85)',
                  cursor: 'none',
                }}
                aria-label="Kaggle"
              >
                <span className="font-orbitron text-[11px] font-black leading-none" style={{ color: '#20BEFF' }}>
                  K
                </span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center justify-center w-7 h-7 transition-all duration-200"
                style={{
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(232,244,253,0.85)',
                  cursor: 'none',
                }}
                aria-label="Live Demo"
              >
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>

        {/* Project image */}
        <div className="w-full overflow-hidden shrink-0" style={{ aspectRatio: '16/9' }}>
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
        </div>

        {/* Description + tags */}
        <div className="p-5 flex flex-col flex-1 gap-4">
          <p
            className="font-inter text-sm leading-relaxed flex-1"
            style={{ color: 'rgba(232,244,253,0.7)' }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="font-orbitron px-2 py-0.5"
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.12em',
                  border: '1px solid rgba(0,229,255,0.2)',
                  color: 'rgba(0,229,255,0.7)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, margin: '-80px' })

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-4 md:py-8 overflow-hidden"
    >
      {/* Background ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(0,229,255,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-8 md:mb-10"
        >
          <div className="hud-label mb-3">SECTION_03 / BUILDS</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <GlitchText
              text="DEPLOYED SYSTEMS"
              as="h2"
              scramble={false}
              className="text-3xl md:text-5xl font-black tracking-[0.1em] text-foreground"
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="font-orbitron text-xs tracking-[0.2em] shrink-0"
              style={{ color: 'rgba(0,229,255,0.5)' }}
            >
              {PROJECTS.length} PROJECTS LOGGED
            </motion.span>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}