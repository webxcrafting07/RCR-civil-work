'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import { Wrench, FolderOpen, Image as ImageIcon, Star, MessageSquare, TrendingUp, Users, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/utils'

interface DashboardStats {
  totalServices: number
  totalProjects: number
  ongoingProjects: number
  completedProjects: number
  totalReviews: number
  totalInquiries: number
  newInquiries: number
  galleryImages: number
  monthlyInquiries: { month: string; count: number }[]
  projectsByStatus: { status: string; count: number }[]
}

const COLORS = ['#0ea5e9', '#10b981', '#3b82f6', '#8b5cf6']

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then(d => { if (d.success) setStats(d.data) })
      .catch(() => setStats(getMockStats()))
      .finally(() => setLoading(false))
  }, [])

  const cards = stats ? [
    { label: 'Total Services', value: stats.totalServices, icon: Wrench, href: '/admin/services', color: 'text-sky-500', bg: 'bg-sky-500/10' },
    { label: 'Total Projects', value: stats.totalProjects, icon: FolderOpen, href: '/admin/projects', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Ongoing Projects', value: stats.ongoingProjects, icon: TrendingUp, href: '/admin/projects?status=ongoing', color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Completed Projects', value: stats.completedProjects, icon: FolderOpen, href: '/admin/projects?status=completed', color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Total Reviews', value: stats.totalReviews, icon: Star, href: '/admin/reviews', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { label: 'Gallery Images', value: stats.galleryImages, icon: ImageIcon, href: '/admin/gallery', color: 'text-pink-400', bg: 'bg-pink-400/10' },
    { label: 'Total Inquiries', value: stats.totalInquiries, icon: MessageSquare, href: '/admin/inquiries', color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { label: 'New Inquiries', value: stats.newInquiries, icon: AlertCircle, href: '/admin/inquiries?status=new', color: 'text-red-400', bg: 'bg-red-400/10', highlight: stats.newInquiries > 0 },
  ] : []

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-display font-bold text-slate-900 mb-1">Welcome back 👋</h2>
        <p className="text-slate-400 text-sm">Here's what's happening with RCR ENTERPRISES today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-28 skeleton rounded-xl" />
          ))
          : cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link href={card.href}
                  className={cn('block p-5 rounded-xl border transition-all duration-300 hover:scale-[1.02]',
                    card.highlight ? 'border-red-400/30 bg-red-400/5' : 'border-slate-200 bg-white hover:border-sky-500/20')}>
                  <div className="flex items-start justify-between mb-3">
                    <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', card.bg)}>
                      <Icon size={18} className={card.color} />
                    </div>
                    {card.highlight && <span className="text-[10px] font-mono text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">NEW</span>}
                  </div>
                  <div className={cn('text-3xl font-display font-bold mb-1', card.color)}>{card.value}</div>
                  <div className="text-xs text-slate-400">{card.label}</div>
                </Link>
              </motion.div>
            )
          })
        }
      </div>

      {/* Charts */}
      {stats && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Monthly inquiries */}
          <div className="lg:col-span-2 p-6 rounded-xl border border-slate-200 bg-white">
            <h3 className="font-display font-semibold text-slate-900 mb-5">Monthly Inquiries</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={stats.monthlyInquiries}>
                <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid rgba(14,165,233,0.2)', borderRadius: '8px', color: '#0f172a', fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                <Bar dataKey="count" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Inquiries" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Projects pie */}
          <div className="p-6 rounded-xl border border-slate-200 bg-white">
            <h3 className="font-display font-semibold text-slate-900 mb-5">Projects by Status</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={stats.projectsByStatus} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={75} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={10}>
                  {stats.projectsByStatus.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid rgba(14,165,233,0.2)', borderRadius: '8px', color: '#0f172a', fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="p-6 rounded-xl border border-slate-200 bg-white">
        <h3 className="font-display font-semibold text-slate-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Add Service', href: '/admin/services', icon: Wrench },
            { label: 'Add Project', href: '/admin/projects', icon: FolderOpen },
            { label: 'Upload Photo', href: '/admin/gallery', icon: ImageIcon },
            { label: 'View Inquiries', href: '/admin/inquiries', icon: MessageSquare },
          ].map(({ label, href, icon: Icon }) => (
            <Link key={label} href={href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-sky-500/20 hover:bg-sky-500/[0.03] transition-all group text-center">
              <Icon size={20} className="text-slate-400 group-hover:text-sky-500 transition-colors" />
              <span className="text-xs text-slate-500 group-hover:text-slate-700 transition-colors">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function getMockStats(): DashboardStats {
  return {
    totalServices: 11, totalProjects: 24, ongoingProjects: 5, completedProjects: 18,
    totalReviews: 12, totalInquiries: 47, newInquiries: 3, galleryImages: 35,
    monthlyInquiries: [
      { month: 'Jan', count: 4 }, { month: 'Feb', count: 6 }, { month: 'Mar', count: 8 },
      { month: 'Apr', count: 5 }, { month: 'May', count: 9 }, { month: 'Jun', count: 7 },
    ],
    projectsByStatus: [
      { status: 'Ongoing', count: 5 }, { status: 'Completed', count: 18 }, { status: 'Upcoming', count: 1 },
    ],
  }
}
