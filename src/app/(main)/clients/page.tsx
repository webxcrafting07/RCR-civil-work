import type { Metadata } from 'next'
import Image from 'next/image'
import PageHero from '@/components/shared/PageHero'
import CTASection from '@/components/sections/CTASection'
import connectDB from '@/lib/mongodb'
import Client from '@/models/Client'

export const metadata: Metadata = {
  title: 'Our Trusted Clients - RCR ENTERPRISES',
  description: 'A list of leading companies and clients who trust RCR ENTERPRISES for their RCC and civil construction needs.',
}

export default async function ClientsPage() {
  await connectDB()
  const clients = await Client.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean()

  return (
    <>
      <PageHero 
        badge="Our Clients" 
        title="Trusted By **Leading Companies**" 
        subtitle="We have had the privilege of working with some of the best companies and organizations." 
        backgroundImage="/images/commercial_building.png" 
      />
      
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(#c01e2e_2px,transparent_2px)] [background-size:20px_20px] opacity-5 pointer-events-none" />
        
        <div className="container-custom relative z-10">
          {clients.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {clients.map((client: any) => (
                <div 
                  key={client._id} 
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center gap-6 shadow-sm hover:shadow-md hover:border-brandRed/30 transition-all duration-300 group"
                >
                  <div className="relative w-full h-24 flex items-center justify-center">
                    {client.website ? (
                      <a href={client.website} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative" title={client.name}>
                        <Image 
                          src={client.logo} 
                          alt={client.name} 
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-500" 
                        />
                      </a>
                    ) : (
                      <div className="w-full h-full relative" title={client.name}>
                        <Image 
                          src={client.logo} 
                          alt={client.name} 
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-slate-900 text-center text-sm group-hover:text-brandRed transition-colors">
                    {client.name}
                  </h3>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-slate-500 py-12">
              No clients found.
            </div>
          )}
        </div>
      </section>
      
      <CTASection />
    </>
  )
}
