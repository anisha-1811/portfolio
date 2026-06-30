import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, OrbitControls } from '@react-three/drei'
import { useSceneStore } from '../../store/useSceneStore'

export default function HeroScene() {
  const meshRef = useRef()
  const activeSection = useSceneStore((s) => s.activeSection)

  // Slowly rotate the blob on its own axis every frame
  // WHY: Float wrapper gives it bobbing motion, but we add
  // a slow self-rotation so it never looks static
  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.15
    meshRef.current.rotation.z += delta * 0.05
  })

  // WHY: Hide this scene when user scrolls away from section 0
  // Keeping it rendered but invisible is cheaper than unmounting/remounting
  if (activeSection !== 0) return null

  return (
    <group position={[0, 0, 0]}>
      {/* Float: gives the whole group a gentle bobbing/floating animation
          speed=2: how fast it bobs
          rotationIntensity=0.4: slight random rotation added on top
          floatIntensity=0.8: how much vertical travel */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>

        {/* The main blob */}
        <mesh ref={meshRef} castShadow>
          {/* IcosahedronGeometry: radius=2, detail=4
              detail=4 means it's subdivided 4 times = very smooth sphere-like shape
              More detail = smoother distortion but heavier on GPU */}
          <icosahedronGeometry args={[2, 4]} />

          {/* MeshDistortMaterial: a Drei special material that warps the mesh
              distort=0.4: how much it deforms (0=none, 1=extreme)
              speed=2: how fast the distortion animates
              metalness=0.8: very reflective, like polished metal
              roughness=0.1: very smooth surface */}
          <MeshDistortMaterial
            color="#C084FC"
            metalness={0.7}
            roughness={0.15}
            distort={0.4}
            speed={2}
            envMapIntensity={1}
          />
        </mesh>

        {/* The ring around the blob
            TorusGeometry args: [radius, tube, radialSegments, tubularSegments]
            radius=3.2 puts it just outside the blob (which has radius 2)
            tube=0.04 = very thin ring
            rotation tilts it to look like Saturn's rings */}
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[3.2, 0.04, 16, 100]} />
          <meshStandardMaterial
            color="#F472B6"
            emissive="#F472B6"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Second thinner outer ring for depth */}
        <mesh rotation={[Math.PI / 2.5, 0.3, 0]}>
          <torusGeometry args={[3.8, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#FBBF24"
            emissive="#FBBF24"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </Float>
    </group>
  )
}