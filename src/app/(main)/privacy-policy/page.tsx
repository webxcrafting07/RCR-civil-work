import type { Metadata } from 'next'
import PageHero from '@/components/shared/PageHero'

export const metadata: Metadata = {
  title: 'Privacy Policy | RCR ENTERPRISES',
  description: 'Privacy Policy for RCR ENTERPRISES website.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero badge="Legal" title="Privacy Policy" subtitle="Last updated: January 2025" />
      <section className="py-16 bg-slate-50">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-invert prose-sky max-w-none">
            <div className="space-y-8 text-slate-500 leading-relaxed">
              {[
                {
                  title: '1. Information We Collect',
                  content: 'We collect information you provide directly to us, such as when you fill out our contact form. This includes your name, phone number, email address, and project details. We do not collect any financial or sensitive personal information.',
                },
                {
                  title: '2. How We Use Your Information',
                  content: 'We use the information we collect to respond to your inquiries, provide construction services, send project updates, and improve our services. We do not sell, trade, or otherwise transfer your personal information to third parties without your consent.',
                },
                {
                  title: '3. Data Security',
                  content: 'We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure. We strive to use commercially acceptable means to protect your data.',
                },
                {
                  title: '4. Cookies',
                  content: 'Our website may use cookies to enhance user experience. You can choose to disable cookies through your browser settings. This may affect some functionality of the website.',
                },
                {
                  title: '5. Third-Party Services',
                  content: 'We may use third-party services like Google Maps for location display. These services have their own privacy policies and we encourage you to review them.',
                },
                {
                  title: '6. Contact Us',
                  content: 'If you have questions about this Privacy Policy, please contact us at rcrenterprises786@gmail.com or call 9619439243.',
                },
              ].map(({ title, content }) => (
                <div key={title}>
                  <h2 className="text-xl font-display font-bold text-slate-900 mb-3">{title}</h2>
                  <p>{content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
