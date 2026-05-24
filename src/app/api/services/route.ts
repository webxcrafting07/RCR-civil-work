import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Service from '@/models/Service'
import { verifyRequestToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const active = searchParams.get('active')
    const limit = Number(searchParams.get('limit')) || 0

    const query: Record<string, unknown> = {}
    if (active !== 'all') query.isActive = true
    if (featured === 'true') query.featured = true

    let q = Service.find(query).sort({ order: 1, createdAt: -1 })
    if (limit) q = q.limit(limit)

    const services = await q.lean()
    return NextResponse.json({ success: true, data: services })
  } catch (error) {
    console.error('Services GET error:', error)
    return NextResponse.json({ success: false, message: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = verifyRequestToken(request)
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const body = await request.json()

    const existing = await Service.findOne({ slug: body.slug })
    if (existing) return NextResponse.json({ success: false, message: 'Slug already exists' }, { status: 400 })

    const service = await Service.create(body)
    return NextResponse.json({ success: true, data: service }, { status: 201 })
  } catch (error) {
    console.error('Service POST error:', error)
    return NextResponse.json({ success: false, message: 'Failed to create service' }, { status: 500 })
  }
}
