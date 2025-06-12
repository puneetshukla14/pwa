'use client'

import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { motion } from 'framer-motion'
import { Wallet, RefreshCcw } from 'lucide-react'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function WalletPieChart() {
  const [chartData, setChartData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/wallet')
      const json = await res.json()

      if (!json.success) throw new Error(json.message)

      const paymentMethods = json.data.map((item: any) => item._id)
      const totals = json.data.map((item: any) => item.total)

      setChartData({
        labels: paymentMethods,
        datasets: [{
          data: totals,
          backgroundColor: ['#60a5fa', '#34d399', '#facc15', '#f87171', '#a78bfa'],
          borderColor: '#18181b',
          borderWidth: 2,
        }]
      })
    } catch (err: any) {
      console.error('💥 Error loading chart data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <motion.div
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 w-full max-w-md mx-auto shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Wallet Breakdown</h3>
        <button onClick={fetchData} className="text-blue-400 hover:text-white transition">
          <RefreshCcw size={16} />
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm text-center">Loading...</p>
      ) : chartData && chartData.datasets[0].data.length > 0 ? (
        <Pie data={chartData} />
      ) : (
        <p className="text-gray-400 text-sm text-center">No data available</p>
      )}
    </motion.div>
  )
}
