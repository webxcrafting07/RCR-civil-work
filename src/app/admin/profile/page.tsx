'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User, Lock, Save, Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '@/store'
import toast from 'react-hot-toast'

const profileSchema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
})

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password required'),
  newPassword: z.string().min(6, 'Min 6 characters'),
  confirmPassword: z.string(),
}).refine(d => d.newPassword === d.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] })

type ProfileForm = z.infer<typeof profileSchema>
type PasswordForm = z.infer<typeof passwordSchema>

export default function AdminProfilePage() {
  const { user, setUser } = useAuthStore()
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const { register: rProfile, handleSubmit: hProfile, formState: { errors: eProfile, isSubmitting: isP } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name || '', email: user?.email || '' },
  })

  const { register: rPass, handleSubmit: hPass, reset: resetPass, formState: { errors: ePass, isSubmitting: isPass } } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  })

  const onProfileSave = async (data: ProfileForm) => {
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (result.success) {
        setUser(result.data)
        toast.success('Profile updated!')
      } else {
        toast.error(result.message || 'Failed to update profile')
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred. Please try again.')
    }
  }

  const onPasswordSave = async (data: PasswordForm) => {
    try {
      const response = await fetch('/api/auth/profile/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      })
      const result = await response.json()
      if (result.success) {
        toast.success('Password updated successfully!')
        resetPass()
      } else {
        toast.error(result.message || 'Failed to update password')
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred. Please try again.')
    }
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-xl font-display font-bold text-slate-900">Admin Profile</h2>
        <p className="text-sm text-slate-400 mt-0.5">Manage your account details</p>
      </div>

      {/* Avatar + info */}
      <div className="flex items-center gap-5 p-6 rounded-2xl border border-slate-200 bg-white">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500/30 to-sky-500/10 flex items-center justify-center">
          <span className="text-sky-500 font-display font-bold text-2xl">{user?.name?.[0] || 'A'}</span>
        </div>
        <div>
          <div className="font-display font-semibold text-slate-900 text-lg">{user?.name}</div>
          <div className="text-sm text-slate-500">{user?.email}</div>
          <div className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-sky-500/10 text-sky-500 border border-sky-500/20">
            {user?.role?.toUpperCase() || 'ADMIN'}
          </div>
        </div>
      </div>

      {/* Profile form */}
      <div className="p-6 rounded-2xl border border-slate-200 bg-white">
        <h3 className="font-display font-semibold text-slate-900 mb-5 flex items-center gap-2">
          <User size={16} className="text-sky-500" /> Profile Information
        </h3>
        <form onSubmit={hProfile(onProfileSave)} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Full Name</label>
            <input {...rProfile('name')} className="form-input" />
            {eProfile.name && <p className="text-red-400 text-xs mt-1">{eProfile.name.message}</p>}
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Email Address</label>
            <input {...rProfile('email')} type="email" className="form-input" />
            {eProfile.email && <p className="text-red-400 text-xs mt-1">{eProfile.email.message}</p>}
          </div>
          <button type="submit" disabled={isP} className="btn-primary text-sm">
            {isP ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={14} /> Save Profile</>}
          </button>
        </form>
      </div>

      {/* Password form */}
      <div className="p-6 rounded-2xl border border-slate-200 bg-white">
        <h3 className="font-display font-semibold text-slate-900 mb-5 flex items-center gap-2">
          <Lock size={16} className="text-sky-500" /> Change Password
        </h3>
        <form onSubmit={hPass(onPasswordSave)} className="space-y-4">
          {[
            { label: 'Current Password', reg: rPass('currentPassword'), err: ePass.currentPassword, show: showCurrent, toggle: () => setShowCurrent(v => !v) },
            { label: 'New Password', reg: rPass('newPassword'), err: ePass.newPassword, show: showNew, toggle: () => setShowNew(v => !v) },
            { label: 'Confirm New Password', reg: rPass('confirmPassword'), err: ePass.confirmPassword, show: showConfirm, toggle: () => setShowConfirm(v => !v) },
          ].map(({ label, reg, err, show, toggle }) => (
            <div key={label}>
              <label className="block text-xs text-slate-500 mb-1.5">{label}</label>
              <div className="relative">
                <input {...reg} type={show ? 'text' : 'password'} className="form-input pr-10" />
                <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {show ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {err && <p className="text-red-400 text-xs mt-1">{err.message}</p>}
            </div>
          ))}
          <button type="submit" disabled={isPass} className="btn-primary text-sm">
            {isPass ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Lock size={14} /> Update Password</>}
          </button>
        </form>
      </div>
    </div>
  )
}
