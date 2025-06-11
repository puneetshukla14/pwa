import './globals.css'
import Sidebar from '@/components/Sidebar'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  title: 'ExpenseX Pro',
  description: 'Your intelligent personal finance manager',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-zinc-950 text-white flex min-h-screen overflow-x-hidden">
          <Sidebar />
          <main className="flex-1 min-h-screen p-6 ml-0 md:ml-64">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}
