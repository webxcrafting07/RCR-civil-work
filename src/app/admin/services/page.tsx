'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Search } from 'lucide-react'
import toast from 'react-hot-toast'
import { cn, slugify } from '@/utils'
import AdminModal from '@/components/admin/AdminModal'

interface Service {
  _id: string
  title: string
  slug: string
  shortDescription: string
  isActive: boolean
  featured: boolean
  order: number
  createdAt: string
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<Service | null>(null)
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ title: '', slug: '', shortDescription: '', description: '', icon: 'Building2', isActive: true, featured: false, order: 0 })
  const [saving, setSaving] = useState(false)

  const fetchServices = async () => {
    setLoading(true)
    const res = await fetch('/api/services?active=all')
    const data = await res.json()
    if (data.success) setServices(data.data)
    setLoading(false)
  }

  useEffect(() => { fetchServices() }, [])

  const openAdd = () => { setEditItem(null); setForm({ title: '', slug: '', shortDescription: '', description: '', icon: 'Building2', isActive: true, featured: false, order: services.length }); setModalOpen(true) }
  const openEdit = (s: Service) => { setEditItem(s); setForm({ title: s.title, slug: s.slug, shortDescription: s.shortDescription, description: '', icon: 'Building2', isActive: s.isActive, featured: s.featured, order: s.order }); setModalOpen(true) }

  const handleSave = async () => {
    if (!form.title || !form.slug) return toast.error('Title and slug required')
    setSaving(true)
    try {
      const url = editItem ? `/api/services/${editItem._id}` : '/api/services'
      const method = editItem ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (data.success) { toast.success(editItem ? 'Service updated' : 'Service created'); setModalOpen(false); fetchServices() }
      else toast.error(data.message || 'Failed')
    } catch { toast.error('Network error') }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service?')) return
    const res = await fetch(`/api/services/${id}`, { method: 'DELETE' })
    const data = await res.json()
    if (data.success) { toast.success('Deleted'); fetchServices() }
    else toast.error('Delete failed')
  }

  const handleToggle = async (s: Service) => {
    const res = await fetch(`/api/services/${s._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isActive: !s.isActive }) })
    const data = await res.json()
    if (data.success) fetchServices()
  }

  const filtered = services.filter(s => s.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-bold text-slate-900">Services</h2>
          <p className="text-sm text-slate-400 mt-0.5">{services.length} services total</p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm py-2.5">
          <Plus size={15} /> Add Service
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search services..."
          className="form-input pl-9 max-w-sm" />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                {['Title', 'Slug', 'Status', 'Featured', 'Order', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-mono text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-slate-200">
                    {Array.from({ length: 6 }).map((_, j) => <td key={j} className="px-5 py-4"><div className="h-3 skeleton rounded w-24" /></td>)}
                  </tr>
                ))
              ) : filtered.map((s, i) => (
                <motion.tr key={s._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-b border-slate-200 hover:bg-white transition-colors">
                  <td className="px-5 py-4 text-sm text-slate-900 font-medium">{s.title}</td>
                  <td className="px-5 py-4 text-xs text-slate-400 font-mono">{s.slug}</td>
                  <td className="px-5 py-4">
                    <button onClick={() => handleToggle(s)} className={cn('flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition-colors',
                      s.isActive ? 'bg-green-400/10 text-green-400 border-green-400/20' : 'bg-gray-500/10 text-slate-500 border-gray-500/20')}>
                      {s.isActive ? <ToggleRight size={13} /> : <ToggleLeft size={13} />}
                      {s.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <span className={cn('text-xs px-2 py-0.5 rounded-full', s.featured ? 'bg-sky-500/10 text-sky-500' : 'text-slate-400')}>{s.featured ? 'Yes' : 'No'}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">{s.order}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(s)} className="w-8 h-8 rounded-lg bg-blue-400/10 text-blue-400 hover:bg-blue-400/20 flex items-center justify-center transition-colors">
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => handleDelete(s._id)} className="w-8 h-8 rounded-lg bg-red-400/10 text-red-400 hover:bg-red-400/20 flex items-center justify-center transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Service' : 'Add Service'}>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Title *</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: !editItem ? slugify(e.target.value) : f.slug }))}
                placeholder="Service title" className="form-input" />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Slug *</label>
              <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                placeholder="service-slug" className="form-input font-mono text-xs" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Short Description *</label>
            <input value={form.shortDescription} onChange={e => setForm(f => ({ ...f, shortDescription: e.target.value }))}
              placeholder="Brief service description (max 300 chars)" className="form-input" maxLength={300} />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Full Description</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={4} placeholder="Detailed description..." className="form-input resize-none" />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Order</label>
              <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))}
                className="form-input" min={0} />
            </div>
            <div className="flex items-end gap-3 pb-0.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} className="rounded" />
                <span className="text-xs text-slate-500">Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="rounded" />
                <span className="text-xs text-slate-500">Featured</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center">
              {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : editItem ? 'Update' : 'Create'}
            </button>
            <button onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center">Cancel</button>
          </div>
        </div>
      </AdminModal>
    </div>
  )
}
