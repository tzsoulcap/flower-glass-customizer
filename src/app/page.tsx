'use client'

import React, { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import {
  GLASS_OPTIONS,
  GLASS_COLORS,
  FLOWER_OPTIONS,
  FLOWER_COLORS,
  RIBBON_OPTIONS,
  TABS,
  DEFAULT_CONFIG
} from '@/lib/constants'
import { CustomizationConfig, TabId, FlowerType, GlassType, GlassColor } from '@/lib/types'

// Dynamically import the 3D viewer without SSR to avoid hydration issues with Three.js
const CustomizerViewer = dynamic(
  () => import('@/components/3d/CustomizerViewer'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950">
        <div className="relative flex items-center justify-center mb-4">
          <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-emerald-500 animate-spin" />
          <span className="absolute text-2xl animate-bounce">🏺</span>
        </div>
        <p className="text-slate-400 text-sm font-medium">กำลังเตรียมโมเดล 3D...</p>
        <p className="text-slate-600 text-xs mt-1">Preparing 3D customizer engine</p>
      </div>
    ),
  }
)

export default function Home() {
  const [config, setConfig] = useState<CustomizationConfig>(DEFAULT_CONFIG)
  const [activeTab, setActiveTab] = useState<TabId>('glass')
  const [isSheetOpen, setIsSheetOpen] = useState(true)

  // Customizer state
  const [selectedFlowerType, setSelectedFlowerType] = useState<FlowerType>('rose')
  const [selectedFlowerColor, setSelectedFlowerColor] = useState<string>('#ff4757')

  // Order/Checkout state
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [orderSubmitted, setOrderSubmitted] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')

  // Calculate pricing
  const pricing = useMemo(() => {
    const selectedGlass = GLASS_OPTIONS.find((g) => g.id === config.glass)
    const glassPrice = selectedGlass ? selectedGlass.price : 0

    const selectedRibbon = RIBBON_OPTIONS.find((r) => r.id === config.ribbon)
    const ribbonPrice = selectedRibbon ? selectedRibbon.price : 0

    const flowersPrice = config.flowers.reduce((sum, f) => {
      const option = FLOWER_OPTIONS.find((fo) => fo.id === f.type)
      return sum + (option ? option.price : 0)
    }, 0)

    const total = glassPrice + ribbonPrice + flowersPrice

    return {
      glass: glassPrice,
      ribbon: ribbonPrice,
      flowers: flowersPrice,
      total,
    }
  }, [config])

  // Get active glass object info
  const activeGlass = useMemo(() => {
    return GLASS_OPTIONS.find((g) => g.id === config.glass) || GLASS_OPTIONS[0]
  }, [config.glass])

  // Get active ribbon object info
  const activeRibbon = useMemo(() => {
    return RIBBON_OPTIONS.find((r) => r.id === (config.ribbon || 'none')) || RIBBON_OPTIONS[0]
  }, [config.ribbon])

  // Handle glass style change and ensure selected color is valid for that variant
  const handleGlassTypeChange = (glassId: GlassType) => {
    const glass = GLASS_OPTIONS.find((g) => g.id === glassId)
    if (!glass) return

    // If current color is not supported by new glass variant, default to the first supported color
    let newColor = config.glassColor
    if (!glass.colorVariants.includes(config.glassColor)) {
      newColor = glass.colorVariants[0] as GlassColor
    }

    setConfig((prev) => ({
      ...prev,
      glass: glassId,
      glassColor: newColor,
    }))
  }

  // Handle adding flower
  const handleAddFlower = () => {
    if (config.flowers.length >= 7) {
      alert('ใส่ดอกไม้ได้สูงสุด 7 ดอกเท่านั้นเพื่อความสวยงามในขวดแก้วค่ะ (Maximum of 7 flowers allowed)')
      return
    }

    // Find first vacant position index (0 to 6)
    const activePositions = config.flowers.map((f) => f.position)
    let vacantPos = 0
    for (let i = 0; i < 7; i++) {
      if (!activePositions.includes(i)) {
        vacantPos = i
        break
      }
    }

    setConfig((prev) => ({
      ...prev,
      flowers: [
        ...prev.flowers,
        {
          type: selectedFlowerType,
          color: selectedFlowerColor,
          position: vacantPos,
        },
      ],
    }))
  }

  // Handle removing flower
  const handleRemoveFlower = (indexToRemove: number) => {
    setConfig((prev) => ({
      ...prev,
      flowers: prev.flowers.filter((_, idx) => idx !== indexToRemove),
    }))
  }

  // Handle checkout submit
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customerName || !customerPhone || !customerAddress) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วนด้วยค่ะ')
      return
    }
    setOrderSubmitted(true)
  }

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG)
    setCustomerName('')
    setCustomerPhone('')
    setCustomerAddress('')
    setOrderSubmitted(false)
    setShowOrderModal(false)
  }

  const handleTabClick = (tabId: TabId) => {
    if (activeTab === tabId && isSheetOpen) {
      setIsSheetOpen(false)
    } else {
      setActiveTab(tabId)
      setIsSheetOpen(true)
    }
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 relative">
      {/* 🌸 Background: Full-screen 3D Viewer */}
      <div className="absolute inset-0 z-0">
        <CustomizerViewer config={config} />
      </div>

      {/* 🌸 Floating Top Bar */}
      <header className="absolute top-0 left-0 right-0 z-50 px-4 py-3 md:px-6 md:py-4 flex items-center justify-between bg-gradient-to-b from-slate-950/80 to-transparent">
        <div className="flex items-center gap-2.5">
          <span className="text-xl md:text-2xl">🌸</span>
          <div className="hidden sm:block">
            <h1 className="text-sm md:text-lg font-bold tracking-wider bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              FLORA GLASS
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          {/* Bouquet info badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/70 backdrop-blur border border-slate-800/60 text-[10px] md:text-xs text-slate-400">
            <span>🏺 {activeGlass.nameTH}</span>
            <span>•</span>
            <span>🌷 {config.flowers.length} ดอก</span>
            {config.ribbon && config.ribbon !== 'none' && (
              <>
                <span>•</span>
                <span>🎀</span>
              </>
            )}
          </div>
          <span className="font-mono text-emerald-400 font-bold text-sm md:text-base">
            ฿{pricing.total.toLocaleString()}
          </span>
          <button
            onClick={() => setShowOrderModal(true)}
            className="bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 transition px-3 md:px-4 py-1.5 rounded-lg text-xs font-semibold shadow-lg shadow-pink-500/20 flex items-center gap-1.5"
          >
            <span className="hidden sm:inline">🛒</span> สั่งซื้อ
          </button>
        </div>
      </header>

      {/* 🌸 Reset Button - Floating on the left */}
      <button
        onClick={handleReset}
        className="absolute top-20 left-4 z-50 px-2.5 py-1.5 rounded-lg bg-slate-950/60 backdrop-blur border border-slate-800/60 hover:bg-slate-900/80 transition text-[10px] md:text-xs text-slate-400 hover:text-slate-200"
      >
        🔄 รีเซ็ต
      </button>

      {/* 🌸 Bottom Sheet (Tab content + Tab bar) */}
      <div className="absolute bottom-0 left-0 right-0 z-40 flex flex-col pointer-events-none">
        {/* Tab Content Sheet */}
        <div
          className={`pointer-events-auto mx-auto w-full max-w-2xl transition-all duration-300 ease-out ${
            isSheetOpen
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0'
          }`}
        >
          <div className="bg-slate-950/90 backdrop-blur-xl border border-slate-800/60 rounded-t-2xl shadow-2xl max-h-[50vh] md:max-h-[40vh] flex flex-col">
            {/* Drag Handle */}
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-10 h-1 rounded-full bg-slate-600/50" />
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto px-4 pb-4 flex-1">
              {/* TAB 1: GLASS */}
              {activeTab === 'glass' && (
                <div className="flex flex-col gap-4 pt-1">
                  <div>
                    <h3 className="text-xs md:text-sm font-semibold text-slate-200 mb-1">ทรงขวดแก้ว (Glass Shapes)</h3>
                    <p className="text-[10px] md:text-xs text-slate-500">เลือกรูปทรงแก้วที่เหมาะสมสำหรับสไตล์การตกแต่งของคุณ</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {GLASS_OPTIONS.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => handleGlassTypeChange(g.id)}
                        className={`flex flex-col items-start p-2.5 md:p-3 rounded-lg border text-left transition-all ${
                          config.glass === g.id
                            ? 'border-pink-500/80 bg-pink-500/5 text-pink-100 shadow-lg shadow-pink-500/5'
                            : 'border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-300'
                        }`}
                      >
                        <span className="text-[11px] md:text-xs font-semibold">{g.nameTH}</span>
                        <span className="text-[9px] md:text-[10px] text-slate-500 mt-0.5">{g.nameEN}</span>
                        <span className="text-[10px] md:text-xs font-mono text-emerald-400 mt-1.5 font-medium">฿{g.price}</span>
                      </button>
                    ))}
                  </div>

                  {/* Glass Color */}
                  <div>
                    <h3 className="text-xs md:text-sm font-semibold text-slate-200 mb-2">สีของแก้ว (Glass Tint Color)</h3>
                    <div className="flex flex-wrap gap-2">
                      {GLASS_OPTIONS.find((g) => g.id === config.glass)?.colorVariants.map((colorId) => {
                        const colorInfo = GLASS_COLORS[colorId]
                        if (!colorInfo) return null
                        return (
                          <button
                            key={colorId}
                            onClick={() => setConfig((prev) => ({ ...prev, glassColor: colorId as GlassColor }))}
                            className={`flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-lg border text-[10px] md:text-xs transition-all ${
                              config.glassColor === colorId
                                ? 'border-pink-500/80 bg-pink-500/5 text-pink-100'
                                : 'border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-400'
                            }`}
                          >
                            <span
                              className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border border-slate-700 shadow-sm"
                              style={{ backgroundColor: colorInfo.hex }}
                            />
                            <span>{colorInfo.labelTH}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: FLOWERS */}
              {activeTab === 'flowers' && (
                <div className="flex flex-col gap-3 pt-1">
                  <div>
                    <h3 className="text-xs md:text-sm font-semibold text-slate-200 mb-1">จัดช่อดอกไม้ของคุณ (Bouquet Editor)</h3>
                    <p className="text-[10px] md:text-xs text-slate-500">เลือกชนิดและสีดอกไม้ แล้วกดใส่ลงในแก้ว (สูงสุด 7 ดอก)</p>
                  </div>

                  {/* Flower Types Selector */}
                  <div>
                    <span className="text-[10px] md:text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                      ชนิดดอกไม้ (Flower Type)
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {FLOWER_OPTIONS.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setSelectedFlowerType(f.id)}
                          className={`py-1.5 md:py-2 px-1 rounded-lg border text-center text-[10px] md:text-xs transition ${
                            selectedFlowerType === f.id
                              ? 'border-pink-500 bg-pink-500/10 text-pink-300 font-semibold'
                              : 'border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                          }`}
                        >
                          {f.nameTH}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colors Selector */}
                  <div>
                    <span className="text-[10px] md:text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                      สีดอกไม้ (Flower Color)
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {FLOWER_COLORS.map((color) => (
                        <button
                          key={color.hex}
                          onClick={() => setSelectedFlowerColor(color.hex)}
                          className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 transition-transform ${
                            selectedFlowerColor === color.hex
                              ? 'border-white scale-110 shadow-lg shadow-white/10'
                              : 'border-slate-900 hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Add Button */}
                  <button
                    onClick={handleAddFlower}
                    disabled={config.flowers.length >= 7}
                    className="w-full py-2 md:py-2.5 rounded-lg bg-pink-500 hover:bg-pink-600 disabled:bg-slate-800 disabled:text-slate-500 transition text-slate-950 font-bold text-[10px] md:text-xs flex items-center justify-center gap-1.5"
                  >
                    <span>➕ เพิ่มเข้าไปในแก้ว</span>
                    <span className="font-normal text-[9px] md:text-[10px]">
                      (+฿{FLOWER_OPTIONS.find((f) => f.id === selectedFlowerType)?.price})
                    </span>
                  </button>

                  {/* Current Bouquet List */}
                  <div>
                    <span className="text-[10px] md:text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                      รายการดอกไม้ในแก้ว ({config.flowers.length} / 7 ดอก)
                    </span>
                    {config.flowers.length === 0 ? (
                      <div className="border border-dashed border-slate-800 rounded-lg flex items-center justify-center p-4 text-center">
                        <p className="text-[10px] md:text-xs text-slate-500">
                          ยังไม่มีดอกไม้เลยค่ะ<br />กดเลือกดอกไม้ด้านบนแล้วคลิกเพิ่มได้เลย!
                        </p>
                      </div>
                    ) : (
                      <div className="max-h-[100px] overflow-y-auto flex flex-col gap-1">
                        {config.flowers.map((f, idx) => {
                          const option = FLOWER_OPTIONS.find((fo) => fo.id === f.type)
                          const colorName = FLOWER_COLORS.find((c) => c.hex === f.color)?.name || 'กำหนดเอง'
                          return (
                            <div
                              key={`list-${idx}`}
                              className="flex items-center justify-between p-1.5 md:p-2 rounded-lg bg-slate-950/40 border border-slate-900 text-[10px] md:text-xs"
                            >
                              <div className="flex items-center gap-1.5 md:gap-2">
                                <span
                                  className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border border-slate-800 shadow-sm"
                                  style={{ backgroundColor: f.color }}
                                />
                                <span className="font-medium">{option?.nameTH}</span>
                                <span className="text-[8px] md:text-[10px] text-slate-500">({colorName})</span>
                              </div>
                              <div className="flex items-center gap-2 md:gap-3">
                                <span className="text-emerald-400 font-mono">฿{option?.price}</span>
                                <button
                                  onClick={() => handleRemoveFlower(idx)}
                                  className="text-red-400 hover:text-red-300 font-semibold px-1 transition"
                                >
                                  ลบ
                                </button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: RIBBON */}
              {activeTab === 'ribbon' && (
                <div className="flex flex-col gap-4 pt-1">
                  <div>
                    <h3 className="text-xs md:text-sm font-semibold text-slate-200 mb-1">เลือกริบบิ้นตกแต่ง (Decor Ribbon)</h3>
                    <p className="text-[10px] md:text-xs text-slate-500">ผูกริบบิ้นเพิ่มความสวยงาม เรียบหรูที่คอขวดแก้ว</p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    {RIBBON_OPTIONS.map((ribbon) => (
                      <button
                        key={ribbon.id}
                        onClick={() => setConfig((prev) => ({ ...prev, ribbon: ribbon.id === 'none' ? null : ribbon.id }))}
                        className={`flex items-center justify-between p-2.5 md:p-3 rounded-lg border text-left transition-all ${
                          (config.ribbon === ribbon.id) || (config.ribbon === null && ribbon.id === 'none')
                            ? 'border-pink-500/80 bg-pink-500/5 text-pink-100'
                            : 'border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 md:gap-3">
                          {ribbon.color ? (
                            <span
                              className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border border-slate-700 shadow-sm block"
                              style={{ backgroundColor: ribbon.color }}
                            />
                          ) : (
                            <span className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border border-slate-700 border-dashed bg-slate-900 block" />
                          )}
                          <span className="text-[11px] md:text-xs font-semibold">{ribbon.nameTH}</span>
                        </div>
                        <span className="text-[10px] md:text-xs font-mono text-emerald-400">
                          {ribbon.price > 0 ? `+฿${ribbon.price}` : 'ฟรี'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: NOTE */}
              {activeTab === 'note' && (
                <div className="flex flex-col gap-4 pt-1">
                  <div>
                    <h3 className="text-xs md:text-sm font-semibold text-slate-200 mb-1">เขียนการ์ดของขวัญ (Gift Card Message)</h3>
                    <p className="text-[10px] md:text-xs text-slate-500">แนบคำอวยพรหรือข้อความน่ารักๆ ส่งไปพร้อมกับของขวัญชิ้นพิเศษ</p>
                  </div>

                  <div className="flex flex-col">
                    <textarea
                      value={config.note}
                      onChange={(e) => setConfig((prev) => ({ ...prev, note: e.target.value }))}
                      maxLength={120}
                      placeholder="พิมพ์ข้อความของคุณที่นี่... (สูงสุด 120 ตัวอักษร) เช่น 'Happy Birthday ขอให้มีความสุขมากๆ นะคะ'"
                      className="w-full min-h-[100px] md:min-h-[120px] p-3 rounded-lg bg-slate-950/80 border border-slate-850 text-xs md:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-pink-500/50 resize-none font-sans"
                    />
                    <div className="text-right text-[9px] md:text-[10px] text-slate-500 mt-1.5">
                      {config.note.length} / 120 ตัวอักษร
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 🌸 Bottom Tab Bar */}
        <div className="pointer-events-auto mx-auto w-full max-w-lg px-2 pb-2 md:pb-3">
          <div className="flex rounded-xl bg-slate-950/85 backdrop-blur-lg border border-slate-800/60 p-1 shadow-xl">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex-1 flex flex-col items-center justify-center py-2 md:py-2.5 rounded-lg transition-all relative ${
                  activeTab === tab.id && isSheetOpen
                    ? 'bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/60 text-pink-400 shadow-md font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="text-sm md:text-lg mb-0.5">{tab.icon}</span>
                <span className="text-[9px] md:text-[11px] tracking-wide">{tab.labelTH}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 🌸 Overlay background dim when sheet is open */}
      {isSheetOpen && (
        <div
          className="absolute inset-0 z-30 bg-black/20 pointer-events-auto"
          onClick={() => setIsSheetOpen(false)}
        />
      )}

      {/* 🌸 Checkout Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-slate-200 max-h-[90vh] overflow-y-auto">
            {/* Modal Close */}
            <button
              onClick={() => setShowOrderModal(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 text-lg transition"
            >
              ✕
            </button>

            {!orderSubmitted ? (
              <form onSubmit={handleOrderSubmit} className="flex flex-col gap-4">
                <div>
                  <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <span>📝</span> กรอกข้อมูลสำหรับจัดส่งสินค้า
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">กรุณาแจ้งรายละเอียดและที่อยู่จัดส่งให้ครบถ้วน</p>
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                      ชื่อผู้รับ (Receiver Name)
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="เช่น คุณกานต์ธิมา ใจดี"
                      className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs focus:outline-none focus:border-pink-500/50"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                      เบอร์โทรศัพท์ (Phone Number)
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="เช่น 098-765-4321"
                      className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs focus:outline-none focus:border-pink-500/50"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                      ที่อยู่การจัดส่ง (Delivery Address)
                    </label>
                    <textarea
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="เช่น 123/45 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110"
                      className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs h-20 focus:outline-none focus:border-pink-500/50 resize-none"
                    />
                  </div>
                </div>

                {/* Summary Mini-Table */}
                <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-850 text-xs flex flex-col gap-1.5 mt-2">
                  <div className="flex justify-between text-slate-400">
                    <span>รายละเอียดแก้ว:</span>
                    <span>{activeGlass.nameTH} ({GLASS_COLORS[config.glassColor]?.labelTH})</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>จำนวนดอกไม้:</span>
                    <span>{config.flowers.length} ดอก</span>
                  </div>
                  {config.note && (
                    <div className="flex justify-between text-slate-400 truncate">
                      <span>คำอวยพร:</span>
                      <span className="max-w-[200px] truncate">"{config.note}"</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-semibold text-emerald-400 border-t border-slate-900 pt-1.5 mt-1">
                    <span>ยอดชำระเงินทั้งหมด:</span>
                    <span>฿{pricing.total}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 transition text-slate-950 font-bold text-xs mt-2"
                >
                  🚀 ยืนยันสั่งซื้อสินค้า (Confirm Order)
                </button>
              </form>
            ) : (
              <div className="text-center py-6 flex flex-col items-center gap-4">
                <span className="text-5xl animate-bounce">🎉</span>
                <div>
                  <h2 className="text-lg font-bold text-slate-100">สั่งซื้อสินค้าเรียบร้อยแล้วค่ะ!</h2>
                  <p className="text-xs text-slate-400 mt-1">ขอบคุณที่เลือกใช้บริการ Flora Glass Customizer</p>
                </div>

                <div className="w-full p-4 rounded-xl bg-slate-950/60 border border-slate-850 text-xs text-left text-slate-300 flex flex-col gap-2">
                  <div><strong>เลขที่คำสั่งซื้อ:</strong> <span className="font-mono text-pink-400">#FG-{Math.floor(100000 + Math.random() * 900000)}</span></div>
                  <div><strong>ชื่อผู้รับ:</strong> {customerName}</div>
                  <div><strong>เบอร์โทรศัพท์:</strong> {customerPhone}</div>
                  <div><strong>ที่อยู่สำหรับจัดส่ง:</strong> {customerAddress}</div>
                  <div><strong>ยอดเงินที่ต้องชำระ:</strong> ฿{pricing.total} (เก็บเงินปลายทาง)</div>
                </div>

                <button
                  onClick={handleReset}
                  className="mt-4 px-6 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-slate-300 font-semibold text-xs"
                >
                  กลับหน้าหลัก (Back to Customizer)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
