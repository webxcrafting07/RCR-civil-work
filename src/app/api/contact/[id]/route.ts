import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { ContactInquiry } from '@/models/index'
import { verifyRequestToken } from '@/lib/auth'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = verifyRequestToken(request)
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    await connectDB()
    const { id } = await params
    const body = await request.json()
    const inquiry = await ContactInquiry.findByIdAndUpdate(id, body, { new: true })
    if (!inquiry) return NextResponse.json({ success: false, message: 'Inquiry not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: inquiry })
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to update inquiry' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = verifyRequestToken(request)
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    await connectDB()
    const { id } = await params
    await ContactInquiry.findByIdAndDelete(id)
    return NextResponse.json({ success: true, message: 'Inquiry deleted' })
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to delete inquiry' }, { status: 500 })
  }
}
