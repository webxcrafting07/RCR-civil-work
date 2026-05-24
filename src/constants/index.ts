import { NavItem } from '@/types'

export const COMPANY_INFO = {
  name: 'RCR ENTERPRISES',
  tagline: 'Quality Work With Commitment',
  type: 'RCC Work Contractor',
  proprietor: 'Momin Noor Alam Shaikh',
  phone: '9619439243',
  email: 'rcrenterprises786@gmail.com',
  address: {
    line1: 'FV95+H9M, Raipada',
    line2: 'Khairpada',
    city: 'Vasai-Virar',
    state: 'Maharashtra',
    pincode: '401303',
    district: 'Palghar',
    full: 'FV95+H9M, Raipada, Khairpada, Vasai-Virar, Maharashtra 401303',
  },
  registration: {
    udyogAadhaar: 'MH33A0170011',
    gumastaNo: '108000061903',
    gstNo: '27CIMPR8276H1ZF',
    enterpriseType: 'Micro Enterprise',
  },
  social: {
    whatsapp: 'https://wa.me/919619439243',
  },
} as const

export const SERVICES_LIST = [
  {
    id: 'rcc-work-contractor',
    title: 'RCC Work Contractor',
    icon: 'Building2',
    image: '/images/rcc_steel_work.png',
    shortDescription: 'Industrial-grade Reinforced Cement Concrete (RCC) structures engineered for maximum durability and load-bearing capacity.',
    slug: 'rcc-work-contractor',
  },
  {
    id: 'civil-construction',
    title: 'Civil Construction Work',
    icon: 'HardHat',
    image: '/images/hero_construction_bg.png',
    shortDescription: 'End-to-end civil engineering and turnkey construction solutions for premium residential and commercial developments.',
    slug: 'civil-construction-work',
  },
  {
    id: 'slab-casting',
    title: 'Slab Casting Work',
    icon: 'Layers',
    image: '/images/slab_casting_work.png',
    shortDescription: 'Flawless concrete slab pouring and casting utilizing advanced laser-leveling and high-tensile reinforcement.',
    slug: 'slab-casting-work',
  },
  {
    id: 'column-beam',
    title: 'Column & Beam Work',
    icon: 'Columns',
    image: '/images/slab_casting_work.png',
    shortDescription: 'Architecturally robust structural framing, columns, and beams designed to withstand extreme environmental stress.',
    slug: 'column-beam-work',
  },
  {
    id: 'shuttering',
    title: 'Shuttering Work',
    icon: 'Grid3x3',
    image: '/images/rcc_steel_work.png',
    shortDescription: 'Precision formwork and shuttering systems guaranteeing perfect geometric alignment and superior concrete finishes.',
    slug: 'shuttering-work',
  },
  {
    id: 'mason-work',
    title: 'Mason Work',
    icon: 'Hammer',
    image: '/images/masonry_brick_work.png',
    shortDescription: 'Master craftsmanship in brickwork, blockwork, and structural masonry for impeccable interior and exterior walls.',
    slug: 'mason-work',
  },
  {
    id: 'labour-contract',
    title: 'Labour Contract Services',
    icon: 'Users',
    image: '/images/rcc_steel_work.png',
    shortDescription: 'Deployment of highly skilled, vetted, and safety-trained construction workforce for large-scale enterprise projects.',
    slug: 'labour-contract-services',
  },
  {
    id: 'residential-construction',
    title: 'Residential Construction',
    icon: 'Home',
    image: '/images/residential_villa.png',
    shortDescription: 'Bespoke luxury home construction blending modern architectural aesthetics with unyielding structural foundations.',
    slug: 'residential-construction',
  },
  {
    id: 'commercial-construction',
    title: 'Commercial Construction',
    icon: 'Building',
    image: '/images/commercial_building.png',
    shortDescription: 'Executing massive commercial complexes, corporate offices, and retail spaces with strict adherence to timelines.',
    slug: 'commercial-construction',
  },
  {
    id: 'renovation',
    title: 'Renovation Work',
    icon: 'Wrench',
    image: '/images/masonry_brick_work.png',
    shortDescription: 'Comprehensive structural retrofitting, strengthening, and premium renovation of aging architectural assets.',
    slug: 'renovation-work',
  },
  {
    id: 'structural-rcc',
    title: 'Structural RCC Solutions',
    icon: 'Anchor',
    image: '/images/rcc_steel_work.png',
    shortDescription: 'Advanced structural auditing, core cutting, and customized concrete solutions for complex engineering challenges.',
    slug: 'structural-rcc-solutions',
  },
]

