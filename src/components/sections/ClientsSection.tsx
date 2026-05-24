import Image from 'next/image'
import connectDB from '@/lib/mongodb'
import Client from '@/models/Client'

async function getClients() {
  try {
    await connectDB()
    const clients = await Client.find({ isActive: true }).sort({ order: 1, createdAt: -1 })
    // If there are less than 6 clients, duplicate them to fill the marquee
    let displayClients = JSON.parse(JSON.stringify(clients))
    if (displayClients.length > 0 && displayClients.length < 6) {
      displayClients = [...displayClients, ...displayClients, ...displayClients]
    }
    return displayClients
  } catch (error) {
    console.error('Failed to fetch clients:', error)
    return []
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
        <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">Trusted By Leading Companies</h2>
      </div>

      <div className="relative w-full flex overflow-hidden">
        {/* Left/Right fading gradients for smooth entering/exiting */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        {/* The scrolling track */}
        <div className="flex animate-marquee min-w-max gap-12 sm:gap-24 px-12 sm:px-24">
          {/* We render the list twice to create the infinite loop effect seamlessly */}
          {[...clients, ...clients].map((client, i) => (
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
