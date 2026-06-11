'use client'

import React, { useMemo } from 'react'
import * as THREE from 'three'
import { RIBBON_OPTIONS } from '@/lib/constants'

interface RibbonModelProps {
  ribbonId: string | null
  glassType: string
}

export default function RibbonModel({ ribbonId, glassType }: RibbonModelProps) {
  const ribbonInfo = useMemo(() => {
    if (!ribbonId || ribbonId === 'none') return null
    return RIBBON_OPTIONS.find((r) => r.id === ribbonId) || null
  }, [ribbonId])

  const { y, r } = useMemo(() => {
    switch (glassType) {
      case 'vase-tall':
        return { y: 2.8, r: 0.36 }
      case 'vase-wide':
        return { y: 1.15, r: 0.72 }
      case 'wine-glass':
        return { y: 0.5, r: 0.14 }
      case 'bottle-vase':
        return { y: 2.3, r: 0.27 }
      case 'vase-round':
      default:
        return { y: 1.75, r: 0.48 }
    }
  }, [glassType])

  if (!ribbonInfo) return null

  const isLace = ribbonInfo.id === 'white-lace'

  return (
    <group position={[0, y, 0]}>
      {/* Ribbon Loop/Ring around the neck */}
      <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[r, 0.025, 8, 32]} />
        <meshStandardMaterial
          color={ribbonInfo.color}
          roughness={isLace ? 0.9 : 0.4}
          metalness={isLace ? 0.0 : 0.25}
          transparent={isLace}
          opacity={isLace ? 0.8 : 1.0}
        />
      </mesh>

      {/* Ribbon Bow Center */}
      <mesh castShadow position={[0, 0, r + 0.015]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial
          color={ribbonInfo.color}
          roughness={isLace ? 0.9 : 0.4}
          metalness={isLace ? 0.0 : 0.2}
        />
      </mesh>

      {/* Bow Loop Left */}
      <mesh
        castShadow
        position={[-0.07, 0.02, r + 0.02]}
        rotation={[0.2, -0.4, 0.3]}
        scale={[1, 0.6, 0.3]}
      >
        <torusGeometry args={[0.06, 0.015, 8, 24]} />
        <meshStandardMaterial
          color={ribbonInfo.color}
          roughness={isLace ? 0.9 : 0.4}
        />
      </mesh>

      {/* Bow Loop Right */}
      <mesh
        castShadow
        position={[0.07, 0.02, r + 0.02]}
        rotation={[-0.2, 0.4, -0.3]}
        scale={[1, 0.6, 0.3]}
      >
        <torusGeometry args={[0.06, 0.015, 8, 24]} />
        <meshStandardMaterial
          color={ribbonInfo.color}
          roughness={isLace ? 0.9 : 0.4}
        />
      </mesh>

      {/* Hanging Tails Left */}
      <mesh
        castShadow
        position={[-0.04, -0.1, r + 0.02]}
        rotation={[0.3, 0.1, -0.4]}
      >
        <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
        <meshStandardMaterial
          color={ribbonInfo.color}
          roughness={isLace ? 0.9 : 0.4}
        />
      </mesh>

      {/* Hanging Tails Right */}
      <mesh
        castShadow
        position={[0.04, -0.1, r + 0.02]}
        rotation={[0.3, -0.1, 0.4]}
      >
        <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
        <meshStandardMaterial
          color={ribbonInfo.color}
          roughness={isLace ? 0.9 : 0.4}
        />
      </mesh>
    </group>
  )
}
