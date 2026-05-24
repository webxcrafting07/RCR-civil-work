import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Review from '@/models/Review'
import { verifyRequestToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const limit = Number(searchParams.get('limit')) || 0

    const query: Record<string, unknown> = { isActive: true }
    if (featured === 'true') query.featured = true

    let q = Review.find(query).sort({ createdAt: -1 })
    if (limit) q = q.limit(limit)

    const reviews = await q.lean()
    return NextResponse.json({ success: true, data: reviews })
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch reviews' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = verifyRequestToken(request)
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    await connectDB()
    const body = await request.json()
    const review = await Review.create(body)
    return NextResponse.json({ success: true, data: review }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to create review' }, { status: 500 })
  }
}
