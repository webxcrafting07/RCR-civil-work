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
    <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
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
            className="text-slate-500"
          >
            {t('process.subtitle')}
          </motion.p>
        </div>

        {/* Desktop timeline */}
        <div className="hidden lg:flex items-start gap-0 relative">
          {/* Connector line */}
          <div className="absolute top-8 left-[calc(8.33%-20px)] right-[calc(8.33%-20px)] h-0.5 bg-gradient-to-r from-sky-400/0 via-sky-400/40 to-sky-400/0" />

          {WORK_PROCESS.map((step, i) => {
            const Icon = ICON_MAP[step.icon] || CheckCircle
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex-1 flex flex-col items-center text-center px-4"
              >
                {/* Circle with Image */}
                <div className="relative mb-5 z-10 w-20 h-20">
                  <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-blue relative">
                    {step.image && (
                      <Image src={step.image} alt={t(`process.steps.${STEP_KEYS[i]}.title`)} fill sizes="80px" className="object-cover" />
                    )}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-sky-500 border-2 border-white flex items-center justify-center shadow-sm">
                    <span className="text-[10px] font-mono font-bold text-white">{step.step}</span>
                  </div>
                </div>
                <h3 className="font-display font-semibold text-slate-900 text-sm mb-2">{t(`process.steps.${STEP_KEYS[i]}.title`)}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{t(`process.steps.${STEP_KEYS[i]}.description`)}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile timeline */}
        <div className="lg:hidden flex flex-col gap-6">
          {WORK_PROCESS.map((step, i) => {
            const Icon = ICON_MAP[step.icon] || CheckCircle
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-blue bg-slate-100">
                  {step.image && (
                    <Image src={step.image} alt={t(`process.steps.${STEP_KEYS[i]}.title`)} fill sizes="64px" className="object-cover" />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-sky-500/60">{t('process.step')} {step.step}</span>
                  </div>
                  <h3 className="font-display font-semibold text-slate-900 text-sm mb-1">{t(`process.steps.${STEP_KEYS[i]}.title`)}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{t(`process.steps.${STEP_KEYS[i]}.description`)}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
