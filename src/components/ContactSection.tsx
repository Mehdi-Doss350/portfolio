import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { GlitchText } from '@/components/GlitchText'
import { NeuralCanvas } from '@/components/NeuralCanvas'
import { Mail, Github, Linkedin, ExternalLink, Phone } from 'lucide-react'

const CONTACT_EMAIL = 'mehdi.doss@ensi-uma.tn' // kept consistent with the rest of the site

const CONTACT_LINKS = [
  {
    icon: Mail,
    label: 'EMAIL',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    color: '#00E5FF',
  },
  {
    icon: Github,
    label: 'GITHUB',
    value: 'github.com/Mehdi-Doss350',
    href: 'https://github.com/Mehdi-Doss350',
    color: '#7B2FFF',
  },
  {
    icon: Linkedin,
    label: 'LINKEDIN',
    value: 'linkedin.com/in/mehdi-doss-a79025317',
    href: 'https://www.linkedin.com/in/mehdi-doss-a79025317/',
    color: '#00E5FF',
  },
  {
    icon: Phone,
    label: 'PHONE',
    value: '+216 99 352 520',
    href: 'tel:+21699352520',
    color: '#00E5FF',
  },
]

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, margin: '-80px' })
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // No backend yet — open the visitor's email client with the message prefilled
    // so it actually reaches me instead of silently going nowhere.
    const subject = encodeURIComponent(`Portfolio inquiry from ${formState.name}`)
    const body = encodeURIComponent(
      `${formState.message}\n\n—\n${formState.name}\n${formState.email}`
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-4 md:py-8 overflow-hidden min-h-[80vh] flex flex-col justify-center"
    >
      {/* Neural canvas background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <NeuralCanvas
          nodeCount={40}
          maxDistance={120}
          speed={0.2}
          interactive={false}
        />
      </div>

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse at 50% 80%, rgba(123,47,255,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-8 md:mb-10 text-center"
        >
          <div className="hud-label mb-3">SECTION_05 / CONNECT</div>
          <GlitchText
            text="GET IN TOUCH"
            as="h2"
            scramble={false}
            className="text-3xl md:text-5xl font-black tracking-[0.1em] text-foreground"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 text-sm md:text-base font-inter max-w-xl mx-auto"
            style={{ color: 'rgba(232,244,253,0.55)' }}
          >
            Open to research collaborations, engineering roles, and projects in AI, computer vision, and robotics.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left: contact links */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="hud-label mb-6">CONTACT INFO</div>

              {CONTACT_LINKS.map((link, i) => {
                const Icon = link.icon
                const isHovered = hoveredLink === link.label
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    onMouseEnter={() => setHoveredLink(link.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="flex items-center gap-4 p-4 border mb-3 group transition-all duration-300"
                    style={{
                      borderColor: isHovered ? `${link.color}60` : 'rgba(0,229,255,0.1)',
                      background: isHovered ? `${link.color}06` : 'transparent',
                      cursor: 'none',
                    }}
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center border shrink-0 transition-all duration-300"
                      style={{
                        borderColor: isHovered ? link.color : `${link.color}30`,
                        color: link.color,
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="hud-label mb-0.5">{link.label}</div>
                      <div
                        className="font-inter text-sm truncate transition-colors duration-200"
                        style={{ color: isHovered ? 'rgba(232,244,253,0.9)' : 'rgba(232,244,253,0.55)' }}
                      >
                        {link.value}
                      </div>
                    </div>
                    <ExternalLink
                      size={12}
                      className="shrink-0 transition-opacity duration-200"
                      style={{ color: link.color, opacity: isHovered ? 0.8 : 0.2 }}
                    />
                  </motion.a>
                )
              })}
            </motion.div>
          </div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <div className="hud-label mb-6">SEND A MESSAGE</div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 border text-center"
                style={{ borderColor: 'rgba(0,229,255,0.3)', background: 'rgba(0,229,255,0.04)' }}
              >
                <div
                  className="font-orbitron text-lg font-black mb-2"
                  style={{ color: '#00E5FF' }}
                >
                  ALMOST THERE
                </div>
                <p className="font-inter text-sm" style={{ color: 'rgba(232,244,253,0.55)' }}>
                  Your email app should have opened with the message ready to send. If nothing happened, email me
                  directly at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="underline" style={{ color: '#00E5FF' }}>
                    {CONTACT_EMAIL}
                  </a>.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { id: 'name', label: 'NAME', placeholder: 'Your name', type: 'text' },
                  { id: 'email', label: 'EMAIL', placeholder: 'your@email.com', type: 'email' },
                ].map(field => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="hud-label block mb-2"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={formState[field.id as 'name' | 'email']}
                      onChange={e =>
                        setFormState(prev => ({ ...prev, [field.id]: e.target.value }))
                      }
                      className="w-full px-4 py-3 font-inter text-sm bg-transparent border outline-none transition-all duration-200"
                      style={{
                        borderColor: 'rgba(0,229,255,0.2)',
                        color: 'rgba(232,244,253,0.85)',
                        cursor: 'none',
                      }}
                      onFocus={e => { e.target.style.borderColor = 'rgba(0,229,255,0.6)' }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(0,229,255,0.2)' }}
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="hud-label block mb-2">MESSAGE</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Describe your project or inquiry..."
                    value={formState.message}
                    onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 font-inter text-sm bg-transparent border outline-none transition-all duration-200 resize-none"
                    style={{
                      borderColor: 'rgba(0,229,255,0.2)',
                      color: 'rgba(232,244,253,0.85)',
                      cursor: 'none',
                    }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(0,229,255,0.6)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(0,229,255,0.2)' }}
                  />
                </div>
                <button type="submit" className="cyber-btn w-full mt-2">
                  SEND MESSAGE
                </button>
                <p className="font-inter text-xs text-center" style={{ color: 'rgba(232,244,253,0.35)' }}>
                  Opens your email client with this pre-filled — or email me directly at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        className="relative z-10 mt-5 md:mt-8 border-t pt-8"
        style={{ borderColor: 'rgba(0,229,255,0.08)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-orbitron text-sm font-black tracking-[0.25em] text-cyan glow-cyan">
            MD<span className="text-foreground opacity-30">//</span>
          </div>

          <div className="text-center">
            <div className="font-orbitron text-[10px] md:text-xs tracking-[0.28em] uppercase" style={{ color: 'rgba(0,229,255,0.6)' }}>
              Imagination is more important than knowledge —{' '}
              <span style={{ color: '#7B2FFF' }}>Albert Einstein</span>
            </div>
          </div>

          <div className="font-orbitron text-xs tracking-widest" style={{ color: 'rgba(232,244,253,0.25)' }}>
            © 2026
          </div>
        </div>
      </motion.div>
    </section>
  )
}