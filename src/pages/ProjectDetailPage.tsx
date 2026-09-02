import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, Github, ExternalLink, PlayCircle, Crosshair } from 'lucide-react'
import { SiFigma, SiKaggle } from 'react-icons/si'
import { PROJECTS, type Project } from '@/data/projects'

/** Pulls the video ID out of watch/short/embed/youtu.be style YouTube URLs. Returns null if it doesn't look like YouTube. */
function getYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.slice(1) || null
    }
    if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname.startsWith('/embed/')) return parsed.pathname.split('/embed/')[1] || null
      if (parsed.pathname.startsWith('/shorts/')) return parsed.pathname.split('/shorts/')[1] || null
      return parsed.searchParams.get('v')
    }
    return null
  } catch {
    return null
  }
}

/** Featured image on top, clickable thumbnail strip below — clicking a thumbnail swaps the big image with a crossfade. */
function ProjectGallery({ project }: { project: Project }) {
  const images = project.gallery?.length ? project.gallery : [project.image]
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="space-y-4">
      {/* Big featured image */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-950/60 shadow-2xl h-[280px] sm:h-[380px] lg:h-[560px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={images[activeIndex]}
            alt={`${project.title} screenshot ${activeIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full object-contain"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 rounded-full border border-cyan-500/30 bg-black/60 px-3 py-1 font-orbitron text-xs text-cyan-300">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((image, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Show screenshot ${i + 1}`}
              aria-current={i === activeIndex}
              className="relative shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200"
              style={{
                width: 104,
                height: 68,
                borderColor: i === activeIndex ? 'rgba(34,211,238,0.9)' : 'rgba(255,255,255,0.1)',
                boxShadow: i === activeIndex ? '0 0 16px rgba(34,211,238,0.35)' : 'none',
                opacity: i === activeIndex ? 1 : 0.55,
              }}
            >
              <img
                src={image}
                alt={`${project.title} thumbnail ${i + 1}`}
                className="w-full h-full object-cover hover:opacity-100 transition-opacity"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

type VideoOption = { key: 'v1' | 'v2'; label: string; url: string }

export default function ProjectDetailPage() {
  const { projectId } = useParams()
  const project = PROJECTS.find(item => item.id === projectId)

  // Read videoDemoV2 defensively — it may not exist on every project yet (or on the
  // Project type at all). This works whether it's undefined, missing, or set.
  const videoDemoV2 = (project as { videoDemoV2?: string } | undefined)?.videoDemoV2

  // Build the list of available demo videos — only V1, only V2, both, or neither.
  const videoOptions: VideoOption[] = project
    ? ([
        project.videoDemo && { key: 'v1', label: 'V1', url: project.videoDemo },
        videoDemoV2 && { key: 'v2', label: 'V2', url: videoDemoV2 },
      ].filter(Boolean) as VideoOption[])
    : []

  const [activeVideoKey, setActiveVideoKey] = useState<VideoOption['key'] | undefined>(videoOptions[0]?.key)

  if (!project) {
    return (
      <div className="min-h-screen bg-[#020B18] text-white p-10">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 mb-8">
            <ArrowLeft size={18} />
            Back to projects
          </Link>
          <h1 className="text-3xl font-bold mb-4">Project not found</h1>
          <p className="text-slate-300">This project does not exist or has been removed.</p>
        </div>
      </div>
    )
  }

  const activeVideoUrl = videoOptions.find(v => v.key === activeVideoKey)?.url ?? videoOptions[0]?.url
  const youtubeId = activeVideoUrl ? getYouTubeId(activeVideoUrl) : null

  return (
    <div className="min-h-screen bg-[#020B18] text-white">
      <div className="max-w-7xl mx-auto px-6 py-5 md:px-12">
        <Link to="/" className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 mb-8 transition-colors">
          <ArrowLeft size={18} />
          Back to portfolio
        </Link>

        <header className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <p className="hud-label mb-3">PROJECT_DETAIL</p>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight">{project.title}</h1>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="border border-cyan-500/30 bg-cyan-500/5 px-2 py-1 text-[10px] font-orbitron uppercase tracking-[0.18em] text-cyan-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:border-cyan-400/60 hover:text-cyan-200 transition-colors">
                  <Github size={16} /> GitHub
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 hover:bg-cyan-500/20 transition-colors">
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 mb-12">
          <ProjectGallery project={project} />

          <aside className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-6">
            <h2 className="font-orbitron text-sm uppercase tracking-[0.18em] text-cyan-300 mb-4">Overview</h2>
            <p className="text-slate-300 leading-relaxed">{project.longDescription || project.description}</p>

            {project.resourceNote && (() => {
              const resourceList = project.resourceNote
                .split(' • ')
                .map(item => item.trim())
                .filter(Boolean)
                .map(item => {
                  const separatorIndex = item.indexOf(': ')
                  if (separatorIndex === -1) {
                    return { label: item, href: item }
                  }

                  return {
                    label: item.slice(0, separatorIndex),
                    href: item.slice(separatorIndex + 2).trim(),
                  }
                })

              return resourceList.length > 0 ? (
                <ul className="mt-4 space-y-2">
                  {resourceList.map(item => (
                    <li key={item.href} className="flex items-start gap-2 text-sm text-slate-200">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                      <a href={item.href} target="_blank" rel="noreferrer" className="text-cyan-300 underline-offset-2 hover:underline">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null
            })()}

            <div className="mt-8 border-t border-white/10 pt-6">
              <h3 className="font-orbitron text-xs uppercase tracking-[0.18em] text-white/70 mb-3">Tools used</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {project.tools.map(tool => (
                  <div key={tool} className="flex items-center gap-2.5 font-mono text-xs text-slate-300">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-cyan-400/70" />
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="mb-12">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <h2 className="font-orbitron text-sm uppercase tracking-[0.2em] text-cyan-300">Video Demo</h2>

            {/* Simple V1 / V2 toggle — only shown when both videos are set */}
            {videoOptions.length > 1 && (
              <div className="inline-flex rounded-full border border-cyan-500/30 bg-black/40 p-1">
                {videoOptions.map(opt => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setActiveVideoKey(opt.key)}
                    aria-pressed={activeVideoKey === opt.key}
                    className={`font-orbitron text-[11px] tracking-[0.15em] px-4 py-1.5 rounded-full transition-colors duration-150 ${
                      activeVideoKey === opt.key
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/60'
                        : 'text-slate-400 hover:text-cyan-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-stretch">
            {/* Left: resources panel, styled like an object-detection readout */}
            <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-slate-900/80 to-slate-950/60 p-6 flex flex-col gap-6">
              {/* Top accent strip */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, #22d3ee, #7B2FFF, transparent)' }}
              />

              <div>
                <h3 className="font-orbitron text-xs uppercase tracking-[0.2em] text-white/70 flex items-center gap-2">
                  <Crosshair size={13} className="text-cyan-400" />
                  Resources
                </h3>
                <div className="font-mono text-[10px] tracking-widest text-cyan-500/50 mt-1">
                  OBJECTS_DETECTED: {[project.github, project.kaggle].filter(Boolean).length}
                </div>
              </div>

              {[
                project.github && {
                  href: project.github,
                  icon: Github,
                  label: 'SOURCE_CODE',
                  sublabel: 'GitHub repository',
                  confidence: '98.6',
                  brandColor: '#22d3ee',
                },
                project.kaggle && {
                  href: project.kaggle,
                  icon: SiKaggle,
                  label: 'NOTEBOOK',
                  sublabel: 'Kaggle notebook',
                  confidence: '96.2',
                  brandColor: '#20BEFF',
                },
                project.figma && {
                  href: project.figma,
                  icon: SiFigma,
                  label: 'FIGMA',
                  sublabel: 'UI design',
                  confidence: '97.8',
                  brandColor: '#F24E1E',
                },
              ]
                .filter(Boolean)
                .map((item: any) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative border border-cyan-500/25 bg-black/30 px-4 pt-4 pb-3.5 transition-colors duration-200 hover:border-[color:var(--brand)] hover:bg-white/[0.03]"
                    style={{ '--brand': item.brandColor } as React.CSSProperties}
                  >
                    {/* Corner brackets, like a bounding-box overlay */}
                    <span className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t border-l border-cyan-400/60 transition-colors duration-200 group-hover:border-[color:var(--brand)]" />
                    <span className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t border-r border-cyan-400/60 transition-colors duration-200 group-hover:border-[color:var(--brand)]" />
                    <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-cyan-400/60 transition-colors duration-200 group-hover:border-[color:var(--brand)]" />
                    <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-cyan-400/60 transition-colors duration-200 group-hover:border-[color:var(--brand)]" />

                    {/* Class-label tag, like a detection box's classification chip */}
                    <span
                      className="absolute -top-2.5 left-3 bg-[#020B18] px-1.5 font-orbitron text-[9px] tracking-[0.15em] transition-colors duration-200"
                      style={{ color: item.brandColor }}
                    >
                      {item.label}
                    </span>

                    {/* Scan sweep on hover */}
                    <span className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span
                        className="absolute left-0 right-0 h-px"
                        style={{ background: item.brandColor, animation: 'scan-line 2s linear infinite' }}
                      />
                    </span>

                    <div className="flex items-center gap-3">
                      <item.icon size={18} className="shrink-0 text-white/80 transition-colors duration-200" />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm text-white/90">{item.sublabel}</div>
                        <div className="font-mono text-[10px] tracking-wide" style={{ color: `${item.brandColor}` }}>
                          CONF {item.confidence}%
                        </div>
                      </div>
                      <ExternalLink size={13} className="ml-auto shrink-0 text-slate-500 transition-colors duration-200 group-hover:text-[color:var(--brand)]" />
                    </div>
                  </a>
                ))}

              {!project.github && !project.kaggle && !project.figma && (
                <p className="font-mono text-xs text-slate-400 leading-relaxed">
                  {project.resourceNote || 'NO_OBJECTS_DETECTED — repository or notebook not linked yet.'}
                </p>
              )}
            </div>

            {/* Right: video */}
            {youtubeId ? (
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                <iframe
                  key={activeVideoKey}
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title={`${project.title} video demo ${activeVideoKey ?? ''}`}
                  className="w-full h-full min-h-[240px] aspect-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ) : activeVideoUrl ? (
              // videoDemo is set but doesn't look like a YouTube URL — link out instead of guessing
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/5 p-10 text-center text-slate-300">
                <PlayCircle className="mb-4 text-cyan-300" size={32} />
                <a href={activeVideoUrl} target="_blank" rel="noreferrer" className="text-cyan-300 underline hover:text-cyan-200">
                  Watch the video demo
                </a>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/5 p-10 text-center text-slate-300">
                <PlayCircle className="mb-4 text-cyan-300" size={32} />
                No video demo available for this project yet.
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  )
}