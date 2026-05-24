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
            Client Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-4"
          >
            What Our <span className="text-gradient">Clients Say</span>
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
                <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-sky-300 transition-all duration-300 h-full flex flex-col shadow-sm">
                  <Quote size={32} className="text-sky-300 mb-4" />
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1 line-clamp-5">
                    &quot;{review.review}&quot;
                  </p>
                  <div>
                    {/* Stars */}
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < review.rating ? 'fill-sky-500 text-sky-500' : 'text-slate-300'}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-sky-100 flex items-center justify-center flex-shrink-0">
                        {review.clientPhoto ? (
                          <Image src={review.clientPhoto} alt={review.clientName} width={40} height={40} className="object-cover" />
                        ) : (
                          <span className="text-sky-600 font-display font-bold text-sm">{review.clientName[0]}</span>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{review.clientName}</div>
                        <div className="text-[11px] text-slate-500">{review.clientCompany || review.projectName || 'Client'}</div>
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
