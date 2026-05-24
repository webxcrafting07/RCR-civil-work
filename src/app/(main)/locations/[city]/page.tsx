import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { TARGET_LOCATIONS, SERVICES_LIST, COMPANY_INFO } from '@/constants'
import { MapPin, ArrowRight, Phone } from 'lucide-react'
import HeroSection from '@/components/sections/HeroSection'

interface LocationPageProps {
  params: Promise<{ city: string }>
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const location = TARGET_LOCATIONS.find(loc => loc.slug === resolvedParams.city)
  
  if (!location) {
    return { title: 'Location Not Found' }
  }

  const title = `Top RCC Work Contractor in ${location.name} | Civil Construction & Slab Casting`
  const description = `Looking for the best RCC work contractor in ${location.name}? ${COMPANY_INFO.name} offers expert civil construction, slab casting, shuttering, and column & beam work in ${location.name}. Get a free quote today!`

  return {
    title,
    description,
    keywords: [`RCC contractor ${location.name}`, `civil construction ${location.name}`, `slab work ${location.name}`, `shuttering contractor ${location.name}`, `builders in ${location.name}`],
    openGraph: {
      title,
      description,
      url: `/locations/${location.slug}`,
      siteName: COMPANY_INFO.name,
      locale: 'en_IN',
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  return TARGET_LOCATIONS.map((loc) => ({
    city: loc.slug,
  }))
}

export default async function LocationPage({ params }: LocationPageProps) {
  const resolvedParams = await params
  const location = TARGET_LOCATIONS.find(loc => loc.slug === resolvedParams.city)

  if (!location) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    name: `${COMPANY_INFO.name} - ${location.name}`,
    description: `Expert RCC and Civil Construction services in ${location.name}.`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.name,
      addressRegion: 'Maharashtra',
      addressCountry: 'IN'
    },
    telephone: COMPANY_INFO.phone,
    areaServed: location.name
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* We reuse the HeroSection but visually the page acts as a local landing page */}
      <HeroSection />

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="section-badge mb-4">
              <MapPin size={14} className="text-sky-500" />
              Serving {location.name} & Surrounding Areas
            </span>
            <h2 className="section-title mb-6">
              Your Trusted RCC Construction Partner in <span className="text-sky-600">{location.name}</span>
            </h2>
            <p className="section-subtitle">
              {COMPANY_INFO.name} is proud to offer premium civil construction and RCC work services throughout {location.name}. 
              Whether you are planning a residential building or a commercial complex, our experienced team ensures structurally sound, 
              durable, and high-quality construction tailored to the local environment of {location.name}.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_LIST.slice(0, 6).map((service) => (
              <div key={service.id} className="service-card group">
                <div className="relative w-full h-40 rounded-xl overflow-hidden mb-6">
                  <Image src={service.image} alt={service.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">
                  {service.title} in {location.name}
                </h3>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                  We provide expert {service.title.toLowerCase()} services across {location.name}. {service.shortDescription}
                </p>
                <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 group-hover:text-sky-700">
                  Read More <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-20 glass-blue rounded-3xl p-8 md:p-12 text-center border border-sky-100">
            <h3 className="text-3xl font-display font-bold text-slate-900 mb-4">
              Start Your Project in {location.name} Today
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto mb-8">
              Contact us for a free site visit and cost estimation in {location.name}. We guarantee transparent pricing and superior quality.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                Get Free Quote
              </Link>
              <a href={`tel:${COMPANY_INFO.phone}`} className="btn-outline bg-white">
                <Phone size={18} className="text-sky-600" />
                Call: {COMPANY_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
