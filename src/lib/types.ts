// 🌸 Flower Glass Customizer - Type Definitions

export type GlassType = 'vase-round' | 'vase-tall' | 'vase-wide' | 'wine-glass' | 'bottle-vase'

export interface GlassOption {
  id: GlassType
  nameTH: string
  nameEN: string
  price: number
  colorVariants: GlassColor[]
}

export type GlassColor = 'clear' | 'pink' | 'green' | 'blue' | 'smoke'

export interface GlassColorInfo {
  id: GlassColor
  labelTH: string
  hex: string
  opacity: number
  emissive: string
}

export type FlowerType = 'rose' | 'daisy' | 'sunflower' | 'tulip' | 'lavender' | 'wildflower'

export interface FlowerOption {
  id: FlowerType
  nameTH: string
  nameEN: string
  price: number
}

export interface FlowerPosition {
  x: number
  z: number
  yBase: number
}

export interface FlowerConfig {
  type: FlowerType
  color: string
  position: number // index into default positions
}

export interface RibbonOption {
  id: string
  nameTH: string
  color: string
  price: number
}

export interface CustomizationConfig {
  glass: GlassType
  glassColor: GlassColor
  flowers: FlowerConfig[]
  ribbon: string | null
  note: string
}

export type TabId = 'glass' | 'flowers' | 'ribbon' | 'note'

export interface TabItem {
  id: TabId
  icon: string
  labelTH: string
}
