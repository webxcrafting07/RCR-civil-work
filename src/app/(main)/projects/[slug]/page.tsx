import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react'
import { cn, formatDate, getStatusColor, CONSTRUCTION_IMAGES } from '@/utils'
import CTASection from '@/components/sections/CTASection'

interface Props { params: Promise<{ slug: string }> }

import connectDB from '@/lib/mongodb'
import Project from '@/models/Project'

async function getProject(slug: string) {
  try {
    await connectDB()
    let project = await Project.findOne({ slug }).lean()
    if (!project && slug.match(/^[0-9a-fA-F]{24}$/)) {
      project = await Project.findById(slug).lean()
    }
    
    if (project) {
      return JSON.parse(JSON.stringify(project))
    }
  } catch (error) {
    console.warn('Failed to fetch project from DB:', error)
  }
  return null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: `${project.title} | RCR ENTERPRISES`,
    description: project.shortDescription,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await getProject(slug)

  // Fallback mock for dev/preview
  const p = project || {
    title: 'Residential Building Project', slug,
    shortDescription: 'Complete RCC construction of a modern residential building.',
    description: 'This project involved complete RCC structural work including column casting, slab work, beam construction, and shuttering for a multi-storey residential building in Virar East. Our team completed the work within the agreed timeline using high-quality materials.',
    images: CONSTRUCTION_IMAGES.slice(0, 4),
    coverImage: CONSTRUCTION_IMAGES[0],
    workType: 'RCC Construction', category: 'residential', status: 'completed',
    location: 'Virar East, Maharashtra', startDate: '2024-01-01', endDate: '2024-06-01',
    budget: '₹25 Lakhs', materials: ['M25 Grade Concrete', 'TMT Steel Bars', 'Quality Shuttering', 'Waterproofing'],
    clientName: 'Private Client',
  }

  const images = p.images?.length ? p.images : CONSTRUCTION_IMAGES.slice(0, 4)

  return (
    <>
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px] w-full pt-16">
        <Image src={p.coverImage || images[0]} alt={p.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-transparent to-slate-50" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-custom pb-10">
            <Link href="/projects" className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-sky-500 transition-colors mb-4">
              <ArrowLeft size={13} /> Back to Projects
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className={cn('px-3 py-1 rounded-full text-xs font-mono font-semibold border', getStatusColor(p.status))}>
                {p.status?.charAt(0).toUpperCase() + p.status?.slice(1)}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono text-sky-500 bg-sky-500/10 border border-sky-500/20">{p.category}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-slate-900">{p.title}</h1>
          </div>
        </div>
      </div>

      <section className="py-16 bg-slate-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">Project Overview</h2>
                <p className="text-slate-500 leading-relaxed">{p.description || p.shortDescription}</p>
              </div>

              {/* Image Gallery */}
              {images.length > 1 && (
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-900 mb-5">Project Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {images.map((img: string, i: number) => (
                      <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer">
                        <Image src={img} alt={`${p.title} - ${i + 1}`} fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Materials */}
              {p.materials?.length > 0 && (
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-900 mb-5">Materials Used</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {p.materials.map((m: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white">
                        <CheckCircle size={14} className="text-sky-500 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Project Info */}
            <div className="space-y-5">
              <div className="p-6 rounded-2xl border border-slate-200 bg-white">
                <h3 className="font-display font-bold text-slate-900 text-base mb-5">Project Details</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Work Type', value: p.workType },
                    { label: 'Category', value: p.category?.charAt(0).toUpperCase() + p.category?.slice(1) },
                    { label: 'Status', value: p.status?.charAt(0).toUpperCase() + p.status?.slice(1) },
                    { label: 'Location', value: p.location, icon: MapPin },
                    { label: 'Start Date', value: p.startDate ? formatDate(p.startDate) : '—', icon: Calendar },
                    { label: 'End Date', value: p.endDate ? formatDate(p.endDate) : 'In Progress' },
                    { label: 'Budget', value: p.budget || 'Confidential' },
                    { label: 'Client', value: p.clientName || 'Private Client' },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="flex items-start justify-between gap-3 text-sm border-b border-slate-200 pb-3 last:border-0 last:pb-0">
                      <span className="text-slate-400 flex-shrink-0 flex items-center gap-1">
                        {Icon && <Icon size={11} className="text-sky-500/60" />}
                        {label}
                      </span>
                      <span className="text-slate-700 text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-sky-500/15 bg-sky-500/[0.03]">
                <h3 className="font-display font-bold text-slate-900 mb-3">Start Your Project</h3>
                <p className="text-xs text-slate-500 mb-4">Get a free consultation for your construction project.</p>
                <Link href="/contact" className="btn-primary w-full justify-center text-sm">
                  Get Free Quote <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
