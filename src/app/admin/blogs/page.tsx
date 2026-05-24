'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs')
      const json = await res.json()
      if (json.success) {
        setBlogs(json.data)
      }
    } catch (error) {
      toast.error('Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return

    try {
      const res = await fetch(`/api/blogs/${slug}`, { method: 'DELETE' })
      const result = await res.json()
      
      if (result.success) {
        toast.success('Blog deleted')
        fetchBlogs()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Failed to delete blog')
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Manage Blogs</h1>
        <Link href="/admin/blogs/new" className="btn-primary py-2 px-4 text-sm flex items-center gap-2">
          <Plus size={16} /> New Blog
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="p-4 font-semibold">Title</th>
                <th className="p-4 font-semibold">Author</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-slate-50">
                  <td className="p-4">
                    <p className="font-semibold text-slate-900 line-clamp-1">{blog.title}</p>
                    <p className="text-xs text-slate-500 truncate w-64">{blog.slug}</p>
                  </td>
                  <td className="p-4 text-slate-600">{blog.author}</td>
                  <td className="p-4 text-slate-600">
                    {new Date(blog.publishedAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center">
                    {blog.isPublished ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                        <CheckCircle size={12} /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
                        <XCircle size={12} /> Draft
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/blogs/${blog._id}/edit`} className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </Link>
                      <button onClick={() => handleDelete(blog.slug)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    No blogs found. Click "New Blog" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
