import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>[]{}|'

interface GlitchTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p'
  scramble?: boolean
  delay?: number
}

export function GlitchText({ text, className = '', as: Tag = 'span', scramble = true, delay = 0 }: GlitchTextProps) {
  const [displayed, setDisplayed] = useState('')
  const [isRevealed, setIsRevealed] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const iterationRef = useRef(0)

  useEffect(() => {
    if (!scramble) {
      setDisplayed(text)
      setIsRevealed(true)
      return
    }

    const timeout = setTimeout(() => {
      iterationRef.current = 0

      intervalRef.current = setInterval(() => {
        const iter = iterationRef.current
        const next = text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < iter) return text[i]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')

        setDisplayed(next)
        iterationRef.current += 0.5

        if (iterationRef.current >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          setDisplayed(text)
          setIsRevealed(true)
        }
      }, 30)
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [text, scramble, delay])

  const handleMouseEnter = () => {
    if (!isRevealed) return
    iterationRef.current = 0
    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      const iter = iterationRef.current
      const next = text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (i < iter) return text[i]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      setDisplayed(next)
      iterationRef.current += 1

      if (iterationRef.current >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplayed(text)
      }
    }, 30)
  }

  return (
    <Tag
      className={`glitch-text font-orbitron ${className}`}
      data-text={text}
      onMouseEnter={handleMouseEnter}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: delay / 1000 }}
      >
        {displayed || text}
      </motion.span>
    </Tag>
  )
}
