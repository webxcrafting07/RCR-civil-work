import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Phone, ChevronDown } from 'lucide-react'
import { SERVICES_LIST, TARGET_LOCATIONS } from '@/constants'
import PageHero from '@/components/shared/PageHero'
import CTASection from '@/components/sections/CTASection'

interface Props {
  params: Promise<{ slug: string }>
}

async function getService(slug: string) {
  // Fallback to constants directly to prevent hanging if DB is not connected
  return SERVICES_LIST.find(s => s.slug === slug) || null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) return { title: 'Service Not Found' }
  return {
    title: `${service.title} - RCR ENTERPRISES`,
    description: service.shortDescription || `Professional ${service.title} services by RCR ENTERPRISES in Virar East.`,
  }
}

export async function generateStaticParams() {
  return SERVICES_LIST.map(s => ({ slug: s.slug }))
}

const DEFAULT_BENEFITS = [
  'Experienced and skilled workforce',
  'High quality materials and standards',
  'Timely project completion',
  'Transparent pricing',
  'Professional site supervision',
  'Safety compliance at all times',
]

const DEFAULT_PROCESS = [
  { step: 1, title: 'Initial Consultation', description: 'We discuss your requirements in detail.' },
  { step: 2, title: 'Site Assessment', description: 'Our team visits and evaluates the site.' },
  { step: 3, title: 'Quotation & Planning', description: 'Detailed quote and execution plan provided.' },
  { step: 4, title: 'Execution', description: 'Professional construction work begins.' },
  { step: 5, title: 'Quality Check', description: 'Rigorous quality inspection at every stage.' },
  { step: 6, title: 'Handover', description: 'Project delivered on time with documentation.' },
]

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) notFound()

  const relatedServices = SERVICES_LIST.filter(s => s.slug !== slug).slice(0, 3)
  const benefits = (service as { benefits?: string[] }).benefits?.length
    ? (service as { benefits: string[] }).benefits
    : DEFAULT_BENEFITS
  const process = (service as { process?: typeof DEFAULT_PROCESS }).process?.length
    ? (service as { process: typeof DEFAULT_PROCESS }).process
    : DEFAULT_PROCESS

  const POPULAR_SLUGS = ['mumbai', 'thane', 'kalyan', 'vasai', 'virar', 'navi-mumbai', 'bandra', 'andheri', 'goregaon', 'borivali', 'panvel', 'kharghar']
  const popularLocations = TARGET_LOCATIONS.filter(loc => POPULAR_SLUGS.includes(loc.slug)).slice(0, 12)

  return (
    <>
      <PageHero
        badge="Our Services"
        title={service.title}
        subtitle={service.shortDescription}
        backgroundImage={service.image || "/images/hero_construction_bg.png"}
      />

      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <div>
                <div className="relative rounded-2xl overflow-hidden aspect-video mb-8">
                  <Image
                    src={service.image || "/images/rcc_steel_work.png"}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>
                <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">About This Service</h2>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {(service as { description?: string }).description ||
                    `RCR ENTERPRISES provides professional ${service.title} services with the highest standards of quality and workmanship. Our experienced team ensures every project is completed on time, within budget, and to the complete satisfaction of our clients. We use premium materials and follow strict quality control procedures at every stage.`}
                </p>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">Key Benefits</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {benefits.map((benefit: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                      <CheckCircle size={16} className="text-brandRed flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-800">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div>
                <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">Our Process</h2>
                <div className="space-y-4">
                  {process.map((step: { step: number; title: string; description: string }) => (
                    <div key={step.step} className="flex gap-4 p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-brandRed/10 border border-brandRed/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-mono font-bold text-brandRed">{step.step}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1">{step.title}</h4>
                        <p className="text-xs font-medium text-slate-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              {(service as { faqs?: { question: string; answer: string }[] }).faqs?.length ? (
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">FAQs</h2>
                  <div className="space-y-3">
                    {(service as { faqs: { question: string; answer: string }[] }).faqs.map((faq, i) => (
                      <details key={i} className="group rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                        <summary className="flex items-center justify-between p-4 cursor-pointer text-sm font-bold text-slate-900 hover:text-brandRed transition-colors">
                          {faq.question}
                          <ChevronDown size={16} className="text-slate-500 group-open:rotate-180 transition-transform" />
                        </summary>
                        <div className="px-4 pb-4 text-sm font-medium text-slate-700 leading-relaxed">{faq.answer}</div>
                      </details>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:sticky lg:top-28 h-fit">
              {/* Quick contact */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
                <h3 className="font-display font-bold text-slate-900 text-lg mb-4">Get Free Quote</h3>
                <p className="text-sm font-medium text-slate-700 mb-5">Contact us today for a free consultation and competitive quote.</p>
                <Link href="/contact" className="btn-primary w-full justify-center mb-3">
                  Request Quote <ArrowRight size={15} />
                </Link>
                <a href="tel:9619439243" className="btn-outline w-full justify-center text-sm">
                  <Phone size={14} /> Call Now
                </a>
              </div>

              {/* Other services */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
                <h3 className="font-display font-bold text-slate-900 text-base mb-4">Other Services</h3>
                <div className="space-y-2">
                  {relatedServices.map(s => (
                    <Link key={s.id} href={`/services/${s.slug}`}
                      className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-brandRed/5 text-slate-700 font-medium hover:text-brandRed transition-all text-sm group">
                      {s.title}
                      <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Served Locations for [Service] (Bi-Directional SEO Linking Mesh) */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="container-custom">
          <h2 className="text-2xl font-display font-bold text-slate-900 mb-4 text-center">
            Top Served Areas for {service.title}
          </h2>
          <p className="text-slate-700 font-medium text-sm text-center max-w-2xl mx-auto mb-10">
            We deliver expert {service.title.toLowerCase()} across major Maharashtra regions. Click below to view custom specifications and get quotes.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {popularLocations.map(loc => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}/${service.slug}`}
                className="py-3 px-4 text-center rounded-xl border border-slate-200 hover:border-brandRed hover:bg-brandRed/5 text-xs font-bold text-slate-700 hover:text-brandRed transition-all hover:-translate-y-0.5"
              >
                {service.title} in {loc.name}
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/locations" className="text-xs font-bold text-brandRed hover:text-navy hover:underline inline-flex items-center gap-1.5">
              Browse All Areas We Serve <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
