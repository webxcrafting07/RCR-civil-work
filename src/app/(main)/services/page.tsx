import type { Metadata } from 'next'
import PageHero from '@/components/shared/PageHero'
import CTASection from '@/components/sections/CTASection'
import ServicesGrid from '@/components/shared/ServicesGrid'
import Translate from '@/components/shared/Translate'

export const metadata: Metadata = {
  title: 'Our Services - RCC Construction Services | RCR ENTERPRISES',
  description: 'Explore all RCC and civil construction services by RCR ENTERPRISES.',
}



export default function ServicesPage() {
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero 
        badge={<Translate tKey="services.badge" fallback="What We Offer" />} 
        title={<Translate tKey="services.titleHighlight" fallback="Professional Construction Services" />} 
        subtitle={<Translate tKey="services.subtitle" fallback="Complete RCC and civil construction solutions delivered with precision, quality, and commitment." />} 
        backgroundImage="/images/commercial_building.png" 
      />
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <ServicesGrid />
        </div>
      </section>
      <CTASection />
    </>
  )
}
