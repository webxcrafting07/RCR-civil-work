import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { ContactInquiry } from '@/models/index'
import { verifyRequestToken } from '@/lib/auth'
import { sendContactNotification } from '@/lib/cloudinary'

export async function GET(request: NextRequest) {
  try {
    const user = verifyRequestToken(request)
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    await connectDB()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get('limit')) || 20

    const query: Record<string, unknown> = {}
    if (status && status !== 'all') query.status = status

    const total = await ContactInquiry.countDocuments(query)
    const inquiries = await ContactInquiry.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    return NextResponse.json({
      success: true,
      data: inquiries,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch inquiries' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const { fullName, phone, email, serviceRequired, message } = body

    if (!fullName || !phone || !email || !serviceRequired || !message) {
      return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: 'Invalid email address' }, { status: 400 })
    }

    const inquiry = await ContactInquiry.create({ fullName, phone, email, serviceRequired, message })

    // Send email (non-blocking)
    sendContactNotification({ fullName, phone, email, serviceRequired, message }).catch(console.error)

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been submitted. We will contact you within 24 hours.',
      data: { id: inquiry._id },
    }, { status: 201 })
  } catch (error) {
    console.error('Contact POST error:', error)
    return NextResponse.json({ success: false, message: 'Failed to submit inquiry' }, { status: 500 })
  }
}
