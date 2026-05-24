import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  coverImage: { type: String },
  author: { type: String, default: 'RCR Enterprises' },
  tags: [{ type: String }],
  seoTitle: { type: String },
  seoDescription: { type: String },
  isPublished: { type: Boolean, default: true },
  publishedAt: { type: Date, default: Date.now },
}, { timestamps: true })

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema)

const b1 = `
<h2>Introduction to RCC Construction in Mumbai</h2>
<p>Reinforced Concrete Cement (RCC) work forms the backbone of any modern structure, particularly in bustling metropolises like Mumbai. From towering residential skyscrapers to robust commercial complexes, understanding the intricacies of RCC is paramount. At <a href="/contact" class="text-sky-600 font-semibold hover:underline">RCR Enterprises</a>, we bring decades of civil engineering expertise to deliver uncompromising structural integrity.</p>
<p>The unique coastal climate of Mumbai—marked by heavy monsoons, high humidity, and saline air—demands specific construction methodologies. Poor quality concrete or inadequate steel reinforcement can lead to rapid corrosion, threatening the safety and lifespan of the building.</p>

<h3>Key Factors in RCC Work</h3>
<ul>
  <li><strong>Quality of Materials:</strong> Using the correct grade of cement, clean river sand, and high-tensile TMT steel bars.</li>
  <li><strong>Proper Mix Design:</strong> Ensuring the right water-cement ratio is crucial. Too much water weakens the concrete, while too little makes it unworkable.</li>
  <li><strong>Vibration and Compaction:</strong> Mechanical vibrators must be used to eliminate air voids and ensure a dense, solid concrete mass.</li>
  <li><strong>Curing:</strong> Adequate curing (usually 7-14 days) allows the concrete to reach its maximum designed strength.</li>
</ul>

<blockquote>
  "The strength of a building lies not in its facade, but in the unseen reinforcement that holds it together against the test of time."
</blockquote>

<h3>Why Choose Professional RCC Contractors?</h3>
<p>Many property owners attempt to cut costs by hiring inexperienced labor for structural work. However, the stakes are too high. A professional <a href="/services/rcc-work" class="text-sky-600 font-semibold hover:underline">RCC Work Contractor</a> understands dynamic load distribution, seismic requirements, and advanced formwork techniques.</p>
<p>Whether you are planning a new development in Palghar or retrofitting an older building in Vasai-Virar, investing in quality RCC workmanship pays off over decades. Our team at RCR Enterprises ensures every pillar, beam, and slab meets stringent Indian Standards (IS Codes).</p>

<h3>Conclusion</h3>
<p>If you're embarking on a new construction journey, don't compromise on the skeleton of your building. Reach out to our experts today to discuss your architectural plans and structural requirements. <a href="/contact" class="text-sky-600 font-semibold hover:underline">Get a free consultation and quote for your RCC project!</a></p>
`;

