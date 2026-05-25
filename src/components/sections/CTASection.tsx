'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

export default function CTASection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/masonry_brick_work.png)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-sky-900/90 to-blue-900/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-transparent" />

      <div className="relative z-10 container-custom text-center max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono font-semibold tracking-widest uppercase bg-white/10 border border-white/20 text-white mb-6"
        >
          {t('cta.badge')}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-display font-bold text-white mb-5 leading-tight"
        >
          {t('cta.titleLine1')}{' '}
          <span className="text-sky-300">{t('cta.titleHighlight')}</span>{' '}
          {t('cta.titleLine2')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sky-100 text-lg mb-10 leading-relaxed"
        >
          {t('cta.subtitle')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-sm bg-white text-sky-700 hover:bg-sky-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            {t('cta.contactUs')} <ArrowRight size={16} />
          </Link>
          <a href="tel:9619439243" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-sm border-2 border-white/40 text-white hover:bg-white/10 transition-all">
            <Phone size={16} /> {t('cta.getQuote')}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
