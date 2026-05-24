import { COMPANY_INFO } from '@/constants'

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://rcrenterprises.in',
    name: 'RCR ENTERPRISES',
    alternateName: 'RCR Enterprises',
    description: 'Professional RCC Work Contractor in Virar East, Maharashtra offering civil construction, slab work, shuttering, and more.',
    url: 'https://rcrenterprises.in',
    telephone: `+91${COMPANY_INFO.phone}`,
    email: COMPANY_INFO.email,
    foundingDate: '2014',
    founder: { '@type': 'Person', name: COMPANY_INFO.proprietor },
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${COMPANY_INFO.address.line1}, ${COMPANY_INFO.address.line2}`,
      addressLocality: COMPANY_INFO.address.city,
      addressRegion: COMPANY_INFO.address.state,
      postalCode: COMPANY_INFO.address.pincode,
      addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 19.4686, longitude: 72.8074 },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
    priceRange: '₹₹',
    areaServed: ['Virar', 'Vasai', 'Nalasopara', 'Palghar', 'Boisar', 'Maharashtra'],
    serviceType: ['RCC Construction', 'Civil Construction', 'Slab Work', 'Shuttering Work', 'Labour Contract', 'Column & Beam Work'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'RCC Construction Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'RCC Work Contractor' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Civil Construction Work' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Slab Casting Work' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shuttering Work' } },
      ],
    },
    sameAs: ['https://wa.me/919619439243'],
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', bestRating: '5', worstRating: '1', ratingCount: '47' },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
