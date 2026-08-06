'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MessageSquare, ClipboardList, Package, HardHat, Star, CheckCircle } from 'lucide-react'
import { WORK_PROCESS } from '@/constants'
import { useTranslation } from '@/hooks/useTranslation'

const ICON_MAP: Record<string, React.ElementType> = {
  MessageSquare, ClipboardList, Package, HardHat, Star, CheckCircle,
}

const STEP_KEYS = ['consultation', 'planning', 'material', 'construction', 'finishing', 'delivery']

export default function ProcessSection() {
  const { t } = useTranslation()

  return (
    <section className="pt-10 lg:pt-16 pb-20 lg:pb-28 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="container-custom relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mb-4"
          >
            {t('process.badge')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            {t('process.titleLine1')} <span className="text-gradient">{t('process.titleHighlight')}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-700 font-medium"
          >
            {t('process.subtitle')}
          </motion.p>
        </div>

        {/* Desktop timeline */}
        <div className="hidden lg:flex items-start gap-0 relative group/timeline mt-8 mb-16 lg:mb-20">
          {/* Connector line */}
          <div className="absolute top-12 left-[calc(8.33%-20px)] right-[calc(8.33%-20px)] h-1 bg-gradient-to-r from-brandRed/0 via-brandRed/30 to-brandRed/0 shadow-[0_0_10px_rgba(192,30,46,0.2)]" />

          {WORK_PROCESS.map((step, i) => {
            const Icon = ICON_MAP[step.icon] || CheckCircle
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex-1 flex flex-col items-center text-center px-4 group"
              >
                {/* Circle with Image */}
                <div className="relative mb-6 z-10 w-24 h-24 group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-[0_15px_30px_-5px_rgba(192,30,46,0.15)] group-hover:shadow-[0_20px_40px_-5px_rgba(192,30,46,0.3)] transition-all duration-500 relative bg-white">
                    {step.image && (
                      <Image src={step.image} alt={t(`process.steps.${STEP_KEYS[i]}.title`)} fill sizes="96px" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    )}
                    <div className="absolute inset-0 bg-brandRed/0 group-hover:bg-brandRed/10 transition-colors duration-500" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-brandRed border-[3px] border-white flex items-center justify-center shadow-[0_5px_15px_rgba(192,30,46,0.4)] group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <span className="text-xs font-mono font-black text-white">{step.step}</span>
                  </div>
                </div>
                <h3 className="font-display font-bold text-slate-900 text-base mb-2 group-hover:text-brandRed transition-colors">{t(`process.steps.${STEP_KEYS[i]}.title`)}</h3>
                <p className="text-sm font-medium text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors">{t(`process.steps.${STEP_KEYS[i]}.description`)}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile timeline */}
        <div className="lg:hidden flex flex-col gap-8 mt-6 mb-16">
          {WORK_PROCESS.map((step, i) => {
            const Icon = ICON_MAP[step.icon] || CheckCircle
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 items-start group"
              >
                <div className="relative flex-shrink-0 w-20 h-20 group-hover:-translate-y-1 transition-transform duration-500 mt-1">
                  <div className="w-full h-full rounded-full overflow-hidden border-[3px] border-white shadow-[0_10px_25px_-5px_rgba(192,30,46,0.15)] bg-slate-100 group-hover:shadow-[0_15px_30px_-5px_rgba(192,30,46,0.25)] transition-all duration-500 relative">
                    {step.image && (
                      <Image src={step.image} alt={t(`process.steps.${STEP_KEYS[i]}.title`)} fill sizes="80px" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    )}
                  </div>
                  <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-brandRed border-2 border-white flex items-center justify-center shadow-[0_3px_10px_rgba(192,30,46,0.3)] z-10">
                    <span className="text-[11px] font-mono font-bold text-white">{step.step}</span>
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-brandRed/90 bg-brandRed/10 px-2.5 py-0.5 rounded-full uppercase tracking-widest">{t('process.step')} {step.step}</span>
                  </div>
                  <h3 className="font-display font-bold text-slate-900 text-base mb-1.5 group-hover:text-brandRed transition-colors">{t(`process.steps.${STEP_KEYS[i]}.title`)}</h3>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">{t(`process.steps.${STEP_KEYS[i]}.description`)}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
