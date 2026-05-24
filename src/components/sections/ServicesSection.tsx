'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight, Building2, HardHat, Layers, Columns2,
  Grid3X3, Hammer, Users, Home, Building, Wrench, Anchor,
} from 'lucide-react'
import { SERVICES_LIST } from '@/constants'

const ICON_MAP: Record<string, React.ElementType> = {
  Building2, HardHat, Layers, Columns: Columns2, Grid3x3: Grid3X3,
  Hammer, Users, Home, Building, Wrench, Anchor,
}

export default function ServicesSection() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-badge mb-4 inline-flex">
            What We Offer
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="section-title mb-4">
            Our <span className="text-gradient">Construction Services</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="section-subtitle text-center">
            From RCC work to complete civil construction, we deliver quality solutions tailored to your project needs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SERVICES_LIST.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || Building2
            return (
              <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
                <Link href={`/services/${service.slug}`} className="service-card group block h-full">
                  <div className="relative w-full h-36 rounded-xl overflow-hidden mb-4 border border-sky-100 bg-sky-50/50">
                    {service.image && (
                      <Image src={service.image} alt={service.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="font-display font-semibold text-slate-900 text-base mb-2 group-hover:text-sky-600 transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">{service.shortDescription}</p>
                  <div className="flex items-center gap-1.5 text-xs text-sky-500/60 group-hover:text-sky-600 transition-colors font-medium">
                    Read More <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle at 50% 0%, rgba(14,165,233,0.04) 0%, transparent 70%)' }} />
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-12">
          <Link href="/services" className="btn-primary inline-flex">
            View All Services <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
