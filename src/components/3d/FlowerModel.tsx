'use client'

import React, { useMemo } from 'react'
import * as THREE from 'three'
import { FlowerType } from '@/lib/types'

interface FlowerModelProps {
  type: FlowerType
  color: string
  positionIndex: number
  yBase: number
  xOffset: number
  zOffset: number
}

export default function FlowerModel({
  type,
  color,
  positionIndex,
  yBase,
  xOffset,
  zOffset,
}: FlowerModelProps) {
  // Compute slightly randomized tilt/bend for natural organic look
  const { stemRotation, flowerRotation, stemHeight } = useMemo(() => {
    // Height is from near bottom (y=0.1) to yBase
    const height = yBase - 0.1
    
    // Tilt slightly away from center
    const angleX = zOffset * 0.25 + (Math.sin(positionIndex * 1.7) * 0.08)
    const angleZ = -xOffset * 0.25 + (Math.cos(positionIndex * 2.3) * 0.08)
    
    return {
      stemRotation: [angleX, 0, angleZ] as [number, number, number],
      flowerRotation: [angleX * 0.3, positionIndex * 1.5, angleZ * 0.3] as [number, number, number],
      stemHeight: height
    }
  }, [xOffset, zOffset, yBase, positionIndex])

  // Stem material (nice foliage green)
  const stemMaterial = (
    <meshStandardMaterial
      color="#2d6a4f"
      roughness={0.8}
      metalness={0.1}
    />
  )

  // Leaf material
  const leafMaterial = (
    <meshStandardMaterial
      color="#40916c"
      roughness={0.7}
      side={THREE.DoubleSide}
    />
  )

  // Render flower head based on type
  const renderFlowerHead = () => {
    switch (type) {
      case 'rose':
        return (
          <group>
            {/* Core bud */}
            <mesh castShadow>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color={color} roughness={0.6} />
            </mesh>
            {/* Inner petals */}
            {[0, 1, 2, 3, 4].map((i) => (
              <mesh
                key={`inner-${i}`}
                castShadow
                rotation={[
                  0.3 + Math.sin(i * 1.5) * 0.1,
                  (i * Math.PI * 2) / 5,
                  0.2
                ]}
                position={[
                  Math.sin((i * Math.PI * 2) / 5) * 0.03,
                  0.02,
                  Math.cos((i * Math.PI * 2) / 5) * 0.03
                ]}
              >
                <sphereGeometry args={[0.07, 8, 8, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
                <meshStandardMaterial color={color} roughness={0.6} side={THREE.DoubleSide} />
              </mesh>
            ))}
            {/* Outer petals */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <mesh
                key={`outer-${i}`}
                castShadow
                rotation={[
                  0.6 + Math.cos(i * 1.2) * 0.1,
                  (i * Math.PI * 2) / 7,
                  0.4
                ]}
                position={[
                  Math.sin((i * Math.PI * 2) / 7) * 0.06,
                  0.01,
                  Math.cos((i * Math.PI * 2) / 7) * 0.06
                ]}
              >
                <sphereGeometry args={[0.09, 8, 8, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
                <meshStandardMaterial
                  color={color}
                  roughness={0.6}
                  side={THREE.DoubleSide}
                />
              </mesh>
            ))}
          </group>
        )

      case 'daisy':
        return (
          <group>
            {/* Center pistil */}
            <mesh castShadow position={[0, 0.01, 0]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial color="#ffa500" roughness={0.9} />
            </mesh>
            {/* White petals */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
              const angle = (i * Math.PI * 2) / 12
              return (
                <mesh
                  key={`daisy-petal-${i}`}
                  castShadow
                  rotation={[0.1, angle, 0]}
                  position={[Math.sin(angle) * 0.07, 0, Math.cos(angle) * 0.07]}
                >
                  <boxGeometry args={[0.03, 0.008, 0.1]} />
                  <meshStandardMaterial color={color} roughness={0.5} />
                </mesh>
              )
            })}
          </group>
        )

      case 'sunflower':
        return (
          <group scale={[1.4, 1.4, 1.4]}>
            {/* Large dark center */}
            <mesh castShadow position={[0, 0.01, 0]} scale={[1, 0.3, 1]}>
              <cylinderGeometry args={[0.07, 0.06, 0.05, 16]} />
              <meshStandardMaterial color="#3d2314" roughness={0.9} />
            </mesh>
            {/* Yellow outer petals */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => {
              const angle = (i * Math.PI * 2) / 16
              return (
                <mesh
                  key={`sun-petal-${i}`}
                  castShadow
                  rotation={[0.12, angle, 0.05]}
                  position={[Math.sin(angle) * 0.1, 0, Math.cos(angle) * 0.1]}
                >
                  <boxGeometry args={[0.035, 0.006, 0.09]} />
                  <meshStandardMaterial color="#ffd93d" roughness={0.4} />
                </mesh>
              )
            })}
          </group>
        )

      case 'tulip':
        return (
          <group scale={[1.1, 1.2, 1.1]}>
            {/* Cup petals */}
            {[0, 1, 2].map((i) => (
              <mesh
                key={`tulip-p1-${i}`}
                castShadow
                rotation={[0.2, (i * Math.PI * 2) / 3, 0]}
                position={[
                  Math.sin((i * Math.PI * 2) / 3) * 0.035,
                  0.06,
                  Math.cos((i * Math.PI * 2) / 3) * 0.035,
                ]}
              >
                <sphereGeometry args={[0.065, 8, 8, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
                <meshStandardMaterial color={color} roughness={0.5} side={THREE.DoubleSide} />
              </mesh>
            ))}
            {[0, 1, 2].map((i) => (
              <mesh
                key={`tulip-p2-${i}`}
                castShadow
                rotation={[-0.1, (i * Math.PI * 2) / 3 + 1.0, 0.1]}
                position={[
                  Math.sin((i * Math.PI * 2) / 3 + 1.0) * 0.02,
                  0.05,
                  Math.cos((i * Math.PI * 2) / 3 + 1.0) * 0.02,
                ]}
              >
                <sphereGeometry args={[0.062, 8, 8, 0, Math.PI * 2, 0, Math.PI * 0.75]} />
                <meshStandardMaterial color={color} roughness={0.5} side={THREE.DoubleSide} />
              </mesh>
            ))}
          </group>
        )

      case 'lavender':
        return (
          <group>
            {/* Multiple small violet tiers along upper stem */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((tier) => {
              const yPos = -tier * 0.04
              const scale = 1.0 - tier * 0.08
              return (
                <group key={`tier-${tier}`} position={[0, yPos, 0]} scale={[scale, scale, scale]}>
                  {[0, 1, 2, 3, 4].map((petal) => {
                    const angle = (petal * Math.PI * 2) / 5
                    return (
                      <mesh
                        key={`lav-p-${tier}-${petal}`}
                        castShadow
                        position={[
                          Math.sin(angle) * 0.035,
                          0,
                          Math.cos(angle) * 0.035
                        ]}
                      >
                        <sphereGeometry args={[0.018, 8, 8]} />
                        <meshStandardMaterial color={color} roughness={0.6} />
                      </mesh>
                    )
                  })}
                </group>
              )
            })}
          </group>
        )

      case 'wildflower':
      default:
        return (
          <group scale={[0.9, 0.9, 0.9]}>
            {/* Center disc */}
            <mesh castShadow position={[0, 0.005, 0]}>
              <sphereGeometry args={[0.03, 16, 16]} />
              <meshStandardMaterial color="#ffd93d" roughness={0.9} />
            </mesh>
            {/* 5 rounded petals */}
            {[0, 1, 2, 3, 4].map((i) => {
              const angle = (i * Math.PI * 2) / 5
              return (
                <mesh
                  key={`wild-p-${i}`}
                  castShadow
                  rotation={[0.1, angle, 0]}
                  position={[Math.sin(angle) * 0.045, 0, Math.cos(angle) * 0.045]}
                >
                  <boxGeometry args={[0.04, 0.006, 0.05]} />
                  <meshStandardMaterial color={color} roughness={0.6} />
                </mesh>
              )
            })}
          </group>
        )
    }
  }

  return (
    <group>
      {/* Bent Stem Group */}
      <group rotation={stemRotation} position={[0, 0.05, 0]}>
        {/* Main stem */}
        <mesh castShadow position={[0, stemHeight / 2, 0]}>
          <cylinderGeometry args={[0.012, 0.016, stemHeight, 8]} />
          {stemMaterial}
        </mesh>

        {/* Dynamic leaves on the stem */}
        {stemHeight > 0.4 && (
          <>
            {/* Leaf 1 */}
            <mesh
              position={[0.02, stemHeight * 0.45, 0.01]}
              rotation={[0.4, 0.5, -0.6]}
            >
              <boxGeometry args={[0.06, 0.005, 0.12]} />
              {leafMaterial}
            </mesh>
            {/* Leaf 2 */}
            <mesh
              position={[-0.02, stemHeight * 0.65, -0.01]}
              rotation={[-0.4, -0.5, 0.6]}
            >
              <boxGeometry args={[0.05, 0.005, 0.1]} />
              {leafMaterial}
            </mesh>
          </>
        )}

        {/* Flower Head placed at the top of the stem */}
        <group position={[0, stemHeight, 0]} rotation={flowerRotation}>
          {renderFlowerHead()}
        </group>
      </group>
    </group>
  )
}
