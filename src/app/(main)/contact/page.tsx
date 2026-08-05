import type { Metadata } from 'next'
import PageHero from '@/components/shared/PageHero'
import ContactSection from '@/components/sections/ContactSection'
import { COMPANY_INFO } from '@/constants'
import { Clock, Award, Shield, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact RCR ENTERPRISES - Get Free Quote',
  description: 'Contact RCR ENTERPRISES for free RCC construction consultation. Call 9619439243 or visit our office in Virar East, Maharashtra.',
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        badge="Get In Touch"
        title="Let's Build Something Great Together"
        subtitle="Reach out for a free consultation. We respond within 24 hours."
        backgroundImage="/images/hero_construction_bg.png"
      />

      {/* Trust Bar */}
      <div className="py-12 bg-white border-y border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brandRed/20 to-transparent" />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: '24 Hour Response', desc: 'We respond to all inquiries within 24 hours.' },
              { icon: Award, title: 'Free Consultation', desc: 'Get a free site visit and project quotation.' },
              { icon: Shield, title: 'Certified & Registered', desc: 'GST registered, Udyog Aadhaar certified firm.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brandRed/30 hover:shadow-[0_10px_30px_-10px_rgba(192,30,46,0.1)] transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-white border border-brandRed/10 shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-brandRed transition-colors duration-300">
                  <Icon size={22} className="text-brandRed group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <div className="text-base font-bold text-slate-900 group-hover:text-brandRed transition-colors">{title}</div>
                  <div className="text-sm font-medium text-slate-500 mt-1">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ContactSection />

      {/* Google Maps */}
      <section className="py-20 bg-slate-50 relative">
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <h2 className="text-3xl font-display font-black text-slate-900">Find Our Office</h2>
            <p className="text-sm font-bold text-slate-500 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 flex items-center gap-2">
              <MapPin size={16} className="text-brandRed" />
              {COMPANY_INFO.address.full}
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden border-4 border-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] relative group" style={{ height: '500px' }}>
            <div className="absolute inset-0 border border-slate-200 rounded-3xl pointer-events-none z-10" />
            <iframe
              src="https://maps.google.com/maps?q=SUHANA+SERVICE+CENTER,+Vasai-Virar&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="RCR ENTERPRISES Office Location"
              className="group-hover:scale-[1.02] transition-transform duration-1000"
            />
          </div>
        </div>
      </section>
    </>
  )
}
