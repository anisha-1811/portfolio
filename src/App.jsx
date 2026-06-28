import { useEffect } from 'react'
import { useSceneStore } from './store/useSceneStore'
import SceneCanvas from './components/canvas/SceneCanvas'
import LoadingScreen from './components/ui/LoadingScreen'
import HeroText from './components/ui/HeroText'
import './index.css'

export default function App() {
  const { isLoaded, setMouse, setActiveSection } = useSceneStore()

  useEffect(() => {
    const handleMouse = (e) => {
      setMouse(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      )
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [setMouse])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const h = window.innerHeight
      const section = Math.floor(scrollY / h)
      setActiveSection(Math.min(section, 3))
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setActiveSection])

  return (
    <div className="relative w-full">
      {!isLoaded && <LoadingScreen />}

      {/* Fixed 3D canvas — always behind everything */}
      <div className="fixed inset-0 z-0">
        <SceneCanvas />
      </div>

      {/* HTML UI overlays */}
      <HeroText />

      <div className="scroll-container relative z-10">
        <section className="h-screen" />
        <section className="h-screen" />
        <section className="h-screen" />
        <section className="h-screen" />
      </div>
    </div>
  )
}