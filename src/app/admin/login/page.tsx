'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { HardHat, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import Image from 'next/image'
import { useAuthStore } from '@/store'
import toast from 'react-hot-toast'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password required'),
})

type FormData = z.infer<typeof schema>

export default function AdminLoginPage() {
  const [showPwd, setShowPwd] = useState(false)
  const { setUser } = useAuthStore()
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (result.success) {
        setUser(result.data)
        toast.success('Welcome back!')
        window.location.href = '/admin/dashboard'
      } else {
        toast.error(result.message || 'Login failed')
      }
    } catch {
      toast.error('Network error. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #0ea5e9, transparent)' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="glass-dark rounded-2xl p-8 border border-slate-200 shadow-premium">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex relative w-16 h-16 rounded-2xl overflow-hidden shadow-sm bg-white p-1 mb-4">
              <Image src="/logo-3d.png" alt="RCR Logo" fill sizes="64px" className="object-cover" />
            </div>
            <h1 className="text-xl font-display font-bold text-slate-900">RCR ENTERPRISES</h1>
            <p className="text-sm text-slate-400 mt-1">Admin Panel</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1.5 font-medium">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input {...register('email')} type="email" placeholder="admin@rcrenterprises.com"
                  className="form-input" style={{ paddingLeft: '2.25rem' }} autoComplete="email" />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs text-slate-500 mb-1.5 font-medium">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input {...register('password')} type={showPwd ? 'text' : 'password'}
                  placeholder="Enter your password" className="form-input pr-10" style={{ paddingLeft: '2.25rem' }} autoComplete="current-password" />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting}
              className="btn-primary w-full justify-center py-3.5 mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {isSubmitting ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : 'Sign In to Admin Panel'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-6">
            Restricted access — authorized personnel only
          </p>
        </div>
      </motion.div>
    </div>
  )
}
