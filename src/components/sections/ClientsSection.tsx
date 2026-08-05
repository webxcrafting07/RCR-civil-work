import Image from 'next/image'
import connectDB from '@/lib/mongodb'
import Client from '@/models/Client'
import ClientsSectionHeader from '@/components/sections/ClientsSectionHeader'

const MOCK_CLIENTS = [
  { _id: 'mock1', name: 'Client 1', logo: '/logo_new.jpeg', website: '#' },
  { _id: 'mock2', name: 'Client 2', logo: '/logo_new.jpeg', website: '#' },
  { _id: 'mock3', name: 'Client 3', logo: '/logo_new.jpeg', website: '#' },
]

async function getClients() {
  try {
    await connectDB()
    const clients = await Client.find({ isActive: true }).sort({ order: 1, createdAt: -1 })
    
    // If no clients in DB, fallback to mock
    if (!clients || clients.length === 0) {
      return [...MOCK_CLIENTS, ...MOCK_CLIENTS]
    }
    
    // If there are less than 6 clients, duplicate them to fill the marquee
    let displayClients = JSON.parse(JSON.stringify(clients))
    if (displayClients.length > 0 && displayClients.length < 6) {
      displayClients = [...displayClients, ...displayClients, ...displayClients]
    }
    return displayClients
  } catch (error) {
    // Return mock clients if DB connection fails (e.g., IP not whitelisted)
    console.warn('Database connection failed, falling back to mock clients.')
    return [...MOCK_CLIENTS, ...MOCK_CLIENTS]
  }
}

export default async function ClientsSection() {
  const clients = await getClients()

  if (!clients || clients.length === 0) {
    return null
  }

  return (
    <section className="py-8 md:py-10 bg-slate-50 border-y border-slate-200 overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#c01e2e_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />
      
      <div className="container-custom mb-2 text-center relative z-10">
        <ClientsSectionHeader />
      </div>

      <div className="relative w-full flex overflow-hidden z-10 pb-4 pt-2">
        {/* Left/Right fading gradients for smooth entering/exiting */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-slate-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-slate-50 to-transparent z-10" />

        {/* The scrolling track */}
        <div className="flex animate-marquee min-w-max gap-4 md:gap-6 px-4 md:px-6">
          {/* We render the list twice to create the infinite loop effect seamlessly */}
          {[...clients, ...clients].map((client: any, i: number) => (
            <div 
              key={`${client._id}-${i}`} 
              className="flex-shrink-0 flex items-center justify-center w-40 h-24 md:w-56 md:h-32 relative bg-white rounded-2xl shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] border border-slate-100 p-4 md:p-6 group hover:shadow-[0_15px_30px_-10px_rgba(192,30,46,0.15)] hover:border-brandRed/30 transition-all duration-500 hover:-translate-y-1"
            >
              {client.website ? (
                <a href={client.website} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" title={client.name}>
                  <Image 
                    src={client.logo} 
                    alt={client.name} 
                    fill 
                    sizes="200px"
                    className="object-contain" 
                  />
                </a>
              ) : (
                <div className="w-full h-full relative grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" title={client.name}>
                  <Image 
                    src={client.logo} 
                    alt={client.name} 
                    fill 
                    sizes="200px"
                    className="object-contain" 
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
