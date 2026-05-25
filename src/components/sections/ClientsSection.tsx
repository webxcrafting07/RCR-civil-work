import Image from 'next/image'
import connectDB from '@/lib/mongodb'
import Client from '@/models/Client'
import ClientsSectionHeader from '@/components/sections/ClientsSectionHeader'

const MOCK_CLIENTS = [
  { _id: 'mock1', name: 'Client 1', logo: '/logo-3d.png', website: '#' },
  { _id: 'mock2', name: 'Client 2', logo: '/logo-3d.png', website: '#' },
  { _id: 'mock3', name: 'Client 3', logo: '/logo-3d.png', website: '#' },
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
    <section className="py-20 bg-white border-y border-slate-100 overflow-hidden">
      <div className="container-custom mb-10 text-center">
        <ClientsSectionHeader />
      </div>

      <div className="relative w-full flex overflow-hidden">
        {/* Left/Right fading gradients for smooth entering/exiting */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        {/* The scrolling track */}
        <div className="flex animate-marquee min-w-max gap-12 sm:gap-24 px-12 sm:px-24">
          {/* We render the list twice to create the infinite loop effect seamlessly */}
          {[...clients, ...clients].map((client: any, i: number) => (
            <div 
              key={`${client._id}-${i}`} 
              className="flex-shrink-0 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 w-32 h-20 md:w-40 md:h-24 relative"
            >
              {client.website ? (
                <a href={client.website} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative" title={client.name}>
                  <Image 
                    src={client.logo} 
                    alt={client.name} 
                    fill 
                    sizes="160px"
                    className="object-contain" 
                  />
                </a>
              ) : (
                <div className="w-full h-full relative" title={client.name}>
                  <Image 
                    src={client.logo} 
                    alt={client.name} 
                    fill 
                    sizes="160px"
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
