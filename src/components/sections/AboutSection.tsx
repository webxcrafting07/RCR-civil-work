'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { STATS, SERVICES_LIST } from '@/constants'
import { useTranslation } from '@/hooks/useTranslation'

const SERVICES_PREVIEW = SERVICES_LIST.slice(0, 8)
const STAT_KEYS = ['stats.projectsCompleted', 'stats.happyClients', 'stats.skilledWorkforce', 'stats.yearsOfExperience']

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const { t } = useTranslation()

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <Image
                src="/images/rcc_steel_work.png"
                alt="RCR ENTERPRISES - Construction Work"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -right-6 glass-blue rounded-2xl p-5 border border-sky-200 bg-white shadow-blue"
            >
              <div className="text-3xl font-display font-bold text-sky-600">10+</div>
              <div className="text-xs text-slate-500 mt-0.5">{t('about.yearsOfExcellence')}</div>
            </motion.div>
            {/* Decorative element */}
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-xl border border-sky-200 opacity-50" />
          </motion.div>

          {/* Content column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-badge mb-4 inline-flex">{t('about.badge')}</span>
            <h2 className="section-title mb-6">
              {t('about.titleLine1')}{' '}
              <span className="text-gradient">{t('about.titleHighlight')}</span>
            </h2>
            <p className="text-slate-500 leading-relaxed mb-6">
              {t('about.description1')} <strong className="text-slate-800">{t('about.proprietorName')}</strong>{t('about.description1End')}
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              {t('about.description2Start')} <strong className="text-sky-600">{t('about.microEnterprise')}</strong> {t('about.description2End')}
            </p>

            {/* Services list */}
            <div className="grid grid-cols-2 gap-2 mb-8">
              {SERVICES_PREVIEW.map((s) => (
                <div key={s.id} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle size={14} className="text-sky-500 flex-shrink-0" />
                  {t(`servicesList.${s.id}.title`)}
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Link href="/about" className="btn-primary">
                {t('about.aboutUs')} <ArrowRight size={15} />
              </Link>
              <Link href="/contact" className="btn-outline">
                {t('about.contactUs')}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl border border-slate-200 bg-white hover:border-sky-300 transition-all duration-300 shadow-sm"
            >
              <div className="text-4xl lg:text-5xl font-display font-bold text-sky-600 mb-2">
                {inView ? <CountUp end={parseInt(stat.value)} duration={2.5 + i * 0.2} /> : '0'}
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
