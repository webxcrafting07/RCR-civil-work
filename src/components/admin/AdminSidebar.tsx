'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Wrench, FolderOpen, Image as ImageIcon,
  Star, MessageSquare, Settings, User, LogOut, HardHat, ChevronLeft, FileText, Building2
} from 'lucide-react'
import { useAuthStore, useUIStore } from '@/store'
import { cn } from '@/utils'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const MENU_ITEMS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Services', href: '/admin/services', icon: Wrench },
  { label: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { label: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
  { label: 'Reviews', href: '/admin/reviews', icon: Star },
  { label: 'Blogs', href: '/admin/blogs', icon: FileText },
  { label: 'Clients', href: '/admin/clients', icon: Building2 },
  { label: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
  { label: 'Profile', href: '/admin/profile', icon: User },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { adminSidebarOpen, setAdminSidebarOpen } = useUIStore()
  const { logout, user } = useAuthStore()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {}
    logout()
    router.push('/admin/login')
    toast.success('Logged out successfully')
  }

  return (
    <>
      {/* Mobile overlay */}
      {adminSidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/60 lg:hidden" onClick={() => setAdminSidebarOpen(false)} />
      )}

      <motion.aside
        initial={false}
        animate={{ width: adminSidebarOpen ? 256 : 64 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className={cn(
          'fixed top-0 left-0 h-full z-30 flex flex-col overflow-hidden',
          'bg-white border-r border-slate-200'
        )}
      >
        {/* Logo area */}
        <div className="flex items-center h-16 px-4 border-b border-slate-200 flex-shrink-0">
          <Link href="/admin/dashboard" className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center flex-shrink-0">
              <HardHat size={16} className="text-white" />
            </div>
            <AnimatePresence>
              {adminSidebarOpen && (
                <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden whitespace-nowrap">
                  <div className="font-mono font-bold text-slate-900 text-xs tracking-widest">RCR ADMIN</div>
                  <div className="font-mono text-sky-500 text-[9px] tracking-widest">PANEL</div>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>

          <button onClick={() => setAdminSidebarOpen(!adminSidebarOpen)}
            className="ml-auto w-7 h-7 rounded-lg bg-slate-50 hover:bg-white/10 flex items-center justify-center transition-colors flex-shrink-0">
            <motion.div animate={{ rotate: adminSidebarOpen ? 0 : 180 }} transition={{ duration: 0.25 }}>
              <ChevronLeft size={14} className="text-slate-500" />
            </motion.div>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}
                className={cn('admin-sidebar-link mx-2 mb-0.5', isActive && 'active')}>
                <Icon size={18} className="flex-shrink-0" />
                <AnimatePresence>
                  {adminSidebarOpen && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }} className="text-sm whitespace-nowrap overflow-hidden">
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            )
          })}
        </nav>

        {/* Bottom: user + logout */}
        <div className="border-t border-slate-200 p-3 flex-shrink-0">
          {adminSidebarOpen && user && (
            <div className="flex items-center gap-2 px-2 py-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-sky-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-sky-500 font-bold text-xs">{user.name[0]}</span>
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-medium text-slate-900 truncate">{user.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{user.role}</div>
              </div>
            </div>
          )}
          <button onClick={handleLogout}
            className="admin-sidebar-link w-full hover:text-red-400 hover:bg-red-400/10 hover:border-red-400/20">
            <LogOut size={18} className="flex-shrink-0" />
            <AnimatePresence>
              {adminSidebarOpen && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-sm whitespace-nowrap">
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>
    </>
  )
}
