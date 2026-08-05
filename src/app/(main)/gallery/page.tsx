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
        backgroundImage="/images/hero_construction_bg.png"
      />

      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Background Decorative */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(#c01e2e_2px,transparent_2px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

        <div className="container-custom relative z-10">
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {GALLERY_CATEGORIES.map(cat => (
              <button key={cat} onClick={() => handleFilter(cat)}
                className={cn('px-6 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300',
                  activeCategory === cat ? 'bg-brandRed text-white shadow-[0_8px_20px_-5px_rgba(192,30,46,0.3)]' : 'bg-white border border-slate-200 text-slate-500 hover:border-brandRed/30 hover:text-brandRed shadow-sm')}>
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
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {filtered.map((img, i) => (
                  <motion.div
                    key={img._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="relative group rounded-2xl overflow-hidden cursor-pointer bg-slate-100 shadow-sm hover:shadow-[0_15px_30px_-10px_rgba(192,30,46,0.2)] transition-all duration-500 hover:-translate-y-1"
                    onClick={() => setLightboxIndex(i)}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-brandRed scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
                    
                    <div className="aspect-[4/3] w-full">
                      <Image
                        src={img.imageUrl}
                        alt={img.title || 'Gallery Image'}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-brandRed/90 backdrop-blur-sm flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-lg">
                        <ZoomIn size={20} className="text-white" />
                      </div>
                      
                      {img.category && (
                        <span className="text-[10px] font-bold tracking-widest uppercase text-white px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-md translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 border border-white/10">
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
