'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-sm text-white"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      <span className="hidden md:inline">Toggle Theme</span>
    </button>
  )
}
