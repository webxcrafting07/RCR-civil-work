import { NextResponse, NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb'
import Blog from '@/models/Blog'
import { verifyRequestToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const url = new URL(req.url)
    const limit = parseInt(url.searchParams.get('limit') || '0')
    const publishedOnly = url.searchParams.get('publishedOnly') === 'true'

    const query = publishedOnly ? { isPublished: true } : {}

    let q = Blog.find(query).sort({ publishedAt: -1, createdAt: -1 })
    
    if (limit > 0) {
      q = q.limit(limit)
    }

    const blogs = await q.lean()
    return NextResponse.json({ success: true, data: blogs })
  } catch (error: any) {
    console.error('Fetch blogs error:', error)
    return NextResponse.json({ success: false, message: 'Failed to fetch blogs' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const isAuth = verifyRequestToken(req)
    if (!isAuth) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const body = await req.json()

    // Ensure slug uniqueness
    const existing = await Blog.findOne({ slug: body.slug })
    if (existing) {
      return NextResponse.json({ success: false, message: 'Slug already exists. Please choose a different title or slug.' }, { status: 400 })
    }

    const newBlog = await Blog.create(body)
    return NextResponse.json({ success: true, data: newBlog }, { status: 201 })
  } catch (error: any) {
    console.error('Create blog error:', error)
    return NextResponse.json({ success: false, message: error.message || 'Failed to create blog' }, { status: 500 })
  }
}
