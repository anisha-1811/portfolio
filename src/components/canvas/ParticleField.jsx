import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSceneStore } from '../../store/useSceneStore'
import * as THREE from 'three'

export default function ParticleField() {
  const pointsRef = useRef()
  const mouse = useSceneStore((s) => s.mouse)

  const { positions, count } = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 200
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200
    }

    return { positions, count }
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
      </bufferGeometry>
      <pointsMaterial
        color="#4FC3F7"
        size={0.08}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
      />
    </points>
  )
}