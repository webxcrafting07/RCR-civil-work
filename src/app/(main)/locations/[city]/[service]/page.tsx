import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { TARGET_LOCATIONS, SERVICES_LIST, COMPANY_INFO } from '@/constants'
import { 
  MapPin, 
  ArrowRight, 
  Phone, 
  Shield, 
  Award, 
  Clock, 
  ChevronRight, 
  ChevronDown,
  HelpCircle,
  Building2,
  Check,
  Hammer,
  HardHat
} from 'lucide-react'

interface ServiceLocationPageProps {
  params: Promise<{ city: string; service: string }>
}

const REGIONS = [
  {
    name: 'Western Suburbs & Palghar',
    cities: ['Mumbai', 'Churchgate', 'Marine Lines', 'Charni Road', 'Grant Road', 'Mumbai Central', 'Mahalaxmi', 'Lower Parel', 'Prabhadevi', 'Dadar', 'Mahim', 'Bandra', 'Khar', 'Santacruz', 'Vile Parle', 'Andheri', 'Jogeshwari', 'Goregaon', 'Malad', 'Kandivali', 'Borivali', 'Dahisar', 'Mira Road', 'Bhayandar', 'Naigaon', 'Vasai', 'Nalasopara', 'Virar', 'Palghar', 'Boisar']
  },
  {
    name: 'Central Suburbs & Thane',
    cities: ['CSMT', 'Byculla', 'Parel', 'Matunga', 'Sion', 'Kurla', 'Vidyavihar', 'Ghatkopar', 'Vikhroli', 'Kanjurmarg', 'Bhandup', 'Nahur', 'Mulund', 'Thane', 'Kalwa', 'Mumbra', 'Diva', 'Dombivli', 'Thakurli', 'Kalyan', 'Ulhasnagar', 'Ambernath', 'Badlapur', 'Titwala']
  },
  {
    name: 'Harbour Line & Navi Mumbai',
    cities: ['Wadala', 'Chunabhatti', 'Chembur', 'Govandi', 'Mankhurd', 'Navi Mumbai', 'Vashi', 'Sanpada', 'Juinagar', 'Nerul', 'Seawoods', 'Belapur', 'Kharghar', 'Panvel']
  },
  {
    name: 'South Mumbai & Key Areas',
    cities: ['South Mumbai', 'Worli', 'Powai']
  }
]

function getRelatedLocationsForService(currentCityName: string) {
  const region = REGIONS.find(r => r.cities.includes(currentCityName))
  if (!region) return []
  const otherCityNames = region.cities.filter(name => name !== currentCityName)
  return TARGET_LOCATIONS.filter(loc => otherCityNames.includes(loc.name)).slice(0, 6)
}

