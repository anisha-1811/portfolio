import { useEffect, useState } from 'react'
import { useSceneStore } from '../../store/useSceneStore'

export default function LoadingScreen() {
  const isLoaded = useSceneStore((s) => s.isLoaded)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => setVisible(false), 800)
    }
  }, [isLoaded])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#050510] flex flex-col items-center justify-center transition-opacity duration-700 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="w-16 h-16 border-2 border-neon-blue border-t-transparent rounded-full animate-spin mb-6" />
      <p className="text-neon-blue text-sm tracking-widest uppercase">Initializing Space</p>
    </div>
  )
}