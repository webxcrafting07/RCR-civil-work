import { NavItem } from '@/types'

export const COMPANY_INFO = {
  name: 'RCR ENTERPRISES',
  tagline: 'Quality Work With Commitment',
  type: 'RCC Work Contractor',
  proprietor: 'Momin Noor Alam Shaikh',
  phone: '9619439243',
  email: 'rcrenterprises786@gmail.com',
  address: {
    line1: 'Office No. 04, Raipada, Near Anand Gaushalla',
    line2: 'Chandansar Road, Virar East',
    city: 'Virar East',
    state: 'Maharashtra',
    pincode: '401305',
    district: 'Palghar',
    full: 'Office No. 04, Raipada, Near Anand Gaushalla, Chandansar Road, Virar East, Maharashtra 401305',
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
    description: 'RCR ENTERPRISES specializes in high-quality Reinforced Cement Concrete (RCC) work for residential, commercial, and industrial projects. Our expert team ensures precise structural framing, guaranteeing maximum durability, load-bearing capacity, and compliance with all engineering standards. We utilize the finest quality cement, TMT steel bars, and advanced casting techniques to build structures that last for generations.',
    benefits: [
      'Exceptional structural strength and stability',
      'Use of premium grade TMT steel and cement',
      'Strict adherence to architectural blueprints',
      'Experienced engineers and skilled labor force',
      'Timely execution with rigorous quality checks',
      'Cost-effective solutions without compromising safety'
    ],
    process: [
      { step: 1, title: 'Site Inspection & Planning', description: 'Thorough analysis of the site, soil conditions, and structural drawings.' },
      { step: 2, title: 'Material Procurement', description: 'Sourcing high-grade steel, cement, and aggregates from trusted suppliers.' },
      { step: 3, title: 'Steel Binding & Shuttering', description: 'Precise cutting, bending, and binding of steel followed by rigid formwork.' },
      { step: 4, title: 'Concrete Pouring (Casting)', description: 'Mechanized mixing and continuous pouring of concrete to avoid cold joints.' },
      { step: 5, title: 'Curing & De-shuttering', description: 'Optimal water curing for maximum strength and careful removal of formwork.' },
      { step: 6, title: 'Quality Auditing', description: 'Final structural integrity checks and load-bearing assessments.' }
    ],
    faqs: [
      { question: 'What materials do you use for RCC work?', answer: 'We use high-grade TMT steel bars (Fe500/Fe550) and premium cement brands as per structural engineer recommendations.' },
      { question: 'How long does the curing process take?', answer: 'We typically recommend and implement a strict curing period of 14 to 21 days depending on the structural component and weather conditions.' },
      { question: 'Do you handle commercial RCC projects?', answer: 'Yes, we have extensive experience in executing RCC work for both residential buildings and large commercial complexes.' }
    ]
  },
  {
    id: 'civil-construction',
    title: 'Civil Construction Work',
    icon: 'HardHat',
    image: '/images/hero_construction_bg.png',
    shortDescription: 'End-to-end civil engineering and turnkey construction solutions for premium residential and commercial developments.',
    slug: 'civil-construction-work',
    description: 'From laying the foundation to the final finishing touches, our Civil Construction services cover the entire lifecycle of your building project. We provide turnkey solutions that integrate modern engineering practices with unmatched craftsmanship. Whether it is a new build, an extension, or a massive commercial development, RCR Enterprises is your trusted partner for flawless execution.',
    benefits: [
      'End-to-end turnkey construction solutions',
      'Dedicated project management and supervision',
      'Compliance with local building codes and safety regulations',
      'Transparent pricing and detailed milestone planning',
      'Integration of modern construction technologies',
      'Seamless coordination between various trades (plumbing, electrical, etc.)'
    ],
    process: [
      { step: 1, title: 'Consultation & Design Review', description: 'Understanding client requirements and reviewing architectural plans.' },
      { step: 2, title: 'Earthwork & Foundation', description: 'Excavation, leveling, and laying a robust foundation.' },
      { step: 3, title: 'Superstructure Construction', description: 'Erecting columns, beams, walls, and slabs.' },
      { step: 4, title: 'MEP Integration', description: 'Mechanical, Electrical, and Plumbing rough-ins.' },
      { step: 5, title: 'Finishing Works', description: 'Plastering, flooring, painting, and interior finishing.' },
      { step: 6, title: 'Final Handover', description: 'Comprehensive site cleanup and project handover to the client.' }
    ],
    faqs: [
      { question: 'Do you provide turnkey construction?', answer: 'Yes, we offer complete turnkey solutions, managing everything from excavation to final finishing and handover.' },
      { question: 'How do you ensure project timelines are met?', answer: 'We use advanced project management techniques and maintain a dedicated, skilled workforce to ensure milestones are achieved on schedule.' },
      { question: 'Are your construction practices safe?', answer: 'Absolutely. We adhere to strict safety protocols and industry standards to ensure a safe working environment and a secure final structure.' }
    ]
  },
  {
    id: 'slab-casting',
    title: 'Slab Casting Work',
    icon: 'Layers',
    image: '/images/slab_casting_work.png',
    shortDescription: 'Flawless concrete slab pouring and casting utilizing advanced laser-leveling and high-tensile reinforcement.',
    slug: 'slab-casting-work',
    description: 'Slab casting is a critical component of any multi-story structure. RCR Enterprises provides expert slab casting services, ensuring perfectly leveled, leak-proof, and highly durable concrete floors and roofs. We utilize advanced shuttering techniques, precise steel reinforcement binding, and mechanical vibrators to eliminate air voids, resulting in a solid, monolithic concrete slab.',
    benefits: [
      'Perfectly leveled and smooth concrete surfaces',
      'Prevention of honeycombing and air voids',
      'Enhanced load-bearing capacity for floors and roofs',
      'Use of mechanical vibrators for dense concrete compaction',
      'Expert waterproofing measures during casting',
      'Efficient continuous pouring to avoid weak joints'
    ],
    process: [
      { step: 1, title: 'Formwork (Shuttering) Setup', description: 'Installing rigid and perfectly aligned staging and formwork.' },
      { step: 2, title: 'Steel Reinforcement', description: 'Laying out and binding the TMT steel mesh as per design.' },
      { step: 3, title: 'Electrical & Plumbing Layout', conduit: true, description: 'Placing conduits and pipes before pouring concrete.' },
      { step: 4, title: 'Concrete Pouring', description: 'Continuous pouring of ready-mix or on-site mixed concrete.' },
      { step: 5, title: 'Compaction & Leveling', description: 'Using vibrators to remove air gaps and laser tools for leveling.' },
      { step: 6, title: 'Curing', description: 'Ponding water on the slab for optimal strength development.' }
    ],
    faqs: [
      { question: 'How do you prevent cracks in the slab?', answer: 'We ensure proper steel reinforcement spacing, optimal water-cement ratio, mechanical compaction, and rigorous water curing for at least 14 days.' },
      { question: 'Do you handle the electrical conduit laying within the slab?', answer: 'Yes, we coordinate seamlessly with electricians to lay out all necessary conduits securely before the concrete is poured.' },
      { question: 'What type of concrete is used?', answer: 'Depending on the structural requirement, we use high-grade concrete (M20, M25, or higher) mixed on-site or sourced from reputed RMC plants.' }
    ]
  },
  {
    id: 'column-beam',
    title: 'Column & Beam Work',
    icon: 'Columns',
    image: '/images/slab_casting_work.png',
    shortDescription: 'Architecturally robust structural framing, columns, and beams designed to withstand extreme environmental stress.',
    slug: 'column-beam-work',
    description: 'Columns and beams are the primary load-carrying elements of any building. We specialize in precision casting of columns and beams that form a robust structural grid. Our team pays meticulous attention to vertical alignment (plumb), steel reinforcement detailing, and concrete cover to ensure maximum structural integrity and earthquake resistance.',
    benefits: [
      'High earthquake resistance through proper detailing',
      'Perfect vertical alignment and plumb accuracy',
      'Adequate concrete cover to prevent steel corrosion',
      'Custom formwork for varying column shapes and sizes',
      'Rapid strength gain using optimized concrete mixes',
      'Rigorous quality checks before, during, and after casting'
    ],
    process: [
      { step: 1, title: 'Marking & Layout', description: 'Accurate transferring of structural grid lines to the site.' },
      { step: 2, title: 'Starter Concrete', description: 'Casting a small base (starter) to align the formwork perfectly.' },
      { step: 3, title: 'Steel Cage Erection', description: 'Tying vertical bars and stirrups strictly as per structural drawings.' },
      { step: 4, title: 'Formwork Installation', description: 'Erecting vertical shuttering and securing it with robust supports.' },
      { step: 5, title: 'Pouring & Compaction', description: 'Pouring concrete in layers and vibrating to ensure density.' },
      { step: 6, title: 'De-shuttering & Curing', description: 'Removing forms safely and wrapping columns in wet hessian cloth for curing.' }
    ],
    faqs: [
      { question: 'How do you ensure columns are perfectly straight?', answer: 'We use traditional plumb bobs combined with modern laser alignment tools to ensure 100% vertical accuracy before and during the pour.' },
      { question: 'What is the importance of concrete cover in columns?', answer: 'The cover protects the internal steel from moisture and fire. We use standardized cover blocks to ensure the exact specified gap is maintained.' }
    ]
  },
  {
    id: 'shuttering',
    title: 'Shuttering Work',
    icon: 'Grid3x3',
    image: '/images/rcc_steel_work.png',
    shortDescription: 'Precision formwork and shuttering systems guaranteeing perfect geometric alignment and superior concrete finishes.',
    slug: 'shuttering-work',
    description: 'High-quality concrete finishes start with exceptional formwork. RCR Enterprises provides expert shuttering and centering services using premium plywood, steel plates, and adjustable props. Our robust shuttering systems prevent slurry leakage, withstand high concrete pressure, and ensure that the final cast structure perfectly matches the architectural dimensions.',
    benefits: [
      'Smooth and fair-faced concrete finishes requiring less plaster',
      'Zero slurry leakage ensuring maximum concrete strength',
      'High load-bearing staging systems for safety',
      'Custom formwork solutions for complex architectural shapes',
      'Rapid erection and dismantling to save project time',
      'Use of high-grade shuttering oil for clean de-shuttering'
    ],
    process: [
      { step: 1, title: 'Design & Planning', description: 'Calculating loads and planning the formwork layout.' },
      { step: 2, title: 'Staging & Propping', description: 'Erecting the vertical supports (props/scaffolding) securely.' },
      { step: 3, title: 'Decking/Panel Installation', description: 'Laying out the plywood or steel panels to form the mold.' },
      { step: 4, title: 'Alignment & Leveling', description: 'Checking dimensions, levels, and plumb accuracy.' },
      { step: 5, title: 'Sealing', description: 'Sealing all joints with tape or foam to prevent water/slurry leakage.' },
      { step: 6, title: 'Safe De-shuttering', description: 'Careful removal of formwork once concrete achieves desired strength.' }
    ],
    faqs: [
      { question: 'Do you use wooden or steel shuttering?', answer: 'We use both, depending on the project requirements. We utilize high-density film-faced plywood for smooth finishes and steel plates for robust, repetitive structures.' },
      { question: 'How do you prevent concrete from sticking to the forms?', answer: 'We apply premium quality, non-staining shuttering oil to all contact surfaces before pouring.' }
    ]
  },
  {
    id: 'mason-work',
    title: 'Mason Work',
    icon: 'Hammer',
    image: '/images/masonry_brick_work.png',
    shortDescription: 'Master craftsmanship in brickwork, blockwork, and structural masonry for impeccable interior and exterior walls.',
    slug: 'mason-work',
    description: 'Our masonry services form the defining walls of your structure. We offer expert brickwork, AAC blockwork, and solid concrete block masonry. With a focus on perfect alignment, proper mortar mixing, and clean joints, our masons build walls that are not only structurally sound but also provide excellent thermal and acoustic insulation.',
    benefits: [
      'Perfectly aligned and plumb walls',
      'Optimal mortar ratios for maximum bonding strength',
      'Expertise in red bricks, fly-ash bricks, and AAC blocks',
      'Clean finishing reducing the need for excessively thick plaster',
      'Proper integration of lintels and sill bands',
      'Efficient execution by highly experienced masons'
    ],
    process: [
      { step: 1, title: 'Surface Preparation', description: 'Cleaning and wetting the base surface for proper bonding.' },
      { step: 2, title: 'Mortar Mixing', description: 'Preparing the cement-sand mortar in the exact specified ratio.' },
      { step: 3, title: 'Block/Brick Laying', description: 'Laying the courses with perfect level and plumb checks.' },
      { step: 4, title: 'Joint Tooling', description: 'Raking and finishing the mortar joints.' },
      { step: 5, title: 'Lintel Casting', description: 'Casting concrete lintels over doors and windows.' },
      { step: 6, title: 'Curing', description: 'Regular water curing of the masonry walls to strengthen the mortar.' }
    ],
    faqs: [
      { question: 'Which is better, red bricks or AAC blocks?', answer: 'AAC blocks are lightweight, offer better thermal insulation, and speed up construction. Red bricks offer traditional strength. We recommend based on your specific structural design.' },
      { question: 'Do you provide plastering services as well?', answer: 'Yes, our masonry services include both internal smooth plastering and external sand-faced/waterproof plastering.' }
    ]
  },
  {
    id: 'labour-contract',
    title: 'Labour Contract Services',
    icon: 'Users',
    image: '/images/rcc_steel_work.png',
    shortDescription: 'Deployment of highly skilled, vetted, and safety-trained construction workforce for large-scale enterprise projects.',
    slug: 'labour-contract-services',
    description: 'Finding reliable and skilled labor is one of the biggest challenges in construction. RCR Enterprises provides comprehensive labour contract services. We supply vetted, experienced, and safety-trained masons, carpenters, steel fixers, and general laborers. We handle the workforce management, allowing you to focus on project execution.',
    benefits: [
      'Access to a large pool of skilled and unskilled labor',
      'Zero hassle of daily wage management and workforce sourcing',
      'Strict adherence to on-site safety and discipline',
      'Flexible workforce scaling based on project demands',
      'Experienced supervisors to monitor productivity',
      'Compliance with labor laws and regulations'
    ],
    process: [
      { step: 1, title: 'Requirement Analysis', description: 'Understanding your specific skill and headcount needs.' },
      { step: 2, title: 'Workforce Selection', description: 'Deploying vetted and experienced workers suited for the task.' },
      { step: 3, title: 'Site Induction', description: 'Briefing the workforce on site-specific safety and rules.' },
      { step: 4, title: 'Daily Management', description: 'Our supervisors manage attendance, discipline, and task allocation.' },
      { step: 5, title: 'Performance Monitoring', description: 'Ensuring optimal productivity and quality of work.' },
      { step: 6, title: 'Scaling', description: 'Adding or reducing labor based on the project phase.' }
    ],
    faqs: [
      { question: 'Can you provide labor for specialized tasks like steel binding?', answer: 'Yes, we provide specialized gangs for steel binding (bar benders), shuttering carpenters, and skilled masons.' },
      { question: 'Who manages the labor on site?', answer: 'We provide experienced supervisors or Mukadams who directly manage the workforce and coordinate with your site engineers.' }
    ]
  },
  {
    id: 'residential-construction',
    title: 'Residential Construction',
    icon: 'Home',
    image: '/images/residential_villa.png',
    shortDescription: 'Bespoke luxury home construction blending modern architectural aesthetics with unyielding structural foundations.',
    slug: 'residential-construction',
    description: 'Building a home is a deeply personal journey. RCR Enterprises specializes in residential construction, creating bespoke independent houses, luxury villas, and multi-story apartments. We combine modern architectural aesthetics with unyielding structural foundations, ensuring your dream home is not only beautiful but built to last a lifetime.',
    benefits: [
      'Customized construction tailored to your lifestyle',
      'High-quality finishing and attention to detail',
      'Transparent pricing with no hidden costs',
      'Assistance with material selection and sourcing',
      'Vastu-compliant construction (if required)',
      'Dedicated point of contact throughout the project'
    ],
    process: [
      { step: 1, title: 'Requirement Gathering', description: 'Understanding your vision, budget, and timeline.' },
      { step: 2, title: 'Design & Approvals', description: 'Collaborating with architects and assisting with necessary permits.' },
      { step: 3, title: 'Core Construction', description: 'Executing the foundation, RCC framework, and masonry.' },
      { step: 4, title: 'MEP & Interiors', description: 'Installing plumbing, electricals, and customized interior elements.' },
      { step: 5, title: 'Finishing Touches', description: 'Painting, flooring, landscaping, and final detailing.' },
      { step: 6, title: 'Key Handover', description: 'Final walkthrough and handing over the keys to your new home.' }
    ],
    faqs: [
      { question: 'Do you help with architectural design?', answer: 'We have partnered with leading architects and can provide end-to-end design and build services, or we can work with your existing architectural plans.' },
      { question: 'Can I visit the site during construction?', answer: 'Absolutely. We encourage regular site visits and maintain complete transparency throughout the building process.' }
    ]
  },
  {
    id: 'commercial-construction',
    title: 'Commercial Construction',
    icon: 'Building',
    image: '/images/commercial_building.png',
    shortDescription: 'Executing massive commercial complexes, corporate offices, and retail spaces with strict adherence to timelines.',
    slug: 'commercial-construction',
    description: 'Commercial construction requires a different scale of expertise, speed, and precision. We construct corporate offices, retail spaces, warehouses, and industrial sheds. Understanding that time is money in business, our commercial construction services are heavily focused on rapid execution, strict deadline adherence, and building highly functional, durable spaces.',
    benefits: [
      'Rapid execution to ensure quick business operational readiness',
      'Expertise in heavy-duty structural requirements',
      'Integration of complex commercial MEP systems',
      'Strict adherence to commercial building and fire safety codes',
      'Scalable workforce to handle massive project footprints',
      'Professional project management and milestone tracking'
    ],
    process: [
      { step: 1, title: 'Project Planning', description: 'Detailed timeline creation and resource allocation.' },
      { step: 2, title: 'Site Preparation', description: 'Large-scale excavation and heavy equipment deployment.' },
      { step: 3, title: 'Structural Erection', description: 'Rapid RCC or steel framework construction.' },
      { step: 4, title: 'Commercial Utilities', description: 'Installing heavy-duty electrical, HVAC, and plumbing systems.' },
      { step: 5, title: 'Exterior & Interior Finish', description: 'Façade installation and commercial interior build-outs.' },
      { step: 6, title: 'Commissioning', description: 'Testing all systems and final project handover.' }
    ],
    faqs: [
      { question: 'Can you handle industrial warehouse construction?', answer: 'Yes, we specialize in high-clearance warehouses, factory sheds, and heavy load-bearing industrial floors.' },
      { question: 'How do you handle safety on large commercial sites?', answer: 'We implement rigorous safety protocols, including mandatory PPE, daily safety briefings, and dedicated site safety officers.' }
    ]
  },
  {
    id: 'renovation',
    title: 'Renovation Work',
    icon: 'Wrench',
    image: '/images/masonry_brick_work.png',
    shortDescription: 'Comprehensive structural retrofitting, strengthening, and premium renovation of aging architectural assets.',
    slug: 'renovation-work',
    description: 'Breathe new life into aging structures with our comprehensive renovation and retrofitting services. Whether you are upgrading an old residential property, expanding a commercial space, or performing structural repairs on a weakened building, RCR Enterprises brings the technical expertise required to safely modify and modernize existing structures.',
    benefits: [
      'Safe and calculated structural modifications',
      'Expertise in concrete repair and retrofitting (jacketing, micro-concreting)',
      'Modernization of outdated electrical and plumbing systems',
      'Minimal disruption to surrounding occupied areas',
      'Premium interior and exterior aesthetic upgrades',
      'Value addition to your existing property'
    ],
    process: [
      { step: 1, title: 'Structural Assessment', description: 'Evaluating the condition and load-bearing capacity of the existing structure.' },
      { step: 2, title: 'Demolition & Dismantling', description: 'Safe and controlled removal of unwanted walls and finishes.' },
      { step: 3, title: 'Structural Repair/Upgrades', description: 'Executing concrete repairs, waterproofing, and structural strengthening.' },
      { step: 4, title: 'System Upgrades', description: 'Laying new plumbing lines and upgrading electrical panels.' },
      { step: 5, title: 'Rebuilding & Finishing', description: 'Executing new masonry, plastering, flooring, and painting.' },
      { step: 6, title: 'Final Cleanup', description: 'Deep cleaning and handing over the modernized space.' }
    ],
    faqs: [
      { question: 'Can you remove load-bearing walls during renovation?', answer: 'Yes, but it requires careful structural assessment. We safely install heavy steel or RCC beams to redistribute the load before removing any critical walls.' },
      { question: 'Do you provide waterproofing services for old buildings?', answer: 'Absolutely. We offer advanced chemical waterproofing, crack injection, and terrace waterproofing as part of our renovation services.' }
    ]
  },
  {
    id: 'structural-rcc',
    title: 'Structural RCC Solutions',
    icon: 'Anchor',
    image: '/images/rcc_steel_work.png',
    shortDescription: 'Advanced structural auditing, core cutting, and customized concrete solutions for complex engineering challenges.',
    slug: 'structural-rcc-solutions',
    description: 'For complex engineering challenges, standard practices are not enough. We offer specialized Structural RCC Solutions including core cutting, chemical anchoring, micro-concreting, and structural retrofitting. Using state-of-the-art equipment and specialized construction chemicals, we resolve intricate structural issues safely and efficiently.',
    benefits: [
      'Precision core cutting without damaging existing reinforcements',
      'High-strength chemical anchoring for extending structures',
      'Advanced retrofitting techniques to increase load capacity',
      'Use of premium construction chemicals from leading brands',
      'Dust-free and vibration-controlled cutting operations',
      'Expert consultation for complex structural defects'
    ],
    process: [
      { step: 1, title: 'Technical Evaluation', description: 'Detailed study of the structural problem using NDT (Non-Destructive Testing) if required.' },
      { step: 2, title: 'Solution Designing', description: 'Proposing specialized interventions like polymer mortars or carbon fiber wrapping.' },
      { step: 3, title: 'Preparation', description: 'Cleaning, exposing reinforcement, or setting up core cutting rigs.' },
      { step: 4, title: 'Execution', description: 'Precise application of the engineered solution by trained technicians.' },
      { step: 5, title: 'Curing & Bonding', description: 'Allowing specialized chemicals and epoxies to achieve full bond strength.' },
      { step: 6, title: 'Testing', description: 'Verifying the integrity and success of the structural intervention.' }
    ],
    faqs: [
      { question: 'What is chemical anchoring?', answer: 'It is a technique where high-strength epoxy resin is used to anchor new steel rebars into existing hardened concrete, allowing for secure structural extensions.' },
      { question: 'Is core cutting safe for the building?', answer: 'Yes, when done professionally. We scan for hidden reinforcements and cut precisely using diamond-tipped drills, minimizing vibration and structural stress.' }
    ]
  }
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
  { label: 'Locations', href: '/locations' },
  { label: 'Projects', href: '/projects' },
  { label: 'Clients', href: '/clients' },
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
