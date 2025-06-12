'use client'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Income',
      data: [50000, 52000, 53000, 54000, 55000],
      backgroundColor: '#34d399'
    },
    {
      label: 'Expenses',
      data: [30000, 32000, 31000, 29000, 33000],
      backgroundColor: '#f87171'
    }
  ]
}

const options: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#cbd5e1'
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#cbd5e1'
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: '#cbd5e1'
      }
    }
  }
}

export default function IncomeVsExpenseChart() {
  return (
    <div className="p-4 bg-zinc-900 rounded-lg">
      <Bar data={data} options={options} />
    </div>
  )
}
