'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Quote, Star } from 'lucide-react'
import Image from 'next/image'
import { useTranslation } from '@/hooks/useTranslation'

interface Review {
  _id: string
  clientName: string
  clientPhoto?: string
  clientCompany?: string
  review: string
  rating: number
  projectName?: string
}

const MOCK_REVIEWS: Review[] = [
  { _id: '1', clientName: 'Rajesh Sharma', clientCompany: 'Property Developer', review: 'RCR Enterprises did exceptional RCC work on my 5-floor building. The quality of slab casting and column work was top-notch. Delivered on time and within budget. Highly recommended!', rating: 5, projectName: 'Residential Building, Virar East' },
  { _id: '2', clientName: 'Priya Mehta', clientCompany: 'Business Owner', review: 'I hired RCR Enterprises for shuttering and concrete work for my commercial complex. The team was professional, skilled, and very cooperative. Excellent workmanship!', rating: 5, projectName: 'Commercial Complex, Vasai' },
  { _id: '3', clientName: 'Mohammed Shaikh', clientCompany: 'Contractor', review: 'Outstanding labour contract service. The workers were disciplined, experienced, and followed all safety norms. Momin bhai manages the team very efficiently. Will definitely hire again.', rating: 5, projectName: 'Apartment Project, Nalasopara' },
  { _id: '4', clientName: 'Sunita Patil', clientCompany: 'Homeowner', review: 'Got our home RCC work done by RCR Enterprises. The precision in column and beam work was remarkable. They use quality materials and deliver excellent results.', rating: 5, projectName: 'Residential Home, Palghar' },
  { _id: '5', clientName: 'Anil Desai', clientCompany: 'Builder', review: 'Professional team with great expertise in RCC construction. Timely completion, clean site management, and transparent pricing. One of the best contractors in Virar.', rating: 5, projectName: 'Multi-Storey Building' },
]

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const { t } = useTranslation()

  useEffect(() => {
    fetch('/api/reviews?featured=true&limit=10')
      .then(r => r.json())
      .then(d => setReviews(d.success && d.data.length > 0 ? d.data : MOCK_REVIEWS))
      .catch(() => setReviews(MOCK_REVIEWS))
  }, [])

  return (
    <section className="py-20 lg:py-28 bg-slate-50 overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mb-4"
          >
            {t('testimonials.badge')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            {t('testimonials.titleLine1')} <span className="text-gradient">{t('testimonials.titleHighlight')}</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true, dynamicBullets: true }}
            loop={reviews.length >= 4}
            className="pb-14"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="group bg-white rounded-2xl p-8 border border-slate-200 hover:border-brandRed/30 hover:shadow-[0_20px_40px_-10px_rgba(192,30,46,0.15)] transition-all duration-500 h-full flex flex-col hover:-translate-y-1 relative overflow-hidden">
                  {/* Top Sweeping Border */}
                  <div className="absolute top-0 left-0 w-0 h-1.5 bg-brandRed group-hover:w-full transition-all duration-700 ease-out z-20" />
                  
                  {/* Large Background Quote Watermark */}
                  <div className="absolute -right-4 -bottom-10 text-[180px] font-display font-black text-slate-100/60 group-hover:text-brandRed/[0.04] group-hover:scale-110 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-all duration-700 pointer-events-none select-none z-0 leading-none rotate-12">
                    &rdquo;
                  </div>

                  {/* Subtle Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brandRed/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
                  
                  {/* Icon Box */}
                  <div className="w-14 h-14 rounded-2xl bg-brandRed/5 border border-brandRed/10 flex items-center justify-center mb-6 group-hover:bg-brandRed group-hover:border-brandRed group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_8px_20px_rgba(192,30,46,0.3)] relative z-10 shrink-0">
                    <Quote size={24} className="text-brandRed group-hover:text-white transition-colors duration-500 fill-brandRed/20 group-hover:fill-white/20" />
                  </div>

                  <p className="text-sm font-medium text-slate-700 leading-relaxed mb-6 flex-1 line-clamp-5 relative z-10">
                    &quot;{review.review}&quot;
                  </p>
                  
                  <div className="relative z-10">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < review.rating ? 'fill-brandRed text-brandRed' : 'text-slate-300'}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-brandRed/10 flex items-center justify-center flex-shrink-0 border border-brandRed/20">
                        {review.clientPhoto ? (
                          <Image src={review.clientPhoto} alt={review.clientName} width={48} height={48} className="object-cover" />
                        ) : (
                          <span className="text-brandRed font-display font-bold text-base">{review.clientName[0]}</span>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 mb-0.5">{review.clientName}</div>
                        <div className="text-xs font-medium text-slate-600">{review.clientCompany || review.projectName || 'Client'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}
