'use client'

import { usePathname } from 'next/navigation'
import { Bell, Menu, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useUIStore, useAuthStore } from '@/store'

const TITLES: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/services': 'Services Management',
  '/admin/projects': 'Projects Portfolio',
  '/admin/gallery': 'Gallery Management',
  '/admin/reviews': 'Reviews Management',
  '/admin/blogs': 'Blogs Management',
  '/admin/inquiries': 'Customer Inquiries',
  '/admin/settings': 'Website Settings',
  '/admin/profile': 'Admin Profile',
}

export default function AdminHeader() {
  const pathname = usePathname()
  const { toggleMobileMenu } = useUIStore()
  const { user } = useAuthStore()

  const title = Object.entries(TITLES).find(([key]) => pathname.startsWith(key))?.[1] || 'Admin Panel'

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-4">
        <button onClick={toggleMobileMenu} className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-500">
          <Menu size={18} />
        </button>
        <h1 className="text-base font-display font-semibold text-slate-900">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/" target="_blank" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-sky-500 transition-colors px-3 py-1.5 rounded-lg border border-slate-200 hover:border-sky-500/20">
          <ExternalLink size={13} /> View Site
        </Link>
        <button className="relative w-8 h-8 rounded-lg bg-slate-50 hover:bg-white/10 flex items-center justify-center text-slate-500 transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-sky-500" />
        </button>
        <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center cursor-pointer">
          <span className="text-sky-500 font-bold text-xs">{user?.name?.[0] || 'A'}</span>
        </div>
      </div>
    </header>
  )
}