const b2 = `
<h2>The Rise of Industrial Sheds in Maharashtra</h2>
<p>As Maharashtra continues to expand its manufacturing and warehousing capabilities, the demand for high-quality industrial sheds has skyrocketed. Areas like Boisar, Palghar, and Vasai are witnessing rapid industrialization, necessitating fast, durable, and scalable construction solutions.</p>

<h3>Types of Industrial Sheds</h3>
<p>Modern industrial construction relies heavily on Pre-Engineered Buildings (PEBs) and robust RCC foundations. Here are the common types:</p>
<ul>
  <li><strong>Factory Sheds:</strong> Designed to house heavy machinery, often requiring reinforced flooring to handle immense dynamic loads.</li>
  <li><strong>Warehouse Sheds:</strong> Focused on maximum volumetric space and high clear heights for efficient stacking and logistics.</li>
  <li><strong>Cold Storage Facilities:</strong> Specialized structures requiring advanced insulation panels and temperature control mechanisms.</li>
</ul>

<h3>Our Approach to Industrial Construction</h3>
<p>At RCR Enterprises, we understand that time is money in the industrial sector. Delayed construction means delayed production. We utilize advanced <a href="/services/shuttering-work" class="text-sky-600 font-semibold hover:underline">shuttering and centering techniques</a> to accelerate the foundation and plinth work, allowing structural steel erection to begin sooner.</p>

<blockquote>
  "A well-designed industrial shed optimizes workflow, reduces maintenance overheads, and adapts to future expansion seamlessly."
</blockquote>

<h3>Critical Considerations</h3>
<p>When planning an industrial shed, several factors must be carefully evaluated:</p>
<ul>
  <li><strong>Ventilation and Natural Light:</strong> Proper placement of turbo ventilators and polycarbonate skylights can significantly reduce operational energy costs.</li>
  <li><strong>Flooring:</strong> Vacuum Dewatered Flooring (Trimix) is often essential to prevent surface dusting and withstand forklift traffic.</li>
  <li><strong>Drainage:</strong> Heavy roof catchment areas require scientifically designed rainwater harvesting and drainage systems to prevent factory flooding during monsoons.</li>
</ul>

<h3>Get Started Today</h3>
<p>Are you looking to expand your manufacturing capacity? Partner with a contractor who understands the nuances of industrial requirements. <a href="/contact" class="text-sky-600 font-semibold hover:underline">Contact RCR Enterprises</a> for end-to-end industrial construction services.</p>
`;

const b3 = `
<h2>Understanding Core Cutting in Modern Construction</h2>
<p>In the complex world of civil engineering, modifying existing structures safely is a critical skill. Core cutting is a precise, vibration-free method used to drill perfect circular holes in reinforced concrete walls, floors, and ceilings. It is an essential service for plumbing, electrical routing, and HVAC installations.</p>

<h3>Why is Core Cutting Necessary?</h3>
<p>Traditionally, contractors used jackhammers or manual chiseling to create openings in concrete. This outdated method poses severe risks:</p>
<ul>
  <li><strong>Micro-cracks:</strong> Heavy vibrations can cause micro-fractures in surrounding concrete, compromising structural integrity.</li>
  <li><strong>Inaccuracy:</strong> Manual breaking rarely results in a clean, precise hole, often requiring expensive patching work later.</li>
  <li><strong>Dust and Noise:</strong> Traditional methods are environmentally disruptive and unsuitable for operational buildings.</li>
</ul>

<h3>The RCR Enterprises Advantage</h3>
<p>By utilizing diamond-tipped drill bits and water-cooling systems, our <a href="/services/core-cutting" class="text-sky-600 font-semibold hover:underline">Core Cutting Services</a> ensure clean, precise, and dust-free operations. Whether you need a small 2-inch hole for a pipe or a massive 12-inch opening for industrial ducting, our specialized equipment handles it effortlessly.</p>

<blockquote>
  "Precision engineering isn't just about building new structures; it's about modifying existing ones without leaving a trace of disruption."
</blockquote>

<h3>Common Applications</h3>
<ul>
  <li>Plumbing and drainage pipe installations through RCC slabs.</li>
  <li>Routing electrical cables and communication lines.</li>
  <li>HVAC ductwork and exhaust system installations.</li>
  <li>Structural testing (extracting concrete core samples for lab analysis).</li>
</ul>

<h3>Safety and Structural Assessment</h3>
<p>Before any core cutting begins, a thorough structural assessment is mandatory. Cutting through primary load-bearing steel reinforcement (rebar) can be disastrous. We employ advanced rebar scanners to map out the steel matrix inside the concrete, ensuring our drill paths avoid critical structural elements.</p>

<p>Need precise modifications to your building? <a href="/contact" class="text-sky-600 font-semibold hover:underline">Contact our core cutting specialists today!</a></p>
`;

