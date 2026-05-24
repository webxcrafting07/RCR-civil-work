import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyTokenEdge } from '@/lib/auth'

const PROTECTED_PATHS = ['/admin/dashboard', '/admin/services', '/admin/projects', '/admin/gallery', '/admin/reviews', '/admin/inquiries', '/admin/settings', '/admin/profile']
const PUBLIC_ADMIN = ['/admin/login']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtectedAdmin = PROTECTED_PATHS.some(p => pathname.startsWith(p))
  const isPublicAdmin = PUBLIC_ADMIN.some(p => pathname.startsWith(p))

  if (isProtectedAdmin) {
    const token = request.cookies.get('rcr_admin_token')?.value
    if (!token) return NextResponse.redirect(new URL('/admin/login', request.url))
    
    const payload = await verifyTokenEdge(token)
    if (!payload) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete('rcr_admin_token')
      return response
    }
  }

  if (isPublicAdmin) {
    const token = request.cookies.get('rcr_admin_token')?.value
    if (token) {
      const payload = await verifyTokenEdge(token)
      if (payload) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
