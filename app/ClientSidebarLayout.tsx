'use client'

import Sidebar from '@/components/Sidebar'

export default function ClientSidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full max-h-screen overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
