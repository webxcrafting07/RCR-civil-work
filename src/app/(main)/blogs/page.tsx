import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowRight } from 'lucide-react'
import BlogGrid from '@/components/shared/BlogGrid'

export const metadata: Metadata = {
  title: 'Blog | RCR Enterprises',
  description: 'Read the latest insights, guides, and updates about RCC construction, civil engineering, and building projects in Mumbai and Maharashtra.',
}

export const dynamic = 'force-dynamic'

const MOCK_BLOGS = [
  {
    _id: 'mock-1',
    title: 'The Complete Guide to RCC Construction in 2026',
    slug: 'guide-to-rcc-construction',
    excerpt: 'Learn everything you need to know about reinforced concrete cement construction, from materials to best practices.',
    coverImage: '/images/blog_rcc_guide.png',
    publishedAt: new Date().toISOString(),
    author: 'RCR Enterprises'
  },
  {
    _id: 'mock-2',
    title: 'Why Core Cutting is Essential for Modern Buildings',
    slug: 'why-core-cutting-essential',
    excerpt: 'Discover the importance of core cutting in structural modifications and how it ensures safety and precision.',
    coverImage: '/images/blog_core_cutting.png',
    publishedAt: new Date().toISOString(),
    author: 'Admin'
  },
  {
    _id: 'mock-3',
    title: 'How to Choose the Right Contractor for Your Industrial Shed',
    slug: 'choose-right-contractor-industrial-shed',
    excerpt: 'Building an industrial shed requires expertise. Find out the key factors to consider when hiring a civil contractor.',
    coverImage: '/images/blog_industrial_shed.png',
    publishedAt: new Date().toISOString(),
    author: 'Momin'
  }
]

async function getBlogs() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  try {
    const res = await fetch(`${baseUrl}/api/blogs?publishedOnly=true`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Fetch failed')
    const json = await res.json()
    return json.success && json.data.length > 0 ? json.data : MOCK_BLOGS
  } catch (error) {
    console.warn('Failed to fetch blogs from database, using mock data:', error)
    return MOCK_BLOGS
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs()

  return (
    <main className="min-h-screen pt-40 md:pt-48 pb-20 bg-slate-50">
      <div className="container-custom">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
            Construction <span className="text-gradient">Insights & News</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Stay updated with the latest trends, expert tips, and project showcases in civil construction and RCC works.
          </p>
        </div>

        <BlogGrid initialBlogs={blogs} />
      </div>
    </main>
  )
}
