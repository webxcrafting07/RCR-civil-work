import mongoose, { Schema, Document } from 'mongoose'

export interface IProjectDocument extends Document {
  title: string
  slug: string
  description: string
  shortDescription: string
  images: string[]
  coverImage: string
  workType: string
  category: 'residential' | 'commercial' | 'infrastructure' | 'renovation'
  status: 'ongoing' | 'completed' | 'upcoming'
  clientName?: string
  location: string
  startDate: Date
  endDate?: Date
  budget?: string
  materials?: string[]
  featured: boolean
  isActive: boolean
}

const ProjectSchema = new Schema<IProjectDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true, maxlength: 400 },
    images: [{ type: String }],
    coverImage: { type: String, default: '' },
    workType: { type: String, required: true },
    category: {
      type: String,
      enum: ['residential', 'commercial', 'infrastructure', 'renovation'],
      required: true,
    },
    status: {
      type: String,
      enum: ['ongoing', 'completed', 'upcoming'],
      default: 'ongoing',
    },
    clientName: { type: String },
    location: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    budget: { type: String },
    materials: [{ type: String }],
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)


ProjectSchema.index({ status: 1, category: 1 })
ProjectSchema.index({ featured: 1, isActive: 1 })

export default mongoose.models.Project || mongoose.model<IProjectDocument>('Project', ProjectSchema)
