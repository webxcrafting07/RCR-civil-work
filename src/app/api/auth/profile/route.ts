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
    const { name, email } = await request.json()

    if (!name || !email) {
      return NextResponse.json({ success: false, message: 'Name and email are required' }, { status: 400 })
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
        name,
        email: email.toLowerCase(),
        password: process.env.ADMIN_PASSWORD || 'Admin@123',
        role: 'admin',
      })
    } else {
      user.name = name
      user.email = email.toLowerCase()
    }

    await user.save()

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    })
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
