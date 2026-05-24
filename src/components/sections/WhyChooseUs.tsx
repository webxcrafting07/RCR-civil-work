'use client'

import { motion } from 'framer-motion'
import { Award, Shield, Clock, ClipboardCheck, IndianRupee, Handshake, HeartHandshake } from 'lucide-react'
import { WHY_CHOOSE_US } from '@/constants'

const ICON_MAP: Record<string, React.ElementType> = {
  Award, Shield, Clock, ClipboardCheck, IndianRupee, Handshake, HeartHandshake,
}

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #0ea5e9, transparent)' }} />

      <div className="container-custom relative">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mb-4"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            The <span className="text-gradient">RCR Enterprises</span> Advantage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 leading-relaxed"
          >
            We deliver uncompromising safety, speed, and structural integrity, setting the benchmark for civil contracting in Maharashtra.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || Award
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50/50 transition-all duration-400 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-100 to-sky-50 flex items-center justify-center mb-4 group-hover:from-sky-200 transition-all">
                  <Icon size={22} className="text-sky-500" />
                </div>
                <h3 className="font-display font-semibold text-slate-900 text-sm mb-2 leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