const b4 = `
<h2>The Art and Science of Perfect Slab Casting</h2>
<p>Slab casting is arguably the most critical milestone in the construction of any multi-story building. A poorly cast slab can lead to water leakage, ceiling cracks, and severe structural hazards. In this comprehensive guide, we'll walk you through the essential steps of flawless slab casting.</p>

<h3>Pre-Casting Preparations</h3>
<p>Success begins long before the first batch of concrete is poured. The foundation of a good slab is excellent <a href="/services/shuttering-work" class="text-sky-600 font-semibold hover:underline">shuttering and centering</a>. The wooden or steel formwork must be perfectly level, rigidly supported, and sealed to prevent cement slurry leakage.</p>

<ul>
  <li><strong>Steel Binding:</strong> Reinforcement bars must be placed exactly as per the structural engineer's drawings. Cover blocks must be tied securely to maintain the required gap between the steel and the formwork.</li>
  <li><strong>Electrical Conduits:</strong> Electricians must complete the laying of fan boxes and PVC pipes. These must be tied firmly to the steel mesh so they don't shift during concrete pouring.</li>
  <li><strong>Cleaning:</strong> The shuttering surface must be cleaned of debris and coated with a de-molding oil to ensure a smooth ceiling finish upon removal.</li>
</ul>

<h3>The Pouring Process</h3>
<p>Concrete must be poured continuously to avoid 'cold joints'. For large slabs, Ready Mix Concrete (RMC) pumped via boom placers is highly recommended over manual mixing. As the concrete is poured, needle vibrators must be used systematically to compact the concrete around the dense steel reinforcement.</p>

<blockquote>
  "A perfect slab is the result of seamless coordination between carpenters, steel fixers, electricians, and the concreting team."
</blockquote>

<h3>Post-Casting: The Importance of Curing</h3>
<p>Concrete doesn't dry; it cures through a chemical reaction called hydration. If the water evaporates too quickly due to sun or wind, the concrete will shrink and crack. Therefore, the slab must be kept continuously wet for at least 10 to 14 days. Creating small "ponds" of water on the slab surface using sand or mortar bunds is a traditional and highly effective method.</p>

<p>Trust your next major pour to the experts. Learn more about our <a href="/services/rcc-work" class="text-sky-600 font-semibold hover:underline">comprehensive RCC construction services</a>.</p>
`;

const b5 = `
<h2>Top 5 Things to Consider Before Hiring a Civil Contractor</h2>
<p>Building a home or a commercial complex is a massive financial and emotional investment. The success of your project rests almost entirely on the shoulders of your chosen civil contractor. Here are the top five things you must evaluate before signing a contract.</p>

<h3>1. Experience and Track Record</h3>
<p>There is no substitute for experience. A contractor who has successfully delivered projects similar to yours will anticipate challenges and mitigate risks. Ask for a portfolio of past projects and, if possible, visit an ongoing site. Seeing their <a href="/services/mason-work" class="text-sky-600 font-semibold hover:underline">masonry and finishing work</a> firsthand speaks volumes.</p>

<h3>2. Technical Capabilities</h3>
<p>Does the contractor rely on outdated manual methods, or do they utilize modern construction technology? A modern contractor should be proficient in using surveying instruments (Total Station), heavy machinery, and advanced materials.</p>

<h3>3. Transparency and Communication</h3>
<p>A good contractor maintains complete transparency regarding material specifications, timelines, and costs. Be wary of quotes that seem "too good to be true"—they often involve hidden costs or sub-standard materials down the line.</p>

<blockquote>
  "The lowest bid is rarely the best bid. Quality construction requires quality materials and skilled labor, neither of which comes cheap."
</blockquote>

<h3>4. Comprehensive Service Offerings</h3>
<p>Coordinating between multiple sub-contractors (one for RCC, another for plumbing, another for core cutting) can become a logistical nightmare. Choosing a turnkey contractor like <a href="/" class="text-sky-600 font-semibold hover:underline">RCR Enterprises</a> ensures a single point of accountability and smoother project execution.</p>

<h3>5. Licensing and Safety Standards</h3>
<p>Ensure the contractor adheres to local municipal regulations and implements strict safety protocols on-site to protect workers and avoid legal liabilities.</p>

<h3>Ready to Build?</h3>
<p>If you're looking for a reliable, experienced, and transparent construction partner in Mumbai, Virar, or Palghar, your search ends here. <a href="/contact" class="text-sky-600 font-semibold hover:underline">Reach out to us today to discuss your vision!</a></p>
`;


