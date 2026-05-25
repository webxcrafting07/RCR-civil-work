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
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
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
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-slate-50">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero_construction_bg.png)' }}
      />
      {/* Sharp Overlay - Only one clean gradient */}
      <div className="absolute inset-0 bg-white/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />

      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-sky-400/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [-20, 20, -20], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Content */}
      <div className="relative z-10 container-custom pt-36 lg:pt-44 pb-16 flex-grow flex flex-col justify-center items-center text-center">
        <div className="max-w-4xl flex flex-col items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="section-badge inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
              {t('hero.badge')}
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-slate-900 leading-[1.08] mb-6 tracking-tight"
          >
            {t('hero.titleLine1')}{' '}
            <span className="text-gradient">{t('hero.titleHighlight')}</span>
            {' '}{t('hero.titleAnd')}{' '}
            <br className="hidden md:block" />
            <span className="text-slate-600">{t('hero.titleLine2')}</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Link href="/contact" className="btn-primary px-8 py-4 text-sm">
              {t('nav.getQuote')}
              <ArrowRight size={16} />
            </Link>
            <a href="tel:9619439243" className="btn-outline px-8 py-4 text-sm bg-white/50 backdrop-blur-sm">
              <Phone size={16} />
              {t('hero.callBtn')}
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {[
              { icon: Shield, text: t('hero.trustBadge1') },
              { icon: Award, text: t('hero.trustBadge2') },
              { icon: Clock, text: t('hero.trustBadge3') },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-slate-700">
                <Icon size={12} className="text-sky-500" />
                {text}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl w-full"
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="stat-card bg-white/80 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-display font-bold text-sky-600 leading-none mb-1">
                {inView ? (
                  <CountUp end={parseInt(stat.value)} duration={2 + i * 0.3} separator="," />
                ) : '0'}
                <span className="text-sky-400">{stat.suffix}</span>
              </div>
              <div className="text-xs text-slate-500 font-medium leading-snug">{t(STAT_KEYS[i])}</div>
            </div>
          ))}
        </motion.div>
      </div>


    </section>
  )
}
