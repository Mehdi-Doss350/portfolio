import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, ExternalLink, Calendar } from 'lucide-react'
import { EXPERIENCES, type Experience } from '@/data/experiences'

/** Big featured photo on top, clickable thumbnail strip below — same pattern as the project gallery. */
function ExperienceGallery({ exp }: { exp: Experience }) {
  const images = exp.gallery?.length ? exp.gallery : [exp.image]
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="space-y-4">
      <div
        className="relative overflow-hidden rounded-2xl border shadow-2xl h-[280px] sm:h-[380px] lg:h-[480px]"
        style={{ borderColor: `${exp.color}33`, background: 'rgba(2,11,24,0.6)' }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={images[activeIndex]}
            alt={`${exp.role} photo ${activeIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full object-contain"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <div
            className="absolute bottom-3 right-3 rounded-full border bg-black/60 px-3 py-1 font-orbitron text-xs"
            style={{ borderColor: `${exp.color}55`, color: exp.color }}
          >
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((image, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === activeIndex}
              className="relative shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200"
              style={{
                width: 104,
                height: 68,
                borderColor: i === activeIndex ? exp.color : 'rgba(255,255,255,0.1)',
                boxShadow: i === activeIndex ? `0 0 16px ${exp.color}55` : 'none',
                opacity: i === activeIndex ? 1 : 0.55,
              }}
            >
              <img src={image} alt={`${exp.role} thumbnail ${i + 1}`} className="w-full h-full object-cover hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ExperienceDetailPage() {
  const { experienceId } = useParams()
  const exp = EXPERIENCES.find(item => item.id === experienceId)

  if (!exp) {
    return (
      <div className="min-h-screen bg-[#020B18] text-white p-10">
        <div className="max-w-3xl mx-auto">
          <Link to="/#experience" className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 mb-8">
            <ArrowLeft size={18} />
            Back to portfolio
          </Link>
          <h1 className="text-3xl font-bold mb-4">Experience not found</h1>
          <p className="text-slate-300">This entry does not exist or has been removed.</p>
        </div>
      </div>
    )
  }

  const Icon = exp.icon

  return (
    <div className="min-h-screen bg-[#020B18] text-white">
      <div className="max-w-7xl mx-auto px-6 py-5 md:px-12">
        <Link to="/#experience" className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 mb-8 transition-colors">
          <ArrowLeft size={18} />
          Back to portfolio
        </Link>

        <header className="mb-10">
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border"
              style={{ borderColor: `${exp.color}55`, color: exp.color, background: `${exp.color}12` }}
            >
              <Icon size={20} />
            </div>
            <div className="min-w-0">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight">{exp.role}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                {exp.orgUrl ? (
                  <a
                    href={exp.orgUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-slate-300 underline-offset-2 hover:underline"
                    style={{ color: exp.color }}
                  >
                    {exp.org}
                    <ExternalLink size={12} className="opacity-60" />
                  </a>
                ) : (
                  <span className="text-sm text-slate-300">{exp.org}</span>
                )}
                <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-slate-400">
                  <Calendar size={11} />
                  {exp.duration}
                </span>
              </div>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 mb-12">
          <ExperienceGallery exp={exp} />

          <aside className="rounded-2xl border p-6" style={{ borderColor: `${exp.color}33`, background: 'rgba(13,31,53,0.4)' }}>
            <h2 className="font-orbitron text-sm uppercase tracking-[0.18em] mb-4" style={{ color: exp.color }}>
              Overview
            </h2>
            <p className="text-slate-300 leading-relaxed">{exp.longDescription || exp.summary}</p>

            {exp.highlights && exp.highlights.length > 0 && (
              <div className="mt-8 border-t border-white/10 pt-6">
                <h3 className="font-orbitron text-xs uppercase tracking-[0.18em] text-white/70 mb-3">Highlights</h3>
                <ul className="space-y-2.5">
                  {exp.highlights.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                        style={{ background: exp.color }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </section>
      </div>
    </div>
  )
}