const MOCK_BLOGS = [
  {
    title: "The Ultimate Guide to RCC Work in Mumbai: What You Need to Know",
    slug: "ultimate-guide-rcc-work-mumbai",
    excerpt: "Discover the critical factors of high-quality RCC construction, from combating coastal humidity to ensuring structural longevity in Mumbai.",
    content: b1,
    coverImage: "/images/blog_rcc_guide.png",
    tags: ["RCC Work", "Civil Construction", "Mumbai"],
    seoTitle: "Ultimate Guide to RCC Work in Mumbai | RCR Enterprises",
    seoDescription: "Learn everything about high-quality RCC work, structural integrity, and hiring the right contractor in Mumbai.",
    author: "RCR Enterprises",
    isPublished: true,
    publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
  },
  {
    title: "The Rise of Industrial Sheds in Maharashtra",
    slug: "rise-of-industrial-sheds-maharashtra",
    excerpt: "Explore why modern industrial sheds and PEB structures are becoming the go-to solution for manufacturing hubs in Boisar and Palghar.",
    content: b2,
    coverImage: "/images/blog_industrial_shed.png",
    tags: ["Industrial Construction", "Sheds", "Palghar"],
    seoTitle: "Industrial Shed Construction in Maharashtra | RCR Enterprises",
    seoDescription: "Discover the benefits and critical considerations of building modern industrial sheds and factory foundations.",
    author: "RCR Enterprises",
    isPublished: true,
    publishedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
  },
  {
    title: "Understanding Core Cutting in Modern Construction",
    slug: "understanding-core-cutting",
    excerpt: "Learn why vibration-free diamond core cutting is essential for safe structural modifications in both commercial and residential buildings.",
    content: b3,
    coverImage: "/images/blog_core_cutting.png",
    tags: ["Core Cutting", "Plumbing", "Renovation"],
    seoTitle: "Core Cutting Services & Best Practices | RCR Enterprises",
    seoDescription: "Why diamond core cutting is the safest method for drilling precise holes in RCC slabs and walls.",
    author: "RCR Enterprises",
    isPublished: true,
    publishedAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000)
  },
  {
    title: "The Art and Science of Perfect Slab Casting",
    slug: "art-science-perfect-slab-casting",
    excerpt: "A comprehensive walkthrough of flawless slab casting, from shuttering preparation and concrete pouring to vital curing techniques.",
    content: b4,
    coverImage: "/images/blog_slab_casting_guide.png",
    tags: ["Slab Casting", "Concrete", "Construction Tips"],
    seoTitle: "Slab Casting Guide & Best Practices | RCR Enterprises",
    seoDescription: "A complete guide to ensuring a leak-proof, crack-free concrete slab through proper casting and curing.",
    author: "RCR Enterprises",
    isPublished: true,
    publishedAt: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000)
  },
  {
    title: "Top 5 Things to Consider Before Hiring a Civil Contractor",
    slug: "top-5-things-hiring-civil-contractor",
    excerpt: "Don't gamble with your dream project. Evaluate these five crucial factors before signing a contract with any civil construction firm.",
    content: b5,
    coverImage: "/images/blog_hire_contractor.png",
    tags: ["Hiring Guide", "Contractors", "Real Estate"],
    seoTitle: "How to Hire a Civil Contractor in Mumbai | RCR Enterprises",
    seoDescription: "The top 5 things you absolutely must verify before hiring a civil construction contractor for your next project.",
    author: "RCR Enterprises",
    isPublished: true,
    publishedAt: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000)
  }
]

async function seed() {
  try {
    console.log('Connecting to database...')
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('Connected to MongoDB.')

    // Clear existing
    await Blog.deleteMany({})
    console.log('Cleared existing blogs.')

    // Insert new blogs
    const result = await Blog.insertMany(MOCK_BLOGS)
    console.log(`Successfully seeded ${result.length} highly detailed blogs!`)

  } catch (error) {
    console.error('Error seeding blogs:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB.')
  }
}

seed()
