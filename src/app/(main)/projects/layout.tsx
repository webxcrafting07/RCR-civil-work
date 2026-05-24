import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Projects - Portfolio of RCC & Civil Work | RCR ENTERPRISES',
  description: 'Explore our portfolio of successfully completed RCC work, slab casting, and civil construction projects across Mumbai, Virar, and Palghar.',
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Our Construction Projects',
    description: 'Explore our portfolio of successfully completed RCC work, slab casting, and civil construction projects.',
    publisher: {
      '@type': 'LocalBusiness',
      name: 'RCR ENTERPRISES'
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
