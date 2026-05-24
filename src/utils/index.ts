import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateShort(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '...'
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    ongoing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    completed: 'bg-green-500/20 text-green-400 border-green-500/30',
    upcoming: 'bg-sky-600/20 text-sky-500 border-sky-600/30',
    new: 'bg-red-500/20 text-red-400 border-red-500/30',
    read: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    replied: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    resolved: 'bg-green-500/20 text-green-400 border-green-500/30',
  }
  return map[status] || 'bg-gray-500/20 text-slate-500 border-gray-500/30'
}

export function getRatingStars(rating: number): string {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating)
}

export function generateMetaTitle(title: string): string {
  return `${title} | RCR ENTERPRISES - RCC Contractor Virar`
}

export function parseJSONSafe<T>(str: string, fallback: T): T {
  try {
    return JSON.parse(str)
  } catch {
    return fallback
  }
}

export const PLACEHOLDER_IMAGE = '/images/hero_construction_bg.png'

export const CONSTRUCTION_IMAGES = [
  '/images/hero_construction_bg.png',
  '/images/rcc_steel_work.png',
  '/images/masonry_brick_work.png',
  '/images/slab_casting_work.png',
  '/images/residential_villa.png',
  '/images/commercial_building.png',
]
