'use client'

import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { motion } from 'framer-motion'
import { Wallet } from 'lucide-react'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function WalletPieChart() {
  const data = {
    labels: ['Bank', 'UPI', 'Cash', 'Card'],
    datasets: [{
      data: [45000, 25000, 8000, 16000],
      backgroundColor: ['#60a5fa', '#34d399', '#facc15', '#f87171'],
      borderColor: '#18181b',
      borderWidth: 2
    }]
  }

  return (
    <motion.div
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Wallet Breakdown</h3>
        <Wallet size={16} className="text-blue-400" />
      </div>
      <Pie data={data} />
    </motion.div>
  )
}
