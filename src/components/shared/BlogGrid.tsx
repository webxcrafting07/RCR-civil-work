'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowRight, Search, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'

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
  const { t, language } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTag, setActiveTag] = useState('All')

  const tagAllText = t('blogs.all') !== 'blogs.all' ? t('blogs.all') : 'All'

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
          <div className="absolute inset-0 bg-sky-500/5 rounded-2xl blur-xl transition-all duration-500 group-hover:bg-sky-500/10" />
          <div className="relative bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-2xl p-2 flex items-center shadow-sm transition-all duration-300 focus-within:shadow-md focus-within:border-sky-300 focus-within:bg-white">
            <Search size={22} className="text-slate-400 ml-4 mr-3" />
            <input
              type="text"
              placeholder={t('blogs.searchPlaceholder') !== 'blogs.searchPlaceholder' ? t('blogs.searchPlaceholder') : "Search articles, guides, and news..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none text-slate-800 text-lg placeholder:text-slate-400 focus:outline-none py-3 pr-4"
            />
          </div>
        </div>

        {/* Tags - Elegant animated pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {allTags.map(tag => {
            const isActive = activeTag === tag;
            const displayTag = tag === 'All' ? (t('blogs.all') !== 'blogs.all' ? t('blogs.all') : 'All') : tag;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tag"
                    className="absolute inset-0 bg-slate-900 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{displayTag}</span>
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
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">{t('blogs.noResultsTitle') || 'No results found'}</h3>
              <p className="text-slate-500 text-lg max-w-md mx-auto">{t('blogs.noResultsDesc') || "We couldn't find any articles matching your current search or filter criteria. Try adjusting them."}</p>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => {
                const translatedTitle = t(`blogsList.${blog.slug}.title`);
                const title = (translatedTitle !== `blogsList.${blog.slug}.title` ? translatedTitle : blog.title) || blog.title;
                const translatedExcerpt = t(`blogsList.${blog.slug}.excerpt`);
                const excerpt = (translatedExcerpt !== `blogsList.${blog.slug}.excerpt` ? translatedExcerpt : blog.excerpt) || blog.excerpt;
                
                return (
                  <motion.article
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={blog._id} 
                    className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-500 group flex flex-col"
                  >
                    <Link href={`/blogs/${blog.slug}`} className="block relative h-64 overflow-hidden bg-slate-100">
                      {blog.coverImage ? (
                        <Image
                          src={blog.coverImage}
                          alt={title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-sky-50 flex items-center justify-center">
                          <span className="text-sky-200 font-display font-bold text-4xl">RCR</span>
                        </div>
                      )}
                      
                      {/* Modern Floating Badge */}
                      <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-black/5 flex items-center gap-1.5 border border-white/20">
                        <Clock size={12} className="text-sky-500" />
                        {getReadingTime(blog.content || blog.excerpt)} {t('blogs.minRead') || 'MIN READ'}
                      </div>
                    </Link>
                    
                    <div className="p-6 md:p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                        <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(blog.publishedAt).toLocaleDateString(language === 'en' ? 'en-US' : language === 'hi' ? 'hi-IN' : 'mr-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug">
                        <Link href={`/blogs/${blog.slug}`}>{title}</Link>
                      </h2>
                      <p className="text-slate-600 text-sm leading-relaxed mb-8 line-clamp-3 flex-1">
                        {excerpt}
                      </p>
                      <Link href={`/blogs/${blog.slug}`} className="flex items-center justify-between text-sm font-bold text-slate-900 group-hover:text-sky-600 mt-auto border-t border-slate-100 pt-6 transition-colors">
                        {t('blogs.readArticle') || 'READ ARTICLE'} 
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-sky-50 transition-colors">
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </div>
                      </Link>
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
