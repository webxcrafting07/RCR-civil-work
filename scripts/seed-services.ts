import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { SERVICES_LIST } from '../src/constants/index'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env')
}

// Service Schema & Model
const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: '' },
  icon: { type: String, default: 'Building2' },
  benefits: [{ type: String }],
  process: [
    {
      step: { type: Number, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
  faqs: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
    },
  ],
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema)


async function seedServices() {
  try {
    await mongoose.connect(MONGODB_URI!)
    console.log('Connected to MongoDB')

    await Service.deleteMany({}) 
    console.log('Cleared existing services')

    // Formatting data for DB
    const servicesToInsert = SERVICES_LIST.map((srv, index) => {
      // Create a clean object and remove strict types if any
      const doc = {
        title: srv.title,
        slug: srv.slug,
        shortDescription: srv.shortDescription,
        description: srv.description,
        image: srv.image,
        icon: srv.icon,
        benefits: srv.benefits,
        process: srv.process.map(p => ({
          step: p.step,
          title: p.title,
          description: p.description
        })),
        faqs: srv.faqs,
        featured: index < 3, // Make first 3 featured
        order: index,
        isActive: true
      }
      return doc
    })

    await Service.insertMany(servicesToInsert)
    console.log(`Successfully seeded ${servicesToInsert.length} services`)

    process.exit(0)
  } catch (error) {
    console.error('Error seeding Services DB:', error)
    process.exit(1)
  }
}

seedServices()
