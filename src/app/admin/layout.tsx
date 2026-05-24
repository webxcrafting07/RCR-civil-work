'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore, useUIStore } from '@/store'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  const { adminSidebarOpen } = useUIStore()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isAuthenticated && pathname !== '/admin/login') {
      router.replace('/admin/login')
    }
  }, [isAuthenticated, pathname, router, mounted])

  if (!mounted) return null

  if (pathname === '/admin/login') return <>{children}</>
  if (!isAuthenticated) return null

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <AdminSidebar />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${adminSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
