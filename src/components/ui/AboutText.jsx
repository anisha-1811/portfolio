import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useSceneStore } from '../../store/useSceneStore'

const SKILLS = ['React.js', 'Node.js', 'Python', 'MySQL', 'Firebase', 'Scikit-learn']

export default function AboutText() {
  const activeSection = useSceneStore((s) => s.activeSection)
  const cardRef = useRef(null)
  const wasVisible = useRef(false)

  useEffect(() => {
    if (!cardRef.current) return
    const isVisible = activeSection === 1

    if (isVisible && !wasVisible.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }
      )
      wasVisible.current = true
    } else if (!isVisible && wasVisible.current) {
      gsap.to(cardRef.current, { opacity: 0, y: -16, duration: 0.4, ease: 'power2.in' })
      wasVisible.current = false
    }
  }, [activeSection])

  const isVisible = activeSection === 1

  return (
    <>
      <style>{`
        .about-overlay {
          position: fixed;
          inset: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: clamp(1.5rem, 6vw, 5rem);
          pointer-events: none;
        }
        .about-card {
          pointer-events: auto;
          width: clamp(280px, 40vw, 420px);
          background: rgba(20, 10, 40, 0.65);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(192, 132, 252, 0.28);
          border-radius: 1.25rem;
          padding: clamp(1.5rem, 3vw, 2.25rem);
          opacity: 0;
        }
        .about-section-label {
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #F472B6;
          margin-bottom: 0.75rem;
        }
        .about-heading {
          font-size: clamp(1.6rem, 3.5vw, 2.1rem);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.15;
          margin-bottom: 1rem;
        }
        .about-divider {
          width: 2.5rem;
          height: 2px;
          background: linear-gradient(90deg, #22D3EE, #F472B6, transparent);
          margin-bottom: 1rem;
        }
        .about-bio {
          font-size: 0.9rem;
          color: #d8c9f0;
          font-weight: 300;
          line-height: 1.7;
          margin-bottom: 1rem;
        }
        .about-meta {
          font-size: 0.78rem;
          color: #b5a0d9;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        .about-meta span {
          color: #FBBF24;
          font-weight: 500;
        }
        .skills-label {
          font-size: 0.68rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #a78bfa;
          margin-bottom: 0.6rem;
        }
        .skills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .skill-pill {
          font-size: 0.72rem;
          padding: 0.25rem 0.7rem;
          border-radius: 999px;
          background: rgba(192, 132, 252, 0.12);
          border: 1px solid rgba(244, 114, 182, 0.35);
          color: #f3e8ff;
          font-weight: 500;
          transition: background 0.2s, border-color 0.2s;
        }
        .skill-pill:hover {
          background: rgba(192, 132, 252, 0.25);
          border-color: rgba(244, 114, 182, 0.6);
        }
        @media (max-width: 767px) {
          .about-overlay {
            align-items: flex-end;
            justify-content: center;
            padding-right: 1rem;
            padding-left: 1rem;
            padding-bottom: 2rem;
          }
          .about-card { width: 100%; }
        }
      `}</style>

      <div
        className="about-overlay"
        style={{ visibility: isVisible || wasVisible.current ? 'visible' : 'hidden' }}
      >
        <div ref={cardRef} className="about-card">
          <p className="about-section-label">About me</p>
          <h2 className="about-heading">Building things<br />that think</h2>
          <div className="about-divider" />
          <p className="about-bio">
            I'm a B.Tech CSE (AI&ML) student at C.V. Raman Global University,
            passionate about bridging machine learning research and production-ready
            full-stack systems. I love building end-to-end products — from training
            classifiers to deploying them with polished UIs.
          </p>
          <div className="about-meta">
            <div><span>Education:</span> B.Tech AIML · CVRGU, Bhubaneswar · SGPA 9.70/10</div>
            <div style={{ marginTop: '0.35rem' }}><span>Experience:</span> Web Dev Intern · Tata Steel Ltd · Apr–May 2026</div>
            <div style={{ marginTop: '0.35rem' }}><span>Community:</span> Competitive Coding Co-Lead · GDG CVRGU</div>
          </div>
          <p className="skills-label">Top skills</p>
          <div className="skills-row">
            {SKILLS.map((skill) => (
              <span key={skill} className="skill-pill">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}