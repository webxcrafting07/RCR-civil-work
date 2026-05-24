'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ZoomIn } from 'lucide-react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { cn, CONSTRUCTION_IMAGES } from '@/utils'
import { GALLERY_CATEGORIES } from '@/constants'
import PageHero from '@/components/shared/PageHero'

interface GalleryImage {
  _id: string
  imageUrl: string
  title?: string
  category: string
}

const MOCK: GalleryImage[] = CONSTRUCTION_IMAGES.concat(CONSTRUCTION_IMAGES).map((url, i) => ({
  _id: String(i), imageUrl: url, title: `Construction Work ${i + 1}`,
  category: GALLERY_CATEGORIES[1 + (i % (GALLERY_CATEGORIES.length - 1))],
}))

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [filtered, setFiltered] = useState<GalleryImage[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/gallery')
      .then(r => r.json())
      .then(d => { const imgs = d.success && d.data.length > 0 ? d.data : MOCK; setImages(imgs); setFiltered(imgs) })
      .catch(() => { setImages(MOCK); setFiltered(MOCK) })
      .finally(() => setLoading(false))
  }, [])

  const handleFilter = (cat: string) => {
    setActiveCategory(cat)
    setFiltered(cat === 'All' ? images : images.filter(img => img.category === cat))
  }

  const slides = filtered.map(img => ({ src: img.imageUrl }))

  return (
    <>
      <PageHero
        badge="Photo Gallery"
        title="Our Work in Pictures"
        subtitle="A visual showcase of RCC construction projects, quality workmanship, and site excellence."
        backgroundImage="/images/rcc_steel_work.png"
      />

      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {GALLERY_CATEGORIES.map(cat => (
              <button key={cat} onClick={() => handleFilter(cat)}
                className={cn('px-5 py-2 rounded-full text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-300',
                  activeCategory === cat ? 'bg-sky-500 text-white shadow-blue' : 'border border-slate-200 text-slate-500 hover:border-sky-500/30 hover:text-sky-500')}>
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          {loading ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="skeleton rounded-xl" style={{ height: `${160 + (i % 3) * 60}px`, breakInside: 'avoid', marginBottom: '1rem' }} />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {filtered.map((img, i) => (
                  <motion.div
                    key={img._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="relative group rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => setLightboxIndex(i)}
                  >
                    <div className="aspect-[4/3] w-full">
                      <Image
                        src={img.imageUrl}
                        alt={img.title || 'Gallery Image'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-slate-50/0 group-hover:bg-slate-50/55 transition-all duration-300 flex flex-col items-center justify-center gap-2">
                      <ZoomIn size={24} className="text-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100" />
                      {img.category && (
                        <span className="text-[10px] font-mono text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-0.5 rounded bg-slate-50/80">
                          {img.category}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {filtered.length === 0 && !loading && (
            <div className="text-center py-16 text-slate-400">No images in this category yet.</div>
          )}
        </div>
      </section>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        styles={{ container: { backgroundColor: 'rgba(0,0,0,0.97)' } }}
      />
    </>
  )
}
