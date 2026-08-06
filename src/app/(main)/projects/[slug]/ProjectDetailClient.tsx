'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, Calendar, ArrowLeft, ArrowRight, Building, CheckCircle2, ZoomIn } from 'lucide-react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { cn, formatDate, getStatusColor } from '@/utils'
import CTASection from '@/components/sections/CTASection'

export default function ProjectDetailClient({ project, images }: { project: any, images: string[] }) {
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <div className="bg-[#f8fafc]">
      {/* Ultra Premium Hero Section with Parallax */}
      <div className="relative h-[70vh] min-h-[500px] w-full pt-20 flex flex-col items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
          <Image src={project.coverImage || images[0]} alt={project.title} fill className="object-cover" priority sizes="100vw" />
        </motion.div>
        
        {/* Advanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90" />
        
        <div className="relative z-10 container-custom text-center flex flex-col items-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/projects" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors mb-8 group bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-6"
          >
            <span className={cn('px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm backdrop-blur-sm', getStatusColor(project.status))}>
              {project.status?.charAt(0).toUpperCase() + project.status?.slice(1)}
            </span>
            <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white bg-brandRed shadow-[0_0_15px_rgba(192,30,46,0.5)] border border-brandRed/50">
              {project.category}
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 drop-shadow-2xl leading-[1.1] max-w-5xl mx-auto"
          >
            {project.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            {project.shortDescription}
          </motion.p>
        </div>
      </div>

      <section className="py-24 relative z-20 -mt-10">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-20">
              
              {/* Overview Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-white p-10 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-brandRed/10 flex items-center justify-center rotate-3">
                    <Building size={24} className="text-brandRed" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">Project Overview</h2>
                </div>
                <p className="text-slate-600 text-lg leading-loose font-medium">
                  {project.description || project.shortDescription}
                </p>
              </motion.div>

              {/* Image Gallery */}
              {images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-8">
                    Visual Showcase
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
                    {images.map((img: string, i: number) => (
                      <motion.div
                        whileHover={{ y: -5 }}
                        key={i}
                        onClick={() => setLightboxIndex(i)}
                        className={cn(
                          "relative rounded-3xl overflow-hidden group cursor-pointer shadow-sm",
                          i === 0 ? 'col-span-2 aspect-[21/9]' : 'aspect-[4/3]'
                        )}
                      >
                        <Image src={img} alt={`${project.title} - Photo ${i + 1}`} fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 768px) 100vw, 50vw" />
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors duration-500 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300">
                            <ZoomIn size={24} className="text-white" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Materials */}
              {project.materials?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-white p-10 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50"
                >
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-8">Premium Materials</h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {project.materials.map((m: string, i: number) => (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        key={i}
                        className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/60 hover:border-brandRed/40 hover:bg-white hover:shadow-md transition-all group"
                      >
                        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 border border-slate-100 group-hover:bg-brandRed transition-colors">
                          <CheckCircle2 size={18} className="text-brandRed group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-base font-bold text-slate-700 group-hover:text-slate-900">{m}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8 lg:relative">
              <div className="lg:sticky lg:top-32 space-y-8">
                
                {/* Project Details Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white rounded-[2rem] shadow-[0_20px_40px_rgb(0,0,0,0.06)] border border-slate-100 overflow-hidden"
                >
                  <div className="bg-slate-900 px-8 py-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />
                    <h3 className="font-display font-bold text-white text-2xl relative z-10">Project Facts</h3>
                  </div>
                  
                  <div className="p-8 space-y-6">
                    {[
                      { label: 'Work Type', value: project.workType },
                      { label: 'Category', value: project.category?.charAt(0).toUpperCase() + project.category?.slice(1) },
                      { label: 'Location', value: project.location, icon: MapPin },
                      { label: 'Timeline', value: `${project.startDate ? formatDate(project.startDate) : ''} - ${project.endDate ? formatDate(project.endDate) : 'Present'}`, icon: Calendar },
                      { label: 'Budget', value: project.budget || 'Confidential' },
                      { label: 'Client', value: project.clientName || 'Private Client' },
                    ].map(({ label, value, icon: Icon }, idx) => (
                      <div key={label} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-2">
                          {Icon && <Icon size={14} className="text-slate-300" />}
                          {label}
                        </span>
                        <div className="text-lg font-bold text-slate-800">{value}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-brandRed rounded-[2rem] shadow-xl p-10 text-center text-white relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20" />
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700" />
                  
                  <h3 className="font-display font-bold text-3xl mb-4 relative z-10">Start Building</h3>
                  <p className="text-white/90 font-medium mb-8 relative z-10 leading-relaxed text-sm">
                    Ready to turn your vision into reality? Get a free consultation today.
                  </p>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-brandRed hover:bg-slate-900 hover:text-white px-8 py-4 w-full rounded-2xl text-sm font-bold tracking-widest uppercase transition-all shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:-translate-y-1 relative z-10">
                    Get Free Quote <ArrowRight size={16} />
                  </Link>
                </motion.div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <CTASection />

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={images.map(src => ({ src }))}
        styles={{ container: { backgroundColor: 'rgba(0,0,0,0.98)' } }}
      />
    </div>
  )
}
