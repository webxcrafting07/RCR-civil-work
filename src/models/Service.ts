import mongoose, { Schema, Document } from 'mongoose'

export interface IServiceDocument extends Document {
  title: string
  slug: string
  shortDescription: string
  description: string
  image: string
  icon?: string
  benefits: string[]
  process: { step: number; title: string; description: string }[]
  faqs: { question: string; answer: string }[]
  featured: boolean
  order: number
  isActive: boolean
}

const ServiceSchema = new Schema<IServiceDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    shortDescription: { type: String, required: true, maxlength: 300 },
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
  },
  { timestamps: true }
)


ServiceSchema.index({ isActive: 1, order: 1 })

export default mongoose.models.Service || mongoose.model<IServiceDocument>('Service', ServiceSchema)
