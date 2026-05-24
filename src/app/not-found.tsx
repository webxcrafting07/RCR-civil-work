import Link from 'next/link'
import { HardHat, ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-blue">
            <HardHat size={32} className="text-white" />
          </div>
        </div>

        {/* 404 */}
        <div className="text-[120px] font-display font-bold leading-none text-gradient mb-2">404</div>
        <h1 className="text-2xl font-display font-bold text-slate-900 mb-3">Page Not Found</h1>
        <p className="text-slate-500 mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary justify-center">
            <Home size={16} /> Back to Home
          </Link>
          <Link href="/contact" className="btn-outline justify-center">
            <ArrowLeft size={16} /> Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
