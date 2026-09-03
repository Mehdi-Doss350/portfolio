import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const NAV_ITEMS = [
  { id: 'whoami', label: 'WHOAMI' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'contact', label: 'CONTACT' },
]

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Update active section - find the section closest to viewport center
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id))
      const viewportCenter = window.scrollY + window.innerHeight / 2
      
      let closestSection = 0
      let closestDistance = Infinity

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        if (section) {
          const sectionCenter = section.offsetTop + section.offsetHeight / 2
          const distance = Math.abs(sectionCenter - viewportCenter)
          if (distance < closestDistance) {
            closestDistance = distance
            closestSection = i
          }
        }
      }
      
      setActive(NAV_ITEMS[closestSection].id)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const navOffset = 72
      const top = el.getBoundingClientRect().top + window.scrollY - navOffset
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled
            ? 'rgba(2,11,24,0.92)'
            : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(0,229,255,0.15)' : 'none',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="font-orbitron text-sm font-black tracking-[0.25em] text-cyan glow-cyan"
            style={{ cursor: 'none' }}
          >
            MD<span className="text-foreground opacity-40">//</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className="relative font-orbitron text-xs tracking-[0.2em] transition-all duration-200"
                style={{
                  color: active === item.id ? '#00E5FF' : hovered === item.id ? '#7B2FFF' : 'rgba(232,244,253,0.5)',
                  textShadow: active === item.id ? '0 0 10px rgba(0,229,255,0.8)' : hovered === item.id ? '0 0 8px rgba(123,47,255,0.6)' : 'none',
                  cursor: 'none',
                }}
              >
                {item.label}
                {active === item.id && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{ 
                      background: '#00E5FF', 
                      boxShadow: '0 0 8px rgba(0,229,255,0.8)' 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                {hovered === item.id && active !== item.id && (
                  <motion.div
                    layoutId="nav-hover"
                    className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{ 
                      background: '#7B2FFF', 
                      boxShadow: '0 0 8px rgba(123,47,255,0.5)' 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            style={{ cursor: 'none' }}
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              className="block w-6 h-px bg-primary"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="block w-6 h-px bg-primary"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              className="block w-6 h-px bg-primary"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden"
            style={{
              background: 'rgba(2,11,24,0.98)',
              borderBottom: '1px solid rgba(0,229,255,0.2)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div className="flex flex-col p-6 gap-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollTo(item.id)}
                  className="font-orbitron text-sm tracking-[0.2em] text-left py-2 border-b border-border"
                  style={{
                    color: active === item.id ? '#00E5FF' : 'rgba(232,244,253,0.6)',
                    cursor: 'none',
                  }}
                >
                  <span className="text-primary opacity-50 mr-3">{'>'}</span>
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
