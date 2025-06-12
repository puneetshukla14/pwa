'use client'

import { Bar } from 'react-chartjs-2'
import { motion } from 'framer-motion'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { CreditCard } from 'lucide-react'

ChartJS.register(CategoryScale, LinearScale, BarElement)

export default function TopCategoriesChart() {
  const data = {
    labels: ['Groceries', 'Travel', 'Rent', 'Dining', 'Health'],
    datasets: [{
      label: 'Spending ₹',
      data: [7000, 5000, 15000, 3000, 2000],
      backgroundColor: '#facc15'
    }]
  }

  const options = {
    responsive: true,
    indexAxis: 'y' as const,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { beginAtZero: true, ticks: { color: '#cbd5e1' } },
      y: { ticks: { color: '#cbd5e1' } }
    }
  }

  return (
    <motion.div
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Top Categories</h3>
        <CreditCard size={16} className="text-yellow-400" />
      </div>
      <Bar data={data} options={options} />
    </motion.div>
  )
}
