import mongoose, { Schema, Document } from 'mongoose'

export interface IBlogDocument extends Document {
  title: string
  slug: string
  content: string
  excerpt: string
  coverImage: string
  author: string
  tags: string[]
  seoTitle: string
  seoDescription: string
  isPublished: boolean
  publishedAt: Date
  createdAt: Date
  updatedAt: Date
}

const BlogSchema = new Schema<IBlogDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true, maxlength: 400 },
    coverImage: { type: String, default: '' },
    author: { type: String, default: 'RCR Enterprises' },
    tags: [{ type: String }],
    seoTitle: { type: String, maxlength: 100 },
    seoDescription: { type: String, maxlength: 200 },
    isPublished: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

BlogSchema.index({ isPublished: 1, publishedAt: -1 })

export default mongoose.models.Blog || mongoose.model<IBlogDocument>('Blog', BlogSchema)
