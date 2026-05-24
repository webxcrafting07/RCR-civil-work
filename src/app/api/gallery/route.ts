import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Gallery } from '@/models/index'
import { verifyRequestToken } from '@/lib/auth'
import { uploadBufferToCloudinary } from '@/lib/cloudinary'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = Number(searchParams.get('limit')) || 0
    const adminView = searchParams.get('admin') === 'true'

    const query: Record<string, unknown> = {}
    if (!adminView) query.isActive = true
    if (category && category !== 'All') query.category = category

    let q = Gallery.find(query).sort({ order: 1, createdAt: -1 })
    if (limit) q = q.limit(limit)

    const images = await q.lean()
    return NextResponse.json({ success: true, data: images })
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch gallery' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = verifyRequestToken(request)
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const formData = await request.formData()
    const file = formData.get('image') as File
    const category = formData.get('category') as string || 'General'
    const title = formData.get('title') as string || ''

    if (!file) return NextResponse.json({ success: false, message: 'No image provided' }, { status: 400 })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const { url, publicId } = await uploadBufferToCloudinary(buffer, 'rcr-enterprises/gallery')

    const image = await Gallery.create({ title, imageUrl: url, publicId, category })
    return NextResponse.json({ success: true, data: image }, { status: 201 })
  } catch (error) {
    console.error('Gallery upload error:', error)
    return NextResponse.json({ success: false, message: 'Failed to upload image' }, { status: 500 })
  }
}
