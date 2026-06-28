import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useSceneStore } from '../../store/useSceneStore'

export default function HeroText() {
  const isLoaded = useSceneStore((s) => s.isLoaded)
  const activeSection = useSceneStore((s) => s.activeSection)

  const eyebrowRef = useRef(null)
  const nameRef = useRef(null)
  const taglineRef = useRef(null)
  const bioRef = useRef(null)
  const scrollHintRef = useRef(null)

  // GSAP entrance once on load
  useEffect(() => {
    if (!isLoaded) return
    const els = [eyebrowRef.current, nameRef.current, taglineRef.current, bioRef.current, scrollHintRef.current]
    gsap.set(els, { opacity: 0, y: 30 })
    gsap.to(eyebrowRef.current,    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.2 })
    gsap.to(nameRef.current,       { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.45 })
    gsap.to(taglineRef.current,    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.65 })
    gsap.to(bioRef.current,        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.80 })
    gsap.to(scrollHintRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 1.0 })
  }, [isLoaded])

  return (
    <>
      <style>{`
        .hero-overlay {
          position: fixed;
          inset: 0;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          transition: opacity 0.6s ease;
        }
        .hero-overlay.hidden {
          opacity: 0 !important;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
      `}</style>

      <div className={`hero-overlay ${activeSection !== 0 ? 'hidden' : ''}`}>
        <p
          ref={eyebrowRef}
          style={{ color: '#4FC3F7', letterSpacing: '0.25em', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '1rem', opacity: 0 }}
        >
          Welcome to my universe
        </p>

        <h1
          ref={nameRef}
          style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', fontWeight: 700, color: 'white', textAlign: 'center', lineHeight: 1, marginBottom: '1rem', opacity: 0 }}
        >
          Anisha
        </h1>

        <p
          ref={taglineRef}
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: '#9ca3af', fontWeight: 300, textAlign: 'center', marginBottom: '0.75rem', opacity: 0 }}
        >
          AI/ML &amp; Full Stack Developer
        </p>

        <p
          ref={bioRef}
          style={{ fontSize: '0.875rem', color: '#6b7280', textAlign: 'center', letterSpacing: '0.05em', opacity: 0 }}
        >
          B.Tech CSE (AIML) · CVRGU · Building things that think
        </p>

        <div
          ref={scrollHintRef}
          style={{ position: 'absolute', bottom: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: 0 }}
        >
          <span style={{ fontSize: '0.7rem', color: '#6b7280', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll to explore</span>
          <span style={{ color: '#4FC3F7', fontSize: '1.2rem', animation: 'bounce 1.8s ease-in-out infinite' }}>↓</span>
        </div>
      </div>
    </>
  )
}