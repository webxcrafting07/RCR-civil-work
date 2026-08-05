'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

export default function CTASection() {
  const { t } = useTranslation()

  return (
    <section className="py-24 relative overflow-hidden bg-slate-950">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
        style={{ backgroundImage: 'url(/images/masonry_brick_work.png)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/90 to-brandRed/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brandRed/20 via-transparent to-transparent" />

      {/* Decorative large circle */}
      <div className="absolute -top-[500px] -right-[500px] w-[1000px] h-[1000px] rounded-full bg-brandRed/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 container-custom text-center max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase bg-brandRed/10 border border-brandRed/30 text-white mb-8 shadow-[0_0_15px_rgba(192,30,46,0.3)]"
        >
          {t('cta.badge')}
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-6 leading-[1.1] tracking-tight"
        >
          {t('cta.titleLine1')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandRed to-red-400">{t('cta.titleHighlight')}</span><br/>
          {t('cta.titleLine2')}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 text-lg md:text-xl font-medium mb-12 leading-relaxed max-w-2xl mx-auto"
        >
          {t('cta.subtitle')}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-5"
        >
          <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-sm md:text-base bg-brandRed text-white hover:bg-red-700 transition-all shadow-[0_10px_30px_rgba(192,30,46,0.4)] hover:shadow-[0_15px_40px_rgba(192,30,46,0.6)] hover:-translate-y-1">
            {t('cta.contactUs')} <ArrowRight size={18} />
          </Link>
          <a href="tel:9619439243" className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-sm md:text-base border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all hover:-translate-y-1">
            <Phone size={18} /> {t('cta.getQuote')}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
