import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { LanguageProvider } from '@/context/LanguageContext'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'RCR ENTERPRISES - Top RCC Work & Civil Construction Contractor in Mumbai & Palghar',
    template: '%s | RCR ENTERPRISES',
  },
  description:
    'RCR ENTERPRISES is the best RCC Work and Civil Construction Contractor serving Mumbai, Virar, Vasai, and Palghar. We specialize in building construction, slab casting, shuttering, and turnkey projects.',
  keywords: [
    'top RCC contractor in Mumbai',
    'best civil construction company',
    'RCC work contractor near me',
    'building contractors in Virar',
    'slab casting experts',
    'shuttering and centering work',
    'turnkey construction contractors',
    'commercial building contractor',
    'industrial construction work',
    'RCR Enterprises'
  ],
  authors: [{ name: 'RCR ENTERPRISES' }],
  creator: 'RCR ENTERPRISES',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'RCR ENTERPRISES',
    title: 'RCR ENTERPRISES - Professional RCC Work Contractor',
    description: 'Trusted RCC Work Contractor in Virar East, Maharashtra. Quality Work With Commitment.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RCR ENTERPRISES - RCC Work Contractor',
    description: 'Quality RCC construction services in Virar East, Maharashtra.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  verification: {
    google: 'paste-your-google-verification-code-here',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Barlow:wght@300;400;500;600;700;800&family=Barlow+Condensed:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#ffffff',
                color: '#0f172a',
                border: '1px solid rgba(14,165,233,0.2)',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              },
              success: { iconTheme: { primary: '#0ea5e9', secondary: '#ffffff' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  )
}
