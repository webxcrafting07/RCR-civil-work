import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Building2, HardHat, Layers, Columns2, Grid3X3, Hammer, Users, Home, Building, Wrench, Anchor } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import CTASection from '@/components/sections/CTASection'
import connectDB from '@/lib/mongodb'
import Service from '@/models/Service'

export const metadata: Metadata = {
  title: 'Our Services - RCC Construction Services | RCR ENTERPRISES',
  description: 'Explore all RCC and civil construction services by RCR ENTERPRISES.',
}

const ICON_MAP: Record<string, React.ElementType> = {
  Building2, HardHat, Layers, Columns: Columns2, Grid3x3: Grid3X3, Hammer, Users, Home, Building, Wrench, Anchor,
}

export default async function ServicesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'RCC and Civil Construction Services',
    provider: {
      '@type': 'LocalBusiness',
      name: 'RCR ENTERPRISES'
    },
    description: 'Complete RCC and civil construction solutions delivered with precision, quality, and commitment in Mumbai, Virar, and Palghar.'
  }

  await connectDB()
  const services = await Service.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero badge="What We Offer" title="Professional **Construction Services**" subtitle="Complete RCC and civil construction solutions delivered with precision, quality, and commitment." backgroundImage="/images/commercial_building.png" />
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service: any) => {
              const Icon = ICON_MAP[service.icon] || Building2
              return (
                <Link key={service._id} href={`/services/${service.slug}`} className="service-card group block h-full">
                  <div className="relative w-full h-48 rounded-xl overflow-hidden mb-5 border border-slate-200 bg-slate-50">
                    <Image src={service.image || '/images/hero_construction_bg.png'} alt={service.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-brandRed/90 flex items-center justify-center z-10 shadow-md">
                      <Icon size={20} className="text-white" />
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-slate-900 text-lg mb-3 group-hover:text-brandRed transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed mb-5 line-clamp-3">
                    {service.shortDescription}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-brandRed font-bold group-hover:text-navy transition-colors mt-auto">
                    Learn More <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at 50% 0%, rgba(192,30,46,0.04) 0%, transparent 70%)' }} />
                </Link>
              )
            })}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  )
}