export const STATS = [
  { label: 'Projects Completed', value: '150', suffix: '+' },
  { label: 'Happy Clients', value: '120', suffix: '+' },
  { label: 'Skilled Workforce', value: '50', suffix: '+' },
  { label: 'Years of Experience', value: '10', suffix: '+' },
]

export const WHY_CHOOSE_US = [
  {
    icon: 'Award',
    title: 'Skilled & Experienced Workforce',
    description: 'Our team comprises highly trained and experienced construction professionals.',
  },
  {
    icon: 'Shield',
    title: 'Quality Construction Standards',
    description: 'We maintain the highest quality standards in all our construction projects.',
  },
  {
    icon: 'Clock',
    title: 'Timely Project Completion',
    description: 'We are committed to delivering every project on time without compromising quality.',
  },
  {
    icon: 'ClipboardCheck',
    title: 'Professional Site Management',
    description: 'Expert site management ensures smooth operations and safety compliance.',
  },
  {
    icon: 'IndianRupee',
    title: 'Affordable & Competitive Pricing',
    description: 'Premium quality construction services at competitive and transparent pricing.',
  },
  {
    icon: 'Handshake',
    title: 'Reliable Labour Support',
    description: 'Dependable and skilled labour support available for projects of all scales.',
  },
  {
    icon: 'HeartHandshake',
    title: 'Customer Satisfaction Focused',
    description: 'Client satisfaction is our top priority — we go the extra mile every time.',
  },
]

export const WORK_PROCESS = [
  {
    step: 1,
    title: 'Consultation',
    description: 'Free consultation to understand your requirements and project vision.',
    icon: 'MessageSquare',
    image: '/images/hero_construction_bg.png',
  },
  {
    step: 2,
    title: 'Planning',
    description: 'Detailed project planning with timeline, budget estimation, and approvals.',
    icon: 'ClipboardList',
    image: '/images/masonry_brick_work.png',
  },
  {
    step: 3,
    title: 'Material Preparation',
    description: 'Procurement of high-quality construction materials and site preparation.',
    icon: 'Package',
    image: '/images/commercial_building.png',
  },
  {
    step: 4,
    title: 'RCC Construction',
    description: 'Professional RCC construction with expert workforce and quality control.',
    icon: 'HardHat',
    image: '/images/rcc_steel_work.png',
  },
  {
    step: 5,
    title: 'Finishing',
    description: 'Superior finishing work and final quality inspection of the structure.',
    icon: 'Star',
    image: '/images/residential_villa.png',
  },
  {
    step: 6,
    title: 'Delivery',
    description: 'Timely project delivery with complete documentation and client walkthrough.',
    icon: 'CheckCircle',
    image: '/images/slab_casting_work.png',
  },
]

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Contact', href: '/contact' },
]

export const SERVICES_LIST_FOR_CONTACT = [
  'RCC Work Contractor',
  'Civil Construction Work',
  'Slab Casting Work',
  'Column & Beam Work',
  'Shuttering Work',
  'Mason Work',
  'Labour Contract Services',
  'Residential Construction',
  'Commercial Construction',
  'Renovation Work',
  'Structural RCC Solutions',
  'Other',
]

export const GALLERY_CATEGORIES = [
  'All',
  'RCC Work',
  'Slab Work',
  'Column Work',
  'Residential',
  'Commercial',
  'Before & After',
]

export const PROJECT_CATEGORIES = [
  { value: 'all', label: 'All Projects' },
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'renovation', label: 'Renovation' },
]

export const PROJECT_STATUS = {
  ongoing: { label: 'Ongoing', color: 'bg-blue-500' },
  completed: { label: 'Completed', color: 'bg-green-500' },
  upcoming: { label: 'Upcoming', color: 'bg-sky-600' },
}

