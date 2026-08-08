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
  const region = REGIONS.find(r => r.cities.includes(currentCityName))
  if (!region) return []
  const otherCityNames = region.cities.filter(name => name !== currentCityName)
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
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL || 'https://rcrenterprises.in'}/locations/${location.slug}`
    }
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

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'GeneralContractor',
      name: `${COMPANY_INFO.name} - ${location.name}`,
      description: `Expert RCC and Civil Construction services in ${location.name}. High-quality concrete casting, steel work, shuttering, and building construction.`,
      image: `${baseUrl}/logo_new.png`,
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
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '20:00'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
        { '@type': 'ListItem', position: 2, name: 'Locations', item: `${baseUrl}/locations` },
        { '@type': 'ListItem', position: 3, name: location.name, item: `${baseUrl}/locations/${location.slug}` }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a }
      }))
    }
  ]

  const encodedWaText = encodeURIComponent(
    `Hi RCR Enterprises, I am looking for a reliable RCC/Civil Contractor in ${location.name}. I would like to schedule a site inspection and discuss our project.`
  )
  const whatsappUrl = `https://wa.me/919619439243?text=${encodedWaText}`

  return (
    <>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <main className="min-h-screen bg-slate-50">
        
        {/* Top Spacer for Navbar */}
        <div className="h-[70px] lg:h-[90px] bg-white" />

        {/* Clean Light Breadcrumbs */}
        <div className="bg-white border-b border-slate-200 shadow-sm sticky top-[70px] lg:top-[88px] z-30">
          <div className="container-custom py-3 flex items-center gap-2 text-[11px] font-bold tracking-widest text-slate-500 uppercase">
            <Link href="/" className="hover:text-brandRed transition-colors">Home</Link>
            <ChevronRight size={12} className="text-slate-300" />
            <Link href="/locations" className="hover:text-brandRed transition-colors">Locations</Link>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="text-brandRed">{location.name}</span>
          </div>
        </div>

        {/* Premium Light Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-50 border-b border-slate-200">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(#c01e2e_2px,transparent_2px)] [background-size:20px_20px] opacity-[0.03] pointer-events-none" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-brandRed/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-brandRed/10 text-brandRed font-bold text-xs tracking-widest uppercase mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brandRed animate-pulse shadow-[0_0_8px_rgba(192,30,46,0.6)]" />
              Licensed RCC Contractor in {location.name}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-slate-900 leading-tight tracking-tight mb-8">
              Expert RCC Work & Civil Contractor in <br className="hidden sm:block" />
              <span className="text-brandRed relative inline-block">
                {location.name}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-brandRed/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
              </span>
            </h1>

            <p className="text-base lg:text-lg text-slate-600 leading-relaxed font-medium mb-10 max-w-3xl mx-auto">
              RCR Enterprises is proud to deliver superior civil engineering, high-tensile slab casting, robust column framing, and precision shuttering formwork across <strong className="text-slate-900">{location.name}</strong>. We combine state-certified standards with unmatched local expertise.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/contact" className="btn-primary w-full sm:w-auto py-4 px-8 text-sm shadow-[0_8px_20px_rgba(192,30,46,0.25)] hover:-translate-y-1">
                Book Free Site Visit & Quote
                <ArrowRight size={16} className="ml-1" />
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-outline w-full sm:w-auto py-4 px-8 text-sm bg-white hover:-translate-y-1 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#25D366] mr-2">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                WhatsApp Us
              </a>
            </div>

            {/* Quick Trust Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-slate-200">
              {[
                { icon: Shield, title: 'Govt Approved', desc: 'GST Registered' },
                { icon: Award, title: 'Expert Engineering', desc: 'Precision Formwork' },
                { icon: Clock, title: 'On-Time Delivery', desc: 'Zero Delays' },
                { icon: Building2, title: 'Turnkey Solutions', desc: `In ${location.name}` },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-brandRed mb-3">
                    <item.icon size={18} />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 tracking-wide uppercase mb-1">{item.title}</h3>
                  <p className="text-[10px] text-slate-500 font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us locally */}
        <section className="py-24 bg-white relative">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-brandRed/5 rounded-[3rem] -z-10 transform rotate-3" />
                <div className="relative aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                  <Image src="/images/residential_villa.png" alt={`Building construction in ${location.name}`} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg border border-white flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-brandRed font-black text-xl">10+</div>
                      <div>
                        <div className="font-bold text-slate-900">Years Experience</div>
                        <div className="text-xs text-slate-500 font-medium">Delivering Quality Projects</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <span className="section-badge inline-block mb-4 text-brandRed bg-red-50">Local Expertise</span>
                <h2 className="text-3xl lg:text-4xl font-display font-black text-slate-900 mb-6 leading-tight">
                  Why RCR Enterprises is the Preferred Structural Partner in <span className="text-brandRed">{location.name}</span>
                </h2>
                <div className="prose prose-slate mb-8">
                  <p className="text-slate-600 font-medium leading-relaxed">
                    RCC (Reinforced Cement Concrete) structures form the core skeleton of any building. In <strong className="text-slate-900">{location.name}</strong>, where weather shifts demand premium structural engineering, you cannot compromise on foundation quality.
                  </p>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    Whether you need high-rise concrete column erection, robust beam frameworks, highly level slab casting, or skilled masonry labor, our expert team completes tasks on time. We ensure absolute adherence to local building guidelines and safety codes.
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    `M20, M25, M30 Grade Concrete Compliance`,
                    `Fe 550D TMT Reinforcement Steel Usage`,
                    `Waterproof Shuttering Formwork Solutions`,
                    `Professional Core Cutting & Structural Framing`
                  ].map((feat, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-brandRed mt-0.5">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-sm font-bold text-slate-800">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/about" className="btn-outline">More About Us</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid Customized */}
        <section className="py-24 bg-slate-50 relative border-t border-slate-200">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-badge mx-auto mb-4 bg-white shadow-sm border-slate-200">Structural Services</span>
              <h2 className="section-title">
                Professional Construction Services in <br/>
                <span className="text-brandRed">{location.name}</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES_LIST.slice(0, 6).map((service) => (
                <Link key={service.id} href={`/locations/${location.slug}/${service.slug}`} className="service-card group block h-full">
                  <div className="relative w-full h-48 rounded-xl overflow-hidden mb-5 border border-slate-200 bg-slate-50">
                    <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-slate-900 font-bold text-[10px] tracking-widest uppercase shadow-sm z-10">
                      <MapPin size={10} className="text-brandRed" />
                      {location.name}
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-slate-900 text-lg mb-3 group-hover:text-brandRed transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed mb-5 line-clamp-3">
                    {service.shortDescription}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-brandRed font-bold group-hover:text-navy transition-colors mt-auto">
                    View Service Details <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at 50% 0%, rgba(192,30,46,0.04) 0%, transparent 70%)' }} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-24 bg-white relative border-t border-slate-200">
          <div className="container-custom max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="section-badge mx-auto mb-4 bg-red-50 text-brandRed border-brandRed/20">FAQ</span>
              <h2 className="section-title">
                Common Queries about RCC Work in <span className="text-brandRed">{location.name}</span>
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-brandRed/30 hover:shadow-md transition-all cursor-pointer">
                  <summary className="flex justify-between items-center font-display font-bold text-base md:text-lg text-slate-900 list-none [&::-webkit-details-marker]:hidden">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-brandRed flex-shrink-0">
                        <HelpCircle size={16} />
                      </div>
                      {faq.q}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-open:text-brandRed group-open:bg-red-50 group-open:rotate-180 transition-all flex-shrink-0 border border-slate-200 group-open:border-brandRed/20">
                      <ChevronDown size={14} />
                    </div>
                  </summary>
                  <div className="mt-4 pt-4 border-t border-slate-100 text-sm md:text-base text-slate-600 font-medium leading-relaxed pl-12 cursor-default">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Internal Linking Mesh */}
        {relatedLocations.length > 0 && (
          <section className="py-16 bg-slate-50 border-t border-slate-200">
            <div className="container-custom max-w-5xl mx-auto text-center">
              <h2 className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-8 flex items-center justify-center gap-3">
                <span className="w-8 h-px bg-slate-300" />
                Other Areas We Serve
                <span className="w-8 h-px bg-slate-300" />
              </h2>
              
              <div className="flex flex-wrap justify-center gap-3">
                {relatedLocations.map((loc) => (
                  <Link 
                    key={loc.slug} 
                    href={`/locations/${loc.slug}`}
                    className="bg-white border border-slate-200 hover:border-brandRed hover:text-brandRed text-xs font-bold text-slate-600 py-3 px-5 rounded-full transition-all hover:shadow-md hover:-translate-y-0.5"
                  >
                    Contractors in {loc.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Powerful CTA */}
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
              Ready to Start Your Project in <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandRed to-red-400">{location.name}?</span>
            </h2>
            
            <p className="text-slate-300 text-base md:text-lg font-medium mb-8 leading-relaxed max-w-2xl mx-auto">
              Ensure the structural safety and premium finish of your building. Contact RCR Enterprises today for a detailed consultation and site visit.
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
