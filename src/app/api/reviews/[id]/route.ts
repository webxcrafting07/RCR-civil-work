import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Review from '@/models/Review'
import { verifyRequestToken } from '@/lib/auth'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = verifyRequestToken(request)
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    await connectDB()
    const { id } = await params
    const body = await request.json()
    const review = await Review.findByIdAndUpdate(id, body, { new: true })
    if (!review) return NextResponse.json({ success: false, message: 'Review not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: review })
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to update review' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = verifyRequestToken(request)
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    await connectDB()
    const { id } = await params
    await Review.findByIdAndDelete(id)
    return NextResponse.json({ success: true, message: 'Review deleted' })
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to delete review' }, { status: 500 })
  }
}
