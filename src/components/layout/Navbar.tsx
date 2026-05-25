'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ChevronRight, HardHat } from 'lucide-react'
import { NAV_ITEMS } from '@/constants'
import { cn } from '@/utils'
import { useTranslation } from '@/hooks/useTranslation'
import LanguageSwitcher from '@/components/shared/LanguageSwitcher'

const NAV_KEYS: Record<string, string> = {
  '/': 'nav.home',
  '/about': 'nav.about',
  '/services': 'nav.services',
  '/projects': 'nav.projects',
  '/gallery': 'nav.gallery',
  '/blogs': 'nav.blogs',
  '/contact': 'nav.contact',
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useTranslation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [pathname])

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b',
          scrolled || mobileOpen
            ? 'bg-white/95 backdrop-blur-md border-slate-200 shadow-sm py-2' 
            : 'bg-white/70 backdrop-blur-md border-white/20 py-4 shadow-sm'
        )}
      >
        {/* Top bar */}
        <div className={cn('border-b border-slate-200/30 transition-all duration-300', scrolled ? 'h-0 overflow-hidden opacity-0' : 'opacity-100')}>
          <div className="container-custom flex items-center justify-end gap-6 py-1.5">
            <a href="tel:9619439243" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-sky-600 transition-colors">
              <Phone size={11} />
              <span>9619439243</span>
            </a>
            <a href="mailto:rcrenterprises786@gmail.com" className="text-xs text-slate-500 hover:text-sky-600 transition-colors hidden sm:block">
              rcrenterprises786@gmail.com
            </a>
            <LanguageSwitcher />
          </div>
        </div>

        {/* Main nav */}
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-sky-100 bg-white">
                <Image src="/logo-3d.png" alt="RCR Logo" fill sizes="40px" className="object-cover p-1" />
              </div>
              <div>
                <div className="font-mono font-bold text-slate-900 text-sm tracking-widest leading-none">RCR</div>
                <div className="font-mono font-semibold text-sky-600 text-[10px] tracking-[0.2em] leading-none mt-0.5">ENTERPRISES</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg group',
                      isActive ? 'text-sky-600' : 'text-slate-600 hover:text-slate-900'
                    )}
                  >
                    {t(NAV_KEYS[item.href] || item.label)}
                    <span className={cn(
                      'absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-sky-500 rounded-full transition-all duration-300',
                      isActive ? 'w-4' : 'w-0 group-hover:w-4'
                    )} />
                  </Link>
                )
              })}
            </div>

            {/* CTA + Language Switcher for scrolled state */}
            <div className="hidden lg:flex items-center gap-3">
              <div className={cn('transition-all duration-300', scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none w-0')}>
                <LanguageSwitcher />
              </div>
              <Link href="/contact" className="btn-primary text-xs px-5 py-2.5">
                {t('nav.getQuote')}
                <ChevronRight size={14} />
              </Link>
            </div>

            {/* Mobile Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <LanguageSwitcher />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="relative w-10 h-10 flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X size={22} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu size={22} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-0 z-40 pt-20 pb-6 px-4 lg:hidden"
            style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(14,165,233,0.1)' }}
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item, i) => {
                const isActive = pathname === item.href
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all',
                        isActive
                          ? 'bg-sky-50 text-sky-600 border border-sky-200'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      )}
                    >
                      {t(NAV_KEYS[item.href] || item.label)}
                      <ChevronRight size={14} className="opacity-50" />
                    </Link>
                  </motion.div>
                )
              })}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-4 pt-4 border-t border-slate-200">
                <Link href="/contact" className="btn-primary w-full justify-center">
                  {t('nav.getQuote')}
                </Link>
                <a href="tel:9619439243" className="flex items-center justify-center gap-2 mt-3 text-sm text-slate-500">
                  <Phone size={14} className="text-sky-500" />
                  9619439243
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {mobileOpen && (
        <div className="fixed inset-0 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
    </>
  )
}
