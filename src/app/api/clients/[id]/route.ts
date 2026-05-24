import { NextResponse, NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb'
import Client from '@/models/Client'
import { verifyRequestToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await connectDB()
    const client = await Client.findById(id)
    if (!client) {
      return NextResponse.json({ success: false, message: 'Client not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: client })
  } catch (error: any) {
    console.error('Fetch single client error:', error)
    return NextResponse.json({ success: false, message: 'Failed to fetch client' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = verifyRequestToken(req)
    if (!authResult) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()

    await connectDB()
    const updatedClient = await Client.findByIdAndUpdate(id, body, { new: true, runValidators: true })

    if (!updatedClient) {
      return NextResponse.json({ success: false, message: 'Client not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: updatedClient })
  } catch (error: any) {
    console.error('Update client error:', error)
    return NextResponse.json({ success: false, message: 'Failed to update client' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = verifyRequestToken(req)
    if (!authResult) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    await connectDB()
    
    const deletedClient = await Client.findByIdAndDelete(id)
    
    if (!deletedClient) {
      return NextResponse.json({ success: false, message: 'Client not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Client deleted successfully' })
  } catch (error: any) {
    console.error('Delete client error:', error)
    return NextResponse.json({ success: false, message: 'Failed to delete client' }, { status: 500 })
  }
}
