'use client'

import React from 'react'
import SpendingTrendChart from '@/components/dashboard/SpendingTrendChart'
import WalletPieChart from '@/components/dashboard/WalletPieChart'
import IncomeVsExpenseChart from '@/components/dashboard/IncomeVsExpenseChart'
import TopCategoriesChart from '@/components/dashboard/TopCategoriesChart'
import SavingsProgressChart from '@/components/dashboard/SavingsProgressChart'

export default function DashboardPage() {
  return (
    <main className="p-6 space-y-6">
      {/* Quick Actions could be here */}

      {/* Dashboard Grid Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <SpendingTrendChart />
        <WalletPieChart />
        <IncomeVsExpenseChart />
        <TopCategoriesChart />
        <SavingsProgressChart />
      </section>
    </main>
  )
}
