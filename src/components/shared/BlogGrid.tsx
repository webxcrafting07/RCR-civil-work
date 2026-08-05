'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowRight, Search, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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
      const titleSearch = (blog.title || '').toLowerCase()
      const excerptSearch = (blog.excerpt || '').toLowerCase()
      const query = searchQuery.toLowerCase()

      const matchesSearch = titleSearch.includes(query) || excerptSearch.includes(query)
      
      const matchesTag = activeTag === 'All' || (blog.tags && blog.tags.includes(activeTag))
      
      return matchesSearch && matchesTag
    })
  }, [initialBlogs, searchQuery, activeTag])

  return (
    <div className="space-y-12">
      
      {/* ULTRA MODERN FILTERS & SEARCH */}
      <div className="flex flex-col gap-8">
        
        {/* Search Bar - Large, minimal, focused */}
        <div className="relative max-w-2xl mx-auto w-full group">
          <div className="absolute inset-0 bg-brandRed/5 rounded-2xl blur-xl transition-all duration-500 group-hover:bg-brandRed/10" />
          <div className="relative bg-white/90 backdrop-blur-md border border-slate-200/60 rounded-2xl p-2 flex items-center shadow-sm transition-all duration-300 focus-within:shadow-[0_8px_30px_rgba(192,30,46,0.1)] focus-within:border-brandRed/30 focus-within:bg-white">
            <Search size={22} className="text-slate-400 ml-4 mr-3 group-focus-within:text-brandRed transition-colors" />
            <input
              type="text"
              placeholder="Search articles, guides, and news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none text-slate-800 text-lg placeholder:text-slate-400 focus:outline-none py-3 pr-4"
            />
          </div>
        </div>

        {/* Tags - Elegant animated pills */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {allTags.map(tag => {
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`relative px-6 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${
                  isActive ? 'text-white shadow-[0_8px_20px_-5px_rgba(192,30,46,0.3)]' : 'bg-white text-slate-500 hover:text-brandRed border border-slate-200 hover:border-brandRed/30 shadow-sm'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tag-blog"
                    className="absolute inset-0 bg-brandRed rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{tag}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filteredBlogs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-32"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-slate-400" />
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">No results found</h3>
              <p className="text-slate-500 text-lg max-w-md mx-auto">We couldn't find any articles matching your current search or filter criteria. Try adjusting them.</p>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={blog._id} 
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(192,30,46,0.15)] transition-all duration-500 hover:-translate-y-2 group flex flex-col relative"
                >
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-brandRed scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />

                  <Link href={`/blogs/${blog.slug}`} className="block relative h-64 overflow-hidden bg-slate-100">
                    {blog.coverImage ? (
                      <Image
                        src={blog.coverImage}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-red-50 flex items-center justify-center">
                        <span className="text-brandRed/20 font-display font-bold text-5xl">RCR</span>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-brandRed/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Modern Floating Badge */}
                    <div className="absolute top-5 right-5 bg-white/95 backdrop-blur shadow-sm text-slate-900 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg border border-slate-200 group-hover:border-brandRed/30 transition-colors flex items-center gap-1.5">
                      <Clock size={12} className="text-brandRed" />
                      {getReadingTime(blog.content || blog.excerpt)} MIN
                    </div>
                  </Link>
                  
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                      <span className="flex items-center gap-2 group-hover:text-slate-900 transition-colors"><Calendar size={14} className="text-brandRed" /> {new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-display font-black text-slate-900 mb-4 group-hover:text-brandRed transition-colors line-clamp-2 leading-tight">
                      <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                    </h2>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 line-clamp-3 flex-1 group-hover:text-slate-600 transition-colors">
                      {blog.excerpt}
                    </p>
                    <Link href={`/blogs/${blog.slug}`} className="flex items-center justify-between text-xs font-bold tracking-widest text-slate-900 group-hover:text-brandRed mt-auto border-t border-slate-100 pt-6 transition-colors uppercase">
                      READ ARTICLE 
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-red-50 group-hover:shadow-[0_4px_15px_-3px_rgba(192,30,46,0.2)] transition-all duration-300">
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
