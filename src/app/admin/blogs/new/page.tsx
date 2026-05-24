'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react'
import toast from 'react-hot-toast'

export default function NewBlogPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    coverImage: '',
    author: 'RCR Enterprises',
    seoTitle: '',
    seoDescription: '',
    tags: '',
    isPublished: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      // Auto-generate slug from title if slug is empty or user is typing title
      ...(name === 'title' && !prev.slug && {
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      })
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      }

      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      
      const result = await res.json()
      
      if (result.success) {
        toast.success('Blog created successfully')
        router.push('/admin/blogs')
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Failed to create blog')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/blogs" className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Create New Blog</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Basic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Blog Title" />
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">URL Slug *</label>
              <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="e.g. why-rcc-work-is-important" />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Author</label>
              <input type="text" name="author" value={formData.author} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Cover Image URL</label>
              <div className="flex gap-2">
                <input type="url" name="coverImage" value={formData.coverImage} onChange={handleChange} className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="https://..." />
                {formData.coverImage && (
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200">
                    <img src={formData.coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Excerpt * (Short summary)</label>
              <textarea required name="excerpt" value={formData.excerpt} onChange={handleChange} rows={2} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Brief summary for the blog card..." />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Blog Content (HTML/Markdown supported) *</h2>
          <textarea required name="content" value={formData.content} onChange={handleChange} rows={15} className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono text-sm" placeholder="<p>Write your blog content here...</p>" />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">SEO & Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Tags (comma separated)</label>
              <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Construction, RCC, Tips" />
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">SEO Title</label>
              <input type="text" name="seoTitle" value={formData.seoTitle} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Leave blank to use main title" />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">SEO Description</label>
              <input type="text" name="seoDescription" value={formData.seoDescription} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Leave blank to use excerpt" />
            </div>

            <div className="col-span-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} className="w-5 h-5 rounded border-slate-300 text-sky-500 focus:ring-sky-500" />
                <span className="text-sm font-medium text-slate-700">Publish immediately</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pb-10">
          <Link href="/admin/blogs" className="btn-outline px-6 py-2">Cancel</Link>
          <button type="submit" disabled={loading} className="btn-primary px-6 py-2 flex items-center gap-2">
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
            Save Blog
          </button>
        </div>
      </form>
    </div>
  )
}
