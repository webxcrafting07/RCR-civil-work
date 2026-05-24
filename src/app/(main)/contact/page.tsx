import type { Metadata } from 'next'
import PageHero from '@/components/shared/PageHero'
import ContactSection from '@/components/sections/ContactSection'
import { COMPANY_INFO } from '@/constants'
import { Clock, Award, Shield } from 'lucide-react'

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
      <div className="py-8 bg-white/60 border-y border-slate-200">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: '24 Hour Response', desc: 'We respond to all inquiries within 24 hours.' },
              { icon: Award, title: 'Free Consultation', desc: 'Get a free site visit and project quotation.' },
              { icon: Shield, title: 'Certified & Registered', desc: 'GST registered, Udyog Aadhaar certified firm.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-sky-500" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{title}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ContactSection />

      {/* Google Maps */}
      <section className="py-16 bg-slate-50">
        <div className="container-custom">
          <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">Find Our Office</h2>
          <div className="rounded-2xl overflow-hidden border border-slate-200" style={{ height: '400px' }}>
            <iframe
              src="https://maps.google.com/maps?q=SUHANA+SERVICE+CENTER,+Vasai-Virar&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="RCR ENTERPRISES Office Location"
            />
          </div>
          <p className="text-xs text-slate-400 mt-3 text-center">
            {COMPANY_INFO.address.full}
          </p>
        </div>
      </section>
    </>
  )
}
