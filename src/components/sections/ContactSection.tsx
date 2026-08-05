'use client'

import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import { COMPANY_INFO, SERVICES_LIST_FOR_CONTACT } from '@/constants'
import { useTranslation } from '@/hooks/useTranslation'

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
  const { t } = useTranslation()

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (result.success) {
        toast.success(t('contact.successMessage'))
        reset()
      } else {
        toast.error(result.message || t('contact.errorMessage'))
      }
    } catch {
      toast.error(t('contact.failedMessage'))
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
            {t('contact.badge')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            {t('contact.titleLine1')} <span className="text-gradient">{t('contact.titleHighlight')}</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 rounded-3xl bg-slate-950 p-8 md:p-10 relative overflow-hidden shadow-xl flex flex-col"
          >
            {/* Background glowing orbs */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brandRed/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brandRed/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col gap-8 flex-1 mb-10">
              {[
                {
                  icon: Phone,
                  title: t('contact.phone'),
                  content: COMPANY_INFO.phone,
                  href: `tel:${COMPANY_INFO.phone}`,
                },
                {
                  icon: Mail,
                  title: t('contact.email'),
                  content: COMPANY_INFO.email,
                  href: `mailto:${COMPANY_INFO.email}`,
                },
                {
                  icon: MapPin,
                  title: t('contact.officeAddress'),
                  content: COMPANY_INFO.address.full,
                  href: 'https://maps.google.com/?q=Virar+East+Maharashtra',
                },
                {
                  icon: Clock,
                  title: t('contact.workingHours'),
                  content: t('contact.workingHoursValue'),
                  href: null,
                },
              ].map(({ icon: Icon, title, content, href }) => (
                <div key={title} className="flex gap-5 items-start group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brandRed group-hover:border-brandRed transition-all duration-300 shadow-sm">
                    <Icon size={20} className="text-brandRed group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] text-slate-400 font-mono font-semibold tracking-wider uppercase mb-1.5">{title}</div>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                        className="text-base font-bold text-white hover:text-brandRed transition-colors leading-relaxed block break-words">
                        {content}
                      </a>
                    ) : (
                      <div className="text-base font-bold text-white leading-relaxed">{content}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919619439243"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-95 shadow-[0_5px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_8px_25px_rgba(37,211,102,0.4)]"
              style={{ background: '#25D366' }}
            >
              {t('contact.chatWhatsApp')}
            </a>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-10 rounded-3xl border border-slate-200 bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('contact.formFullName')}</label>
                  <input {...register('fullName')} placeholder={t('contact.formNamePlaceholder')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-brandRed/20 focus:border-brandRed transition-all outline-none" />
                  {errors.fullName && <p className="text-brandRed text-xs mt-1.5 font-medium">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('contact.formPhone')}</label>
                  <input {...register('phone')} placeholder={t('contact.formPhonePlaceholder')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-brandRed/20 focus:border-brandRed transition-all outline-none" />
                  {errors.phone && <p className="text-brandRed text-xs mt-1.5 font-medium">{errors.phone.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{t('contact.formEmail')}</label>
                <input {...register('email')} type="email" placeholder={t('contact.formEmailPlaceholder')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-brandRed/20 focus:border-brandRed transition-all outline-none" />
                {errors.email && <p className="text-brandRed text-xs mt-1.5 font-medium">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{t('contact.formService')}</label>
                <select {...register('serviceRequired')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-brandRed/20 focus:border-brandRed transition-all outline-none">
                  <option value="">{t('contact.formServicePlaceholder')}</option>
                  {SERVICES_LIST_FOR_CONTACT.map(s => (
                    <option key={s} value={s} className="bg-white text-slate-900">{s}</option>
                  ))}
                </select>
                {errors.serviceRequired && <p className="text-brandRed text-xs mt-1.5 font-medium">{errors.serviceRequired.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{t('contact.formMessage')}</label>
                <textarea {...register('message')} rows={4} placeholder={t('contact.formMessagePlaceholder')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-brandRed/20 focus:border-brandRed transition-all outline-none resize-none" />
                {errors.message && <p className="text-brandRed text-xs mt-1.5 font-medium">{errors.message.message}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brandRed text-white flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold transition-all hover:bg-brandRed/90 hover:shadow-[0_8px_20px_rgba(192,30,46,0.25)] disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('contact.sending')}
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    {t('contact.sendMessage')}
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
