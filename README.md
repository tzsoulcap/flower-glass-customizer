# 🌸 Flower Glass Customizer

> Interactive 3D flower glass customization webapp — ให้ลูกค้าเลือกแก้ว ดอกไม้ และตกแต่งช่อดอกไม้ในแก้วได้เองแบบ 360° ก่อนสั่งซื้อ

Built with [Next.js](https://nextjs.org) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [Tailwind CSS](https://tailwindcss.com)

## ✨ Features

- 🏺 **Glass Selection** — เลือกรูปแบบแก้วหลากหลายทรง (ทรงกลม, ทรงสูง, ปากกว้าง, แก้วไวน์, ขวดแก้ว)
- 🌷 **Flower Picker** — เลือกดอกไม้ 6 ชนิด 7 สี จัดวางในแก้ว
- 🎨 **Real-time Customization** — เปลี่ยนสีแก้ว/ดอกไม้/ริบบิ้น ได้ทันที
- 🌀 **360° Preview** — ลากหมุนดูสินค้าได้ทุกมุมด้วย Three.js + OrbitControls
- 💎 **Premium 3D** — Glass shader แบบ realistic (transmission, clearcoat, IOR)
- 💰 **Dynamic Pricing** — คำนวณราคาทันทีตามตัวเลือก
- 🛒 **Order System** — ฟอร์มสั่งซื้อพร้อมส่งข้อมูล

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| **Frontend + 3D** | Next.js 16 + React Three Fiber + Tailwind CSS |
| **3D Engine** | Three.js + OrbitControls + Drei (ContactShadows) |
| **3D Models** | Procedural (LatheGeometry, custom meshes) |
| **Language** | TypeScript |
| **Database** | (Coming soon) PostgreSQL + Prisma |
| **Storage** | (Coming soon) Cloudflare R2 / S3 |
| **Container** | (Coming soon) Docker Compose |

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
flower-glass-customizer/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main customizer page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── GlassModel.tsx       # 3D glass with LatheGeometry
│   │   │   ├── FlowerModel.tsx      # 3D flowers (procedural)
│   │   │   ├── RibbonModel.tsx      # 3D ribbon/bow
│   │   │   └── CustomizerViewer.tsx # Main 3D scene + Canvas
│   │   └── ui/               # (Coming soon)
│   └── lib/
│       ├── types.ts          # TypeScript types
│       └── constants.ts      # Options, profiles, colors
├── public/
│   └── models/               # For future .glb models
└── docker/                   # (Coming soon)
```

## 🖼️ Screens

- **Full-screen 3D viewer** with premium lighting and pedestal
- **Sidebar configurator** with tabbed options (แก้ว/ดอกไม้/ริบบิ้น/โน๊ต)
- **Dynamic price calculation**
- **Order modal** with customer info form

## 📝 License

MIT

---

> สร้างด้วย 💕 โดย [tzsoulcap](https://github.com/tzsoulcap) + มินะ (AI Helper) + agy (Antigravity CLI)
