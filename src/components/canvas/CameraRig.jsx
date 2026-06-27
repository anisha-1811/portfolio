import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useSceneStore } from '../../store/useSceneStore'
import gsap from 'gsap'

const SECTION_Z = [8, -12, -32, -52]

export default function CameraRig() {
  const { camera } = useThree()
  const mouse = useSceneStore((s) => s.mouse)
  const activeSection = useSceneStore((s) => s.activeSection)
  const targetZ = useRef(8)

  useEffect(() => {
    const zPos = SECTION_Z[activeSection] ?? SECTION_Z[0]
    gsap.to(targetZ, {
      current: zPos,
      duration: 1.8,
      ease: 'power3.inOut',
    })
  }, [activeSection])

  useFrame(() => {
    camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.03
    camera.position.y += (mouse.y * 1.0 - camera.position.y) * 0.03
    camera.position.z += (targetZ.current - camera.position.z) * 0.05
    camera.lookAt(0, 0, camera.position.z - 5)
  })

  return null
}