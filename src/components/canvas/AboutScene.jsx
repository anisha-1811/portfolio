import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useSceneStore } from '../../store/useSceneStore'

function useSafeTexture(path) {
  const fallbackURL = (() => {
    const canvas = document.createElement('canvas')
    canvas.width = 600
    canvas.height = 800
    const ctx = canvas.getContext('2d')
    const grad = ctx.createLinearGradient(0, 0, 0, 800)
    grad.addColorStop(0, '#1a1a3e')
    grad.addColorStop(1, '#0d0d1f')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 600, 800)
    ctx.fillStyle = '#4FC3F7'
    ctx.font = 'bold 28px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Drop about.jpg here', 300, 380)
    ctx.font = '18px Inter, sans-serif'
    ctx.fillStyle = '#6b7280'
    ctx.fillText('/public/photos/about.jpg', 300, 420)
    return canvas.toDataURL()
  })()

  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTexture(path)
  } catch {
    const tex = new THREE.TextureLoader().load(fallbackURL)
    return tex
  }
}

function FloatingAccent({ position, color, speed = 0.4, phase = 0 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.x = t * speed + phase
    ref.current.rotation.y = t * speed * 0.7 + phase
    ref.current.position.y = position[1] + Math.sin(t * 0.8 + phase) * 0.15
  })
  return (
    <mesh ref={ref} position={position} scale={0.18}>
      <octahedronGeometry args={[1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        metalness={0.6}
        roughness={0.2}
      />
    </mesh>
  )
}

function TorusKnotAccent() {
  const ref = useRef()
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.18
    ref.current.rotation.y += delta * 0.12
  })
  return (
    <mesh ref={ref} position={[-3.5, 0.5, -2]} scale={0.38}>
      <torusKnotGeometry args={[1, 0.35, 100, 16]} />
      <meshStandardMaterial
        color="#B39DDB"
        emissive="#7C3AED"
        emissiveIntensity={0.3}
        metalness={0.7}
        roughness={0.2}
      />
    </mesh>
  )
}

export default function AboutScene() {
  const activeSection = useSceneStore((s) => s.activeSection)
  const texture = useSafeTexture('/photos/about.jpg')
  const reflectionRef = useRef()

  useFrame(({ clock }) => {
    if (!reflectionRef.current) return
    reflectionRef.current.material.opacity =
      0.12 + Math.sin(clock.getElapsedTime() * 0.5) * 0.04
  })

  if (activeSection !== 1) return null

  return (
    <group position={[1.5, 0, -20]}>
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.6}>
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[3.3, 4.3]} />
          <meshStandardMaterial color="#0a0a1a" metalness={0.3} roughness={0.8} />
        </mesh>

        <mesh position={[0, 0, -0.03]}>
          <planeGeometry args={[3.22, 4.22]} />
          <meshStandardMaterial
            color="#4FC3F7"
            emissive="#4FC3F7"
            emissiveIntensity={0.15}
            metalness={0.5}
            roughness={0.5}
          />
        </mesh>

        <mesh rotation={[0, Math.PI / 10, 0]} castShadow>
          <planeGeometry args={[3, 4]} />
          <meshStandardMaterial map={texture} metalness={0.2} roughness={0.3} />
        </mesh>

        <mesh
          ref={reflectionRef}
          position={[0, -4.2, 0]}
          rotation={[Math.PI, 0, 0]}
          scale={[1, 0.4, 1]}
        >
          <planeGeometry args={[3, 4]} />
          <meshStandardMaterial
            map={texture}
            transparent
            opacity={0.12}
            metalness={0}
            roughness={1}
          />
        </mesh>
      </Float>

      {/* Day 8: subtle grid floor — gives the scene a sense of ground plane */}
      <gridHelper
        args={[20, 20, '#1a3a52', '#0d1825']}
        position={[0, -5.2, 0]}
      />

      <TorusKnotAccent />
      <FloatingAccent position={[2.8,  1.8,  0]}  color="#4FC3F7" speed={0.35} phase={0} />
      <FloatingAccent position={[-2.2, 2.2, -1]}  color="#B39DDB" speed={0.28} phase={1.2} />
      <FloatingAccent position={[2.5, -2.0,  0.5]} color="#7C3AED" speed={0.42} phase={2.4} />

      <pointLight position={[3, 3, 2]}   color="#4FC3F7" intensity={1.5} distance={12} />
      <pointLight position={[-4, -2, -3]} color="#7C3AED" intensity={1.2} distance={10} />
    </group>
  )
}