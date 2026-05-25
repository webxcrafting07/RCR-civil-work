'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar, ArrowRight } from 'lucide-react'
import { cn, formatDateShort, getStatusColor, CONSTRUCTION_IMAGES } from '@/utils'
import { useTranslation } from '@/hooks/useTranslation'

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

const FILTERS = ['all', 'ongoing', 'completed']

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const params = filter !== 'all' ? `?status=${filter}&limit=6` : '?limit=6'
        const res = await fetch(`/api/projects${params}`)
        const data = await res.json()
        if (data.success && data.data && data.data.length > 0) {
          setProjects(data.data)
        } else {
          setProjects(getMockProjects())
        }
      } catch {
        setProjects(getMockProjects())
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [filter])

  const FILTER_LABELS: Record<string, string> = {
    'all': t('projects.allProjects'),
    'ongoing': t('projects.ongoing'),
    'completed': t('projects.completed'),
  }

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-badge mb-4"
            >
              {t('projects.badge')}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title"
            >
              {t('projects.titleLine1')} <span className="text-gradient">{t('projects.titleHighlight')}</span>
            </motion.h2>
          </div>
          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setLoading(true) }}
                className={cn(
                  'px-4 py-2 rounded-full text-xs font-semibold font-mono tracking-wider uppercase transition-all duration-300',
                  filter === f
                    ? 'bg-sky-500 text-white shadow-blue'
                    : 'border border-slate-200 text-slate-500 hover:border-sky-300 hover:text-sky-600'
                )}
              >
                {FILTER_LABELS[f] || f}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <ProjectSkeleton key={i} />)
            : projects.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))
          }
        </div>

        <div className="text-center mt-12">
          <Link href="/projects" className="btn-outline inline-flex">
            {t('projects.viewAll')} <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block rounded-2xl overflow-hidden border border-slate-200 hover:border-sky-300 transition-all duration-400 bg-white shadow-sm hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.coverImage || CONSTRUCTION_IMAGES[0]}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
        <span className={cn('absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold border', getStatusColor(project.status))}>
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </span>
        <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono text-white bg-sky-500/80 border border-sky-400/30">
          {project.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-slate-900 text-base mb-2 group-hover:text-sky-600 transition-colors line-clamp-1">{project.title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">{project.shortDescription}</p>
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <MapPin size={11} className="text-sky-500/60" />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={11} className="text-sky-500/60" />
            <span>{formatDateShort(project.startDate)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function ProjectSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200">
      <div className="aspect-[16/10] skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-4 skeleton rounded w-3/4" />
        <div className="h-3 skeleton rounded w-full" />
        <div className="h-3 skeleton rounded w-2/3" />
      </div>
    </div>
  )
}

function getMockProjects(): Project[] {
  return [
    { _id: '1', title: 'Residential Building - Virar East', slug: 'residential-virar-east', shortDescription: 'Complete RCC construction of a 4-storey residential building with premium finishing.', coverImage: CONSTRUCTION_IMAGES[0], category: 'residential', status: 'completed', location: 'Virar East', startDate: '2024-01-01', workType: 'RCC Construction' },
    { _id: '2', title: 'Commercial Complex - Vasai', slug: 'commercial-vasai', shortDescription: 'Large-scale commercial project with structural RCC work and civil construction.', coverImage: CONSTRUCTION_IMAGES[1], category: 'commercial', status: 'ongoing', location: 'Vasai', startDate: '2024-06-01', workType: 'Civil Work' },
    { _id: '3', title: 'Slab & Beam Work - Nalasopara', slug: 'slab-beam-nalasopara', shortDescription: 'Professional slab casting and beam work for a multi-level structure.', coverImage: CONSTRUCTION_IMAGES[2], category: 'residential', status: 'completed', location: 'Nalasopara', startDate: '2023-11-01', workType: 'Slab Work' },
  ]
}
