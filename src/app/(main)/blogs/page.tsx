import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | RCR Enterprises',
  description: 'Read the latest insights, guides, and updates about RCC construction, civil engineering, and building projects in Mumbai and Maharashtra.',
}

export const dynamic = 'force-dynamic'

async function getBlogs() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  try {
    const res = await fetch(`${baseUrl}/api/blogs?publishedOnly=true`, { cache: 'no-store' })
    if (!res.ok) return []
    const json = await res.json()
    return json.success ? json.data : []
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
    return []
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs()

  return (
    <main className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="container-custom">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
            Construction <span className="text-gradient">Insights & News</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Stay updated with the latest trends, expert tips, and project showcases in civil construction and RCC works.
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-700 mb-2">No blogs found</h3>
            <p className="text-slate-500">Check back later for new articles and insights.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog: any) => (
              <article key={blog._id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                <Link href={`/blogs/${blog.slug}`} className="block relative h-60 overflow-hidden bg-slate-100">
                  {blog.coverImage ? (
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-sky-50 flex items-center justify-center">
                      <span className="text-sky-200 font-display font-bold text-4xl">RCR</span>
                    </div>
                  )}
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(blog.publishedAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1.5"><User size={14} /> {blog.author}</span>
                  </div>
                  <h2 className="text-xl font-display font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors line-clamp-2">
                    <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {blog.excerpt}
                  </p>
                  <Link href={`/blogs/${blog.slug}`} className="flex items-center gap-2 text-sm font-semibold text-sky-600 group-hover:text-sky-700 mt-auto">
                    Read Article <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
