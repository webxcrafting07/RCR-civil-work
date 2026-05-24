import mongoose, { Schema, Document } from 'mongoose'

export interface IReviewDocument extends Document {
  clientName: string
  clientPhoto?: string
  clientCompany?: string
  review: string
  rating: number
  projectName?: string
  isActive: boolean
  featured: boolean
}

const ReviewSchema = new Schema<IReviewDocument>(
  {
    clientName: { type: String, required: true, trim: true },
    clientPhoto: { type: String },
    clientCompany: { type: String },
    review: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    projectName: { type: String },
    isActive: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.models.Review || mongoose.model<IReviewDocument>('Review', ReviewSchema)