export async function generateMetadata({ params }: ServiceLocationPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const location = TARGET_LOCATIONS.find(loc => loc.slug === resolvedParams.city)
  const service = SERVICES_LIST.find(s => s.slug === resolvedParams.service)
  
  if (!location || !service) {
    return { title: 'Not Found' }
  }

  const title = `Top ${service.title} in ${location.name} | RCC & Civil Work`
  const description = `Need trusted ${service.title.toLowerCase()} in ${location.name}? ${COMPANY_INFO.name} offers certified structural RCC solutions, premium concrete slab casting, and formwork shuttering in ${location.name}. Get a free quote today!`

  return {
    title,
    description,
    keywords: [
      `${service.title} in ${location.name}`,
      `${service.title} contractor ${location.name}`,
      `${location.name} ${service.title.toLowerCase()}`,
      `RCC work ${location.name}`,
      `civil construction ${location.name}`,
      `RCR Enterprises ${location.name}`,
      `best slab casting ${location.name}`
    ],
    openGraph: {
      title,
      description,
      url: `/locations/${location.slug}/${service.slug}`,
      siteName: COMPANY_INFO.name,
      locale: 'en_IN',
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  const params: Array<{ city: string; service: string }> = []
  TARGET_LOCATIONS.forEach((loc) => {
    SERVICES_LIST.forEach((s) => {
      params.push({
        city: loc.slug,
        service: s.slug,
      })
    })
  })
  return params
}

export default async function ServiceLocationPage({ params }: ServiceLocationPageProps) {
  const resolvedParams = await params
  const location = TARGET_LOCATIONS.find(loc => loc.slug === resolvedParams.city)
  const service = SERVICES_LIST.find(s => s.slug === resolvedParams.service)

  if (!location || !service) {
    notFound()
  }

  const relatedLocations = getRelatedLocationsForService(location.name)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://rcrenterprises.in'

  // Dynamic FAQs tailored to specific Service + Location
  const faqs = [
    {
      q: `What is the estimated cost of ${service.title} in ${location.name}?`,
      a: `The budget for ${service.title.toLowerCase()} in ${location.name} is determined by structural thickness, total carpet area, reinforcement rebar density, concrete grade selection (M20, M25, etc.), and site elevation. At RCR Enterprises, we offer itemized, competitive pricing with no hidden charges. Contact proprietor Noor Alam Shaikh at +91 96194 39243 for a free, transparent site evaluation.`
    },
    {
      q: `Why choose RCR Enterprises as your local ${service.title} contractor in ${location.name}?`,
      a: `RCR Enterprises is a government-registered enterprise (GST: ${COMPANY_INFO.registration.gstNo}) carrying over 10 years of structural engineering mastery. We guarantee highly precise steel binding grids, leak-proof formwork alignment using high-end plywood/MS props, and perfect structural compactness to ensure that your building's skeleton is durable and corrosion-resistant.`
    },
    {
      q: `Do you provide customized labor or turnkey contracts for ${service.title} in ${location.name}?`,
      a: `Yes! We provide complete turnkey civil works (including premium materials procurement and site management) as well as custom labor-only contract services for ${service.title.toLowerCase()} in ${location.name}, fully adaptable to your budget and building requirements.`
    }
  ]

  // Multi-layered schema injections
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'GeneralContractor',
      name: `${COMPANY_INFO.name} - ${service.title} in ${location.name}`,
      description: `Expert ${service.title.toLowerCase()} services in ${location.name}. High-tensile steel works, slab concrete pours, and structural framing.`,
      image: `${baseUrl}${service.image}`,
      telephone: COMPANY_INFO.phone,
      email: COMPANY_INFO.email,
      url: `${baseUrl}/locations/${location.slug}/${service.slug}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: location.name,
        addressRegion: 'Maharashtra',
        addressCountry: 'IN'
      },
      areaServed: {
        '@type': 'Place',
        name: location.name
      },
      priceRange: '₹₹',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '36',
        ratingCount: '48',
        bestRating: '5',
        worstRating: '1'
      },
      knowsAbout: [service.title, 'RCC Work', 'Civil Construction', 'Structural Engineering']
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: baseUrl
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Locations',
          item: `${baseUrl}/locations`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: location.name,
          item: `${baseUrl}/locations/${location.slug}`
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: service.title,
          item: `${baseUrl}/locations/${location.slug}/${service.slug}`
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a
        }
      }))
    }
  ]

  const encodedWaText = encodeURIComponent(
    `Hi RCR Enterprises, I am looking for expert "${service.title}" services in ${location.name}. Let's schedule a site inspection and quote.`
  )
  const whatsappUrl = `https://wa.me/919619439243?text=${encodedWaText}`

  return (
    <>
      {/* Dynamic JSON-LD Schemas */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Double Breadcrumbs Trail */}
      <div className="bg-slate-900/60 border-b border-slate-800 backdrop-blur-md sticky top-[72px] z-30">
        <div className="container-custom max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-2 text-[10px] font-mono tracking-wider text-slate-400">
          <Link href="/" className="hover:text-sky-400 transition-colors uppercase">Home</Link>
          <ChevronRight size={10} className="text-slate-600 flex-shrink-0" />
          <Link href="/locations" className="hover:text-sky-400 transition-colors uppercase">Locations</Link>
          <ChevronRight size={10} className="text-slate-600 flex-shrink-0" />
          <Link href={`/locations/${location.slug}`} className="hover:text-sky-400 transition-colors uppercase">{location.name}</Link>
          <ChevronRight size={10} className="text-slate-600 flex-shrink-0" />
          <span className="text-sky-400 font-bold uppercase tracking-widest truncate">{service.title}</span>
        </div>
      </div>

      {/* Premium Spotlight Hero */}
      <section className="relative min-h-[80vh] flex flex-col justify-center items-center overflow-hidden bg-slate-950 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity scale-105"
          style={{ backgroundImage: `url(${service.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950" />
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[130px] -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

        <div className="relative z-10 container-custom max-w-5xl mx-auto px-4 py-20 text-center">
          {/* Badge indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 font-semibold text-xs tracking-wider uppercase mb-8">
            <HardHat size={14} className="animate-bounce" />
            Specialized {service.title} Services
          </div>

          {/* Hyper-Targeted H1 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black leading-tight tracking-tight mb-8">
            Top-Rated {service.title} in <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-sky-300">
              {location.name}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
            RCR Enterprises offers enterprise-grade <span className="text-white font-bold">{service.title.toLowerCase()}</span> solutions across <span className="text-sky-400 font-semibold">{location.name}</span>. Built strictly to BIS structural specifications and IS codes, our slab casting, column-beam framework, shuttering, and turnkey civil construction guarantee pristine concrete finishes and maximum load endurance.
          </p>

          {/* conversion button metrics */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-sky-500/20 transition-all hover:-translate-y-0.5 group"
            >
              Request Free Estimate
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-emerald-400">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Chat About {service.title}
            </a>
          </div>

          {/* Quick trust metrics row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto pt-10 border-t border-slate-800">
            {[
              { icon: Shield, title: 'Code Compliant', desc: `IS 456 Structure Design` },
              { icon: Award, title: '100% Quality Mix', desc: 'M20, M25, M30 Concrete' },
              { icon: Clock, title: 'No Timelines Delay', desc: 'Supervised Work Schedule' },
              { icon: Building2, title: 'Udyam Certified', desc: `Reg: MH33A0170011` },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 mb-3 border border-sky-500/20">
                  <item.icon size={18} />
                </div>
                <h3 className="text-xs font-bold text-white tracking-wide uppercase mb-1">{item.title}</h3>
                <p className="text-[10px] text-slate-400 leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Technical Specifications Table */}
      <section className="py-24 bg-slate-950 text-white relative border-t border-slate-900">
        <div className="container-custom max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Spec details columns */}
            <div className="lg:col-span-7">
              <span className="text-xs font-mono tracking-widest text-sky-500 uppercase font-semibold mb-3 block">
                Engineering Specs
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight mb-6">
                Engineered for Infinite Longevity in <span className="text-sky-400">{location.name}</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                RCR Enterprises strictly implements standardized structural practices. For our <span className="text-white font-medium">{service.title.toLowerCase()}</span> inside <span className="text-white font-medium">{location.name}</span>, we inspect all parameters, ranging from steel binding grids to moisture control, to ensure structural strength.
              </p>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
                By utilizing precise geometric shuttering formwork and state-certified high-tensile steel, we ensure zero bleedings or structural voids, leading to perfectly smooth concrete column-beam outlines and robust slab loads.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href={`tel:${COMPANY_INFO.phone}`} className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition-all">
                  <Phone size={16} />
                  Call: +91 {COMPANY_INFO.phone}
                </a>
                <Link href={`/services/${service.slug}`} className="inline-flex items-center justify-center gap-2 border border-slate-800 hover:border-slate-700 bg-slate-900/40 text-slate-300 font-bold px-6 py-3.5 rounded-xl transition-all hover:text-white">
                  General Service Guide
                </Link>
              </div>
            </div>

            {/* Premium specifications matrix */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-500 to-blue-600 blur-lg opacity-25 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-3xl overflow-hidden shadow-2xl">
                <h3 className="text-xl font-display font-black text-white mb-6 border-b border-slate-800 pb-4">
                  {service.title} Parameters
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Curing Duration', value: '7 to 14 Days (Continuous Water)' },
                    { label: 'Steel Reinforcements', value: 'Fe 550D TMT Certified Bars' },
                    { label: 'Formwork Shuttering', value: '12mm Waterproof Plywood / MS' },
                    { label: 'Concrete Pour Grade', value: 'M20, M25, M30 Compliance' },
                    { label: 'Supervision Duty', value: 'Master-Mason Site Inspector' }
                  ].map((row, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs border-b border-slate-800/40 pb-3 last:border-0 last:pb-0">
                      <span className="text-slate-400 font-mono">{row.label}</span>
                      <span className="text-sky-400 font-bold">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Structural Benefits Section */}
      <section className="py-24 bg-slate-950 border-t border-slate-900 text-white relative">
        <div className="container-custom max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest text-sky-500 uppercase font-semibold mb-3 block">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
              Professional Workmanship Benefits in <span className="text-sky-400">{location.name}</span>
            </h2>
            <p className="text-slate-400 mt-4 text-sm">
              We focus on absolute quality control and structural safety metrics to build structural marvels.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'High-Tensile Grid Alignment',
                desc: `We layout structural steel reinforcements with maximum spacing accuracy, binding with high-grade wires to guarantee high load resistance.`
              },
              {
                title: 'Certified Code Compliance',
                desc: `Every column, beam, and slab poured inside ${location.name} strictly follows Bureau of Indian Standards (BIS) parameters.`
              },
              {
                title: 'Waterproof Formwork Geometry',
                desc: 'Perfect shuttering seals prevent slurry leaks and voids, yielding maximum concrete density and pristine geometric finishes.'
              }
            ].map((benefit, index) => (
              <div 
                key={index} 
                className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl relative overflow-hidden group hover:border-slate-700/80 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 mb-6 border border-sky-500/20">
                  <Check size={20} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 font-display">{benefit.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic FAQs Section */}
      <section className="py-24 bg-slate-950 border-t border-slate-900 relative">
        <div className="container-custom max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-xs font-mono tracking-widest text-sky-500 uppercase font-semibold mb-3 block">FAQ Guide</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
              FAQs on {service.title} in <span className="text-sky-400">{location.name}</span>
            </h2>
            <p className="text-slate-400 mt-4 text-sm">
              Get detailed, local structural guidance regarding concrete slab pouring, formwork shuttering, and pricing.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details 
                key={index} 
                className="group bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all cursor-pointer overflow-hidden list-none block"
              >
                <summary className="flex justify-between items-center font-bold text-sm sm:text-base text-white tracking-wide select-none list-none [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center gap-3.5 pr-4 text-left">
                    <HelpCircle size={18} className="text-sky-400 flex-shrink-0" />
                    {faq.q}
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-open:text-sky-400 group-open:bg-sky-500/10 group-open:rotate-180 transition-all flex-shrink-0 border border-slate-800">
                    <ChevronDown size={14} />
                  </div>
                </summary>
                <div className="mt-4 pt-4 border-t border-slate-800/60 text-xs sm:text-sm text-slate-400 leading-relaxed pl-8 text-left cursor-default">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Spiderweb Crawler Linking Mesh Section */}
      {relatedLocations.length > 0 && (
        <section className="py-20 bg-slate-950 border-t border-slate-900 relative">
          <div className="container-custom max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-xs font-mono tracking-widest text-slate-500 uppercase font-semibold mb-8 flex items-center justify-center gap-3">
              <span className="w-6 h-px bg-slate-800" />
              {service.title} in Nearby Regions
              <span className="w-6 h-px bg-slate-800" />
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {relatedLocations.map((loc) => (
                <Link 
                  key={loc.slug} 
                  href={`/locations/${loc.slug}/${service.slug}`}
                  className="bg-slate-900/30 border border-slate-800 hover:border-sky-500/30 text-xs font-medium text-slate-400 hover:text-sky-400 py-3.5 px-4 rounded-xl transition-all text-center hover:-translate-y-0.5 hover:shadow-md hover:shadow-sky-500/[0.01]"
                >
                  {service.title} in {loc.name}
                </Link>
              ))}
            </div>
            
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs">
              <Link 
                href={`/locations/${location.slug}`}
                className="font-bold text-sky-400 hover:text-white transition-colors underline decoration-sky-400/20 underline-offset-8"
              >
                View all RCC Work in {location.name}
              </Link>
              <span className="text-slate-700">|</span>
              <Link 
                href="/locations" 
                className="font-bold text-sky-400 hover:text-white transition-colors underline decoration-sky-400/20 underline-offset-8"
              >
                All Served Maharashtra Cities
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Structural Call-to-action */}
      <section className="py-16 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] bg-sky-500/5 rounded-full blur-[90px] -translate-x-1/2 -translate-y-1/2" />
        <div className="container-custom max-w-4xl mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-b from-slate-900 to-slate-900/50 border border-slate-800/90 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white mb-4">
              Schedule Your Site Audit in {location.name}
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto mb-8 text-xs sm:text-sm leading-relaxed">
              Plan your structural layout with precision-grade {service.title.toLowerCase()} from RCR Enterprises. Contact Noor Alam Shaikh for an expert local cost assessment today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link 
                href="/contact" 
                className="w-full sm:w-auto inline-flex items-center justify-center bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all"
              >
                Request Consultation
              </Link>
              <a 
                href={`tel:${COMPANY_INFO.phone}`} 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all"
              >
                <Phone size={16} className="text-sky-400" />
                Call +91 {COMPANY_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
