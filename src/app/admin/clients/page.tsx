'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Edit2, Trash2, Globe, Building2, CheckCircle, XCircle } from 'lucide-react'

export default function AdminClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/clients')
      const data = await res.json()
      if (data.success) {
        setClients(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch clients:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client logo?')) return

    try {
      const res = await fetch(`/api/clients/${id}`, {
        method: 'DELETE',
      })
      
      if (res.ok) {
        setClients(clients.filter(c => c._id !== id))
      } else {
        alert('Failed to delete client')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('An error occurred while deleting')
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading clients...</div>
  }

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 size={24} className="text-sky-500" />
            Clients & Partners
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage the company logos shown on the home and about pages.</p>
        </div>
        <Link 
          href="/admin/clients/new" 
          className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus size={16} />
          Add Client
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {clients.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No clients added yet. Click "Add Client" to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-500">
                  <th className="p-4 font-medium">Logo</th>
                  <th className="p-4 font-medium">Client Name</th>
                  <th className="p-4 font-medium">Website</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clients.map((client) => (
                  <tr key={client._id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="relative w-16 h-16 rounded-lg bg-white border border-slate-200 p-2 flex items-center justify-center">
                        <Image 
                          src={client.logo} 
                          alt={client.name} 
                          width={48} 
                          height={48} 
                          className="object-contain max-h-full max-w-full"
                        />
                      </div>
                    </td>
                    <td className="p-4 font-medium text-slate-900">{client.name}</td>
                    <td className="p-4 text-slate-500">
                      {client.website ? (
                        <a href={client.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-sky-600 transition-colors">
                          <Globe size={14} /> Link
                        </a>
                      ) : '-'}
                    </td>
                    <td className="p-4">
                      {client.isActive ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <CheckCircle size={12} /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          <XCircle size={12} /> Hidden
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/clients/${client._id}/edit`}
                          className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(client._id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
