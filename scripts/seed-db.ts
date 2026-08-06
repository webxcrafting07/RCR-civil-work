import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env')
}

// Client Schema & Model
const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  website: { type: String },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

const Client = mongoose.models.Client || mongoose.model('Client', ClientSchema)

// Project Schema & Model
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  images: [{ type: String }],
  coverImage: { type: String },
  workType: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  featured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema)


const sampleClients = [
  { name: 'Reliance Industries', logo: '/logo_new.png', website: '#', order: 1, isActive: true },
  { name: 'L&T Construction', logo: '/logo_new.png', order: 2, isActive: true },
  { name: 'Lodha Group', logo: '/logo_new.png', order: 3, isActive: true },
]

const sampleProjects = [
  { 
    title: 'Residential Building - Virar East', 
    slug: 'residential-virar-east', 
    shortDescription: 'Complete RCC construction of a 4-storey residential building with premium finishing.', 
    description: 'A complete end-to-end RCC construction project focusing on maximum durability, premium material usage, and precise structural engineering.',
    coverImage: '/images/hero_construction_bg.png', 
    images: ['/images/hero_construction_bg.png'],
    category: 'residential', 
    status: 'completed', 
    location: 'Virar East', 
    startDate: new Date('2024-01-01'), 
    workType: 'RCC Construction',
    featured: true
  },
  { 
    title: 'Commercial Complex - Vasai', 
    slug: 'commercial-vasai', 
    shortDescription: 'Large-scale commercial project with structural RCC work and civil construction.', 
    description: 'A large-scale commercial project with structural RCC work and civil construction catering to modern business requirements.',
    coverImage: '/images/commercial_building.png', 
    images: ['/images/commercial_building.png'],
    category: 'commercial', 
    status: 'ongoing', 
    location: 'Vasai', 
    startDate: new Date('2024-06-01'), 
    workType: 'Civil Work',
    featured: true
  },
  { 
    title: 'Slab & Beam Work - Nalasopara', 
    slug: 'slab-beam-nalasopara', 
    shortDescription: 'Professional slab casting and beam work for a multi-level structure.', 
    description: 'Professional slab casting and beam work ensuring maximum load bearing capacity and safety standards.',
    coverImage: '/images/slab_casting_work.png', 
    images: ['/images/slab_casting_work.png'],
    category: 'residential', 
    status: 'completed', 
    location: 'Nalasopara', 
    startDate: new Date('2023-11-01'), 
    workType: 'Slab Work',
    featured: false
  },
]

async function seedDB() {
  try {
    await mongoose.connect(MONGODB_URI!)
    console.log('Connected to MongoDB')

    // Seed Clients
    await Client.deleteMany({}) 
    console.log('Cleared existing clients')
    await Client.insertMany(sampleClients)
    console.log(`Successfully seeded ${sampleClients.length} clients`)
    
    // Seed Projects
    await Project.deleteMany({}) 
    console.log('Cleared existing projects')
    await Project.insertMany(sampleProjects)
    console.log(`Successfully seeded ${sampleProjects.length} projects`)

    process.exit(0)
  } catch (error) {
    console.error('Error seeding DB:', error)
    process.exit(1)
  }
}

seedDB()
