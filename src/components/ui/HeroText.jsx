 import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useSceneStore } from '../../store/useSceneStore'

export default function HeroText() {
  const isLoaded = useSceneStore((s) => s.isLoaded)
  const activeSection = useSceneStore((s) => s.activeSection)

  const containerRef = useRef(null)
  const eyebrowRef = useRef(null)
  const nameRef = useRef(null)
  const taglineRef = useRef(null)
  const bioRef = useRef(null)
  const scrollHintRef = useRef(null)

  // GSAP entrance: fires once when canvas is ready
  useEffect(() => {
    if (!isLoaded) return

    const ctx = gsap.context(() => {
      gsap.set([eyebrowRef.current, nameRef.current, taglineRef.current, bioRef.current, scrollHintRef.current], {
        opacity: 0,
        y: 30,
      })

      gsap.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.2 })
      gsap.to(nameRef.current,    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.45 })
      gsap.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.65 })
      gsap.to(bioRef.current,     { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.80 })
      gsap.to(scrollHintRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 1.0 })
    }, containerRef)

    return () => ctx.revert()
  }, [isLoaded])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
      style={{
        opacity: activeSection === 0 ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      <p
        ref={eyebrowRef}
        className="text-xs sm:text-sm font-medium tracking-[0.25em] uppercase mb-4"
        style={{ color: '#4FC3F7', opacity: 0 }}
      >
        Welcome to my universe
      </p>

      <h1
        ref={nameRef}
        className="text-6xl sm:text-7xl md:text-8xl font-bold text-white text-center leading-none tracking-tight mb-4"
        style={{ opacity: 0 }}
      >
        Anisha
      </h1>

      <p
        ref={taglineRef}
        className="text-base sm:text-lg md:text-xl text-gray-400 font-light text-center mb-3"
        style={{ opacity: 0 }}
      >
        AI/ML &amp; Full Stack Developer
      </p>

      <p
        ref={bioRef}
        className="text-sm text-gray-500 font-light text-center tracking-wide"
        style={{ opacity: 0 }}
      >
        B.Tech CSE (AIML) &middot; CVRGU &middot; Building things that think
      </p>

      <div
        ref={scrollHintRef}
        className="absolute bottom-10 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll to explore</span>
        <span className="text-neon-blue text-lg" style={{ animation: 'bounce 1.8s ease-in-out infinite' }}>
          ↓
        </span>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
      `}</style>
    </div>
  )
}