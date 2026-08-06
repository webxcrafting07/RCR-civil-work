'use client'

import { motion } from 'framer-motion'
import { Award, Shield, Clock, ClipboardCheck, IndianRupee, Handshake, HeartHandshake } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

const ICON_MAP: Record<string, React.ElementType> = {
  Award, Shield, Clock, ClipboardCheck, IndianRupee, Handshake, HeartHandshake,
}

const WHY_ITEMS = [
  { icon: 'Award', key: 'skilled' },
  { icon: 'Shield', key: 'quality' },
  { icon: 'Clock', key: 'timely' },
  { icon: 'ClipboardCheck', key: 'management' },
  { icon: 'IndianRupee', key: 'pricing' },
  { icon: 'Handshake', key: 'labour' },
  { icon: 'HeartHandshake', key: 'satisfaction' },
]

export default function WhyChooseUs() {
  const { t } = useTranslation()

  return (
    <section className="pt-12 lg:pt-16 pb-6 lg:pb-8 bg-slate-50 relative overflow-hidden z-0">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c01e2e, transparent)' }} />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-[0.03] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0b1a30, transparent)' }} />

      <div className="container-custom relative">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mb-4"
          >
            {t('whyChooseUs.badge')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            {t('whyChooseUs.titleLine1')} <span className="text-gradient">{t('whyChooseUs.titleHighlight')}</span> {t('whyChooseUs.titleLine2')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-700 font-medium leading-relaxed"
          >
            {t('whyChooseUs.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {WHY_ITEMS.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || Award
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-4 md:p-8 rounded-2xl border border-slate-200 bg-white hover:border-brandRed/30 hover:shadow-[0_20px_40px_-10px_rgba(192,30,46,0.15)] hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden flex flex-row md:flex-col items-start gap-4 md:gap-0"
              >
                {/* Top Sweeping Border */}
                <div className="absolute top-0 left-0 w-0 h-1 md:h-1.5 bg-brandRed group-hover:w-full transition-all duration-700 ease-out z-20" />
                
                {/* Large Background Number */}
                <div className="absolute -right-2 -bottom-4 md:-right-4 md:-bottom-6 text-[80px] md:text-[140px] font-display font-black text-slate-100/60 group-hover:text-brandRed/[0.04] group-hover:scale-110 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-all duration-700 pointer-events-none select-none z-0 leading-none">
                  {(i + 1).toString().padStart(2, '0')}
                </div>

                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-brandRed/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
                
                {/* Icon Box */}
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-brandRed/5 border border-brandRed/10 flex items-center justify-center md:mb-6 group-hover:bg-brandRed group-hover:border-brandRed group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_8px_25px_rgba(192,30,46,0.35)] relative z-10">
                  <Icon className="w-5 h-5 md:w-7 md:h-7 text-brandRed group-hover:text-white transition-colors duration-500" />
                </div>
                
                {/* Content */}
                <div className="flex-grow pt-0.5 md:pt-0">
                  <h3 className="font-display font-bold text-slate-900 text-base md:text-xl mb-1 md:mb-3 group-hover:text-brandRed transition-colors leading-snug relative z-10">{t(`whyChooseUs.items.${item.key}.title`)}</h3>
                  <p className="text-xs md:text-sm font-medium text-slate-600 leading-relaxed relative z-10 group-hover:text-slate-800 transition-colors">{t(`whyChooseUs.items.${item.key}.description`)}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
