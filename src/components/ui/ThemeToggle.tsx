'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center gap-0.5 px-0.5 py-0.5 rounded-full bg-[var(--bg-secondary)]/80 backdrop-blur-md border border-[var(--border)] shadow-sm">
        <div className="w-7 h-7 rounded-full" />
        <div className="w-7 h-7 rounded-full" />
      </div>
    )
  }

  const isLight = theme === 'light'

  return (
    <div className="flex items-center gap-0.5 px-0.5 py-0.5 rounded-full bg-[var(--bg-secondary)]/80 backdrop-blur-md border border-[var(--border)] shadow-sm">
      {/* Sun — light mode */}
      <button
        onClick={() => setTheme('light')}
        aria-label="Switch to light mode"
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
          isLight
            ? 'bg-[var(--accent)]/20 text-[var(--accent)]'
            : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
        }`}
      >
        ☀️
      </button>

      {/* Moon — dark mode */}
      <button
        onClick={() => setTheme('dark')}
        aria-label="Switch to dark mode"
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
          !isLight
            ? 'bg-[var(--accent)]/20 text-[var(--accent)]'
            : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
        }`}
      >
        🌙
      </button>
    </div>
  )
}
