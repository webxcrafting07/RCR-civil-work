import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Gallery } from '@/models/index'
import { verifyRequestToken } from '@/lib/auth'
import { deleteFromCloudinary } from '@/lib/cloudinary'

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = verifyRequestToken(request)
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    await connectDB()
    const { id } = await params
    const image = await Gallery.findById(id)
    if (!image) return NextResponse.json({ success: false, message: 'Image not found' }, { status: 404 })
    await deleteFromCloudinary(image.publicId)
    await Gallery.findByIdAndDelete(id)
    return NextResponse.json({ success: true, message: 'Image deleted' })
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to delete image' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = verifyRequestToken(request)
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    await connectDB()
    const { id } = await params
    const body = await request.json()
    const image = await Gallery.findByIdAndUpdate(id, body, { new: true })
    return NextResponse.json({ success: true, data: image })
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to update image' }, { status: 500 })
  }
}
