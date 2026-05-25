'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { STATS } from '@/constants'
import { useTranslation } from '@/hooks/useTranslation'

const STAT_KEYS = ['stats.projectsCompleted', 'stats.happyClients', 'stats.skilledWorkforce', 'stats.yearsOfExperience']

// ============================================================
// PAGE HERO
// ============================================================
import { ReactNode } from 'react'

interface PageHeroProps {
  badge?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  backgroundImage?: string
}

export default function PageHero({ badge, title, subtitle, backgroundImage }: PageHeroProps) {
  return (
    <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '45vh' }}>
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 hero-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-slate-50" />
        </>
      )}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-slate-50" />
      )}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="relative z-10 container-custom text-center py-20 pt-36 md:pt-40">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <span className="section-badge">{badge}</span>
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 mb-5 leading-tight max-w-4xl mx-auto"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}

// ============================================================
// STATS SECTION (exported separately)
// ============================================================
export function StatsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const { t } = useTranslation()

  return (
    <section className="py-16 bg-white" ref={ref}>
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="stat-card text-center bg-white border-slate-200"
            >
              <div className="text-4xl lg:text-5xl font-display font-bold text-sky-600 mb-2">
                {inView ? <CountUp end={parseInt(stat.value)} duration={2.5 + i * 0.2} separator="," /> : '0'}
                <span className="text-sky-400">{stat.suffix}</span>
              </div>
              <div className="text-sm text-slate-500">{t(STAT_KEYS[i])}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
