'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function WhatsAppWidget() {
  const pathname = usePathname()

  let waText = "Hi, I would like to inquire about your construction services."
  let tooltipText = "Chat on WhatsApp"

  // Dynamically parse pathname to personalize WhatsApp leads
  const parts = pathname ? pathname.split('/').filter(Boolean) : []
  
  if (parts.length === 3 && parts[0] === 'locations') {
    const citySlug = parts[1]
    const serviceSlug = parts[2]

    const cityName = citySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    const serviceName = serviceSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

    waText = `Hi RCR Enterprises, I am looking for expert "${serviceName}" in ${cityName}. Let's schedule a site inspection.`
    tooltipText = `Need ${serviceName} in ${cityName}?`
  } else if (parts.length === 2 && parts[0] === 'locations') {
    const citySlug = parts[1]
    const cityName = citySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

    waText = `Hi RCR Enterprises, I need an RCC / Civil contractor in ${cityName}. Let's discuss our project.`
    tooltipText = `RCC Contractor in ${cityName}`
  } else if (parts.length === 2 && parts[0] === 'services') {
    const serviceSlug = parts[1]
    const serviceName = serviceSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

    waText = `Hi RCR Enterprises, I would like to inquire about your "${serviceName}" services.`
    tooltipText = `Inquire about ${serviceName}`
  }

  const encodedText = encodeURIComponent(waText)
  const whatsappUrl = `https://wa.me/919619439243?text=${encodedText}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="group fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-emerald-500 text-white rounded-full shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-colors"
      aria-label="Chat on WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
      
      {/* Pulse effect */}
      <span className="absolute w-full h-full rounded-full border-2 border-emerald-500 animate-ping opacity-75 pointer-events-none" />

      {/* Dynamic Fading Tooltip */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 border border-slate-800 text-white text-[10px] font-bold py-2 px-3 rounded-xl whitespace-nowrap shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 font-sans tracking-wide">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
        {tooltipText}
      </div>
    </motion.a>
  )
}
