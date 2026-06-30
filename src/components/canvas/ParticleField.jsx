import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSceneStore } from '../../store/useSceneStore'
import * as THREE from 'three'

// Galaxy palette: cyan, violet, pink, gold, indigo — gives the
// starfield a vibrant nebula feel instead of a flat single color
const PALETTE = [
  new THREE.Color('#22D3EE'),
  new THREE.Color('#C084FC'),
  new THREE.Color('#F472B6'),
  new THREE.Color('#FBBF24'),
  new THREE.Color('#818CF8'),
]

export default function ParticleField() {
  const pointsRef = useRef()
  const mouse = useSceneStore((s) => s.mouse)

  const { positions, colors, count } = useMemo(() => {
    const count = 2400
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200

      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    return { positions, colors, count }
  }, [])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.02
    pointsRef.current.rotation.x = mouse.y * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        sizeAttenuation={true}
        transparent={true}
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
