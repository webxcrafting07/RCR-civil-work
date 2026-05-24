import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env')
}

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  website: { type: String },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

const Client = mongoose.models.Client || mongoose.model('Client', ClientSchema)

const sampleClients = [
  {
    name: 'Reliance Industries',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&q=80',
    website: 'https://www.ril.com',
    order: 1,
    isActive: true
  },
  {
    name: 'L&T Construction',
    logo: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=300&q=80',
    order: 2,
    isActive: true
  },
  {
    name: 'Lodha Group',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&q=80',
    order: 3,
    isActive: true
  },
  {
    name: 'Tata Housing',
    logo: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=300&q=80',
    order: 4,
    isActive: true
  },
  {
    name: 'Godrej Properties',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&q=80',
    order: 5,
    isActive: true
  }
]

async function seedClients() {
  try {
    await mongoose.connect(MONGODB_URI!)
    console.log('Connected to MongoDB')

    await Client.deleteMany({}) // Clear existing
    console.log('Cleared existing clients')

    const result = await Client.insertMany(sampleClients)
    console.log(`Successfully seeded ${result.length} clients`)
    
    process.exit(0)
  } catch (error) {
    console.error('Error seeding clients:', error)
    process.exit(1)
  }
}

seedClients()
