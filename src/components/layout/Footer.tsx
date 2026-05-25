'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, HardHat, ArrowRight, ExternalLink } from 'lucide-react'
import { COMPANY_INFO, NAV_ITEMS, SERVICES_LIST, TARGET_LOCATIONS } from '@/constants'
import { useTranslation } from '@/hooks/useTranslation'

const currentYear = new Date().getFullYear()

const NAV_KEYS: Record<string, string> = {
  '/': 'nav.home',
  '/about': 'nav.about',
  '/services': 'nav.services',
  '/projects': 'nav.projects',
  '/gallery': 'nav.gallery',
  '/blogs': 'nav.blogs',
  '/contact': 'nav.contact',
}

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      {/* Main Footer */}
      <div className="container-custom pt-12 pb-8 lg:pt-20 lg:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">

          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group mb-5">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm bg-white p-1">
                <Image src="/logo-3d.png" alt="RCR Logo" fill sizes="40px" className="object-cover" />
              </div>
              <div>
                <div className="font-mono font-bold text-white text-base tracking-widest leading-none">RCR</div>
                <div className="font-mono font-semibold text-sky-400 text-[10px] tracking-[0.25em] leading-none mt-1">ENTERPRISES</div>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex flex-col gap-3">
              <a href="tel:9619439243" className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-sky-400 transition-colors">
                <div className="w-7 h-7 rounded-lg bg-sky-400/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={13} className="text-sky-400" />
                </div>
                {COMPANY_INFO.phone}
              </a>
              <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-sky-400 transition-colors">
                <div className="w-7 h-7 rounded-lg bg-sky-400/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={13} className="text-sky-400" />
                </div>
                <span className="truncate">{COMPANY_INFO.email}</span>
              </a>
              <a href="https://maps.app.goo.gl/qFVpxJ2gH3gi583q7" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 text-sm text-slate-400 hover:text-sky-400 transition-colors">
                <div className="w-7 h-7 rounded-lg bg-sky-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={13} className="text-sky-400" />
                </div>
                <span className="leading-relaxed">{COMPANY_INFO.address.line1}, {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state}</span>
              </a>
            </div>
          </div>

          {/* Links & Services (Side by Side on mobile) */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            {/* Quick Links */}
            <div>
              <h4 className="font-mono font-semibold text-white tracking-widest text-xs uppercase mb-5 flex items-center gap-2">
                <span className="w-3 h-0.5 bg-sky-400" />
                {t('footer.quickLinks')}
              </h4>
              <ul className="flex flex-col gap-3">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="flex items-center gap-2 text-sm text-slate-400 hover:text-sky-400 transition-colors group">
                      <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0 hidden sm:block" />
                      {t(NAV_KEYS[item.href] || item.label)}
                    </Link>
                  </li>
                ))}
                <li><Link href="/privacy-policy" className="flex items-center gap-2 text-sm text-slate-400 hover:text-sky-400 transition-colors">{t('nav.privacyPolicy')}</Link></li>
                <li><Link href="/terms" className="flex items-center gap-2 text-sm text-slate-400 hover:text-sky-400 transition-colors">{t('nav.termsOfService')}</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-mono font-semibold text-white tracking-widest text-xs uppercase mb-5 flex items-center gap-2">
                <span className="w-3 h-0.5 bg-sky-400" />
                {t('footer.ourServices')}
              </h4>
              <ul className="flex flex-col gap-3">
                {SERVICES_LIST.slice(0, 8).map((s) => (
                  <li key={s.id}>
                    <Link href={`/services/${s.slug}`} className="text-sm text-slate-400 hover:text-sky-400 transition-colors line-clamp-1">
                      {t(`servicesList.${s.id}.title`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Registration & CTA */}
          <div className="lg:col-span-1">
            <h4 className="font-mono font-semibold text-white tracking-widest text-xs uppercase mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-sky-400" />
              {t('footer.companyInfo')}
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 mb-6">
              {[
                { label: t('footer.gstNo'), value: COMPANY_INFO.registration.gstNo },
                { label: t('footer.udyogAadhaar'), value: COMPANY_INFO.registration.udyogAadhaar },
                { label: t('footer.gumastaNo'), value: COMPANY_INFO.registration.gumastaNo },
                { label: t('footer.enterpriseType'), value: COMPANY_INFO.registration.enterpriseType },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">{item.label}</div>
                  <div className="text-xs text-slate-300 font-medium">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 lg:flex-col">
              <Link href="/contact" className="btn-primary text-xs w-full justify-center py-2.5">
                {t('footer.getQuote')}
              </Link>
              <a
                href="https://wa.me/919619439243"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg text-xs font-semibold text-white transition-all duration-300 hover:opacity-90"
                style={{ background: '#25D366' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                {t('footer.whatsappUs')}
              </a>
            </div>
          </div>
        </div>

        {/* Areas We Serve */}
        <div className="border-t border-slate-800 pt-8 pb-4">
          <h4 className="font-mono font-semibold text-white tracking-widest text-xs uppercase mb-4 flex items-center justify-center gap-2">
            <span className="w-4 h-0.5 bg-sky-400" />
            {t('footer.areasWeServe')}
            <span className="w-4 h-0.5 bg-sky-400" />
          </h4>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-4">
            {TARGET_LOCATIONS.slice(0, 6).map(loc => (
              <Link key={loc.slug} href={`/locations/${loc.slug}`} className="text-sm font-medium text-slate-400 hover:text-sky-400 transition-colors">
                {t('footer.rccContractorIn')} {loc.name}
              </Link>
            ))}
          </div>

          <details className="group cursor-pointer text-center">
            <summary className="inline-flex items-center gap-1 text-xs font-semibold text-sky-500 hover:text-sky-400 transition-colors list-none">
              <span className="group-open:hidden">{t('footer.viewAllLocations')} {TARGET_LOCATIONS.length}+ {t('footer.locations')}</span>
              <span className="hidden group-open:inline">{t('footer.hideLocations')}</span>
            </summary>
            
            <div className="mt-4 pt-4 border-t border-slate-800/50 flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-4xl mx-auto">
              {TARGET_LOCATIONS.slice(6).map(loc => (
                <Link key={loc.slug} href={`/locations/${loc.slug}`} className="text-xs font-medium text-slate-500 hover:text-sky-400 transition-colors">
                  {loc.name}
                </Link>
              ))}
              <div className="w-full mt-4">
                <Link href="/locations" className="text-xs font-bold text-sky-400 hover:text-white transition-colors underline decoration-sky-400/30 underline-offset-4">
                  {t('footer.browseAllLocations')}
                </Link>
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {currentYear} <span className="text-slate-400">RCR ENTERPRISES</span>. {t('footer.allRightsReserved')} {t('footer.proprietor')}: {COMPANY_INFO.proprietor}
          </p>
          <p className="text-xs text-slate-600">
            {t('footer.virarTagline')}
          </p>
        </div>
      </div>
    </footer>
  )
}
