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
          <Link href="/gallery" className="btn-outline text-sm shrink-0">
            {t('gallery.viewFull')} <ArrowRight size={15} />
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
              className={`relative group rounded-xl overflow-hidden cursor-pointer ${i === 0 ? 'row-span-2' : i === 4 ? 'col-span-2' : ''}`}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              onClick={() => setLightboxIndex(i)}
            >
              <Image
                src={image.imageUrl}
                alt={image.title || 'Construction Work'}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all duration-300 flex items-center justify-center">
                <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100" />
              </div>
              {image.category && (
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono text-white bg-sky-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.category}
                </span>
              )}
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
