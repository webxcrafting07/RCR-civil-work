'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ZoomIn, ArrowRight } from 'lucide-react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { CONSTRUCTION_IMAGES } from '@/utils'
import { useTranslation } from '@/hooks/useTranslation'

interface GalleryImage {
  _id: string
  imageUrl: string
  title?: string
  category: string
}

const MOCK_GALLERY = CONSTRUCTION_IMAGES.slice(0, 6).map((url, i) => ({
  _id: String(i),
  imageUrl: url,
  title: `Construction Work ${i + 1}`,
  category: 'RCC Work',
}))

export default function GalleryPreview() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const { t } = useTranslation()

  useEffect(() => {
    fetch('/api/gallery?limit=9')
      .then(r => r.json())
      .then(d => setImages(d.success && d.data.length > 0 ? d.data : MOCK_GALLERY))
      .catch(() => setImages(MOCK_GALLERY))
  }, [])

  const slides = images.map(img => ({ src: img.imageUrl }))

  return (
    <section className="pt-20 lg:pt-28 pb-10 lg:pb-16 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-badge mb-4"
            >
              {t('gallery.badge')}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title"
            >
              {t('gallery.titleLine1')} <span className="text-gradient">{t('gallery.titleHighlight')}</span>
            </motion.h2>
          </div>
          <Link href="/gallery" className="flex items-center gap-2 bg-brandRed text-white px-6 py-3 rounded-xl text-sm font-bold tracking-widest uppercase hover:bg-brandRed/90 hover:shadow-[0_8px_20px_-5px_rgba(192,30,46,0.3)] transition-all duration-300 hover:-translate-y-0.5 shrink-0">
            {t('gallery.viewFull')} <ArrowRight size={16} />
          </Link>
        </div>

        {/* Masonry-style grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 auto-rows-[200px]"
        >
          {images.map((image, i) => (
            <motion.button
              key={image._id}
              className={`relative group rounded-xl overflow-hidden cursor-pointer ${
                i === 0 ? 'md:row-span-2' : 
                i === 2 ? 'md:row-span-2' : 
                i === 4 ? 'md:col-span-2' : ''
              }`}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              onClick={() => setLightboxIndex(i)}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-brandRed scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
              <Image
                src={image.imageUrl}
                alt={image.title || 'Construction Work'}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brandRed/90 backdrop-blur-sm flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-lg">
                  <ZoomIn size={20} className="text-white" />
                </div>
                {image.category && (
                  <span className="text-[10px] font-bold tracking-widest uppercase text-white px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-md translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 border border-white/10">
                    {image.category}
                  </span>
                )}
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        styles={{ container: { backgroundColor: 'rgba(0,0,0,0.95)' } }}
      />
    </section>
  )
}
