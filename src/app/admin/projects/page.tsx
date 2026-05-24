'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, Search, MapPin, Calendar } from 'lucide-react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { cn, slugify, formatDateShort, getStatusColor, CONSTRUCTION_IMAGES } from '@/utils'
import AdminModal from '@/components/admin/AdminModal'

interface Project {
  _id: string; title: string; slug: string; shortDescription: string
  coverImage: string; category: string; status: string; location: string
  startDate: string; workType: string; featured: boolean
}

const CATEGORIES = ['residential', 'commercial', 'infrastructure', 'renovation']
const STATUSES = ['ongoing', 'completed', 'upcoming']

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<Project | null>(null)
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({
    title: '', slug: '', shortDescription: '', description: '', workType: '',
    category: 'residential', status: 'ongoing', location: '', startDate: '',
    endDate: '', budget: '', clientName: '', coverImage: CONSTRUCTION_IMAGES[0],
    images: [CONSTRUCTION_IMAGES[0]], materials: '', featured: false, isActive: true,
  })
  const [saving, setSaving] = useState(false)

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ active: 'all' })
    if (search) params.set('search', search)
    const res = await fetch(`/api/projects?${params}`)
    const data = await res.json()
    if (data.success) setProjects(data.data)
    setLoading(false)
  }, [search])

  useEffect(() => { fetchProjects() }, [fetchProjects])

  const resetForm = () => setForm({
    title: '', slug: '', shortDescription: '', description: '', workType: '',
    category: 'residential', status: 'ongoing', location: '', startDate: '',
    endDate: '', budget: '', clientName: '', coverImage: CONSTRUCTION_IMAGES[0],
    images: [CONSTRUCTION_IMAGES[0]], materials: '', featured: false, isActive: true,
  })

  const openAdd = () => { setEditItem(null); resetForm(); setModalOpen(true) }
  const openEdit = (p: Project) => {
    setEditItem(p)
    setForm({ title: p.title, slug: p.slug, shortDescription: p.shortDescription, description: '', workType: p.workType, category: p.category, status: p.status, location: p.location, startDate: p.startDate?.split('T')[0] || '', endDate: '', budget: '', clientName: '', coverImage: p.coverImage || '', images: [], materials: '', featured: p.featured, isActive: true })
    setModalOpen(true)
  }

  const handleSave = async () => {
    if (!form.title || !form.location || !form.workType) return toast.error('Fill required fields')
    setSaving(true)
    try {
      const payload = { ...form, materials: form.materials ? form.materials.split(',').map(m => m.trim()) : [] }
      const url = editItem ? `/api/projects/${editItem._id}` : '/api/projects'
      const method = editItem ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (data.success) { toast.success(editItem ? 'Project updated' : 'Project created'); setModalOpen(false); fetchProjects() }
      else toast.error(data.message || 'Failed')
    } catch { toast.error('Network error') }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    const data = await res.json()
    if (data.success) { toast.success('Deleted'); fetchProjects() }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-bold text-slate-900">Projects</h2>
          <p className="text-sm text-slate-400 mt-0.5">{projects.length} projects total</p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm py-2.5"><Plus size={15} /> Add Project</button>
      </div>

      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..." className="form-input pl-9" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="rounded-xl overflow-hidden border border-slate-200"><div className="h-40 skeleton" /><div className="p-4 space-y-2"><div className="h-4 skeleton rounded w-3/4" /><div className="h-3 skeleton rounded w-full" /></div></div>)
          : projects.map((p, i) => (
            <motion.div key={p._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-xl overflow-hidden border border-slate-200 bg-white hover:border-sky-500/15 transition-all">
              <div className="relative h-40 overflow-hidden group">
                <Image src={p.coverImage || CONSTRUCTION_IMAGES[0]} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50/80 to-transparent" />
                <span className={cn('absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border', getStatusColor(p.status))}>
                  {p.status}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-display font-semibold text-slate-900 text-sm mb-1 line-clamp-1">{p.title}</h3>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-3">
                  <span className="flex items-center gap-1"><MapPin size={10} className="text-sky-500/60" />{p.location}</span>
                  <span className="flex items-center gap-1"><Calendar size={10} className="text-sky-500/60" />{formatDateShort(p.startDate)}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(p)} className="flex-1 py-1.5 rounded-lg bg-blue-400/10 text-blue-400 hover:bg-blue-400/20 text-xs flex items-center justify-center gap-1 transition-colors">
                    <Pencil size={12} /> Edit
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="flex-1 py-1.5 rounded-lg bg-red-400/10 text-red-400 hover:bg-red-400/20 text-xs flex items-center justify-center gap-1 transition-colors">
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
      </div>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Project' : 'Add Project'} size="lg">
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Title *</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: !editItem ? slugify(e.target.value) : f.slug }))} placeholder="Project title" className="form-input" />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Slug</label>
              <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className="form-input font-mono text-xs" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Short Description *</label>
            <textarea value={form.shortDescription} onChange={e => setForm(f => ({ ...f, shortDescription: e.target.value }))} rows={2} className="form-input resize-none" />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Category</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="form-input">
                {CATEGORIES.map(c => <option key={c} value={c} className="bg-white">{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Status</label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="form-input">
                {STATUSES.map(s => <option key={s} value={s} className="bg-white">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Work Type *</label>
              <input value={form.workType} onChange={e => setForm(f => ({ ...f, workType: e.target.value }))} placeholder="e.g. RCC Construction" className="form-input" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Location *</label>
              <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="City, State" className="form-input" />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Client Name</label>
              <input value={form.clientName} onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))} className="form-input" />
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Start Date</label>
              <input type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} className="form-input" />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">End Date</label>
              <input type="date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} className="form-input" />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Budget</label>
              <input value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} placeholder="₹ Amount" className="form-input" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Materials Used (comma separated)</label>
            <input value={form.materials} onChange={e => setForm(f => ({ ...f, materials: e.target.value }))} placeholder="M25 Concrete, TMT Steel, Shuttering" className="form-input" />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Cover Image URL</label>
            <input value={form.coverImage} onChange={e => setForm(f => ({ ...f, coverImage: e.target.value }))} placeholder="https://..." className="form-input font-mono text-xs" />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} />
              <span className="text-xs text-slate-500">Featured Project</span>
            </label>
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
