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
    content: '<p>Reinforced Concrete Cement (RCC) is the backbone of modern civil construction. Its high tensile strength and durability make it the preferred choice for structural frameworks, slabs, beams, and columns.</p><h2>Understanding the Basics</h2><p>Before diving into complex structures, it is crucial to understand the right mix of cement, sand, aggregates, and steel. The water-cement ratio plays a critical role in the final strength of the concrete.</p><ul><li>Always use high-grade TMT bars for reinforcement.</li><li>Ensure proper curing for at least 7 to 14 days.</li><li>Never compromise on the shuttering quality.</li></ul><p>For any large-scale project, consulting a professional RCC contractor is highly recommended to avoid structural failures.</p>',
    coverImage: '/images/blog_rcc_guide.png',
    publishedAt: new Date().toISOString(),
    author: 'RCR Enterprises',
    tags: ['RCC Work', 'Slab Casting', 'Concrete', 'Construction Tips'],
    isPublished: true
  },
  {
    _id: 'mock-2',
    title: 'Why Core Cutting is Essential for Modern Buildings',
    slug: 'why-core-cutting-essential',
    excerpt: 'Discover the importance of core cutting in structural modifications and how it ensures safety and precision.',
    content: '<p>Core cutting is an advanced technique used to create precise, circular holes in concrete structures without causing structural damage or micro-cracks. This method is far superior to traditional hammering.</p><h2>Common Applications</h2><p>Core cutting is widely used for:</p><ul><li>Plumbing and electrical conduit installation.</li><li>HVAC duct routing through thick walls and slabs.</li><li>Testing concrete strength (extracting core samples).</li></ul><p>By using diamond-tipped drill bits, core cutting ensures a smooth, noise-reduced, and vibration-free process, preserving the integrity of the building.</p>',
    coverImage: '/images/blog_core_cutting.png',
    publishedAt: new Date().toISOString(),
    author: 'Admin',
    tags: ['Core Cutting', 'Plumbing', 'Renovation', 'Civil Construction'],
    isPublished: true
  },
  {
    _id: 'mock-3',
    title: 'How to Choose the Right Contractor for Your Industrial Shed',
    slug: 'choose-right-contractor-industrial-shed',
    excerpt: 'Building an industrial shed requires expertise. Find out the key factors to consider when hiring a civil contractor.',
    content: '<p>Constructing an industrial shed is a major investment. The foundation and structural framework must be flawless to support heavy machinery and ensure worker safety.</p><h2>Key Factors to Consider</h2><p>When selecting a civil contractor for your industrial shed, keep these points in mind:</p><ul><li><strong>Experience:</strong> Check their past industrial projects.</li><li><strong>Safety Standards:</strong> Ensure they follow strict safety protocols.</li><li><strong>Time Management:</strong> Delays can cost you thousands. Hire a contractor known for timely delivery.</li></ul><p>At RCR Enterprises, we specialize in high-quality industrial shed construction across Mumbai and Palghar, delivering robust structures on time.</p>',
    coverImage: '/images/blog_industrial_shed.png',
    publishedAt: new Date().toISOString(),
    author: 'Momin',
    tags: ['Industrial Construction', 'Sheds', 'Hiring Guide', 'Contractors'],
    isPublished: true
  }
]

import connectDB from '@/lib/mongodb'
import Blog from '@/models/Blog'

async function getBlogs() {
  try {
    await connectDB()
    const blogs = await Blog.find({ isPublished: true })
      .sort({ publishedAt: -1 })
      .lean()

    if (blogs && blogs.length > 0) {
      return JSON.parse(JSON.stringify(blogs))
    }
    
    return MOCK_BLOGS
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
