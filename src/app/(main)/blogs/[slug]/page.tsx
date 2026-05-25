import { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowLeft, Facebook, Twitter, Linkedin, Link as LinkIcon, ChevronRight, Clock } from 'lucide-react'
import ScrollProgress from '@/components/shared/ScrollProgress'
import { notFound } from 'next/navigation'
import { use } from 'react'

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

async function getBlog(slug: string) {
  try {
    await connectDB()
    let blog = await Blog.findOne({ slug }).lean()
    if (!blog && slug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(slug).lean()
    }
    
    // Parse MongoDB object to plain JSON to avoid Next.js serialization issues
    if (blog) {
      return JSON.parse(JSON.stringify(blog))
    }
    
    return MOCK_BLOGS.find(b => b.slug === slug) || null
  } catch (error) {
    console.warn('Failed to fetch blog, using mock data fallback:', error)
    return MOCK_BLOGS.find(b => b.slug === slug) || null
  }
}

async function getRelatedBlogs(currentSlug: string) {
  try {
    await connectDB()
    const blogs = await Blog.find({ 
      slug: { $ne: currentSlug },
      isPublished: true 
    })
      .sort({ publishedAt: -1 })
      .limit(3)
      .lean()

    if (blogs && blogs.length > 0) {
      return JSON.parse(JSON.stringify(blogs))
    }

    return MOCK_BLOGS.filter(b => b.slug !== currentSlug).slice(0, 3)
  } catch (error) {
    console.warn('Failed to fetch related blogs, using mock data:', error)
    return MOCK_BLOGS.filter(b => b.slug !== currentSlug).slice(0, 3)
  }
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlog(slug)
  if (!blog) return { title: 'Not Found' }

  return {
    title: blog.seoTitle || `${blog.title} | RCR Enterprises`,
    description: blog.seoDescription || blog.excerpt,
    openGraph: {
      title: blog.seoTitle || blog.title,
      description: blog.seoDescription || blog.excerpt,
      images: blog.coverImage ? [blog.coverImage] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const blog = await getBlog(slug)

  if (!blog || !blog.isPublished) {
    notFound()
  }

  const relatedBlogs = await getRelatedBlogs(slug)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const shareUrl = `${appUrl}/blogs/${slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    image: blog.coverImage ? [blog.coverImage] : [],
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    author: [{
        '@type': 'Person',
        name: blog.author,
      }],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-slate-50 pb-24">
        <ScrollProgress />
        
        {/* HERO SECTION */}
        <div className="relative pt-40 pb-16 md:pt-48 md:pb-24 bg-slate-900 text-white overflow-hidden">
          {blog.coverImage && (
            <div className="absolute inset-0 opacity-40">
              <Image 
                src={blog.coverImage} 
                alt={blog.title} 
                fill 
                sizes="100vw" 
                className="object-cover" 
                priority 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            </div>
          )}
          <div className="container-custom relative z-10 max-w-5xl mx-auto">
            <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors mb-8 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <ArrowLeft size={16} /> Back to all insights
            </Link>
            
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-6 drop-shadow-lg">
              {blog.title}
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
              {blog.excerpt}
            </p>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="container-custom max-w-6xl mx-auto -mt-10 relative z-20">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* STICKY SIDEBAR */}
              <aside className="lg:col-span-3 order-2 lg:order-1">
                <div className="sticky top-32 space-y-8">
                  {/* Author Info */}
                  <div className="pb-8 border-b border-slate-100">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Written By</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-xl">
                        {blog.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{blog.author}</p>
                        <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                          <Calendar size={14} /> 
                          {new Date(blog.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-sm text-sky-600 font-medium flex items-center gap-1 mt-1">
                          <Clock size={14} />
                          {Math.max(1, Math.ceil((blog.content || blog.excerpt || '').trim().split(/\s+/).length / 200))} min read
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Share Buttons */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Share this article</p>
                    <div className="flex gap-3">
                      <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(blog.title)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-sky-100 hover:text-sky-600 transition-colors">
                        <Twitter size={18} />
                      </a>
                      <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-blue-100 hover:text-blue-700 transition-colors">
                        <Facebook size={18} />
                      </a>
                      <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodeURIComponent(blog.title)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-sky-100 hover:text-sky-700 transition-colors">
                        <Linkedin size={18} />
                      </a>
                      <button className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors" title="Copy Link from URL bar">
                        <LinkIcon size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Promo Box */}
                  <div className="mt-8 bg-sky-50 rounded-2xl p-6 border border-sky-100">
                    <h4 className="font-bold text-sky-900 mb-2">Need a reliable contractor?</h4>
                    <p className="text-sm text-sky-700 mb-4 leading-relaxed">We deliver top-quality RCC and civil works across Mumbai & Palghar.</p>
                    <Link href="/contact" className="text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded-lg inline-block transition-colors w-full text-center">
                      Get a Free Quote
                    </Link>
                  </div>
                </div>
              </aside>

              {/* MAIN READING CONTENT */}
              <article className="lg:col-span-9 order-1 lg:order-2">
                <div 
                  className="prose prose-slate md:prose-lg max-w-none 
                    prose-headings:font-display prose-headings:font-bold prose-headings:text-slate-900
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-slate-100 prose-h2:pb-4
                    prose-h3:text-2xl prose-h3:mt-8
                    prose-p:leading-relaxed prose-p:text-slate-600
                    prose-a:text-sky-600 hover:prose-a:text-sky-700 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                    prose-blockquote:border-l-4 prose-blockquote:border-sky-500 prose-blockquote:bg-sky-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:text-sky-900 prose-blockquote:font-medium prose-blockquote:italic
                    prose-ul:text-slate-600 prose-li:marker:text-sky-500
                    first-letter:text-7xl first-letter:font-bold first-letter:text-slate-900 first-letter:mr-3 first-letter:float-left first-letter:leading-none
                  "
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </article>
              
            </div>
          </div>
        </div>

        {/* RELATED POSTS */}
        {relatedBlogs.length > 0 && (
          <div className="container-custom max-w-6xl mx-auto mt-24">
            <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
              <h3 className="text-3xl font-display font-bold text-slate-900">Related Articles</h3>
              <Link href="/blogs" className="hidden md:flex items-center gap-1 text-sky-600 font-semibold hover:text-sky-700 transition-colors">
                View all <ChevronRight size={18} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map((rb: any) => (
                <Link key={rb._id} href={`/blogs/${rb.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 translate-y-0 hover:-translate-y-1">
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    {rb.coverImage ? (
                      <Image src={rb.coverImage} alt={rb.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-sky-50 text-sky-200 font-display font-bold text-3xl">RCR</div>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold text-sky-600 uppercase tracking-wider mb-2">{rb.tags?.[0] || 'Insight'}</p>
                    <h4 className="font-display font-bold text-lg text-slate-900 mb-2 group-hover:text-sky-600 transition-colors line-clamp-2">{rb.title}</h4>
                    <p className="text-sm text-slate-500 line-clamp-2">{rb.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center md:hidden">
              <Link href="/blogs" className="inline-flex items-center gap-1 text-sky-600 font-semibold hover:text-sky-700 transition-colors">
                View all articles <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
