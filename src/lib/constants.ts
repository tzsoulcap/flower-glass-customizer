// 🌸 Flower Glass Customizer - Constants & Presets
import type {
  GlassOption, GlassColorInfo, FlowerOption,
  FlowerPosition, RibbonOption, TabItem
} from './types'

export const GLASS_OPTIONS: GlassOption[] = [
  { id: 'vase-round', nameTH: 'แจกันทรงกลม', nameEN: 'Round Vase', price: 290, colorVariants: ['clear', 'pink', 'green', 'blue', 'smoke'] },
  { id: 'vase-tall', nameTH: 'แจกันทรงสูง', nameEN: 'Tall Vase', price: 350, colorVariants: ['clear', 'green', 'smoke'] },
  { id: 'vase-wide', nameTH: 'แจกันปากกว้าง', nameEN: 'Wide Vase', price: 420, colorVariants: ['clear', 'blue', 'pink'] },
  { id: 'wine-glass', nameTH: 'แก้วไวน์', nameEN: 'Wine Glass', price: 250, colorVariants: ['clear', 'smoke'] },
  { id: 'bottle-vase', nameTH: 'แจกันขวดแก้ว', nameEN: 'Bottle Vase', price: 380, colorVariants: ['clear', 'green', 'blue'] },
]

export const GLASS_COLORS: Record<string, GlassColorInfo> = {
  clear: { id: 'clear', labelTH: 'ใส', hex: '#c8e6ff', opacity: 0.2, emissive: '#112244' },
  pink: { id: 'pink', labelTH: 'ชมพู', hex: '#ffb6c1', opacity: 0.25, emissive: '#441122' },
  green: { id: 'green', labelTH: 'เขียว', hex: '#90ee90', opacity: 0.25, emissive: '#224411' },
  blue: { id: 'blue', labelTH: 'ฟ้า', hex: '#add8e6', opacity: 0.25, emissive: '#112244' },
  smoke: { id: 'smoke', labelTH: 'สโมค', hex: '#a9a9a9', opacity: 0.3, emissive: '#222222' },
}

export const FLOWER_OPTIONS: FlowerOption[] = [
  { id: 'rose', nameTH: 'กุหลาบ', nameEN: 'Rose', price: 50 },
  { id: 'daisy', nameTH: 'เดซี่', nameEN: 'Daisy', price: 35 },
  { id: 'sunflower', nameTH: 'ทานตะวัน', nameEN: 'Sunflower', price: 60 },
  { id: 'tulip', nameTH: 'ทิวลิป', nameEN: 'Tulip', price: 55 },
  { id: 'lavender', nameTH: 'ลาเวนเดอร์', nameEN: 'Lavender', price: 40 },
  { id: 'wildflower', nameTH: 'ดอกไม้ป่า', nameEN: 'Wildflower', price: 45 },
]

export const FLOWER_COLORS = [
  { name: 'แดง', hex: '#ff4757' },
  { name: 'ชมพู', hex: '#ff6b8a' },
  { name: 'เหลือง', hex: '#ffd93d' },
  { name: 'ม่วง', hex: '#c084fc' },
  { name: 'ส้ม', hex: '#ff9ff3' },
  { name: 'ขาว', hex: '#ffffff' },
  { name: 'ฟ้า', hex: '#74b9ff' },
]

// Default flower positions inside the glass (round vase)
export const FLOWER_POSITIONS: FlowerPosition[] = [
  { x: 0, z: 0, yBase: 1.45 },
  { x: 0.28, z: 0.22, yBase: 1.25 },
  { x: -0.3, z: -0.18, yBase: 1.35 },
  { x: 0.22, z: -0.32, yBase: 1.1 },
  { x: -0.25, z: 0.28, yBase: 1.55 },
  { x: 0.12, z: 0.3, yBase: 1.0 },
  { x: -0.15, z: -0.3, yBase: 1.2 },
]

export const RIBBON_OPTIONS: RibbonOption[] = [
  { id: 'none', nameTH: 'ไม่มีริบบิ้น', color: '', price: 0 },
  { id: 'red-satin', nameTH: 'ริบบิ้นซาตินแดง', color: '#dc2626', price: 30 },
  { id: 'gold-satin', nameTH: 'ริบบิ้นซาตินทอง', color: '#f59e0b', price: 30 },
  { id: 'white-lace', nameTH: 'ริบบิ้นลูกไม้ขาว', color: '#f5f5f5', price: 50 },
  { id: 'pink-organdy', nameTH: 'ริบบิ้นออร์แกนซ่าชมพู', color: '#f472b6', price: 50 },
]

