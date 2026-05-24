'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar, Search, ArrowRight } from 'lucide-react'
import { cn, formatDateShort, getStatusColor, CONSTRUCTION_IMAGES } from '@/utils'
import { PROJECT_CATEGORIES } from '@/constants'
import PageHero from '@/components/shared/PageHero'

interface Project {
  _id: string
  title: string
  slug: string
  shortDescription: string
  coverImage: string
  category: string
  status: string
  location: string
  startDate: string
  workType: string
}

const STATUS_FILTERS = ['all', 'ongoing', 'completed', 'upcoming']

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ limit: '9', page: String(page) })
      if (category !== 'all') params.set('category', category)
      if (status !== 'all') params.set('status', status)
      if (search) params.set('search', search)
      const res = await fetch(`/api/projects?${params}`)
      const data = await res.json()
      if (data.success && data.data && data.data.length > 0) {
        setProjects(data.data)
        setTotalPages(data.pagination?.pages || 1)
      } else setProjects(getMock())
    } catch { setProjects(getMock()) }
    finally { setLoading(false) }
  }, [category, status, search, page])

  useEffect(() => { fetchProjects() }, [fetchProjects])

  return (
    <>
      <PageHero
        badge="Our Portfolio"
        title="Projects We've Built"
        subtitle="Explore our portfolio of residential, commercial, and infrastructure projects across Maharashtra."
        backgroundImage="/images/slab_casting_work.png"
      />

      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }}
                placeholder="Search projects..."
                className="form-input pl-9"
              />
            </div>
            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {PROJECT_CATEGORIES.map(c => (
                <button key={c.value} onClick={() => { setCategory(c.value); setPage(1) }}
                  className={cn('px-4 py-2 rounded-full text-xs font-mono font-semibold tracking-wider uppercase transition-all',
                    category === c.value ? 'bg-sky-500 text-white' : 'border border-slate-200 text-slate-500 hover:border-sky-500/30 hover:text-sky-500')}>
                  {c.label}
                </button>
              ))}
            </div>
            {/* Status filter */}
            <div className="flex flex-wrap gap-2">
              {STATUS_FILTERS.map(s => (
                <button key={s} onClick={() => { setStatus(s); setPage(1) }}
                  className={cn('px-3 py-2 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase transition-all',
                    status === s ? 'bg-white/10 text-slate-900' : 'border border-slate-200 text-slate-400 hover:text-slate-600')}>
                  {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-slate-200">
                    <div className="aspect-[16/10] skeleton" />
                    <div className="p-5 space-y-3"><div className="h-4 skeleton rounded w-3/4" /><div className="h-3 skeleton rounded w-full" /><div className="h-3 skeleton rounded w-2/3" /></div>
                  </div>
                ))}
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <p className="text-lg">No projects found.</p>
              </div>
            ) : (
              <motion.div key={`${category}-${status}-${page}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p, i) => (
                  <motion.div key={p._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                    <Link href={`/projects/${p.slug}`} className="group block rounded-2xl overflow-hidden border border-slate-200 hover:border-sky-500/20 transition-all duration-400 bg-white">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image src={p.coverImage || CONSTRUCTION_IMAGES[i % CONSTRUCTION_IMAGES.length]} alt={p.title} fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-50/80 to-transparent" />
                        <span className={cn('absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold border', getStatusColor(p.status))}>
                          {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                        </span>
                      </div>
                      <div className="p-5">
                        <div className="text-[10px] font-mono text-sky-500/60 mb-1 uppercase tracking-widest">{p.workType}</div>
                        <h3 className="font-display font-semibold text-slate-900 text-base mb-2 group-hover:text-sky-500 transition-colors line-clamp-1">{p.title}</h3>
                        <p className="text-xs text-slate-400 mb-4 line-clamp-2">{p.shortDescription}</p>
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span className="flex items-center gap-1"><MapPin size={10} className="text-sky-500/60" />{p.location}</span>
                          <span className="flex items-center gap-1"><Calendar size={10} className="text-sky-500/60" />{formatDateShort(p.startDate)}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={cn('w-10 h-10 rounded-lg text-sm font-medium transition-all', page === i + 1 ? 'bg-sky-500 text-white' : 'border border-slate-200 text-slate-500 hover:border-sky-500/30')}>
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function getMock(): Project[] {
  return Array.from({ length: 6 }, (_, i) => ({
    _id: String(i), title: `Construction Project ${i + 1}`, slug: `project-${i + 1}`,
    shortDescription: 'Professional RCC construction with quality materials and expert workforce.',
    coverImage: CONSTRUCTION_IMAGES[i % CONSTRUCTION_IMAGES.length],
    category: ['residential', 'commercial'][i % 2], status: ['ongoing', 'completed'][i % 2],
    location: 'Virar East', startDate: '2024-01-01', workType: 'RCC Construction',
  }))
}
