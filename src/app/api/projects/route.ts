import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Project from '@/models/Project'
import { verifyRequestToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = Number(searchParams.get('limit')) || 0
    const page = Number(searchParams.get('page')) || 1
    const search = searchParams.get('search')

    const query: Record<string, unknown> = { isActive: true }
    if (status && status !== 'all') query.status = status
    if (category && category !== 'all') query.category = category
    if (featured === 'true') query.featured = true
    if (search) query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
    ]

    const total = await Project.countDocuments(query)
    let q = Project.find(query).sort({ featured: -1, createdAt: -1 })
    if (limit) {
      q = q.skip((page - 1) * limit).limit(limit)
    }

    const projects = await q.lean()
    return NextResponse.json({
      success: true,
      data: projects,
      pagination: limit ? { page, limit, total, pages: Math.ceil(total / limit) } : undefined,
    })
  } catch (error) {
    console.error('Projects GET error:', error)
    return NextResponse.json({ success: false, message: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = verifyRequestToken(request)
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    await connectDB()
    const body = await request.json()
    const existing = await Project.findOne({ slug: body.slug })
    if (existing) return NextResponse.json({ success: false, message: 'Slug already exists' }, { status: 400 })
    const project = await Project.create(body)
    return NextResponse.json({ success: true, data: project }, { status: 201 })
  } catch (error) {
    console.error('Project POST error:', error)
    return NextResponse.json({ success: false, message: 'Failed to create project' }, { status: 500 })
  }
}
