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
      <ambientLight intensity={0.15} color="#1a1a2e" />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        color="#ffffff"
        castShadow
      />
      <pointLight
        ref={movingLightRef}
        position={[0, 0, 5]}
        intensity={3}
        color="#4FC3F7"
        distance={30}
        decay={2}
      />
      <pointLight
        position={[-8, 4, -10]}
        intensity={2}
        color="#B39DDB"
        distance={40}
        decay={2}
      />
    </>
  )
}