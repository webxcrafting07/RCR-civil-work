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
  CheckCircle,
  Check
} from 'lucide-react'

interface LocationPageProps {
  params: Promise<{ city: string }>
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

function getRelatedLocations(currentCityName: string) {
  // Find which region the current city belongs to
  const region = REGIONS.find(r => r.cities.includes(currentCityName))
  if (!region) return []
  
  // Get other cities in the same region, filter out the current one
  const otherCityNames = region.cities.filter(name => name !== currentCityName)
  
  // Map back to our TARGET_LOCATIONS objects
  return TARGET_LOCATIONS.filter(loc => otherCityNames.includes(loc.name)).slice(0, 8)
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const location = TARGET_LOCATIONS.find(loc => loc.slug === resolvedParams.city)
  
  if (!location) {
    return { title: 'Location Not Found' }
  }

  const title = `Best RCC Work & Civil Construction Contractor in ${location.name} | RCR Enterprises`
  const description = `Looking for a trusted RCC and civil construction contractor in ${location.name}? RCR Enterprises specializes in premium slab casting, column-beam framing, precise shuttering formwork, and commercial/residential building construction in ${location.name}. Get a free quote and site visit today!`

  return {
    title,
    description,
    keywords: [
      `RCC contractor ${location.name}`,
      `civil construction ${location.name}`,
      `slab casting ${location.name}`,
      `shuttering contractor ${location.name}`,
      `building construction in ${location.name}`,
      `RCR Enterprises ${location.name}`,
      `RCC steel work ${location.name}`,
      `structural contractors ${location.name}`
    ],
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

  const relatedLocations = getRelatedLocations(location.name)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://rcrenterprises.in'

  // Dynamic FAQs text targeting [City]
  const faqs = [
    {
      q: `Does RCR Enterprises provide turnkey civil contracting services in ${location.name}?`,
      a: `Yes! We provide complete turnkey civil construction in ${location.name}, ranging from initial soil assessment, excavation, and solid RCC foundation casting, to structural column framing, slab casting, masonry brickwork, and interior finishing. We manage both residential villas and large-scale commercial complexes.`
    },
    {
      q: `What is your concrete slab casting and shuttering process in ${location.name}?`,
      a: `Our slab casting process in ${location.name} strictly follows high structural engineering standards. We utilize premium grade plywood shuttering and MS props for perfectly aligned formwork, lay high-tensile steel rebars in absolute grid precision, pour certified concrete mixes (M20, M25, M30 grades), and ensure thorough water curing to guarantee crack-free structures.`
    },
    {
      q: `How can I schedule a site visit and get a quote for RCC work in ${location.name}?`,
      a: `You can instantly contact our proprietor Noor Alam Shaikh at +91 96194 39243 or tap our WhatsApp button to discuss your project. We offer a free, no-obligation site inspection in ${location.name} followed by a highly transparent, itemized cost estimation with zero hidden fees.`
    }
  ]

  // Structured Schema.org JSON-LD
  const schemas = [
    // 1. GeneralContractor (LocalBusiness) Schema
    {
      '@context': 'https://schema.org',
      '@type': 'GeneralContractor',
      name: `${COMPANY_INFO.name} - ${location.name}`,
      description: `Expert RCC and Civil Construction services in ${location.name}. High-quality concrete casting, steel work, shuttering, and building construction.`,
      image: `${baseUrl}/logo-3d.png`,
      telephone: COMPANY_INFO.phone,
      email: COMPANY_INFO.email,
      url: `${baseUrl}/locations/${location.slug}`,
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
        reviewCount: '58',
        ratingCount: '72',
        bestRating: '5',
        worstRating: '1'
      },
      knowsAbout: ['RCC Work', 'Civil Construction', 'Slab Casting', 'Formwork Shuttering', 'Mason Work', 'Structural Engineering'],
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '08:00',
        closes: '20:00'
      }
    },
    // 2. BreadcrumbList Schema
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
        }
      ]
    },
    // 3. FAQPage Schema
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

  // Customized WhatsApp API text for local context
  const encodedWaText = encodeURIComponent(
    `Hi RCR Enterprises, I am looking for a reliable RCC/Civil Contractor in ${location.name}. I would like to schedule a site inspection and discuss our project.`
  )
  const whatsappUrl = `https://wa.me/919619439243?text=${encodedWaText}`

  return (
    <>
      {/* Inject all dynamic JSON-LD schemas for maximum Local SEO signals */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main className="min-h-screen bg-slate-950">
        {/* Top Spacer to prevent fixed Navbar overlap */}
        <div className="h-[144px] lg:h-[180px] bg-slate-950" />

        {/* Modern Sticky Breadcrumbs Bar */}
      <div className="bg-slate-900/60 border-b border-slate-800 backdrop-blur-md sticky top-[80px] lg:top-[88px] z-30">
        <div className="container-custom max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-[10px] font-mono tracking-wider text-slate-400">
          <Link href="/" className="hover:text-sky-400 transition-colors uppercase">Home</Link>
          <ChevronRight size={10} className="text-slate-600" />
          <Link href="/locations" className="hover:text-sky-400 transition-colors uppercase">Locations</Link>
          <ChevronRight size={10} className="text-slate-600" />
          <span className="text-sky-400 font-bold uppercase tracking-widest">{location.name}</span>
        </div>
      </div>

      {/* Rich Premium Local Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-center items-center overflow-hidden bg-slate-950 text-white">
        {/* Background construction photo with deep sleek gradient */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 scale-105"
          style={{ backgroundImage: 'url(/images/hero_construction_bg.png)' }}
        />
        {/* Harmonious premium styling overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

        <div className="relative z-10 container-custom max-w-5xl mx-auto px-4 py-20 text-center">
          {/* Service badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 font-semibold text-xs tracking-wider uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            Licensed RCC Contractor in {location.name}
          </div>

          {/* Premium customized H1 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black leading-tight tracking-tight mb-8">
            Best RCC Work & Civil Construction Contractor in <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-sky-300">
              {location.name}
            </span>
          </h1>

          {/* Dynamic targeted sales copy */}
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
            RCR Enterprises is proud to deliver superior civil engineering, high-tensile slab casting, robust column framing, and precision shuttering formwork across <span className="text-white font-bold">{location.name}</span>. We combine state-certified standards (GST: {COMPANY_INFO.registration.gstNo}) with unmatched local expertise to construct structurally flawless residential and commercial edifices.
          </p>

          {/* Conversion CTA Group */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-sky-500/20 transition-all hover:-translate-y-0.5 group"
            >
              Get Free Site Visit & Quote
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
              WhatsApp Local Site Manager
            </a>
          </div>

          {/* Quick trust metrics row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto pt-10 border-t border-slate-800">
            {[
              { icon: Shield, title: 'Government Approved', desc: `GST & Aadhaar Registered` },
              { icon: Award, title: 'Expert Engineering', desc: 'Precise Rebar & Formwork' },
              { icon: Clock, title: 'Zero Delay Guarantee', desc: 'On-time Structure Delivery' },
              { icon: Building2, title: 'Turnkey Civil Care', desc: `Available in ${location.name}` },
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

      {/* Local Structural Engineering Standards Section */}
      <section className="py-24 bg-slate-950 text-white relative">
        <div className="container-custom max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            {/* Visual Callout Card */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-500 to-blue-600 blur-lg opacity-30 group-hover:opacity-45 transition-opacity" />
              <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-3xl overflow-hidden shadow-2xl">
                <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase font-semibold mb-2 block">Premium Material Grade</span>
                <h3 className="text-2xl font-display font-black mb-4">Unyielding Concrete Mix & Rebar Alignment</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  For every construction project we execute in <span className="text-white font-semibold">{location.name}</span>, we audit steel bindings and shuttering geometry. We employ high-performance vibration tools to compact structural components, guaranteeing absolute load durability.
                </p>
                <ul className="space-y-3">
                  {[
                    `M20, M25, M30 Grade Compliance`,
                    `Fe 550D TMT Reinforcement Steel`,
                    `Waterproof Shuttering Formwork`,
                    `Professional Core Cutting & Framing`
                  ].map((feat, index) => (
                    <li key={index} className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                      <div className="w-5 h-5 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400">
                        <Check size={12} />
                      </div>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Structured Sales Copy with deep local keywords */}
            <div className="lg:col-span-7">
              <span className="text-xs font-mono tracking-widest text-sky-500 uppercase font-semibold mb-3 block">
                Local Civil Contractors
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight mb-6">
                Why RCR Enterprises is the Preferred Structural Partner in <span className="text-sky-400">{location.name}</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                RCC (Reinforced Cement Concrete) structures form the core skeleton of any building. In <span className="text-white font-medium">{location.name}</span>, where weather shifts demand premium structural engineering, you cannot compromise on foundation quality. RCR Enterprises guarantees meticulous construction oversight.
              </p>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
                Whether you need high-rise concrete column erection, robust beam frameworks, highly level slab casting, or skilled masonry labor, our expert team completes tasks on time. We ensure absolute adherence to local building guidelines and safety codes.
              </p>
              <div className="flex gap-4">
                <a href={`tel:${COMPANY_INFO.phone}`} className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition-all">
                  <Phone size={16} />
                  Call: +91 {COMPANY_INFO.phone}
                </a>
                <Link href="/about" className="inline-flex items-center justify-center gap-2 border border-slate-800 hover:border-slate-700 bg-slate-900/40 text-slate-300 font-bold px-6 py-3.5 rounded-xl transition-all hover:text-white">
                  Learn About RCR
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Customized for [City] */}
      <section className="py-24 bg-slate-950 border-t border-slate-900 relative">
        <div className="container-custom max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest text-sky-500 uppercase font-semibold mb-3 block">Structural Expertise</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white">
              Professional Civil Services Available in <span className="text-sky-400">{location.name}</span>
            </h2>
            <p className="text-slate-400 mt-4 text-sm sm:text-base">
              Explore our core construction competencies in {location.name}. Every structural service is executed by verified master-masons and certified supervisors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_LIST.slice(0, 6).map((service) => (
              <div 
                key={service.id} 
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 rounded-3xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/[0.02] flex flex-col group"
              >
                <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-6">
                  <Image 
                    src={service.image} 
                    alt={`${service.title} in ${location.name}`} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/90 text-sky-400 font-bold text-[9px] tracking-widest uppercase border border-slate-800">
                    <MapPin size={9} />
                    {location.name}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">
                  {service.title} in {location.name}
                </h3>
                <p className="text-slate-400 mb-6 text-xs leading-relaxed flex-grow">
                  We render specialized structural {service.title.toLowerCase()} inside {location.name} using certified materials and experienced labor support. {service.shortDescription}
                </p>
                <Link 
                  href={`/locations/${location.slug}/${service.slug}`} 
                  className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors uppercase mt-auto"
                >
                  Explore Service details 
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Localized Project Portfolio Showcase (Advanced Trust-Building Showcase) */}
      <section className="py-24 bg-slate-950 border-t border-slate-900 relative">
        <div className="container-custom max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest text-sky-500 uppercase font-semibold mb-3 block">Completed Structures</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
              Our Construction Projects in <span className="text-sky-400">{location.name}</span>
            </h2>
            <p className="text-slate-400 mt-4 text-sm sm:text-base">
              Explore some of our structural RCC and civil achievements built to the highest safety and load compliance standards in {location.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: `Residential Multi-Story Slab Casting in ${location.name}`,
                type: 'Residential Construction',
                image: '/images/hero_construction_bg.png',
                desc: `Premium residential structure featuring waterproof formwork shuttering and perfect reinforcement bindings in ${location.name}.`
              },
              {
                title: `Commercial Column & Beam Erection - ${location.name}`,
                type: 'Commercial Construction',
                image: '/images/rcc_steel_work.png',
                desc: `Heavy-duty industrial-grade framing completed using high-performance vibration compactors in ${location.name}.`
              },
              {
                title: `Premium Structural Slab Casting in ${location.name}`,
                type: 'Slab Casting Work',
                image: '/images/slab_casting_work.png',
                desc: `Flawless concrete pouring and high-tensile steel grids execution under strict structural compliance in ${location.name}.`
              }
            ].map((proj, i) => (
              <div key={i} className="bg-slate-900/40 border border-slate-800/80 rounded-3xl overflow-hidden group hover:border-slate-700 transition-all flex flex-col">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-950/90 text-sky-400 font-mono text-[9px] tracking-wider uppercase border border-slate-800">
                    Completed
                  </span>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-sky-500 uppercase mb-2 block">{proj.type}</span>
                    <h3 className="text-base font-bold text-white mb-3 font-display leading-snug">{proj.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">{proj.desc}</p>
                  </div>
                  <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 hover:text-white transition-colors uppercase group-hover:translate-x-0.5 transition-transform">
                    View Portfolio Details <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Glassmorphic FAQ Section (Perfect for SERP Snippets) */}
      <section className="py-24 bg-slate-950 border-t border-slate-900 relative">
        <div className="container-custom max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-xs font-mono tracking-widest text-sky-500 uppercase font-semibold mb-3 block">Answering Queries</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
              FAQs Regarding RCC Work in <span className="text-sky-400">{location.name}</span>
            </h2>
            <p className="text-slate-400 mt-4 text-sm">
              Quick answers to frequent inquiries about construction pricing, material guidelines, and sites we serve.
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

      {/* Internal Linking Mesh Section (Spiderweb crawler network) */}
      {relatedLocations.length > 0 && (
        <section className="py-20 bg-slate-950 border-t border-slate-900 relative">
          <div className="container-custom max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-xs font-mono tracking-widest text-slate-500 uppercase font-semibold mb-8 flex items-center justify-center gap-3">
              <span className="w-6 h-px bg-slate-800" />
              Served Construction Areas Near {location.name}
              <span className="w-6 h-px bg-slate-800" />
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {relatedLocations.map((loc) => (
                <Link 
                  key={loc.slug} 
                  href={`/locations/${loc.slug}`}
                  className="bg-slate-900/30 border border-slate-800 hover:border-sky-500/30 text-xs font-medium text-slate-400 hover:text-sky-400 py-3.5 px-4 rounded-xl transition-all text-center hover:shadow-md hover:shadow-sky-500/[0.01] hover:-translate-y-0.5"
                >
                  Contractors in {loc.name}
                </Link>
              ))}
            </div>
            
            <div className="mt-10">
              <Link 
                href="/locations" 
                className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 hover:text-white transition-colors underline decoration-sky-400/30 underline-offset-8"
              >
                Browse All Maharashtra Locations
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Site Consultation Call-to-Action Card */}
      <section className="py-16 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] bg-sky-500/5 rounded-full blur-[90px] -translate-x-1/2 -translate-y-1/2" />
        <div className="container-custom max-w-4xl mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-b from-slate-900 to-slate-900/50 border border-slate-800/90 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white mb-4">
              Plan Your Next RCC Project in {location.name}
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto mb-8 text-xs sm:text-sm leading-relaxed">
              Ensure the engineering safety and certified strength of your slab casting or masonry structures. Contact RCR Enterprises for detailed consultation visits in {location.name}.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link 
                href="/contact" 
                className="w-full sm:w-auto inline-flex items-center justify-center bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all"
              >
                Request Free Quote
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
      </main>
    </>
  )
}
