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
                <div key={service._id} className="group rounded-2xl overflow-hidden border border-slate-200 hover:border-brandRed transition-all duration-300 bg-white shadow-sm hover:shadow-md">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={service.image || '/images/hero_construction_bg.png'} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-50/80 via-slate-50/20 to-transparent" />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-brandRed/90 flex items-center justify-center">
                      <Icon size={20} className="text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-slate-900 text-lg mb-3 group-hover:text-brandRed transition-colors">{service.title}</h3>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed mb-5">{service.shortDescription}</p>
                    <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-xs font-bold text-brandRed hover:text-navy hover:gap-3 transition-all">Learn More <ArrowRight size={13} /></Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  )
}
