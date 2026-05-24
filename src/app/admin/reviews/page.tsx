'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, Star } from 'lucide-react'
import toast from 'react-hot-toast'
import { cn } from '@/utils'
import AdminModal from '@/components/admin/AdminModal'

interface Review {
  _id: string
  clientName: string
  clientCompany?: string
  review: string
  rating: number
  projectName?: string
  isActive: boolean
  featured: boolean
  createdAt: string
}

const EMPTY_FORM = { clientName: '', clientCompany: '', review: '', rating: 5, projectName: '', isActive: true, featured: false }

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<Review | null>(null)
  const [form, setForm] = useState({ ...EMPTY_FORM })
  const [saving, setSaving] = useState(false)

  const fetchReviews = async () => {
    setLoading(true)
    const res = await fetch('/api/reviews?limit=100')
    const data = await res.json()
    if (data.success) setReviews(data.data)
    setLoading(false)
  }

  useEffect(() => { fetchReviews() }, [])

  const openAdd = () => { setEditItem(null); setForm({ ...EMPTY_FORM }); setModalOpen(true) }
  const openEdit = (r: Review) => {
    setEditItem(r)
    setForm({ clientName: r.clientName, clientCompany: r.clientCompany || '', review: r.review, rating: r.rating, projectName: r.projectName || '', isActive: r.isActive, featured: r.featured })
    setModalOpen(true)
  }

  const handleSave = async () => {
    if (!form.clientName || !form.review) return toast.error('Name and review are required')
    setSaving(true)
    try {
      const url = editItem ? `/api/reviews/${editItem._id}` : '/api/reviews'
      const method = editItem ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (data.success) { toast.success(editItem ? 'Review updated' : 'Review added'); setModalOpen(false); fetchReviews() }
      else toast.error(data.message || 'Failed')
    } catch { toast.error('Network error') }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this review?')) return
    const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' })
    if ((await res.json()).success) { toast.success('Deleted'); fetchReviews() }
  }

  const handleToggle = async (r: Review, field: 'isActive' | 'featured') => {
    const res = await fetch(`/api/reviews/${r._id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: !r[field] }),
    })
    if ((await res.json()).success) fetchReviews()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-bold text-slate-900">Reviews</h2>
          <p className="text-sm text-slate-400">{reviews.length} total reviews</p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm py-2.5"><Plus size={15} /> Add Review</button>
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                {['Client', 'Review', 'Rating', 'Active', 'Featured', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-mono text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-slate-200">
                    {Array.from({ length: 6 }).map((_, j) => <td key={j} className="px-5 py-4"><div className="h-3 skeleton rounded w-24" /></td>)}
                  </tr>
                ))
                : reviews.map((r, i) => (
                  <motion.tr key={r._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    className="border-b border-slate-200 hover:bg-white">
                    <td className="px-5 py-4">
                      <div className="text-sm font-medium text-slate-900">{r.clientName}</div>
                      {r.clientCompany && <div className="text-xs text-slate-400">{r.clientCompany}</div>}
                    </td>
                    <td className="px-5 py-4 max-w-xs">
                      <p className="text-xs text-slate-500 line-clamp-2">{r.review}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} size={12} className={idx < r.rating ? 'fill-sky-500 text-sky-500' : 'text-slate-400'} />
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => handleToggle(r, 'isActive')}
                        className={cn('text-xs px-2.5 py-1 rounded-full border transition-colors',
                          r.isActive ? 'bg-green-400/10 text-green-400 border-green-400/20' : 'bg-gray-500/10 text-slate-500 border-gray-500/20')}>
                        {r.isActive ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => handleToggle(r, 'featured')}
                        className={cn('text-xs px-2.5 py-1 rounded-full border transition-colors',
                          r.featured ? 'bg-sky-500/10 text-sky-500 border-sky-500/20' : 'bg-gray-500/10 text-slate-500 border-gray-500/20')}>
                        {r.featured ? 'Featured' : 'Normal'}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(r)} className="w-8 h-8 rounded-lg bg-blue-400/10 text-blue-400 hover:bg-blue-400/20 flex items-center justify-center transition-colors">
                          <Pencil size={13} />
                        </button>
                        <button onClick={() => handleDelete(r._id)} className="w-8 h-8 rounded-lg bg-red-400/10 text-red-400 hover:bg-red-400/20 flex items-center justify-center transition-colors">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Review' : 'Add Review'}>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Client Name *</label>
              <input value={form.clientName} onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))} placeholder="Full name" className="form-input" />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Company / Designation</label>
              <input value={form.clientCompany} onChange={e => setForm(f => ({ ...f, clientCompany: e.target.value }))} placeholder="e.g. Property Developer" className="form-input" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Project Name</label>
            <input value={form.projectName} onChange={e => setForm(f => ({ ...f, projectName: e.target.value }))} placeholder="e.g. Residential Building, Virar" className="form-input" />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Review *</label>
            <textarea value={form.review} onChange={e => setForm(f => ({ ...f, review: e.target.value }))} rows={4} placeholder="Client feedback..." className="form-input resize-none" />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-2">Rating *</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} type="button" onClick={() => setForm(f => ({ ...f, rating: n }))}>
                  <Star size={24} className={n <= form.rating ? 'fill-sky-500 text-sky-500' : 'text-slate-400 hover:text-sky-500/50'} />
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} />
              <span className="text-xs text-slate-500">Active (visible on site)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} />
              <span className="text-xs text-slate-500">Featured</span>
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center">
              {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : editItem ? 'Update' : 'Add Review'}
            </button>
            <button onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center">Cancel</button>
          </div>
        </div>
      </AdminModal>
    </div>
  )
}
