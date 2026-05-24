import { NextResponse, NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb'
import Client from '@/models/Client'
import { verifyRequestToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const url = new URL(req.url)
    const activeOnly = url.searchParams.get('activeOnly') === 'true'

    const query = activeOnly ? { isActive: true } : {}
    const clients = await Client.find(query).sort({ order: 1, createdAt: -1 })

    return NextResponse.json({ success: true, data: clients })
  } catch (error: any) {
    console.error('Fetch clients error:', error)
    return NextResponse.json({ success: false, message: 'Failed to fetch clients' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate Request
    const authResult = verifyRequestToken(req)
    if (!authResult) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    // 2. Parse Body
    const body = await req.json()
    const { name, logo, website, order, isActive } = body

    if (!name || !logo) {
      return NextResponse.json({ success: false, message: 'Name and Logo are required' }, { status: 400 })
    }

    // 3. Save to DB
    await connectDB()
    const newClient = await Client.create({
      name,
      logo,
      website,
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
    })

    return NextResponse.json({ success: true, data: newClient }, { status: 201 })
  } catch (error: any) {
    console.error('Create client error:', error)
    return NextResponse.json({ success: false, message: 'Failed to create client' }, { status: 500 })
  }
}
