// app/page.tsx or app/dashboard/page.tsx

'use client'

import { motion } from 'framer-motion'

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4 text-zinc-400">Welcome to your ExpenseX Pro dashboard.</p>
    </motion.div>
  )
}
