import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rcr-enterprises'

// Inline schemas for seeding
const UserSchema = new mongoose.Schema({ name: String, email: { type: String, unique: true }, password: String, role: { type: String, default: 'admin' } })
const ServiceSchema = new mongoose.Schema({ title: String, slug: { type: String, unique: true }, shortDescription: String, description: String, icon: String, benefits: [String], process: [{ step: Number, title: String, description: String }], faqs: [{ question: String, answer: String }], featured: Boolean, order: Number, isActive: { type: Boolean, default: true } }, { timestamps: true })
const ReviewSchema = new mongoose.Schema({ clientName: String, clientCompany: String, review: String, rating: Number, projectName: String, isActive: { type: Boolean, default: true }, featured: Boolean }, { timestamps: true })
const SettingsSchema = new mongoose.Schema({ logoText: String, tagline: String, companyName: String, phone: String, email: String, address: String, socialLinks: mongoose.Schema.Types.Mixed, seo: mongoose.Schema.Types.Mixed, hero: mongoose.Schema.Types.Mixed, stats: [mongoose.Schema.Types.Mixed] }, { timestamps: true })

async function seed() {
  console.log('🌱 Connecting to MongoDB...')
  await mongoose.connect(MONGODB_URI)
  console.log('✅ Connected')

  // Models
  const User = mongoose.models.User || mongoose.model('User', UserSchema)
  const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema)
  const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema)
  const Settings = mongoose.models.WebsiteSettings || mongoose.model('WebsiteSettings', SettingsSchema)

  // 1. Admin user
  const bcrypt = require('bcryptjs')
  const existingUser = await User.findOne({ email: 'admin@rcrenterprises.com' })
  if (!existingUser) {
    const hash = await bcrypt.hash('Admin@123', 12)
    await User.create({ name: 'RCR Admin', email: 'admin@rcrenterprises.com', password: hash, role: 'admin' })
    console.log('👤 Admin user created → admin@rcrenterprises.com / Admin@123')
  } else {
    console.log('👤 Admin user already exists')
  }

  // 2. Services
  const services = [
    { title: 'RCC Work Contractor', slug: 'rcc-work-contractor', icon: 'Building2', order: 1, featured: true, shortDescription: 'Professional RCC (Reinforced Cement Concrete) construction for all structural needs.', description: 'We provide expert RCC construction services for residential and commercial structures. Our team has extensive experience in reinforced concrete work ensuring strength, durability, and compliance with all structural standards.', benefits: ['Experienced RCC specialists', 'High-grade materials', 'Structural integrity assured', 'Timely completion', 'Competitive pricing', 'Safety compliant'], process: [{ step: 1, title: 'Site Assessment', description: 'Detailed site inspection and requirement analysis.' }, { step: 2, title: 'Structural Planning', description: 'Expert structural design and planning.' }, { step: 3, title: 'Material Procurement', description: 'Sourcing high-quality concrete and steel.' }, { step: 4, title: 'Construction', description: 'Professional RCC work execution.' }] },
    { title: 'Civil Construction Work', slug: 'civil-construction-work', icon: 'HardHat', order: 2, shortDescription: 'Complete civil construction services for residential and commercial projects.', description: 'Our civil construction services cover all aspects of building construction from foundation to finishing.', benefits: ['End-to-end civil solutions', 'Experienced workforce', 'Quality materials', 'On-time delivery'] },
    { title: 'Slab Casting Work', slug: 'slab-casting-work', icon: 'Layers', order: 3, shortDescription: 'Expert slab casting with precision engineering and quality materials.', description: 'Professional concrete slab casting for floors, roofs, and structural platforms using M25 grade concrete.', benefits: ['Precision slab levels', 'M25+ grade concrete', 'Expert shuttering', 'Waterproofing options'] },
    { title: 'Column & Beam Work', slug: 'column-beam-work', icon: 'Columns', order: 4, shortDescription: 'Structural column and beam work with superior reinforcement techniques.', description: 'We specialize in structural column and beam construction with high-tensile steel reinforcement.', benefits: ['High-strength reinforcement', 'Structural integrity', 'Experienced team', 'Quality TMT steel'] },
    { title: 'Shuttering Work', slug: 'shuttering-work', icon: 'Grid3x3', order: 5, shortDescription: 'Professional shuttering services ensuring perfect concrete forms and finishes.', description: 'Expert shuttering and formwork solutions for all RCC construction requirements.', benefits: ['Precision formwork', 'Clean concrete finish', 'Safe methods', 'Fast removal'] },
    { title: 'Mason Work', slug: 'mason-work', icon: 'Hammer', order: 6, shortDescription: 'Skilled masonry services for walls, flooring, and finishing work.', description: 'Professional masonry services including brickwork, plastering, tiling, and finishing.', benefits: ['Skilled masons', 'Quality finish', 'Durable construction', 'Clean execution'] },
    { title: 'Labour Contract Services', slug: 'labour-contract-services', icon: 'Users', order: 7, shortDescription: 'Reliable and skilled labour contract solutions for all project scales.', description: 'We provide skilled and unskilled labour contract services for construction projects of all sizes.', benefits: ['Verified workforce', 'Safety trained', 'Disciplined team', 'Flexible contracts'] },
    { title: 'Residential Construction', slug: 'residential-construction', icon: 'Home', order: 8, shortDescription: 'Quality residential construction — homes built with care and precision.', description: 'Complete residential construction from foundation to finishing for villas, apartments and individual homes.', benefits: ['Premium finish', 'Vastu compliant options', 'Quality materials', 'Transparent pricing'] },
    { title: 'Commercial Construction', slug: 'commercial-construction', icon: 'Building', order: 9, shortDescription: 'Large-scale commercial projects executed with professional standards.', description: 'Expert commercial construction for offices, shops, warehouses, and industrial buildings.', benefits: ['Large project expertise', 'Load-bearing structures', 'Fire safety compliance', 'Quality finish'] },
    { title: 'Renovation Work', slug: 'renovation-work', icon: 'Wrench', order: 10, shortDescription: 'Complete renovation services to transform and upgrade existing structures.', description: 'We handle complete renovation projects including structural upgrades, remodelling, and modernization.', benefits: ['Minimal disruption', 'Structural assessment', 'Design improvements', 'Cost effective'] },
    { title: 'Structural RCC Solutions', slug: 'structural-rcc-solutions', icon: 'Anchor', order: 11, shortDescription: 'Advanced structural RCC solutions engineered for longevity and strength.', description: 'Comprehensive structural RCC solutions for complex construction challenges requiring engineering expertise.', benefits: ['Engineering expertise', 'Long-term durability', 'Load calculations', 'Certified solutions'] },
  ]

  let serviceCount = 0
  for (const svc of services) {
    const exists = await Service.findOne({ slug: svc.slug })
    if (!exists) { await Service.create({ ...svc, isActive: true }); serviceCount++ }
  }
  console.log(`🔧 ${serviceCount} services seeded (${services.length - serviceCount} already existed)`)

  // 3. Reviews
  const reviews = [
    { clientName: 'Rajesh Sharma', clientCompany: 'Property Developer, Virar', review: 'RCR Enterprises did exceptional RCC work on my 5-floor building. The quality of slab casting and column work was top-notch. Delivered on time and within budget. Highly recommended!', rating: 5, projectName: 'Residential Building, Virar East', featured: true },
    { clientName: 'Priya Mehta', clientCompany: 'Business Owner, Vasai', review: 'Hired RCR for shuttering and concrete work for our commercial complex. The team was professional, skilled, and very cooperative. Excellent workmanship and clean site management.', rating: 5, projectName: 'Commercial Complex, Vasai', featured: true },
    { clientName: 'Mohammed Shaikh', clientCompany: 'Civil Contractor', review: 'Outstanding labour contract service. Workers were disciplined, experienced, and followed all safety norms. Momin bhai manages the team very efficiently. Will definitely hire again.', rating: 5, projectName: 'Apartment Project, Nalasopara', featured: true },
    { clientName: 'Sunita Patil', clientCompany: 'Homeowner, Palghar', review: 'Got our home RCC work done by RCR Enterprises. Precision in column and beam work was remarkable. They use quality materials and deliver excellent results on time.', rating: 5, projectName: 'Residential Home, Palghar', featured: false },
    { clientName: 'Anil Desai', clientCompany: 'Builder, Nalasopara', review: 'Professional team with great expertise in RCC construction. Timely completion, clean site management, transparent pricing. One of the best contractors in the Virar region.', rating: 5, featured: false },
  ]

  let reviewCount = 0
  for (const rv of reviews) {
    const exists = await Review.findOne({ clientName: rv.clientName })
    if (!exists) { await Review.create({ ...rv, isActive: true }); reviewCount++ }
  }
  console.log(`⭐ ${reviewCount} reviews seeded`)

  // 4. Website Settings
  const existingSettings = await Settings.findOne()
  if (!existingSettings) {
    await Settings.create({
      logoText: 'RCR ENTERPRISES', tagline: 'Quality Work With Commitment', companyName: 'RCR ENTERPRISES',
      phone: '9619439243', email: 'rcrenterprises786@gmail.com',
      address: 'Office No. 04, Raipada, Near Anand Gaushalla, Chandansar Road, Virar East – 401305, District Palghar, Maharashtra',
      socialLinks: { whatsapp: 'https://wa.me/919619439243' },
      seo: { metaTitle: 'RCR ENTERPRISES - Professional RCC Work Contractor in Virar East', metaDescription: 'Trusted RCC Work Contractor in Virar East, Maharashtra. Expert civil construction, slab work, shuttering, and more.', metaKeywords: 'RCC contractor, civil construction, Virar, Maharashtra, slab work, shuttering work, RCR Enterprises' },
      hero: { heading: 'Professional RCC Construction Services You Can Trust', subheading: 'Delivering Strong, Safe & Durable RCC Construction Solutions with Quality and Commitment.' },
      stats: [{ label: 'Projects Completed', value: '150', suffix: '+' }, { label: 'Happy Clients', value: '120', suffix: '+' }, { label: 'Skilled Workforce', value: '50', suffix: '+' }, { label: 'Years of Experience', value: '10', suffix: '+' }],
    })
    console.log('⚙️  Website settings created')
  } else {
    console.log('⚙️  Website settings already exist')
  }

  console.log('\n✅ Seed completed successfully!')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('🔐 Admin Login:')
  console.log('   URL:      http://localhost:3000/admin/login')
  console.log('   Email:    admin@rcrenterprises.com')
  console.log('   Password: Admin@123')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

  await mongoose.disconnect()
  process.exit(0)
}

seed().catch(e => { console.error('❌ Seed failed:', e); process.exit(1) })
