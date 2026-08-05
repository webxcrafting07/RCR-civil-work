import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Building2 } from 'lucide-react'
import { TARGET_LOCATIONS } from '@/constants'
import PageHero from '@/components/shared/PageHero'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Areas We Serve in Mumbai, Thane & Palghar | RCR Enterprises',
  description: 'RCR Enterprises provides top-quality RCC Work and Civil Construction services across Mumbai, Navi Mumbai, Thane, Vasai, Virar, and Palghar districts.',
}

export default function LocationsPage() {
  // Group locations by line/region for better UX
  const westernLine = ['Mumbai', 'Churchgate', 'Marine Lines', 'Charni Road', 'Grant Road', 'Mumbai Central', 'Mahalaxmi', 'Lower Parel', 'Prabhadevi', 'Dadar', 'Mahim', 'Bandra', 'Khar', 'Santacruz', 'Vile Parle', 'Andheri', 'Jogeshwari', 'Goregaon', 'Malad', 'Kandivali', 'Borivali', 'Dahisar', 'Mira Road', 'Bhayandar', 'Naigaon', 'Vasai', 'Nalasopara', 'Virar', 'Palghar', 'Boisar']
  const centralLine = ['CSMT', 'Byculla', 'Parel', 'Matunga', 'Sion', 'Kurla', 'Vidyavihar', 'Ghatkopar', 'Vikhroli', 'Kanjurmarg', 'Bhandup', 'Nahur', 'Mulund', 'Thane', 'Kalwa', 'Mumbra', 'Diva', 'Dombivli', 'Thakurli', 'Kalyan', 'Ulhasnagar', 'Ambernath', 'Badlapur', 'Titwala']
  const harbourLine = ['Wadala', 'Chunabhatti', 'Chembur', 'Govandi', 'Mankhurd', 'Navi Mumbai', 'Vashi', 'Sanpada', 'Juinagar', 'Nerul', 'Seawoods', 'Belapur', 'Kharghar', 'Panvel']
  const southMumbai = ['South Mumbai', 'Worli', 'Powai']

  const getLocationsByNames = (names: string[]) => {
    return TARGET_LOCATIONS.filter(loc => names.includes(loc.name))
  }

  const regions = [
    { title: 'Western Suburbs & Palghar', locations: getLocationsByNames(westernLine) },
    { title: 'Central Suburbs & Thane', locations: getLocationsByNames(centralLine) },
    { title: 'Harbour Line & Navi Mumbai', locations: getLocationsByNames(harbourLine) },
    { title: 'South Mumbai & Key Areas', locations: getLocationsByNames(southMumbai) },
  ]

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        badge="Service Areas"
        title="Building Strong Foundations Across Mumbai"
        subtitle="From South Mumbai to Palghar, and Navi Mumbai to Kalyan, our expert civil contractors are available everywhere for your RCC and construction needs."
        backgroundImage="/images/hero_construction_bg.png"
      />

      <section className="py-24 relative overflow-hidden bg-white">
        {/* Background Decorative */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(#c01e2e_2px,transparent_2px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />
        <div className="absolute -left-64 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brandRed/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container-custom max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {regions.map((region) => (
              <div 
                key={region.title} 
                className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-[0_20px_50px_-15px_rgba(192,30,46,0.15)] border border-slate-100 hover:border-brandRed/30 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Hover Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-brandRed scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-8 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-brandRed group-hover:bg-brandRed group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm border border-brandRed/10">
                    <Building2 size={28} className="group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <span className="group-hover:text-brandRed transition-colors duration-500 tracking-tight">{region.title}</span>
                </h2>
                
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4">
                  {region.locations.map(loc => (
                    <li key={loc.slug}>
                      <Link href={`/locations/${loc.slug}`} className="group/link flex items-center gap-3 text-sm md:text-base font-semibold text-slate-600 hover:text-brandRed transition-colors">
                        <span className="w-2 h-2 rounded-full bg-slate-200 group-hover/link:bg-brandRed group-hover/link:scale-[1.7] transition-all duration-300" />
                        {loc.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
