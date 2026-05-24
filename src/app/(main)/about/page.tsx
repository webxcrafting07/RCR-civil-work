import type { Metadata } from 'next'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, Award, FileText, Shield, Target, Eye } from 'lucide-react'
import { COMPANY_INFO, STATS, WHY_CHOOSE_US } from '@/constants'
import PageHero from '@/components/shared/PageHero'
import CTASection from '@/components/sections/CTASection'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import ClientsSection from '@/components/sections/ClientsSection'
import StatsSection from '@/components/shared/StatsSection'

export const metadata: Metadata = {
  title: 'About RCR ENTERPRISES - RCC Work Contractor Virar East',
  description: 'Learn about RCR ENTERPRISES, a trusted RCC Work Contractor in Virar East, Maharashtra. Micro Enterprise led by Momin Noor Alam Shaikh.',
}

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About RCR ENTERPRISES',
    description: 'Learn about RCR ENTERPRISES, a trusted RCC Work Contractor in Virar East, Maharashtra.',
    publisher: {
      '@type': 'Organization',
      name: 'RCR ENTERPRISES',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rcrenterprises.in/logo.png'
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        badge="About Us"
        title="Building Trust Through Quality Construction"
        subtitle="Your trusted RCC Work Contracting partner in Virar East, Maharashtra since 2014."
        backgroundImage="/images/commercial_building.png"
      />

      {/* Company Introduction */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <Image
                  src="/images/residential_villa.png"
                  alt="RCR ENTERPRISES Team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 glass-gold rounded-2xl p-5 border border-sky-500/20">
                <div className="text-3xl font-display font-bold text-sky-500">10+</div>
                <div className="text-xs text-slate-500">Years Experience</div>
              </div>
            </div>

            <div>
              <span className="section-badge mb-4 inline-flex">Our Story</span>
              <h2 className="section-title text-slate-900 mb-6">
                RCR ENTERPRISES — <span className="text-gradient">Our Story</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-5">
                <strong className="text-slate-700">RCR ENTERPRISES</strong> was established with a clear mission: to deliver high-quality RCC construction services with integrity, professionalism, and commitment. Founded and led by <strong className="text-sky-500">Momin Noor Alam Shaikh</strong>, our company has grown to become a trusted name in civil and structural construction across the Virar-Vasai-Palghar belt.
              </p>
              <p className="text-slate-500 leading-relaxed mb-8">
                Operating as a registered <strong className="text-slate-700">Micro Enterprise</strong> under Udyog Aadhaar and GST, we bring transparency, accountability, and craftsmanship to every project — from residential homes to large commercial structures.
              </p>

              {/* Registration Details */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { label: 'GST No', value: COMPANY_INFO.registration.gstNo, icon: FileText },
                  { label: 'Udyog Aadhaar', value: COMPANY_INFO.registration.udyogAadhaar, icon: Award },
                  { label: 'Gumasta No', value: COMPANY_INFO.registration.gumastaNo, icon: Shield },
                  { label: 'Enterprise Type', value: COMPANY_INFO.registration.enterpriseType, icon: CheckCircle },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="p-4 rounded-xl border border-slate-200 bg-white">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={13} className="text-sky-500" />
                      <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">{label}</span>
                    </div>
                    <div className="text-xs text-slate-700 font-medium break-all">{value}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Link href="/contact" className="btn-primary">Get Free Quote</Link>
                <Link href="/services" className="btn-outline">Our Services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl border border-sky-500/15 bg-sky-500/[0.03] relative overflow-hidden">
              <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-sky-500/5" />
              <Eye size={36} className="text-sky-500 mb-5" />
              <h3 className="text-xl font-display font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-500 leading-relaxed italic">
                "To become a trusted name in RCC and civil construction services by delivering quality work, professional commitment, and long-term client satisfaction."
              </p>
            </div>
            <div className="p-8 rounded-2xl border border-slate-200 bg-white relative overflow-hidden">
              <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white" />
              <Target size={36} className="text-sky-500 mb-5" />
              <h3 className="text-xl font-display font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-500 leading-relaxed italic">
                "To provide durable, reliable, and cost-effective construction solutions with a focus on safety, quality, and timely completion of every project."
              </p>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />
      <ClientsSection />
      <WhyChooseUs />
      <CTASection />
    </>
  )
}
