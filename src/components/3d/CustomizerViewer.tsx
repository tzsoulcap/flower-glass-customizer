'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { CustomizationConfig } from '@/lib/types'
import { FLOWER_POSITIONS } from '@/lib/constants'
import GlassModel from './GlassModel'
import FlowerModel from './FlowerModel'
import RibbonModel from './RibbonModel'

interface CustomizerViewerProps {
  config: CustomizationConfig
}

// Glowing fairy-dust/sparkle particles for extra premium feel
function Sparkles({ count = 25 }) {
  const points = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 1.2
      const y = Math.random() * 2.5 + 0.2
      const z = (Math.random() - 0.5) * 1.2
      const speed = 0.2 + Math.random() * 0.5
      const phase = Math.random() * Math.PI * 2
      temp.push({ x, y, z, speed, phase, baseOffset: y })
    }
    return temp
  }, [count])

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = particles[i].x
      pos[i * 3 + 1] = particles[i].y
      pos[i * 3 + 2] = particles[i].z
      sz[i] = 0.01 + Math.random() * 0.02
    }
    return [pos, sz]
  }, [particles, count])

  useFrame((state) => {
    if (!points.current) return
    const time = state.clock.getElapsedTime()
    const posAttr = points.current.geometry.attributes.position as THREE.BufferAttribute
    
    for (let i = 0; i < count; i++) {
      const p = particles[i]
      // Drift up and sway side-to-side
      const currentY = p.baseOffset + Math.sin(time * p.speed + p.phase) * 0.15
      const currentX = p.x + Math.sin(time * p.speed * 0.5 + p.phase) * 0.05
      
      posAttr.setX(i, currentX)
      posAttr.setY(i, currentY)
      posAttr.needsUpdate = true
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffeaa7"
        size={0.06}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function Scene({ config }: CustomizerViewerProps) {
  // Render all active flowers based on config
  const activeFlowers = useMemo(() => {
    return config.flowers.map((f) => {
      const pos = FLOWER_POSITIONS[f.position % FLOWER_POSITIONS.length]
      return {
        ...f,
        x: pos.x,
        z: pos.z,
        yBase: pos.yBase,
      }
    })
  }, [config.flowers])

  // Height of the pedestal is slightly below ground level
  return (
    <group position={[0, -1.0, 0]}>
      {/* Studio Lighting */}
      <ambientLight intensity={0.6} />
      
      {/* Key Light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      
      {/* Soft Fill Light */}
      <directionalLight position={[-5, 4, -5]} intensity={0.4} />
      
      {/* Rim light for glass highlight */}
      <pointLight position={[0, 4, -3]} intensity={1.5} color="#e0f2fe" />

      {/* Decorative Pedestal */}
      <mesh position={[0, -0.05, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.2, 1.3, 0.1, 32]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      {/* Inner Pedestal Surface */}
      <mesh position={[0, 0.005, 0]} receiveShadow>
        <cylinderGeometry args={[1.15, 1.15, 0.01, 32]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* 3D Glass Model */}
      <GlassModel type={config.glass} color={config.glassColor} />

      {/* 3D Ribbon Model */}
      <RibbonModel ribbonId={config.ribbon} glassType={config.glass} />

      {/* Flowers inside the Glass */}
      {activeFlowers.map((f, idx) => (
        <FlowerModel
          key={`flower-${idx}`}
          type={f.type}
          color={f.color}
          positionIndex={f.position}
          yBase={f.yBase}
          xOffset={f.x}
          zOffset={f.z}
        />
      ))}

      {/* Floating Fairy Dust Sparkles */}
      <Sparkles count={30} />

      {/* Soft Contact Shadows on Floor */}
      <ContactShadows
        position={[0, -0.06, 0]}
        opacity={0.6}
        scale={3}
        blur={1.8}
        far={1}
      />
    </group>
  )
}

export default function CustomizerViewer({ config }: CustomizerViewerProps) {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 shadow-2xl">
      {/* Badge / UI indicator */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur border border-slate-800">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-medium text-slate-300">3D Interactive Preview</span>
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 1.2, 3.8], fov: 45 }}
        gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
      >
        <color attach="background" args={['#0b1329']} />
        
        {/* Fog for soft depth */}
        <fog attach="fog" args={['#0b1329', 4, 8]} />
        
        <Scene config={config} />
        
        {/* Orbit Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={1.8}
          maxDistance={6.0}
          maxPolarAngle={Math.PI / 2 + 0.05} // don't go below pedestal
          minPolarAngle={0.1}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Interaction tip overlay */}
      <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-full bg-slate-950/60 backdrop-blur border border-slate-800 text-[10px] text-slate-400 pointer-events-none select-none">
        🖱️ Drag to rotate | Scroll to zoom
      </div>
    </div>
  )
}
