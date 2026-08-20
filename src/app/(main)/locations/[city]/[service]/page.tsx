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

function getDeterministicIndex(str: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % max;
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

      <main className="min-h-screen bg-white">
        {/* Top Spacer to prevent fixed Navbar overlap */}
        <div className="h-[100px] lg:h-[120px] bg-white" />

        {/* Double Breadcrumbs Trail */}
      <div className="bg-white/90 border-b border-slate-200 backdrop-blur-md sticky top-[80px] lg:top-[88px] z-30">
        <div className="container-custom max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-2 text-[10px] font-mono tracking-wider text-slate-500">
          <Link href="/" className="hover:text-brandRed transition-colors uppercase">Home</Link>
          <ChevronRight size={10} className="text-slate-300 flex-shrink-0" />
          <Link href="/locations" className="hover:text-brandRed transition-colors uppercase">Locations</Link>
          <ChevronRight size={10} className="text-slate-300 flex-shrink-0" />
          <Link href={`/locations/${location.slug}`} className="hover:text-brandRed transition-colors uppercase">{location.name}</Link>
          <ChevronRight size={10} className="text-slate-300 flex-shrink-0" />
          <span className="text-brandRed font-bold uppercase tracking-widest truncate">{service.title}</span>
        </div>
      </div>

      {/* Premium Spotlight Hero (Dark Theme with Red Accents like Services Page) */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-slate-950">
          <Image src={service.image || '/images/hero_construction_bg.png'} alt={service.title} fill className="object-cover opacity-40" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/40" />
        </div>

        <div className="relative z-10 container-custom max-w-5xl mx-auto px-4 text-center mt-6">
          {/* Badge indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-slate-300 text-[10px] font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brandRed animate-pulse" />
            Specialized Services
          </div>

          {/* Hyper-Targeted H1 */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-6 tracking-tight">
            Top-Rated {service.title} in <br className="hidden sm:block" />
            <span className="text-brandRed">
              {location.name}
            </span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-12">
            {[
              `RCR Enterprises offers enterprise-grade ${service.title.toLowerCase()} solutions across ${location.name}. Built strictly to BIS structural specifications and IS codes, our slab casting, column-beam framework, shuttering, and turnkey civil construction guarantee pristine concrete finishes and maximum load endurance.`,
              `Looking for reliable ${service.title.toLowerCase()} in ${location.name}? Our seasoned engineers at RCR Enterprises deliver world-class structural execution. We adhere to the highest IS safety standards, ensuring that every inch of concrete and steel we lay withstands the test of time.`,
              `As the leading provider of ${service.title.toLowerCase()} in the ${location.name} region, RCR Enterprises brings decades of combined expertise. From high-tensile steel grids to leak-proof shuttering, we manage all phases of civil construction with absolute precision and transparency.`
            ][getDeterministicIndex(location.slug + service.slug + 'hero', 3)]}
          </p>

          {/* conversion button metrics */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <Link 
              href="/contact" 
              className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl shadow-xl hover:-translate-y-0.5 group border border-transparent"
            >
              Request Free Estimate
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 hover:border-slate-600 font-bold px-8 py-4 rounded-xl shadow-sm transition-all hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-emerald-500">
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
                <div className="w-10 h-10 rounded-xl bg-brandRed/20 flex items-center justify-center text-brandRed mb-3 border border-brandRed/30 backdrop-blur-sm">
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
      <section className="py-24 bg-white relative">
        <div className="container-custom max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Spec details columns */}
            <div className="lg:col-span-7">
              <span className="text-xs font-mono tracking-widest text-brandRed uppercase font-semibold mb-3 block">
                Engineering Specs
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight mb-6 text-slate-900">
                Engineered for Infinite Longevity in <span className="text-brandRed whitespace-nowrap">{location.name}</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                {[
                  `RCR Enterprises strictly implements standardized structural practices. For our ${service.title.toLowerCase()} inside ${location.name}, we inspect all parameters, ranging from steel binding grids to moisture control, to ensure structural strength.`,
                  `Executing flawless ${service.title.toLowerCase()} in ${location.name} requires deep technical oversight. Our master masons and structural engineers rigorously verify concrete grades, steel alignment, and curing periods to achieve unmatched building strength.`,
                  `In ${location.name}, we approach every ${service.title.toLowerCase()} project with meticulous detail. By strictly enforcing code-compliant measurements and robust material selection, we protect your structure from environmental and load-bearing stresses.`
                ][getDeterministicIndex(location.slug + service.slug + 'spec1', 3)]}
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                {[
                  `By utilizing precise geometric shuttering formwork and state-certified high-tensile steel, we ensure zero bleedings or structural voids, leading to perfectly smooth concrete column-beam outlines and robust slab loads.`,
                  `Our advanced formwork techniques completely prevent slurry leakage, ensuring that the concrete retains its designed M-grade density. This results in heavy-duty slabs and columns that maintain lifelong integrity.`,
                  `We use exclusively premium 12mm waterproof plywood and MS steel plates for our shuttering layouts, eliminating honeycombing and guaranteeing that the final concrete finish is aesthetically and structurally perfect.`
                ][getDeterministicIndex(location.slug + service.slug + 'spec2', 3)]}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href={`tel:${COMPANY_INFO.phone}`} className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl transition-all shadow-md">
                  <Phone size={16} />
                  Call: +91 {COMPANY_INFO.phone}
                </a>
                <Link href={`/services/${service.slug}`} className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-brandRed hover:text-brandRed text-slate-700 font-bold px-6 py-3.5 rounded-xl transition-all shadow-sm">
                  General Service Guide
                </Link>
              </div>
            </div>

            {/* Premium specifications matrix */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-2 bg-gradient-to-br from-brandRed/5 to-transparent rounded-[32px] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white border border-slate-100 p-8 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
                <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-5">
                  <div className="w-12 h-12 rounded-2xl bg-brandRed/10 flex items-center justify-center text-brandRed">
                    <Check size={24} />
                  </div>
                  <h3 className="text-xl font-display font-black text-slate-900 leading-tight">
                    {service.title} <br/> Parameters
                  </h3>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Curing Duration', value: '7 to 14 Days (Continuous Water)' },
                    { label: 'Steel Reinforcements', value: 'Fe 550D TMT Certified Bars' },
                    { label: 'Formwork Shuttering', value: '12mm Waterproof Plywood / MS' },
                    { label: 'Concrete Pour Grade', value: 'M20, M25, M30 Compliance' },
                    { label: 'Supervision Duty', value: 'Master-Mason Site Inspector' }
                  ].map((row, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs sm:text-sm border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                      <span className="text-slate-500 font-medium">{row.label}</span>
                      <span className="text-slate-900 font-bold text-right">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Structural Benefits Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200 relative">
        <div className="container-custom max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest text-brandRed uppercase font-semibold mb-3 block">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900">
              Professional Workmanship Benefits in <span className="text-brandRed">{location.name}</span>
            </h2>
            <p className="text-slate-600 mt-4 text-sm">
              {[
                `We focus on absolute quality control and structural safety metrics to build structural marvels.`,
                `Delivering flawless execution and uncompromising safety for every client we serve.`,
                `Partner with us to experience hassle-free construction driven by strict engineering standards.`
              ][getDeterministicIndex(location.slug + service.slug + 'benefit', 3)]}
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
                className="bg-white border border-slate-200 p-8 rounded-3xl relative overflow-hidden group hover:border-brandRed/30 hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-brandRed/10 flex items-center justify-center text-brandRed mb-6 border border-brandRed/20">
                  <Check size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 font-display">{benefit.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic FAQs Section */}
      <section className="py-24 bg-white border-t border-slate-200 relative">
        <div className="container-custom max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-xs font-mono tracking-widest text-brandRed uppercase font-semibold mb-3 block">FAQ Guide</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900">
              FAQs on {service.title} in <span className="text-brandRed">{location.name}</span>
            </h2>
            <p className="text-slate-600 mt-4 text-sm">
              Get detailed, local structural guidance regarding concrete slab pouring, formwork shuttering, and pricing.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details 
                key={index} 
                className="group bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-brandRed/30 hover:shadow-sm transition-all cursor-pointer overflow-hidden list-none block"
              >
                <summary className="flex justify-between items-center font-bold text-sm sm:text-base text-slate-900 tracking-wide select-none list-none [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center gap-3.5 pr-4 text-left">
                    <HelpCircle size={18} className="text-brandRed flex-shrink-0" />
                    {faq.q}
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 group-open:text-brandRed group-open:bg-red-50 group-open:rotate-180 transition-all flex-shrink-0 border border-slate-200">
                    <ChevronDown size={14} />
                  </div>
                </summary>
                <div className="mt-4 pt-4 border-t border-slate-200 text-xs sm:text-sm text-slate-600 leading-relaxed pl-8 text-left cursor-default">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Spiderweb Crawler Linking Mesh Section */}
      {relatedLocations.length > 0 && (
        <section className="py-20 bg-slate-50 border-t border-slate-200 relative">
          <div className="container-custom max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-xs font-mono tracking-widest text-slate-500 uppercase font-semibold mb-8 flex items-center justify-center gap-3">
              <span className="w-6 h-px bg-slate-300" />
              {service.title} in Nearby Regions
              <span className="w-6 h-px bg-slate-300" />
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {relatedLocations.map((loc) => (
                <Link 
                  key={loc.slug} 
                  href={`/locations/${loc.slug}/${service.slug}`}
                  className="bg-white border border-slate-200 hover:border-brandRed/30 text-xs font-medium text-slate-600 hover:text-brandRed py-3.5 px-4 rounded-xl transition-all text-center hover:-translate-y-0.5 hover:shadow-sm hover:shadow-brandRed/5"
                >
                  {service.title} in {loc.name}
                </Link>
              ))}
            </div>
            
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs">
              <Link 
                href={`/locations/${location.slug}`}
                className="font-bold text-brandRed hover:text-slate-900 transition-colors underline decoration-brandRed/20 underline-offset-8"
              >
                View all RCC Work in {location.name}
              </Link>
              <span className="text-slate-300">|</span>
              <Link 
                href="/locations" 
                className="font-bold text-brandRed hover:text-slate-900 transition-colors underline decoration-brandRed/20 underline-offset-8"
              >
                All Served Maharashtra Cities
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Structural Call-to-action */}
      <section className="py-20 relative overflow-hidden bg-slate-950">
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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-brandRed/10 border border-brandRed/30 text-white mb-6 shadow-[0_0_15px_rgba(192,30,46,0.3)]">
            READY TO BUILD?
          </span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-white mb-4 leading-[1.1] tracking-tight">
            Schedule Your Site Audit in <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandRed to-red-400">{location.name}</span>
          </h2>
          
          <p className="text-slate-300 text-base md:text-lg font-medium mb-8 leading-relaxed max-w-2xl mx-auto">
            Plan your structural layout with precision-grade {service.title.toLowerCase()} from RCR Enterprises. Contact Noor Alam Shaikh for an expert local cost assessment today.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-brandRed text-white hover:bg-red-700 transition-all shadow-[0_10px_30px_rgba(192,30,46,0.4)] hover:shadow-[0_15px_40px_rgba(192,30,46,0.6)] hover:-translate-y-1">
              Request Consultation <ArrowRight size={16} />
            </Link>
            <a href={`tel:${COMPANY_INFO.phone}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all hover:-translate-y-1">
              <Phone size={16} /> Call +91 {COMPANY_INFO.phone}
            </a>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}
