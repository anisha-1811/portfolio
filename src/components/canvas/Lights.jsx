import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSceneStore } from '../../store/useSceneStore'

export default function Lights() {
  const movingLightRef = useRef()
  const mouse = useSceneStore((s) => s.mouse)

  useFrame(() => {
    if (!movingLightRef.current) return
    movingLightRef.current.position.x +=
      (mouse.x * 15 - movingLightRef.current.position.x) * 0.05
    movingLightRef.current.position.y +=
      (mouse.y * 10 - movingLightRef.current.position.y) * 0.05
  })

  return (
    <>
      <ambientLight intensity={0.22} color="#2e1a4e" />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        color="#ffffff"
        castShadow
      />
      <pointLight
        ref={movingLightRef}
        position={[0, 0, 5]}
        intensity={3.5}
        color="#22D3EE"
        distance={30}
        decay={2}
      />
      <pointLight
        position={[-8, 4, -10]}
        intensity={2.2}
        color="#C084FC"
        distance={40}
        decay={2}
      />
      <pointLight
        position={[8, -4, -25]}
        intensity={2}
        color="#F472B6"
        distance={45}
        decay={2}
      />
      <pointLight
        position={[-6, -6, -45]}
        intensity={1.6}
        color="#FBBF24"
        distance={40}
        decay={2}
      />
    </>
  )
}