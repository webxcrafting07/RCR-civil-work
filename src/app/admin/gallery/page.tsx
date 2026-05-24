'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Plus, Trash2, Upload } from 'lucide-react'
import toast from 'react-hot-toast'
import { GALLERY_CATEGORIES } from '@/constants'

interface GalleryImage { _id: string; imageUrl: string; title?: string; category: string }

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [category, setCategory] = useState('RCC Work')
  const [title, setTitle] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const fetchImages = async () => {
    setLoading(true)
    const res = await fetch('/api/gallery?admin=true')
    const data = await res.json()
    if (data.success) setImages(data.data)
    setLoading(false)
  }

  useEffect(() => { fetchImages() }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('image', file)
      fd.append('category', category)
      fd.append('title', title)
      const res = await fetch('/api/gallery', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success) { toast.success('Image uploaded'); fetchImages(); setTitle('') }
      else toast.error(data.message || 'Upload failed')
    } catch { toast.error('Upload failed') }
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return
    const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' })
    const data = await res.json()
    if (data.success) { toast.success('Deleted'); fetchImages() }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-bold text-slate-900">Gallery</h2>
          <p className="text-sm text-slate-400">{images.length} images</p>
        </div>
      </div>

      {/* Upload area */}
      <div className="p-6 rounded-xl border border-dashed border-sky-500/30 bg-sky-500/[0.02]">
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Title (optional)</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Image title" className="form-input" />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="form-input">
              {GALLERY_CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c} className="bg-white">{c}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={() => fileRef.current?.click()} disabled={uploading}
              className="btn-primary w-full justify-center py-2.5 disabled:opacity-60">
              {uploading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Upload size={15} /> Upload Image</>}
            </button>
          </div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        <p className="text-xs text-slate-400 text-center">Supports JPG, PNG, WebP. Max 10MB.</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => <div key={i} className="aspect-square skeleton rounded-xl" />)
          : images.map((img, i) => (
            <motion.div key={img._id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}
              className="group relative aspect-square rounded-xl overflow-hidden border border-slate-200">
              <Image src={img.imageUrl} alt={img.title || 'Gallery'} fill className="object-cover" sizes="20vw" />
              <div className="absolute inset-0 bg-slate-50/0 group-hover:bg-slate-50/70 transition-all flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <span className="text-[10px] font-mono text-sky-500 px-2 py-0.5 rounded bg-slate-50/80">{img.category}</span>
                <button onClick={() => handleDelete(img._id)} className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                  <Trash2 size={14} className="text-slate-900" />
                </button>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  )
}
