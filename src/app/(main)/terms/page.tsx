import type { Metadata } from 'next'
import PageHero from '@/components/shared/PageHero'

export const metadata: Metadata = { title: 'Terms of Service | RCR ENTERPRISES' }

export default function TermsPage() {
  return (
    <>
      <PageHero badge="Legal" title="Terms of Service" subtitle="Please read these terms carefully before using our services." />
      <section className="py-16 bg-slate-50">
        <div className="container-custom max-w-4xl">
          <div className="space-y-8 text-slate-500 leading-relaxed">
            {[
              { title: '1. Acceptance of Terms', content: 'By accessing and using the RCR ENTERPRISES website and services, you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use our services.' },
              { title: '2. Services', content: 'RCR ENTERPRISES provides RCC work contracting, civil construction, slab work, shuttering, and related construction services. All services are subject to site assessment and formal agreement.' },
              { title: '3. Project Agreements', content: 'All construction projects require a signed agreement outlining scope, timeline, payment terms, and specifications. Verbal agreements are not binding without written confirmation from RCR ENTERPRISES.' },
              { title: '4. Payment Terms', content: 'Payment terms are defined in the project agreement. Advance payment may be required before work commencement. Delays in payment may result in project delays.' },
              { title: '5. Warranties', content: 'We provide workmanship warranty as specified in the project agreement. Material warranties are subject to manufacturer terms. Structural defects due to our workmanship will be rectified at no cost during the warranty period.' },
              { title: '6. Limitation of Liability', content: 'RCR ENTERPRISES shall not be liable for delays caused by unforeseen circumstances, weather conditions, or client-side delays in providing access, materials approval, or payment.' },
              { title: '7. Contact', content: 'For any questions regarding these terms, contact us at rcrenterprises786@gmail.com or 9619439243.' },
            ].map(({ title, content }) => (
              <div key={title}>
                <h2 className="text-xl font-display font-bold text-slate-900 mb-3">{title}</h2>
                <p>{content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
