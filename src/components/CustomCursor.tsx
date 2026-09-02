import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const trailX = useMotionValue(-100)
  const trailY = useMotionValue(-100)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const rafRef = useRef<number>(0)

  const springConfig = { damping: 25, stiffness: 400 }
  const trailSpringConfig = { damping: 30, stiffness: 150 }

  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)
  const trailSpringX = useSpring(trailX, trailSpringConfig)
  const trailSpringY = useSpring(trailY, trailSpringConfig)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)')
    const shouldHideCursor = mediaQuery.matches

    if (shouldHideCursor) {
      setIsVisible(false)
      document.body.style.cursor = 'auto'
      return
    }

    document.body.style.cursor = 'none'

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        trailX.set(e.clientX)
        trailY.set(e.clientY)
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', handleMouseMove)

    const interactables = document.querySelectorAll('a, button, [role="button"], .cyber-btn, [data-cursor="hover"]')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    const observer = new MutationObserver(() => {
      const newInteractables = document.querySelectorAll('a, button, [role="button"], .cyber-btn, [data-cursor="hover"]')
      newInteractables.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      observer.disconnect()
      cancelAnimationFrame(rafRef.current)
      document.body.style.cursor = ''
    }
  }, [cursorX, cursorY, trailX, trailY])

  if (!isVisible) return null

  return (
    <>
      {/* Trail ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: trailSpringX,
          y: trailSpringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 40 : 24,
            height: isHovering ? 40 : 24,
            borderColor: isHovering ? 'rgba(0,229,255,0.9)' : 'rgba(0,229,255,0.4)',
            boxShadow: isHovering
              ? '0 0 15px rgba(0,229,255,0.6)'
              : '0 0 5px rgba(0,229,255,0.2)',
          }}
          transition={{ duration: 0.2 }}
          style={{
            border: '1px solid',
            borderRadius: '50%',
          }}
        />
      </motion.div>
      {/* Dot cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 6 : 4,
            height: isHovering ? 6 : 4,
            backgroundColor: isHovering ? '#ffffff' : '#00E5FF',
          }}
          transition={{ duration: 0.15 }}
          style={{
            borderRadius: '50%',
          }}
        />
      </motion.div>
    </>
  )
}
