import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { WebsiteSettings } from '@/models/index'
import { verifyRequestToken } from '@/lib/auth'

export async function GET() {
  try {
    await connectDB()
    let settings = await WebsiteSettings.findOne().lean()
    if (!settings) {
      settings = await WebsiteSettings.create({})
    }
    return NextResponse.json({ success: true, data: settings })
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = verifyRequestToken(request)
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    await connectDB()
    const body = await request.json()
    const settings = await WebsiteSettings.findOneAndUpdate({}, body, { new: true, upsert: true })
    return NextResponse.json({ success: true, data: settings })
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to update settings' }, { status: 500 })
  }
}
