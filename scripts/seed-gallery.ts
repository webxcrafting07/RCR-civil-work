import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { Gallery } from '../src/models/index' // Using the Gallery model from index.ts

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env')
}

const mockGalleryImages = [
  {
    title: 'RCC Work in progress',
    imageUrl: '/images/rcc_steel_work.png',
    publicId: 'mock-rcc-1',
    category: 'RCC Work',
    isActive: true,
    order: 1
  },
  {
    title: 'Slab Casting',
    imageUrl: '/images/slab_casting_work.png',
    publicId: 'mock-slab-1',
    category: 'Slab Work',
    isActive: true,
    order: 2
  },
  {
    title: 'Masonry Work',
    imageUrl: '/images/masonry_brick_work.png',
    publicId: 'mock-masonry-1',
    category: 'Residential',
    isActive: true,
    order: 3
  },
  {
    title: 'Commercial Construction',
    imageUrl: '/images/commercial_building.png',
    publicId: 'mock-commercial-1',
    category: 'Commercial',
    isActive: true,
    order: 4
  },
  {
    title: 'Residential Villa Finish',
    imageUrl: '/images/residential_villa.png',
    publicId: 'mock-residential-1',
    category: 'Residential',
    isActive: true,
    order: 5
  },
  {
    title: 'Foundation Construction',
    imageUrl: '/images/hero_construction_bg.png',
    publicId: 'mock-foundation-1',
    category: 'Commercial',
    isActive: true,
    order: 6
  }
]


async function seedGallery() {
  try {
    await mongoose.connect(MONGODB_URI!)
    console.log('Connected to MongoDB')

    await Gallery.deleteMany({}) 
    console.log('Cleared existing gallery images')

    await Gallery.insertMany(mockGalleryImages)
    console.log(`Successfully seeded ${mockGalleryImages.length} gallery images`)

    process.exit(0)
  } catch (error) {
    console.error('Error seeding Gallery DB:', error)
    process.exit(1)
  }
}

seedGallery()
