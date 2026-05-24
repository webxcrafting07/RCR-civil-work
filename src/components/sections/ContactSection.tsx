'use client'

import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import { COMPANY_INFO, SERVICES_LIST_FOR_CONTACT } from '@/constants'

const schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Enter valid phone number').max(15),
  email: z.string().email('Enter valid email'),
  serviceRequired: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

export default function ContactSection() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (result.success) {
        toast.success('Your inquiry has been submitted! We\'ll contact you within 24 hours.')
        reset()
      } else {
        toast.error(result.message || 'Something went wrong')
      }
    } catch {
      toast.error('Failed to submit. Please try again or call us directly.')
    }
  }

  return (
    <section className="py-20 lg:py-28 bg-slate-50" id="contact">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mb-4"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            Contact <span className="text-gradient">Us Today</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {[
              {
                icon: Phone,
                title: 'Phone',
                content: COMPANY_INFO.phone,
                href: `tel:${COMPANY_INFO.phone}`,
              },
              {
                icon: Mail,
                title: 'Email',
                content: COMPANY_INFO.email,
                href: `mailto:${COMPANY_INFO.email}`,
              },
              {
                icon: MapPin,
                title: 'Office Address',
                content: COMPANY_INFO.address.full,
                href: 'https://maps.google.com/?q=Virar+East+Maharashtra',
              },
              {
                icon: Clock,
                title: 'Working Hours',
                content: 'Mon – Sat: 9:00 AM – 7:00 PM',
                href: null,
              },
            ].map(({ icon: Icon, title, content, href }) => (
              <div key={title} className="flex gap-4 p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-sky-500" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono tracking-wider uppercase mb-1">{title}</div>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                      className="text-sm text-slate-700 hover:text-sky-600 transition-colors leading-relaxed break-all">
                      {content}
                    </a>
                  ) : (
                    <div className="text-sm text-slate-700 leading-relaxed">{content}</div>
                  )}
                </div>
              </div>
            ))}

            {/* WhatsApp */}
            <a
              href="https://wa.me/919619439243"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: '#25D366' }}
            >
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5 font-medium">Full Name *</label>
                  <input {...register('fullName')} placeholder="Your full name" className="form-input" />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5 font-medium">Phone Number *</label>
                  <input {...register('phone')} placeholder="10-digit mobile number" className="form-input" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 font-medium">Email Address *</label>
                <input {...register('email')} type="email" placeholder="your@email.com" className="form-input" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 font-medium">Service Required *</label>
                <select {...register('serviceRequired')} className="form-input">
                  <option value="">Select a service...</option>
                  {SERVICES_LIST_FOR_CONTACT.map(s => (
                    <option key={s} value={s} className="bg-white">{s}</option>
                  ))}
                </select>
                {errors.serviceRequired && <p className="text-red-500 text-xs mt-1">{errors.serviceRequired.message}</p>}
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5 font-medium">Message *</label>
                <textarea {...register('message')} rows={4} placeholder="Describe your project requirements..." className="form-input resize-none" />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
