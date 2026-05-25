'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowRight, Search, Clock } from 'lucide-react'

// Simple reading time estimator (approx 200 words per minute)
const getReadingTime = (content: string = '') => {
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / 200);
  return time > 0 ? time : 1;
}

type Blog = {
  _id: string
  title: string
  slug: string
  excerpt: string
  content?: string
  coverImage?: string
  publishedAt: string
  author: string
  tags?: string[]
}

export default function BlogGrid({ initialBlogs }: { initialBlogs: Blog[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTag, setActiveTag] = useState('All')

  // Extract unique tags from all blogs
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    initialBlogs.forEach(blog => {
      if (blog.tags && Array.isArray(blog.tags)) {
        blog.tags.forEach(tag => tags.add(tag))
      }
    })
    return ['All', ...Array.from(tags)]
  }, [initialBlogs])

  // Filter blogs based on search query and active tag
  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter(blog => {
      const matchesSearch = 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesTag = activeTag === 'All' || (blog.tags && blog.tags.includes(activeTag))
      
      return matchesSearch && matchesTag
    })
  }, [initialBlogs, searchQuery, activeTag])

  return (
    <div className="space-y-12">
      
      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Tags */}
        <div className="flex-1 flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTag === tag
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        
        {/* Search */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
          <h3 className="text-xl font-bold text-slate-700 mb-2">No blogs found</h3>
          <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <article key={blog._id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col translate-y-0 hover:-translate-y-1">
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
                
                {/* Reading Time Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                  <Clock size={12} className="text-sky-600" />
                  {getReadingTime(blog.content || blog.excerpt)} min read
                </div>
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
  )
}
