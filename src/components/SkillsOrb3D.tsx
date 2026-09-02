import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export function SkillsOrb3D({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const hoveredRef = useRef(false)

  useEffect(() => {
    hoveredRef.current = hovered
  }, [hovered])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── Scene & Camera ────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 4.5)

    // ── Lights ────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.1))
    const keyLight = new THREE.PointLight(0x00e5ff, 1.5)
    keyLight.position.set(3, 3, 3)
    scene.add(keyLight)
    const fillLight = new THREE.PointLight(0x7b2fff, 1.0)
    fillLight.position.set(-3, -2, 2)
    scene.add(fillLight)

    // ── Inner wobble sphere (approximated with sine distortion) ─
    const innerGeo = new THREE.IcosahedronGeometry(0.72, 1)
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 0.3,
      transparent: true, opacity: 0.25,
    })
    const innerMesh = new THREE.Mesh(innerGeo, innerMat)
    scene.add(innerMesh)

    // ── Outer wireframe icosahedron ───────────────────────────
    const outerGeo = new THREE.IcosahedronGeometry(1.05, 2)
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 0.45,
      wireframe: true, transparent: true, opacity: 0.5,
    })
    const outerMesh = new THREE.Mesh(outerGeo, outerMat)
    scene.add(outerMesh)

    // ── Orbit rings ───────────────────────────────────────────
    const orbits: { mesh: THREE.Mesh; speed: number }[] = [
      { tiltX: 0.4, speed: 0.3, color: 0x00e5ff },
      { tiltX: 1.2, speed: -0.2, color: 0x7b2fff },
      { tiltX: 0.9, speed: 0.15, color: 0x00e5ff },
    ].map(({ tiltX, speed, color }) => {
      const geo = new THREE.TorusGeometry(1.55, 0.012, 16, 100)
      const mat = new THREE.MeshStandardMaterial({
        color, emissive: color, emissiveIntensity: 0.6, transparent: true, opacity: 0.5,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.rotation.x = tiltX
      scene.add(mesh)
      return { mesh, speed }
    })

    // ── Particle field ────────────────────────────────────────
    const particleCount = 150
    const pPositions = new Float32Array(particleCount * 3)
    const radius = 2.4
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = radius * (0.8 + Math.random() * 0.4)
      pPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pPositions[i * 3 + 2] = r * Math.cos(phi)
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3))
    const pMat = new THREE.PointsMaterial({ color: 0x00e5ff, size: 0.03, sizeAttenuation: true, transparent: true, opacity: 0.7 })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // ── Float group ───────────────────────────────────────────
    const floatGroup = new THREE.Group()
    floatGroup.add(innerMesh, outerMesh, ...orbits.map(o => o.mesh))
    scene.add(floatGroup)
    // Remove duplicates added directly
    scene.remove(innerMesh, outerMesh, ...orbits.map(o => o.mesh))

    // ── Pointer tracking ──────────────────────────────────────
    const pointer = { x: 0, y: 0 }
    const onMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect()
      pointer.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      pointer.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2
    }
    mount.addEventListener('mousemove', onMove)

    // ── Resize ────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(mount)

    // ── Animate ───────────────────────────────────────────────
    let animId = 0
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const h = hoveredRef.current

      // Camera drift
      camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.05
      camera.position.y += (pointer.y * 0.4 - camera.position.y) * 0.05
      camera.lookAt(0, 0, 0)

      // Colors
      const icoColor = h ? 0x7b2fff : 0x00e5ff;
      (innerMat.color as THREE.Color).setHex(icoColor);
      (innerMat.emissive as THREE.Color).setHex(icoColor);
      innerMat.emissiveIntensity = h ? 0.5 : 0.3;
      (outerMat.color as THREE.Color).setHex(icoColor);
      (outerMat.emissive as THREE.Color).setHex(icoColor);
      outerMat.emissiveIntensity = h ? 0.7 : 0.45
      outerMat.opacity = h ? 0.75 : 0.5

      // Float group subtle bob
      floatGroup.position.y = Math.sin(t * 1.4) * 0.05
      floatGroup.rotation.y += 0.003

      // Inner rotation
      innerMesh.rotation.x = -t * 0.15
      innerMesh.rotation.z = t * 0.18

      // Outer rotation
      outerMesh.rotation.x = t * 0.2
      outerMesh.rotation.y = t * 0.28

      // Orbit rings
      orbits.forEach(({ mesh, speed }) => {
        mesh.rotation.z = t * speed
      })

      // Particles
      particles.rotation.y = t * 0.08
      particles.rotation.x = t * 0.04

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      mount.removeEventListener('mousemove', onMove)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  )
}

