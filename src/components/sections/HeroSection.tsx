'use client'

import { useState, useEffect } from 'react'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone, ChevronDown, Shield, Award, Clock } from 'lucide-react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { STATS } from '@/constants'
import { useTranslation } from '@/hooks/useTranslation'

const STAT_KEYS = ['stats.projectsCompleted', 'stats.happyClients', 'stats.skilledWorkforce', 'stats.yearsOfExperience']

export default function HeroSection() {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 })
  const [particles, setParticles] = useState<any[]>([])
  const { t } = useTranslation()

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10,
      }))
    )
  }, [])

  return (
    <section className="relative min-h-[100vh] lg:min-h-[85vh] flex flex-col overflow-hidden bg-slate-950">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/images/hero rcr.png")' }}
      />
      {/* Sharp Overlay - Dark Premium Look */}
      <div className="absolute inset-0 bg-slate-950/75" />

      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brandRed/10"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [-20, 20, -20], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      {/* Content */}
      <div className="relative z-10 container-custom pt-32 sm:pt-40 lg:pt-48 pb-20 flex-grow flex flex-col justify-center items-center text-center">
        <div className="max-w-4xl flex flex-col items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase bg-white/10 border border-white/20 text-white backdrop-blur-md shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brandRed animate-pulse shadow-[0_0_8px_rgba(192,30,46,0.8)]" />
              {t('hero.badge')}
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.08] mb-6 tracking-tight drop-shadow-md"
          >
            {t('hero.titleLine1')}{' '}
            <span className="text-brandRed drop-shadow-md">{t('hero.titleHighlight')}</span>
            {' '}{t('hero.titleAnd')}{' '}
            <br className="hidden md:block" />
            <span className="text-slate-200">{t('hero.titleLine2')}</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 drop-shadow"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row w-full max-w-sm sm:max-w-none justify-center gap-3 md:gap-4 mb-12"
          >
            <Link href="/contact" className="btn-primary w-full sm:w-auto px-8 py-4 text-sm justify-center">
              {t('nav.getQuote')}
              <ArrowRight size={16} />
            </Link>
            <a href="tel:9619439243" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold rounded-lg border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-md shadow-sm">
              <Phone size={16} />
              {t('hero.callBtn')}
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10"
          >
            {[
              { icon: Shield, text: t('hero.trustBadge1') },
              { icon: Award, text: t('hero.trustBadge2') },
              { icon: Clock, text: t('hero.trustBadge3') },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-xs text-white">
                <Icon size={12} className="text-brandRed" />
                {text}
              </div>
            ))}
          </motion.div>
        </div>

      </div>


    </section>
  )
}
