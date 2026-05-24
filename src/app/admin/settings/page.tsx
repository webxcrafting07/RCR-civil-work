'use client'

import { useState, useEffect } from 'react'
import { Save, Globe, Phone, Search, Share2, Image as ImageIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { cn } from '@/utils'

interface SocialLinks {
  facebook?: string; instagram?: string; twitter?: string
  linkedin?: string; youtube?: string; whatsapp?: string
}
interface SEO { metaTitle: string; metaDescription: string; metaKeywords: string }
interface Hero { heading: string; subheading: string; backgroundImage?: string }
interface Settings {
  logoText: string; tagline: string; companyName: string
  phone: string; email: string; address: string; mapEmbedUrl?: string
  socialLinks: SocialLinks; seo: SEO; hero: Hero; footerText?: string
}

const TABS = [
  { id: 'general', label: 'General', icon: Globe },
  { id: 'contact', label: 'Contact', icon: Phone },
  { id: 'seo',     label: 'SEO',     icon: Search },
  { id: 'social',  label: 'Social',  icon: Share2 },
  { id: 'hero',    label: 'Hero',    icon: ImageIcon },
]

const DEFAULT: Settings = {
  logoText: 'RCR ENTERPRISES', tagline: 'Quality Work With Commitment', companyName: 'RCR ENTERPRISES',
  phone: '9619439243', email: 'rcrenterprises786@gmail.com',
  address: 'Office No. 04, Raipada, Near Anand Gaushalla, Chandansar Road, Virar East – 401305',
  socialLinks: { whatsapp: 'https://wa.me/919619439243' },
  seo: { metaTitle: 'RCR ENTERPRISES - RCC Work Contractor in Virar East', metaDescription: 'Professional RCC Work Contractor in Virar East, Maharashtra.', metaKeywords: 'RCC contractor, civil construction, Virar' },
  hero: { heading: 'Professional RCC Construction Services You Can Trust', subheading: 'Delivering Strong, Safe & Durable RCC Construction Solutions with Quality and Commitment.' },
}

function getNestedValue(obj: unknown, path: string): string {
  return path.split('.').reduce((acc: unknown, key) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key]
    return ''
  }, obj) as string ?? ''
}

function setNestedValue(obj: Settings, path: string, value: string): Settings {
  const keys = path.split('.')
  const result = JSON.parse(JSON.stringify(obj)) as Settings
  let current: Record<string, unknown> = result as unknown as Record<string, unknown>
  for (let i = 0; i < keys.length - 1; i++) {
    current = current[keys[i]] as Record<string, unknown>
  }
  current[keys[keys.length - 1]] = value
  return result
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULT)
  const [activeTab, setActiveTab] = useState('general')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(d => { if (d.success && d.data) setSettings({ ...DEFAULT, ...d.data }) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) })
      const data = await res.json()
      if (data.success) toast.success('Settings saved!')
      else toast.error(data.message || 'Save failed')
    } catch { toast.error('Network error') }
    setSaving(false)
  }

  const Field = ({ label, path, placeholder, textarea = false, type = 'text' }: { label: string; path: string; placeholder?: string; textarea?: boolean; type?: string }) => {
    const val = getNestedValue(settings, path)
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSettings(prev => setNestedValue(prev, path, e.target.value))
    }
    return (
      <div>
        <label className="block text-xs text-slate-500 mb-1.5 font-medium">{label}</label>
        {textarea
          ? <textarea value={val} onChange={onChange} rows={3} placeholder={placeholder} className="form-input resize-none" />
          : <input type={type} value={val} onChange={onChange} placeholder={placeholder} className="form-input" />}
      </div>
    )
  }

  if (loading) return <div className="space-y-4">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-12 skeleton rounded-xl" />)}</div>

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-bold text-slate-900">Website Settings</h2>
          <p className="text-sm text-slate-400">Manage your website content and configuration</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2.5">
          {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={15} /> Save Changes</>}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {TABS.map(tab => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={cn('flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                activeTab === tab.id ? 'bg-sky-500/10 text-sky-500 border border-sky-500/20' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50')}>
              <Icon size={15} />{tab.label}
            </button>
          )
        })}
      </div>

      <div className="space-y-5">
        {activeTab === 'general' && (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Company Name" path="companyName" placeholder="RCR ENTERPRISES" />
              <Field label="Logo Text" path="logoText" placeholder="RCR ENTERPRISES" />
            </div>
            <Field label="Tagline" path="tagline" placeholder="Quality Work With Commitment" />
            <Field label="Footer Text" path="footerText" placeholder="© 2025 RCR ENTERPRISES. All rights reserved." />
          </>
        )}
        {activeTab === 'contact' && (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Phone Number" path="phone" placeholder="9619439243" />
              <Field label="Email Address" path="email" placeholder="rcrenterprises786@gmail.com" type="email" />
            </div>
            <Field label="Office Address" path="address" placeholder="Full address..." textarea />
            <Field label="Google Maps Embed URL" path="mapEmbedUrl" placeholder="https://www.google.com/maps/embed/..." />
          </>
        )}
        {activeTab === 'seo' && (
          <>
            <Field label="Meta Title" path="seo.metaTitle" placeholder="RCR ENTERPRISES - RCC Work Contractor" />
            <Field label="Meta Description" path="seo.metaDescription" placeholder="Professional RCC Work Contractor..." textarea />
            <Field label="Meta Keywords" path="seo.metaKeywords" placeholder="RCC contractor, civil construction, Virar..." />
          </>
        )}
        {activeTab === 'social' && (
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'WhatsApp URL', path: 'socialLinks.whatsapp', placeholder: 'https://wa.me/919619439243' },
              { label: 'Facebook URL', path: 'socialLinks.facebook', placeholder: 'https://facebook.com/...' },
              { label: 'Instagram URL', path: 'socialLinks.instagram', placeholder: 'https://instagram.com/...' },
              { label: 'LinkedIn URL', path: 'socialLinks.linkedin', placeholder: 'https://linkedin.com/...' },
              { label: 'YouTube URL', path: 'socialLinks.youtube', placeholder: 'https://youtube.com/...' },
              { label: 'Twitter / X URL', path: 'socialLinks.twitter', placeholder: 'https://twitter.com/...' },
            ].map(f => <Field key={f.path} label={f.label} path={f.path} placeholder={f.placeholder} />)}
          </div>
        )}
        {activeTab === 'hero' && (
          <>
            <Field label="Hero Heading" path="hero.heading" placeholder="Professional RCC Construction Services You Can Trust" />
            <Field label="Hero Subheading" path="hero.subheading" placeholder="Delivering Strong, Safe & Durable..." textarea />
            <Field label="Background Image URL" path="hero.backgroundImage" placeholder="https://..." />
          </>
        )}
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-200">
        <button onClick={handleSave} disabled={saving} className="btn-primary">
          {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={15} /> Save All Settings</>}
        </button>
      </div>
    </div>
  )
}
