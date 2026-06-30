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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-700 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
      style={{
        background:
          'radial-gradient(ellipse 80% 80% at 50% 50%, #2a1454 0%, #0b0620 60%, #060313 100%)',
      }}
    >
      <div
        className="w-16 h-16 rounded-full animate-spin mb-6"
        style={{
          border: '2px solid transparent',
          borderTopColor: '#F472B6',
          borderRightColor: '#22D3EE',
          borderBottomColor: '#FBBF24',
        }}
      />
      <p className="text-sm tracking-widest uppercase" style={{ color: '#e9d5ff' }}>
        Initializing Galaxy
      </p>
    </div>
  )
}