export const TARGET_LOCATIONS = [
  // Western Line & Suburbs
  { name: 'Mumbai', slug: 'mumbai', type: 'City' },
  { name: 'Churchgate', slug: 'churchgate', type: 'Area' },
  { name: 'Marine Lines', slug: 'marine-lines', type: 'Area' },
  { name: 'Charni Road', slug: 'charni-road', type: 'Area' },
  { name: 'Grant Road', slug: 'grant-road', type: 'Area' },
  { name: 'Mumbai Central', slug: 'mumbai-central', type: 'Area' },
  { name: 'Mahalaxmi', slug: 'mahalaxmi', type: 'Area' },
  { name: 'Lower Parel', slug: 'lower-parel', type: 'Area' },
  { name: 'Prabhadevi', slug: 'prabhadevi', type: 'Area' },
  { name: 'Dadar', slug: 'dadar', type: 'Area' },
  { name: 'Mahim', slug: 'mahim', type: 'Area' },
  { name: 'Bandra', slug: 'bandra', type: 'Area' },
  { name: 'Khar', slug: 'khar', type: 'Area' },
  { name: 'Santacruz', slug: 'santacruz', type: 'Area' },
  { name: 'Vile Parle', slug: 'vile-parle', type: 'Area' },
  { name: 'Andheri', slug: 'andheri', type: 'Area' },
  { name: 'Jogeshwari', slug: 'jogeshwari', type: 'Area' },
  { name: 'Goregaon', slug: 'goregaon', type: 'Area' },
  { name: 'Malad', slug: 'malad', type: 'Area' },
  { name: 'Kandivali', slug: 'kandivali', type: 'Area' },
  { name: 'Borivali', slug: 'borivali', type: 'Area' },
  { name: 'Dahisar', slug: 'dahisar', type: 'Area' },
  { name: 'Mira Road', slug: 'mira-road', type: 'Area' },
  { name: 'Bhayandar', slug: 'bhayandar', type: 'Area' },
  { name: 'Naigaon', slug: 'naigaon', type: 'City' },
  { name: 'Vasai', slug: 'vasai', type: 'City' },
  { name: 'Nalasopara', slug: 'nalasopara', type: 'City' },
  { name: 'Virar', slug: 'virar', type: 'City' },
  { name: 'Palghar', slug: 'palghar', type: 'District' },
  { name: 'Boisar', slug: 'boisar', type: 'City' },
  
  // Central Line & Suburbs
  { name: 'CSMT', slug: 'csmt', type: 'Area' },
  { name: 'Byculla', slug: 'byculla', type: 'Area' },
  { name: 'Parel', slug: 'parel', type: 'Area' },
  { name: 'Matunga', slug: 'matunga', type: 'Area' },
  { name: 'Sion', slug: 'sion', type: 'Area' },
  { name: 'Kurla', slug: 'kurla', type: 'Area' },
  { name: 'Vidyavihar', slug: 'vidyavihar', type: 'Area' },
  { name: 'Ghatkopar', slug: 'ghatkopar', type: 'Area' },
  { name: 'Vikhroli', slug: 'vikhroli', type: 'Area' },
  { name: 'Kanjurmarg', slug: 'kanjurmarg', type: 'Area' },
  { name: 'Bhandup', slug: 'bhandup', type: 'Area' },
  { name: 'Nahur', slug: 'nahur', type: 'Area' },
  { name: 'Mulund', slug: 'mulund', type: 'Area' },
  { name: 'Thane', slug: 'thane', type: 'City' },
  { name: 'Kalwa', slug: 'kalwa', type: 'Area' },
  { name: 'Mumbra', slug: 'mumbra', type: 'Area' },
  { name: 'Diva', slug: 'diva', type: 'Area' },
  { name: 'Dombivli', slug: 'dombivli', type: 'City' },
  { name: 'Thakurli', slug: 'thakurli', type: 'Area' },
  { name: 'Kalyan', slug: 'kalyan', type: 'City' },
  { name: 'Ulhasnagar', slug: 'ulhasnagar', type: 'City' },
  { name: 'Ambernath', slug: 'ambernath', type: 'City' },
  { name: 'Badlapur', slug: 'badlapur', type: 'City' },
  { name: 'Titwala', slug: 'titwala', type: 'City' },

  // Harbour Line & Navi Mumbai
  { name: 'Wadala', slug: 'wadala', type: 'Area' },
  { name: 'Chunabhatti', slug: 'chunabhatti', type: 'Area' },
  { name: 'Chembur', slug: 'chembur', type: 'Area' },
  { name: 'Govandi', slug: 'govandi', type: 'Area' },
  { name: 'Mankhurd', slug: 'mankhurd', type: 'Area' },
  { name: 'Navi Mumbai', slug: 'navi-mumbai', type: 'City' },
  { name: 'Vashi', slug: 'vashi', type: 'Area' },
  { name: 'Sanpada', slug: 'sanpada', type: 'Area' },
  { name: 'Juinagar', slug: 'juinagar', type: 'Area' },
  { name: 'Nerul', slug: 'nerul', type: 'Area' },
  { name: 'Seawoods', slug: 'seawoods', type: 'Area' },
  { name: 'Belapur', slug: 'belapur', type: 'Area' },
  { name: 'Kharghar', slug: 'kharghar', type: 'Area' },
  { name: 'Panvel', slug: 'panvel', type: 'City' },
  
  // Other Key Areas
  { name: 'South Mumbai', slug: 'south-mumbai', type: 'Area' },
  { name: 'Worli', slug: 'worli', type: 'Area' },
  { name: 'Powai', slug: 'powai', type: 'Area' },
]
