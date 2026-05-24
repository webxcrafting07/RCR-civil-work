import mongoose, { Schema, Document } from 'mongoose'

// ============================================================
// GALLERY MODEL
// ============================================================
export interface IGalleryDocument extends Document {
  title?: string
  imageUrl: string
  publicId: string
  category: string
  isActive: boolean
  order: number
}

const GallerySchema = new Schema<IGalleryDocument>(
  {
    title: { type: String },
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    category: { type: String, default: 'General' },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const Gallery = mongoose.models.Gallery || mongoose.model<IGalleryDocument>('Gallery', GallerySchema)

// ============================================================
// CONTACT INQUIRY MODEL
// ============================================================
export interface IContactInquiryDocument extends Document {
  fullName: string
  phone: string
  email: string
  serviceRequired: string
  message: string
  status: 'new' | 'read' | 'replied' | 'resolved'
  adminNote?: string
}

const ContactInquirySchema = new Schema<IContactInquiryDocument>(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    serviceRequired: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'resolved'],
      default: 'new',
    },
    adminNote: { type: String },
  },
  { timestamps: true }
)

ContactInquirySchema.index({ status: 1, createdAt: -1 })

export const ContactInquiry =
  mongoose.models.ContactInquiry ||
  mongoose.model<IContactInquiryDocument>('ContactInquiry', ContactInquirySchema)

// ============================================================
// WEBSITE SETTINGS MODEL
// ============================================================
export interface IWebsiteSettingsDocument extends Document {
  logo?: string
  logoText: string
  tagline: string
  companyName: string
  phone: string
  email: string
  address: string
  mapEmbedUrl?: string
  socialLinks: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
    youtube?: string
    whatsapp?: string
  }
  seo: {
    metaTitle: string
    metaDescription: string
    metaKeywords: string
    ogImage?: string
  }
  hero: {
    heading: string
    subheading: string
    backgroundImage?: string
  }
  stats: { label: string; value: string; suffix?: string }[]
  footerText?: string
}

const WebsiteSettingsSchema = new Schema<IWebsiteSettingsDocument>(
  {
    logo: String,
    logoText: { type: String, default: 'RCR ENTERPRISES' },
    tagline: { type: String, default: 'Quality Work With Commitment' },
    companyName: { type: String, default: 'RCR ENTERPRISES' },
    phone: { type: String, default: '9619439243' },
    email: { type: String, default: 'rcrenterprises786@gmail.com' },
    address: {
      type: String,
      default: 'Office No. 04, Raipada, Near Anand Gaushalla, Chandansar Road, Virar East – 401305, Maharashtra',
    },
    mapEmbedUrl: String,
    socialLinks: {
      facebook: String,
      instagram: String,
      twitter: String,
      linkedin: String,
      youtube: String,
      whatsapp: { type: String, default: 'https://wa.me/919619439243' },
    },
    seo: {
      metaTitle: { type: String, default: 'RCR ENTERPRISES - RCC Work Contractor in Virar East' },
      metaDescription: {
        type: String,
        default:
          'Professional RCC Work Contractor in Virar East, Maharashtra. Offering quality civil construction, slab work, shuttering, and more.',
      },
      metaKeywords: {
        type: String,
        default: 'RCC contractor, civil construction, Virar, Maharashtra, slab work, shuttering work',
      },
      ogImage: String,
    },
    hero: {
      heading: { type: String, default: 'Professional RCC Construction Services You Can Trust' },
      subheading: {
        type: String,
        default: 'Delivering Strong, Safe & Durable RCC Construction Solutions with Quality and Commitment.',
      },
      backgroundImage: String,
    },
    stats: {
      type: [
        {
          label: String,
          value: String,
          suffix: String,
        },
      ],
      default: [
        { label: 'Projects Completed', value: '150', suffix: '+' },
        { label: 'Happy Clients', value: '120', suffix: '+' },
        { label: 'Skilled Workforce', value: '50', suffix: '+' },
        { label: 'Years of Experience', value: '10', suffix: '+' },
      ],
    },
    footerText: String,
  },
  { timestamps: true }
)

export const WebsiteSettings =
  mongoose.models.WebsiteSettings ||
  mongoose.model<IWebsiteSettingsDocument>('WebsiteSettings', WebsiteSettingsSchema)
