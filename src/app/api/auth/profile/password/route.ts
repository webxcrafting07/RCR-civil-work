import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { verifyRequestToken } from '@/lib/auth'

export async function PUT(request: NextRequest) {
  try {
    const payload = verifyRequestToken(request)
    if (!payload) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const { currentPassword, newPassword } = await request.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, message: 'Current and new passwords are required' }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ success: false, message: 'New password must be at least 6 characters' }, { status: 400 })
    }

    let user;
    if (payload.userId !== 'env-admin') {
      user = await User.findById(payload.userId)
    }
    if (!user) {
      user = await User.findOne({ email: payload.email.toLowerCase() })
    }

    if (!user) {
      user = new User({
        name: 'RCR Admin',
        email: payload.email.toLowerCase(),
        password: process.env.ADMIN_PASSWORD || 'Admin@123',
        role: 'admin',
      })
      await user.save()
    }

    let isCurrentValid = await user.comparePassword(currentPassword)
    if (!isCurrentValid && payload.userId === 'env-admin') {
      isCurrentValid = currentPassword === process.env.ADMIN_PASSWORD
    }

    if (!isCurrentValid) {
      return NextResponse.json({ success: false, message: 'Incorrect current password' }, { status: 400 })
    }

    user.password = newPassword
    await user.save()

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully',
    })
  } catch (error) {
    console.error('Update password error:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
