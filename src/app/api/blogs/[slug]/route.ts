import { NextResponse, NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb'
import Blog from '@/models/Blog'
import { verifyRequestToken } from '@/lib/auth'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    await connectDB()
    
    // Attempt to find by slug or by ID
    let blog = await Blog.findOne({ slug }).lean()
    if (!blog) {
      // Fallback to ID if it's a valid ObjectId
      if (slug.match(/^[0-9a-fA-F]{24}$/)) {
        blog = await Blog.findById(slug).lean()
      }
    }

    if (!blog) {
      return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: blog })
  } catch (error: any) {
    console.error('Fetch blog error:', error)
    return NextResponse.json({ success: false, message: 'Failed to fetch blog' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const isAuth = verifyRequestToken(req)
    if (!isAuth) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const body = await req.json()

    let blog = await Blog.findByIdAndUpdate(slug, body, { new: true, runValidators: true })
    
    if (!blog) {
       // fallback search by slug just in case
       blog = await Blog.findOneAndUpdate({ slug }, body, { new: true, runValidators: true })
    }

    if (!blog) {
      return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: blog })
  } catch (error: any) {
    console.error('Update blog error:', error)
    return NextResponse.json({ success: false, message: error.message || 'Failed to update blog' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const isAuth = verifyRequestToken(req)
    if (!isAuth) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    
    let deleted = await Blog.findByIdAndDelete(slug)
    if (!deleted) {
       deleted = await Blog.findOneAndDelete({ slug })
    }

    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Blog deleted successfully' })
  } catch (error: any) {
    console.error('Delete blog error:', error)
    return NextResponse.json({ success: false, message: 'Failed to delete blog' }, { status: 500 })
  }
}
