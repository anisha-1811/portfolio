import { useEffect } from 'react'
import { useSceneStore } from './store/useSceneStore'
import SceneCanvas from './components/canvas/SceneCanvas'
import LoadingScreen from './components/ui/LoadingScreen'
import HeroText from './components/ui/HeroText'
import AboutText from './components/ui/AboutText'
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
      const section = Math.floor(window.scrollY / window.innerHeight)
      setActiveSection(Math.min(section, 3))
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setActiveSection])

  return (
    <>
      {!isLoaded && <LoadingScreen />}

      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <SceneCanvas />
      </div>

      <HeroText />
      <AboutText />

      <div style={{ height: '400vh', position: 'relative', zIndex: 1, pointerEvents: 'none' }} />
    </>
  )
}