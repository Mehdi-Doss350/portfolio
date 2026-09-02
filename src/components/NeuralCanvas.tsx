import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  pulse: number
  pulseSpeed: number
  opacity: number
}

interface NeuralCanvasProps {
  className?: string
  nodeCount?: number
  maxDistance?: number
  speed?: number
  color?: string
  accentColor?: string
  interactive?: boolean
}

export function NeuralCanvas({
  className = '',
  nodeCount = 80,
  maxDistance = 150,
  speed = 0.4,
  color = 'rgba(0,229,255,',
  accentColor = 'rgba(123,47,255,',
  interactive = true,
}: NeuralCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animFrameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initNodes()
    }

    const initNodes = () => {
      nodesRef.current = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: Math.random() * 2.5 + 1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        opacity: Math.random() * 0.5 + 0.3,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const nodes = nodesRef.current
      const mouse = mouseRef.current

      // Update and draw nodes
      nodes.forEach(node => {
        node.x += node.vx
        node.y += node.vy
        node.pulse += node.pulseSpeed

        // Bounce off walls
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1
        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))

        // Mouse repulsion
        if (interactive) {
          const dx = node.x - mouse.x
          const dy = node.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            const force = (100 - dist) / 100
            node.vx += (dx / dist) * force * 0.3
            node.vy += (dy / dist) * force * 0.3
          }
        }

        // Clamp velocity
        const maxV = speed * 3
        node.vx = Math.max(-maxV, Math.min(maxV, node.vx))
        node.vy = Math.max(-maxV, Math.min(maxV, node.vy))

        const pulseFactor = 0.5 + 0.5 * Math.sin(node.pulse)
        const r = node.radius * (0.8 + 0.4 * pulseFactor)

        ctx.beginPath()
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `${color}${node.opacity * (0.6 + 0.4 * pulseFactor)})`
        ctx.fill()
      })

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDistance) {
            const opacity = (1 - dist / maxDistance) * 0.4
            // Mix cyan and violet for edges
            const useAccent = (i + j) % 5 === 0
            const edgeColor = useAccent ? accentColor : color
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `${edgeColor}${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(draw)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [nodeCount, maxDistance, speed, color, accentColor, interactive])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
    />
  )
}
