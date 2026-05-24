// ============================================================
// CORE TYPES
// ============================================================

export interface IUser {
  _id: string
  name: string
  email: string
  password: string
  role: 'admin' | 'superadmin'
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

// ============================================================
// SERVICE TYPES
// ============================================================

export interface IService {
  _id: string
  title: string
  slug: string
  shortDescription: string
  description: string
  image: string
  icon?: string
  benefits: string[]
  process: IServiceProcess[]
  faqs: IFAQ[]
  featured: boolean
  order: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface IServiceProcess {
  step: number
  title: string
  description: string
}

export interface IFAQ {
  question: string
  answer: string
}

// ============================================================
// PROJECT TYPES
// ============================================================

export type ProjectStatus = 'ongoing' | 'completed' | 'upcoming'
export type ProjectCategory = 'residential' | 'commercial' | 'infrastructure' | 'renovation'

export interface IProject {
  _id: string
  title: string
  slug: string
  description: string
  shortDescription: string
  images: string[]
  coverImage: string
  workType: string
  category: ProjectCategory
  status: ProjectStatus
  clientName?: string
  location: string
  startDate: Date
  endDate?: Date
  budget?: string
  materials?: string[]
  featured: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// ============================================================
// REVIEW TYPES
// ============================================================

export interface IReview {
  _id: string
  clientName: string
  clientPhoto?: string
  clientCompany?: string
  review: string
  rating: number
  projectName?: string
  isActive: boolean
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

// ============================================================
// GALLERY TYPES
// ============================================================

export interface IGalleryImage {
  _id: string
  title?: string
  imageUrl: string
  publicId: string
  category: string
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

// ============================================================
// CONTACT TYPES
// ============================================================

export type InquiryStatus = 'new' | 'read' | 'replied' | 'resolved'

export interface IContactInquiry {
  _id: string
  fullName: string
  phone: string
  email: string
  serviceRequired: string
  message: string
  status: InquiryStatus
  adminNote?: string
  createdAt: Date
  updatedAt: Date
}

// ============================================================
// SETTINGS TYPES
// ============================================================

export interface ISocialLinks {
  facebook?: string
  instagram?: string
  twitter?: string
  linkedin?: string
  youtube?: string
  whatsapp?: string
}

export interface ISEOSettings {
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  ogImage?: string
}

export interface IHeroSettings {
  heading: string
  subheading: string
  backgroundImage?: string
  backgroundVideo?: string
}

export interface IWebsiteSettings {
  _id: string
  logo?: string
  logoText: string
  tagline: string
  companyName: string
  phone: string
  email: string
  address: string
  mapEmbedUrl?: string
  socialLinks: ISocialLinks
  seo: ISEOSettings
  hero: IHeroSettings
  stats: IStat[]
  footerText?: string
  whatsappNumber?: string
  updatedAt: Date
}

export interface IStat {
  label: string
  value: string
  suffix?: string
}

// ============================================================
// FORM TYPES
// ============================================================

export interface ContactFormData {
  fullName: string
  phone: string
  email: string
  serviceRequired: string
  message: string
}

export interface LoginFormData {
  email: string
  password: string
}

export interface ServiceFormData {
  title: string
  slug: string
  shortDescription: string
  description: string
  image?: File | string
  benefits: string[]
  process: IServiceProcess[]
  faqs: IFAQ[]
  featured: boolean
  order: number
  isActive: boolean
}

export interface ProjectFormData {
  title: string
  slug: string
  description: string
  shortDescription: string
  images?: FileList | string[]
  coverImage?: File | string
  workType: string
  category: ProjectCategory
  status: ProjectStatus
  clientName?: string
  location: string
  startDate: string
  endDate?: string
  budget?: string
  materials?: string[]
  featured: boolean
  isActive: boolean
}

// ============================================================
// API RESPONSE TYPES
// ============================================================

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// ============================================================
// DASHBOARD ANALYTICS
// ============================================================

export interface DashboardStats {
  totalServices: number
  totalProjects: number
  ongoingProjects: number
  completedProjects: number
  totalReviews: number
  totalInquiries: number
  newInquiries: number
  galleryImages: number
  monthlyInquiries: MonthlyData[]
  projectsByStatus: ProjectStatusData[]
}

export interface MonthlyData {
  month: string
  count: number
}

export interface ProjectStatusData {
  status: string
  count: number
}

// ============================================================
// NAVIGATION
// ============================================================

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}
