'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Eye, CheckCircle, Clock, MessageSquare, Filter } from 'lucide-react'
import toast from 'react-hot-toast'
import { cn, formatDate, getStatusColor } from '@/utils'
import AdminModal from '@/components/admin/AdminModal'

interface Inquiry {
  _id: string
  fullName: string
  phone: string
  email: string
  serviceRequired: string
  message: string
  status: 'new' | 'read' | 'replied' | 'resolved'
  adminNote?: string
  createdAt: string
}

const STATUS_OPTIONS = ['all', 'new', 'read', 'replied', 'resolved']
const STATUS_LABELS: Record<string, string> = { new: 'New', read: 'Read', replied: 'Replied', resolved: 'Resolved' }

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [adminNote, setAdminNote] = useState('')
  const [newStatus, setNewStatus] = useState<string>('read')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchInquiries = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: '15' })
      if (statusFilter !== 'all') params.set('status', statusFilter)
      const res = await fetch(`/api/contact?${params}`)
      const data = await res.json()
      if (data.success) {
        setInquiries(data.data)
        setTotalPages(data.pagination?.pages || 1)
      }
    } catch { toast.error('Failed to load inquiries') }
    setLoading(false)
  }

  useEffect(() => { fetchInquiries() }, [statusFilter, page])

  const openDetail = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry)
    setAdminNote(inquiry.adminNote || '')
    setNewStatus(inquiry.status === 'new' ? 'read' : inquiry.status)
    setModalOpen(true)
    // Mark as read if new
    if (inquiry.status === 'new') {
      fetch(`/api/contact/${inquiry._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'read' }) })
        .then(() => fetchInquiries())
    }
  }

  const handleUpdate = async () => {
    if (!selectedInquiry) return
    const res = await fetch(`/api/contact/${selectedInquiry._id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, adminNote }),
    })
    const data = await res.json()
    if (data.success) { toast.success('Updated'); setModalOpen(false); fetchInquiries() }
    else toast.error('Update failed')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return
    const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' })
    if ((await res.json()).success) { toast.success('Deleted'); fetchInquiries() }
  }

  const newCount = inquiries.filter(i => i.status === 'new').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-3">
            Contact Inquiries
            {newCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-red-500/20 text-red-400 border border-red-500/30">
                {newCount} new
              </span>
            )}
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">{inquiries.length} inquiries</p>
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2">
        {STATUS_OPTIONS.map(s => (
          <button key={s} onClick={() => { setStatusFilter(s); setPage(1) }}
            className={cn('px-4 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all',
              statusFilter === s ? 'bg-sky-500 text-white' : 'border border-slate-200 text-slate-500 hover:border-sky-500/30 hover:text-sky-500')}>
            {s === 'all' ? 'All' : STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                {['Name', 'Service', 'Phone', 'Email', 'Date', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-mono text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="border-b border-slate-200">
                    {Array.from({ length: 7 }).map((_, j) => <td key={j} className="px-5 py-4"><div className="h-3 skeleton rounded w-24" /></td>)}
                  </tr>
                ))
                : inquiries.map((inq, i) => (
                  <motion.tr key={inq._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    className={cn('border-b border-slate-200 hover:bg-white transition-colors cursor-pointer',
                      inq.status === 'new' && 'bg-sky-500/[0.02]')}
                    onClick={() => openDetail(inq)}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {inq.status === 'new' && <span className="w-2 h-2 rounded-full bg-sky-500 flex-shrink-0" />}
                        <span className="text-sm font-medium text-slate-900">{inq.fullName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-500 max-w-[150px] truncate">{inq.serviceRequired}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{inq.phone}</td>
                    <td className="px-5 py-4 text-xs text-slate-500 max-w-[150px] truncate">{inq.email}</td>
                    <td className="px-5 py-4 text-xs text-slate-400 whitespace-nowrap">{formatDate(inq.createdAt)}</td>
                    <td className="px-5 py-4">
                      <span className={cn('text-[10px] px-2.5 py-1 rounded-full border font-mono font-semibold', getStatusColor(inq.status))}>
                        {STATUS_LABELS[inq.status] || inq.status}
                      </span>
                    </td>
                    <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <button onClick={() => openDetail(inq)} className="w-8 h-8 rounded-lg bg-blue-400/10 text-blue-400 hover:bg-blue-400/20 flex items-center justify-center transition-colors">
                          <Eye size={13} />
                        </button>
                        <button onClick={() => handleDelete(inq._id)} className="w-8 h-8 rounded-lg bg-red-400/10 text-red-400 hover:bg-red-400/20 flex items-center justify-center transition-colors">
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)}
              className={cn('w-9 h-9 rounded-lg text-sm font-medium transition-all',
                page === i + 1 ? 'bg-sky-500 text-white' : 'border border-slate-200 text-slate-500 hover:border-sky-500/30')}>
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Detail modal */}
      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title="Inquiry Details" size="lg">
        {selectedInquiry && (
          <div className="space-y-5">
            {/* Info grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Full Name', value: selectedInquiry.fullName },
                { label: 'Phone', value: selectedInquiry.phone },
                { label: 'Email', value: selectedInquiry.email },
                { label: 'Service Required', value: selectedInquiry.serviceRequired },
                { label: 'Submitted', value: formatDate(selectedInquiry.createdAt) },
                { label: 'Current Status', value: STATUS_LABELS[selectedInquiry.status] },
              ].map(({ label, value }) => (
                <div key={label} className="p-3 rounded-lg bg-sky-50/50 border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-1">{label}</div>
                  <div className="text-sm text-slate-900">{value}</div>
                </div>
              ))}
            </div>

            {/* Message */}
            <div className="p-4 rounded-lg bg-sky-50/50 border border-slate-200">
              <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-2">Message</div>
              <p className="text-sm text-slate-600 leading-relaxed">{selectedInquiry.message}</p>
            </div>

            {/* Quick reply */}
            <div className="flex gap-3">
              <a href={`tel:${selectedInquiry.phone}`} className="btn-primary flex-1 justify-center text-sm py-2.5">
                Call Client
              </a>
              <a href={`mailto:${selectedInquiry.email}?subject=Re: Your inquiry at RCR ENTERPRISES`}
                className="btn-outline flex-1 justify-center text-sm py-2.5">
                Send Email
              </a>
              <a href={`https://wa.me/91${selectedInquiry.phone}?text=Hello%20${encodeURIComponent(selectedInquiry.fullName)}%2C%20Thank%20you%20for%20contacting%20RCR%20ENTERPRISES.`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold text-slate-900 transition-all hover:opacity-90"
                style={{ background: '#25D366' }}>
                WhatsApp
              </a>
            </div>

            {/* Update status */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Update Status</label>
                <select value={newStatus} onChange={e => setNewStatus(e.target.value)} className="form-input">
                  {['new', 'read', 'replied', 'resolved'].map(s => (
                    <option key={s} value={s} className="bg-white">{STATUS_LABELS[s]}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Admin Note (internal)</label>
              <textarea value={adminNote} onChange={e => setAdminNote(e.target.value)} rows={3}
                placeholder="Internal notes about this inquiry..." className="form-input resize-none" />
            </div>

            <button onClick={handleUpdate} className="btn-primary w-full justify-center">
              <CheckCircle size={15} /> Save Changes
            </button>
          </div>
        )}
      </AdminModal>
    </div>
  )
}
