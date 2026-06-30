import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import { useSceneStore } from '../../store/useSceneStore'
import ParticleField from './ParticleField'
import Lights from './Lights'
import CameraRig from './CameraRig'
import HeroScene from './HeroScene'
import AboutScene from './AboutScene'

export default function SceneCanvas() {
  const setLoaded = useSceneStore((s) => s.setLoaded)

  const handleCreated = ({ camera }) => {
    const isMobile = window.innerWidth < 768
    camera.fov = isMobile ? 80 : 60
    camera.updateProjectionMatrix()
    setLoaded(true)
  }

  return (
    <Canvas
      shadows
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 200 }}
      dpr={[1, 2]}
      onCreated={handleCreated}
      style={{ background: 'transparent' }}
    >
      <AdaptiveDpr pixelated />
      <Suspense fallback={null}>
        <CameraRig />
        <Lights />
        <ParticleField />
        <HeroScene />
        <AboutScene />
      </Suspense>
    </Canvas>
  )
}