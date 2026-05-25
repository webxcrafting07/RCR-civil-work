import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ArrowRight, Building2 } from 'lucide-react'
import { TARGET_LOCATIONS } from '@/constants'

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
    <main className="min-h-screen bg-slate-50 pt-40 lg:pt-48 pb-24">
      {/* Header */}
      <div className="container-custom max-w-5xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-700 font-semibold text-sm mb-6">
          <MapPin size={16} /> Service Areas
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
          Building Strong Foundations Across Mumbai
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          From South Mumbai to Palghar, and Navi Mumbai to Kalyan, our expert civil contractors are available everywhere for your RCC and construction needs.
        </p>
      </div>

      {/* Grid of Areas */}
      <div className="container-custom max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regions.map((region) => (
            <div key={region.title} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
                  <Building2 size={20} />
                </div>
                {region.title}
              </h2>
              
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-4">
                {region.locations.map(loc => (
                  <li key={loc.slug}>
                    <Link href={`/locations/${loc.slug}`} className="group flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-sky-500 transition-colors" />
                      {loc.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="mt-16 bg-slate-900 rounded-3xl p-10 md:p-16 text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -ml-20 -mb-20" />
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Ready to start your construction project?
            </h3>
            <p className="text-slate-300 max-w-2xl mx-auto mb-10 text-lg">
              No matter where you are located in Mumbai, our team will visit your site for a comprehensive assessment and consultation.
            </p>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-lg shadow-sky-500/30 group">
              Get a Free Quote Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
