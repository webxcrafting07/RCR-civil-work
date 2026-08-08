import type { Metadata } from 'next'
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
        title="Building Trust Through **Quality Construction**"
        subtitle="Your trusted RCC Work Contracting partner in Virar East, Maharashtra since 2014."
        backgroundImage="/images/commercial_building.png"
      />

      {/* Company Introduction */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Background Decorative */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(#c01e2e_2px,transparent_2px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="relative">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] group">
                <Image
                  src="/images/residential_villa.png"
                  alt="RCR ENTERPRISES Team"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-brandRed/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-70" />
              </div>
              
              <div 
                className="absolute -bottom-8 -right-4 lg:-right-8 rounded-3xl p-6 md:p-8 border border-white/40 bg-white/95 backdrop-blur-md shadow-[0_15px_35px_-10px_rgba(0,0,0,0.15)] flex flex-col items-center gap-1 animate-[bounce_5s_ease-in-out_infinite]"
              >
                <div className="text-5xl md:text-6xl font-display font-black text-brandRed leading-none tracking-tighter">10<span className="text-4xl text-slate-900">+</span></div>
                <div className="w-12 h-1 bg-brandRed/20 rounded-full my-1.5" />
                <div className="text-sm font-bold text-slate-800 uppercase tracking-widest text-center">Years Experience</div>
              </div>
            </div>

            <div className="pt-10 lg:pt-0">
              <span className="section-badge mb-6 inline-flex bg-red-50 text-brandRed border-brandRed/20">Our Story</span>
              <h2 className="section-title text-slate-900 mb-8 text-4xl lg:text-5xl leading-tight">
                RCR ENTERPRISES<br/>
                <span className="text-gradient font-black">Building The Future</span>
              </h2>
              
              <div className="prose prose-slate max-w-none mb-10">
                <p className="text-lg text-slate-700 leading-relaxed font-medium mb-5">
                  <strong className="text-brandRed">RCR ENTERPRISES</strong> was established with a clear mission: to deliver high-quality RCC construction services with integrity, professionalism, and commitment. Founded and led by <strong className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded">Momin Noor Alam Shaikh</strong>, our company has grown to become a trusted name in civil and structural construction across the Virar-Vasai-Palghar belt.
                </p>
                <p className="text-base text-slate-600 leading-relaxed font-medium">
                  Operating as a registered <strong className="text-slate-900 border-b-2 border-brandRed/30 pb-0.5">Micro Enterprise</strong> under Udyog Aadhaar and GST, we bring transparency, accountability, and craftsmanship to every project — from residential homes to large commercial structures.
                </p>
              </div>

              {/* Registration Details */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {[
                  { label: 'GST No', value: COMPANY_INFO.registration.gstNo, icon: FileText },
                  { label: 'Udyog Aadhaar', value: COMPANY_INFO.registration.udyogAadhaar, icon: Award },
                  { label: 'Gumasta No', value: COMPANY_INFO.registration.gumastaNo, icon: Shield },
                  { label: 'Enterprise Type', value: COMPANY_INFO.registration.enterpriseType, icon: CheckCircle },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="p-4 md:p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-brandRed/30 hover:shadow-[0_4px_15px_rgba(192,30,46,0.05)] transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-brandRed group-hover:scale-110 transition-all duration-300">
                        <Icon size={14} className="text-brandRed group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
                    </div>
                    <div className="text-sm text-slate-900 font-bold break-all group-hover:text-brandRed transition-colors pl-11">{value}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary py-4 px-8 shadow-[0_8px_20px_rgba(192,30,46,0.25)] hover:-translate-y-1">
                  Get Free Quote
                </Link>
                <Link href="/services" className="btn-outline py-4 px-8 bg-white hover:-translate-y-1 hover:shadow-lg">
                  Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-12 lg:py-16 bg-slate-950 relative overflow-hidden">
        {/* Background Decorative */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brandRed/20 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brandRed/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            <div className="order-2 lg:order-1 pt-6 lg:pt-0">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase bg-white/10 border border-white/20 text-white backdrop-blur-md shadow-sm mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brandRed animate-pulse shadow-[0_0_8px_rgba(192,30,46,0.8)]" />
                Meet The Founder
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-white mb-6 leading-tight tracking-tight">
                Momin Noor Alam Shaikh<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandRed to-red-400 font-black">Owner & Founder</span>
              </h2>
              
              <div className="prose prose-slate max-w-none mb-6">
                <p className="text-base text-slate-300 leading-relaxed font-medium mb-4 italic border-l-4 border-brandRed pl-6 py-1.5">
                  "Our goal is not just to construct buildings, but to build long-lasting relationships based on trust, quality, and commitment. Every project we take on is a reflection of our dedication to excellence."
                </p>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                  With over a decade of hands-on experience in the civil construction industry, Momin Noor Alam Shaikh has led RCR ENTERPRISES from a small contracting firm to a highly respected name in the Virar, Vasai, and Palghar regions. His vision is deeply rooted in structural integrity, timely delivery, and uncompromised safety standards. 
                </p>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed mt-3">
                  Under his leadership, the company has successfully completed numerous residential, commercial, and industrial projects, consistently exceeding client expectations.
                </p>
              </div>
            </div>

            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[320px] sm:max-w-sm lg:max-w-md rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_20px_50px_-15px_rgba(192,30,46,0.3)] group border border-white/10">
                <Image
                  src="/owner_image.png"
                  alt="Momin Noor Alam Shaikh"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-80" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-display font-black text-white mb-1">Momin Noor Alam Shaikh</h3>
                  <p className="text-brandRed font-bold tracking-widest text-xs uppercase">Founder, RCR ENTERPRISES</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brandRed/20 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-brandRed/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Vision Card */}
            <div 
              className="p-10 rounded-[2rem] border border-slate-100 bg-white hover:border-brandRed/20 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(192,30,46,0.15)] transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brandRed/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-8 border border-brandRed/10 group-hover:bg-brandRed group-hover:scale-110 transition-all duration-500 shadow-sm">
                <Eye size={28} className="text-brandRed group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-3xl font-display font-black text-slate-900 mb-5 group-hover:text-brandRed transition-colors duration-500 tracking-tight">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed font-medium text-lg">
                "To become a trusted name in RCC and civil construction services by delivering quality work, professional commitment, and long-term client satisfaction."
              </p>
            </div>
            
            {/* Mission Card */}
            <div 
              className="p-10 rounded-[2rem] border border-slate-100 bg-white hover:border-brandRed/20 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(192,30,46,0.15)] transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-brandRed/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-8 border border-brandRed/10 group-hover:bg-brandRed group-hover:scale-110 transition-all duration-500 shadow-sm">
                <Target size={28} className="text-brandRed group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-3xl font-display font-black text-slate-900 mb-5 group-hover:text-brandRed transition-colors duration-500 tracking-tight">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed font-medium text-lg">
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
