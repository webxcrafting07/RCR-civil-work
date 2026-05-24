import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Project from '@/models/Project'
import { verifyRequestToken } from '@/lib/auth'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const isObjectId = id.match(/^[0-9a-fA-F]{24}$/)
    const project = await Project.findOne(isObjectId ? { _id: id } : { slug: id }).lean()
    if (!project) return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: project })
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch project' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = verifyRequestToken(request)
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    await connectDB()
    const { id } = await params
    const body = await request.json()
    const project = await Project.findByIdAndUpdate(id, body, { new: true })
    if (!project) return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: project })
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = verifyRequestToken(request)
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    await connectDB()
    const { id } = await params
    await Project.findByIdAndDelete(id)
    return NextResponse.json({ success: true, message: 'Project deleted' })
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to delete project' }, { status: 500 })
  }
}
