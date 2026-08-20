import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CONSTRUCTION_IMAGES } from '@/utils'
import ProjectDetailClient from './ProjectDetailClient'

interface Props { params: Promise<{ slug: string }> }

async function getProject(slug: string) {
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const res = await fetch(`${base}/api/projects/${slug}`, { next: { tags: ['projects'] } })
    if (res.ok) { const d = await res.json(); if (d.success) return d.data }
  } catch {}
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
    description: 'This project involved complete RCC structural work including column casting, slab work, beam construction, and shuttering for a multi-storey residential building in Virar East. Our team completed the work within the agreed timeline using high-quality materials, ensuring absolute structural integrity and premium finish.',
    images: CONSTRUCTION_IMAGES.slice(0, 5),
    coverImage: CONSTRUCTION_IMAGES[0],
    workType: 'RCC Construction', category: 'residential', status: 'completed',
    location: 'Virar East, Maharashtra', startDate: '2024-01-01', endDate: '2024-06-01',
    budget: '₹25 Lakhs', materials: ['M25 Grade Concrete', 'TMT Steel Bars', 'Quality Shuttering', 'Waterproofing'],
    clientName: 'Private Client',
  }

  const images = p.images?.length ? p.images : CONSTRUCTION_IMAGES.slice(0, 4)

  return <ProjectDetailClient project={p} images={images} />
}
