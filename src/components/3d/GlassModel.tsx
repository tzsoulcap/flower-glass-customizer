'use client'

import * as THREE from 'three'
import React, { useMemo } from 'react'
import { GlassType, GlassColor } from '@/lib/types'
import { GLASS_COLORS, GLASS_PROFILES } from '@/lib/constants'

interface GlassModelProps {
  type: GlassType
  color: GlassColor
}

export default function GlassModel({ type, color }: GlassModelProps) {
  const points = useMemo(() => {
    const profile = GLASS_PROFILES[type] || GLASS_PROFILES['vase-round']
    return profile.map(p => new THREE.Vector2(p.x, p.y))
  }, [type])

  const colorInfo = useMemo(() => {
    return GLASS_COLORS[color] || GLASS_COLORS.clear
  }, [color])

  return (
    <group>
      {/* Main Glass Body */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[points, 64]} />
        <meshPhysicalMaterial
          color={colorInfo.hex}
          roughness={0.05}
          metalness={0.1}
          transmission={0.9}
          thickness={0.15}
          envMapIntensity={1.5}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          ior={1.52}
          transparent
          opacity={colorInfo.opacity}
          side={THREE.DoubleSide}
          depthWrite={true}
        />
      </mesh>

      {/* Glass Base (Solid bottom for realism) */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[points[1]?.x || 0.15, 32]} />
        <meshPhysicalMaterial
          color={colorInfo.hex}
          roughness={0.05}
          transmission={0.9}
          thickness={0.3}
          transparent
          opacity={colorInfo.opacity + 0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}
