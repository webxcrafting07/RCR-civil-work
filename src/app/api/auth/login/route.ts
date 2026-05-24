import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { generateToken, COOKIE_OPTIONS } from '@/lib/auth'
import { loginRateLimiter } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!loginRateLimiter.check(ip)) {
      return NextResponse.json({ success: false, message: 'Too many login attempts. Please try again in 15 minutes.' }, { status: 429 })
    }

    await connectDB()
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 })
    }

    const envAdminEmail = process.env.ADMIN_EMAIL
    const envAdminPassword = process.env.ADMIN_PASSWORD

    // ENV-based Admin Login Bypass
    if (envAdminEmail && envAdminPassword && email === envAdminEmail && password === envAdminPassword) {
      const token = generateToken({ userId: 'env-admin', email: envAdminEmail, role: 'admin' })
      const response = NextResponse.json({
        success: true,
        message: 'Login successful via ENV',
        data: { id: 'env-admin', name: 'Super Admin', email: envAdminEmail, role: 'admin', avatar: null },
      })
      response.cookies.set(COOKIE_OPTIONS.name, token, {
        httpOnly: COOKIE_OPTIONS.httpOnly,
        secure: COOKIE_OPTIONS.secure,
        sameSite: COOKIE_OPTIONS.sameSite,
        maxAge: COOKIE_OPTIONS.maxAge,
        path: COOKIE_OPTIONS.path,
      })
      return response
    }

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
    }

    const isValid = await user.comparePassword(password)
    if (!isValid) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
    }

    const token = generateToken({ userId: user._id.toString(), email: user.email, role: user.role })
    user.lastLogin = new Date()
    await user.save()

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      data: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
    })

    response.cookies.set(COOKIE_OPTIONS.name, token, {
      httpOnly: COOKIE_OPTIONS.httpOnly,
      secure: COOKIE_OPTIONS.secure,
      sameSite: COOKIE_OPTIONS.sameSite,
      maxAge: COOKIE_OPTIONS.maxAge,
      path: COOKIE_OPTIONS.path,
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
