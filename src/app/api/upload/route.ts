import { NextRequest, NextResponse } from 'next/server'
import { verifyRequestToken } from '@/lib/auth'
import { uploadBufferToCloudinary } from '@/lib/cloudinary'

export async function POST(request: NextRequest) {
  try {
    const user = verifyRequestToken(request)
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })

    const formData = await request.formData()
    const file = formData.get('image') as File
    const folder = formData.get('folder') as string || 'rcr-enterprises/general'

    if (!file) return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Upload to Cloudinary
    const { url, publicId } = await uploadBufferToCloudinary(buffer, folder)

    return NextResponse.json({ success: true, url, publicId }, { status: 201 })
  } catch (error) {
    console.error('File upload error:', error)
    return NextResponse.json({ success: false, message: 'Failed to upload file' }, { status: 500 })
  }
}
