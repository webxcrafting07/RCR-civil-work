import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/shared/PageHero'
import { NAV_ITEMS, SERVICES_LIST, TARGET_LOCATIONS } from '@/constants'
import connectDB from '@/lib/mongodb'
import Blog from '@/models/Blog'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'HTML Sitemap | RCR ENTERPRISES',
  description: 'Complete HTML Sitemap of RCR Enterprises website for easy navigation and search engine indexing.',
}

export default async function SitemapPage() {
  await connectDB()
  const blogs = await Blog.find({ isPublished: true }).sort({ publishedAt: -1 }).lean()

  return (
    <>
      <PageHero 
        badge="Sitemap" 
        title="Website **Sitemap**" 
        subtitle="Navigate through all pages of our website easily." 
        backgroundImage="/images/commercial_building.png" 
      />
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-200 pb-3">Main Pages</h2>
              <ul className="space-y-3">
                {NAV_ITEMS.map(item => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-slate-600 hover:text-brandRed transition-colors flex items-center gap-2">
                      <ChevronRight size={14} className="text-brandRed" /> {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/privacy-policy" className="text-slate-600 hover:text-brandRed transition-colors flex items-center gap-2">
                    <ChevronRight size={14} className="text-brandRed" /> Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-slate-600 hover:text-brandRed transition-colors flex items-center gap-2">
                    <ChevronRight size={14} className="text-brandRed" /> Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-200 pb-3">Our Services</h2>
              <ul className="space-y-3">
                {SERVICES_LIST.map(service => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`} className="text-slate-600 hover:text-brandRed transition-colors flex items-center gap-2">
                      <ChevronRight size={14} className="text-brandRed" /> {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-200 pb-3">Blogs</h2>
              <ul className="space-y-3">
                {blogs.length > 0 ? blogs.map((blog: any) => (
                  <li key={blog.slug}>
                    <Link href={`/blogs/${blog.slug}`} className="text-slate-600 hover:text-brandRed transition-colors flex items-center gap-2">
                      <ChevronRight size={14} className="text-brandRed flex-shrink-0" /> 
                      <span className="line-clamp-1">{blog.title}</span>
                    </Link>
                  </li>
                )) : (
                  <li className="text-slate-500">No blogs published yet.</li>
                )}
              </ul>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-display font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-200 pb-3">Locations We Serve</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-3 gap-x-6">
              {TARGET_LOCATIONS.map(loc => (
                <Link key={loc.slug} href={`/locations/${loc.slug}`} className="text-slate-600 hover:text-brandRed transition-colors flex items-center gap-2">
                  <ChevronRight size={14} className="text-brandRed flex-shrink-0" /> <span className="truncate">{loc.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
