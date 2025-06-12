'use client'

import { motion } from 'framer-motion'
import { CircleDashed } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function SavingsProgressChart() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 72 ? 72 : prev + 1))
    }, 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-center"
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-white">Savings Goal</h3>
        <CircleDashed size={16} className="text-purple-400" />
      </div>
      <div className="relative w-24 h-24 mx-auto my-4">
        <svg className="w-full h-full rotate-[-90deg]">
          <circle
            cx="48" cy="48" r="42"
            className="stroke-zinc-700"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="48" cy="48" r="42"
            stroke="url(#gradient)"
            strokeWidth="10"
            fill="none"
            strokeDasharray="264"
            strokeDashoffset={264 - (264 * progress) / 100}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
          {progress}%
        </div>
      </div>
      <p className="text-xs text-zinc-400">₹72K saved of ₹1L goal</p>
    </motion.div>
  )
}
