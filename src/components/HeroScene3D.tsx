import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function HeroScene3D() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ── Renderer ─────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── Scene & Camera ────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 6)

    // ── Lights ────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.08))
    const keyLight = new THREE.PointLight(0x00e5ff, 1.2)
    keyLight.position.set(4, 4, 4)
    scene.add(keyLight)
    const fillLight = new THREE.PointLight(0x7b2fff, 0.8)
    fillLight.position.set(-4, -2, 2)
    scene.add(fillLight)
    const rimLight = new THREE.PointLight(0x00e5ff, 0.4)
    rimLight.position.set(0, -4, -4)
    scene.add(rimLight)

    // ── Stars ─────────────────────────────────────────────────
    const starGeo = new THREE.BufferGeometry()
    const starPositions = new Float32Array(600 * 3)
    for (let i = 0; i < 600 * 3; i++) starPositions[i] = (Math.random() - 0.5) * 40
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.04, transparent: true, opacity: 0.5 })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    // ── Core Icosahedron (wireframe) ──────────────────────────
    const icoGeo = new THREE.IcosahedronGeometry(1.4, 1)
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 0.25,
      wireframe: true, transparent: true, opacity: 0.55,
    })
    const icosahedron = new THREE.Mesh(icoGeo, icoMat)
    scene.add(icosahedron)

    // ── TorusKnot (deep background) ───────────────────────────
    const knotGeo = new THREE.TorusKnotGeometry(0.9, 0.06, 200, 20)
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x7b2fff, emissive: 0x7b2fff, emissiveIntensity: 0.35,
      wireframe: true, transparent: true, opacity: 0.3,
    })
    const knot = new THREE.Mesh(knotGeo, knotMat)
    knot.position.z = -1
    scene.add(knot)

    // ── Inner glow sphere ─────────────────────────────────────
    const sphereGeo = new THREE.SphereGeometry(1.0, 32, 32)
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x7b2fff, emissive: 0x7b2fff, emissiveIntensity: 0.15,
      transparent: true, opacity: 0.10,
    })
    const sphere = new THREE.Mesh(sphereGeo, sphereMat)
    sphere.position.z = -0.5
    scene.add(sphere)

    // ── Orbit rings ───────────────────────────────────────────
    const rings: { mesh: THREE.Mesh; speed: number; tiltX: number }[] = [
      { speed: 0.22, tiltX: 0.4 },
      { speed: -0.15, tiltX: 1.2 },
      { speed: 0.35, tiltX: 0.9 },
    ].map(({ speed, tiltX }, i) => {
      const color = i % 2 === 0 ? 0x00e5ff : 0x7b2fff
      const mat = new THREE.MeshStandardMaterial({
        color, emissive: color, emissiveIntensity: 0.6, transparent: true, opacity: 0.65,
      })
      const geo = new THREE.TorusGeometry(2.1 + i * 0.4, 0.015, 16, 100)
      const mesh = new THREE.Mesh(geo, mat)
      mesh.rotation.x = tiltX
      scene.add(mesh)
      return { mesh, speed, tiltX }
    })

    // ── Satellite orbs ────────────────────────────────────────
    const satellites: { mesh: THREE.Mesh; offset: number; orbitR: number; speed: number; yAmp: number }[] = []
    for (let i = 0; i < 8; i++) {
      const color = i % 2 === 0 ? 0x00e5ff : 0x7b2fff
      const mat = new THREE.MeshStandardMaterial({
        color, emissive: color, emissiveIntensity: 0.9, transparent: true, opacity: 0.8,
      })
      const geo = new THREE.OctahedronGeometry(0.06 + (i % 3) * 0.03, 0)
      const mesh = new THREE.Mesh(geo, mat)
      scene.add(mesh)
      satellites.push({
        mesh,
        offset: (i / 8) * Math.PI * 2,
        orbitR: 2.4 + (i % 3) * 0.5,
        speed: 0.3 + i * 0.04,
        yAmp: 0.5 + i * 0.1,
      })
    }

    // ── Resize handler ────────────────────────────────────────
    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(mount)

    // ── Animation loop ────────────────────────────────────────
    let animId = 0
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      icosahedron.rotation.x = t * 0.18
      icosahedron.rotation.y = t * 0.25

      knot.rotation.x = t * 0.07
      knot.rotation.y = t * 0.11
      knot.rotation.z = t * 0.05

      sphere.rotation.y = t * 0.1

      stars.rotation.y = t * 0.02

      rings.forEach(({ mesh, speed }) => {
        mesh.rotation.z = t * speed
      })

      satellites.forEach(({ mesh, offset, orbitR, speed, yAmp }) => {
        mesh.position.x = Math.cos(t * speed + offset) * orbitR
        mesh.position.z = Math.sin(t * speed + offset) * orbitR
        mesh.position.y = Math.sin(t * 0.7 + offset) * yAmp
        mesh.rotation.x += 0.02
        mesh.rotation.y += 0.015
      })

      renderer.render(scene, camera)
    }
    animate()

    // ── Cleanup ───────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId)
      resizeObserver.disconnect()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-[1]"
      aria-hidden
    />
  )
}