export const TABS: TabItem[] = [
  { id: 'glass', icon: '🏺', labelTH: 'แก้ว' },
  { id: 'flowers', icon: '🌷', labelTH: 'ดอกไม้' },
  { id: 'ribbon', icon: '🎀', labelTH: 'ริบบิ้น' },
  { id: 'note', icon: '📝', labelTH: 'โน๊ต' },
]

export const DEFAULT_CONFIG = {
  glass: 'vase-round' as const,
  glassColor: 'clear' as const,
  flowers: [
    { type: 'rose' as const, color: '#ff4757', position: 0 },
    { type: 'daisy' as const, color: '#ffd93d', position: 1 },
    { type: 'rose' as const, color: '#ff6b8a', position: 2 },
    { type: 'wildflower' as const, color: '#c084fc', position: 3 },
    { type: 'daisy' as const, color: '#ff9ff3', position: 4 },
  ],
  ribbon: null,
  note: '',
}

export const GLASS_PROFILES: Record<string, Array<{ x: number; y: number }>> = {
  'vase-round': [
    { x: 0, y: 0 }, { x: 0.15, y: 0 }, { x: 0.2, y: 0.05 },
    { x: 0.3, y: 0.15 }, { x: 0.5, y: 0.4 }, { x: 0.7, y: 0.8 },
    { x: 0.75, y: 1.2 }, { x: 0.7, y: 1.5 }, { x: 0.6, y: 1.7 },
    { x: 0.5, y: 1.8 }, { x: 0.45, y: 1.82 }, { x: 0.55, y: 1.9 },
    { x: 0.6, y: 1.95 }, { x: 0.58, y: 2.0 }, { x: 0.5, y: 2.05 },
    { x: 0.4, y: 2.08 }, { x: 0.35, y: 2.1 }, { x: 0.35, y: 2.15 },
    { x: 0.4, y: 2.2 }, { x: 0.42, y: 2.25 }, { x: 0.38, y: 2.28 },
    { x: 0, y: 2.3 },
  ],
  'vase-tall': [
    { x: 0, y: 0 }, { x: 0.12, y: 0 }, { x: 0.15, y: 0.05 },
    { x: 0.2, y: 0.3 }, { x: 0.25, y: 0.8 }, { x: 0.3, y: 1.5 },
    { x: 0.35, y: 2.2 }, { x: 0.38, y: 2.8 }, { x: 0.4, y: 3.2 },
    { x: 0.38, y: 3.3 }, { x: 0.35, y: 3.35 }, { x: 0, y: 3.4 },
  ],
  'vase-wide': [
    { x: 0, y: 0 }, { x: 0.2, y: 0 }, { x: 0.35, y: 0.05 },
    { x: 0.6, y: 0.2 }, { x: 0.8, y: 0.5 }, { x: 0.85, y: 0.8 },
    { x: 0.8, y: 1.1 }, { x: 0.7, y: 1.3 }, { x: 0.65, y: 1.35 },
    { x: 0.7, y: 1.4 }, { x: 0.6, y: 1.45 }, { x: 0, y: 1.5 },
  ],
  'wine-glass': [
    { x: 0, y: 0 }, { x: 0.08, y: 0 }, { x: 0.1, y: 0.02 },
    { x: 0.1, y: 0.15 }, { x: 0.12, y: 0.3 }, { x: 0.15, y: 0.5 },
    { x: 0.55, y: 1.0 }, { x: 0.6, y: 1.2 }, { x: 0.58, y: 1.4 },
    { x: 0.5, y: 1.5 }, { x: 0.4, y: 1.55 }, { x: 0.38, y: 1.58 },
    { x: 0.4, y: 1.6 }, { x: 0.35, y: 1.65 }, { x: 0, y: 1.7 },
  ],
  'bottle-vase': [
    { x: 0, y: 0 }, { x: 0.1, y: 0 }, { x: 0.12, y: 0.02 },
    { x: 0.12, y: 0.1 }, { x: 0.15, y: 0.3 }, { x: 0.2, y: 0.8 },
    { x: 0.25, y: 1.5 }, { x: 0.28, y: 2.0 }, { x: 0.3, y: 2.5 },
    { x: 0.32, y: 2.8 }, { x: 0.3, y: 2.85 }, { x: 0, y: 2.9 },
  ],
}
