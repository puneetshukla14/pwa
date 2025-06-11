'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, CreditCard, Wallet, Calendar, Bot,
  BarChart, Settings, Lock, X, Menu
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/expenses', label: 'Expenses', icon: CreditCard },
  { href: '/wallets', label: 'Wallets', icon: Wallet },
  { href: '/calendar', label: 'Calendar', icon: Calendar },
  { href: '/ai-assistant', label: 'AI Assistant', icon: Bot },
  { href: '/reports', label: 'Reports', icon: BarChart },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/admin', label: 'Admin', icon: Lock }
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [devMode, setDevMode] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('devMode')
    if (saved) setDevMode(saved === 'true')
  }, [])

  useEffect(() => {
    localStorage.setItem('devMode', devMode.toString())
  }, [devMode])

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && !sidebarOpen && (
        <button
          className="fixed top-4 left-4 z-50 bg-zinc-900/90 p-3 rounded-md border border-zinc-700 text-white"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={20} />
        </button>
      )}

      {/* Overlay for Mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen || !isMobile ? 0 : -300 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className={clsx(
          'fixed top-0 left-0 z-50 h-screen w-64 flex flex-col justify-between',
          'bg-zinc-950/90 backdrop-blur-md border-r border-zinc-800',
          'md:relative md:z-10 md:translate-x-0'
        )}
      >
        {/* Neon Border */}
        <div className="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-blue-500 to-cyan-500" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
          <h1 className="text-lg font-bold tracking-wide text-white">ExpenseX Pro</h1>
          {isMobile && (
            <button
              className="text-zinc-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Main Content */}
        <div className="flex flex-col justify-between flex-1 px-3 py-3">
          {/* Links */}
          <div className="space-y-1">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'group flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200',
                  pathname === href
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                )}
                onClick={() => isMobile && setSidebarOpen(false)}
              >
                <Icon size={20} className="group-hover:scale-105 transition-transform" />
                <span className="text-sm">{label}</span>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="text-xs text-zinc-500 mt-6 border-t border-zinc-800 pt-3">
            <div className="flex justify-between items-center px-2">
              <span>v1.0 • ExpenseX Pro</span>
              <span className="text-[10px] text-blue-600">Puneet Shukla Tech</span>
            </div>

            {/* Dev Mode Toggle (Mobile only) */}
            <div className="sm:hidden mt-2 px-2">
              <div className="px-3 py-2 bg-white/10 border border-white/20 rounded-full flex items-center justify-between">
                <span className="text-white text-xs font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-blue-400 animate-pulse">
                  Dev Mode
                </span>
                <button
                  onClick={() => setDevMode(prev => !prev)}
                  className="w-14 h-6 flex items-center bg-white/10 rounded-full p-1 border border-white/30 relative overflow-hidden"
                >
                  <motion.div
                    layout
                    className="w-5 h-5 rounded-full bg-white shadow-md z-10"
                    animate={{ x: devMode ? 28 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                  {!devMode && (
                    <motion.div
                      initial={{ x: 6, opacity: 0 }}
                      animate={{ x: 2, opacity: 1 }}
                      transition={{
                        repeat: Infinity,
                        repeatType: 'reverse',
                        duration: 0.8,
                        ease: 'easeInOut'
                      }}
                      className="absolute left-1 text-white text-xs pointer-events-none z-0"
                    >
                      ←
                    </motion.div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
