import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import { useSceneStore } from '../../store/useSceneStore'
import ParticleField from './ParticleField'
import Lights from './Lights'
import CameraRig from './CameraRig'
import HeroScene from './HeroScene'

export default function SceneCanvas() {
  const setLoaded = useSceneStore((s) => s.setLoaded)

  return (
    <Canvas
      shadows
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 200 }}
      dpr={[1, 2]}
      onCreated={() => setLoaded(true)}
      style={{ background: '#050510' }}
    >
      <AdaptiveDpr pixelated />
      <Suspense fallback={null}>
        <CameraRig />
        <Lights />
        <ParticleField />

        {/* HeroScene at z=0 — camera starts at z=8 looking at it */}
        <HeroScene />
      </Suspense>
    </Canvas>
  )
}