# RCR ENTERPRISES — Enterprise Construction Website

**Production-ready Next.js 15 website for RCR ENTERPRISES, RCC Work Contractor, Virar East, Maharashtra.**

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
# or
yarn install
```

### 2. Environment Setup
```bash
cp .env.example .env.local
```

Fill in all values in `.env.local`:
- `MONGODB_URI` — MongoDB Atlas connection string
- `JWT_SECRET` — Min 32 char random string
- `CLOUDINARY_*` — From cloudinary.com dashboard
- `SMTP_*` — Gmail App Password (enable 2FA → App Passwords)

### 3. Seed Database
```bash
npm run seed
```

This creates:
- Admin user: `admin@rcrenterprises.com` / `Admin@123`
- All 11 services
- 5 sample reviews
- Default website settings

### 4. Run Development Server
```bash
npm run dev
```

Visit:
- **Website:** http://localhost:3000
- **Admin:** http://localhost:3000/admin/login

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (main)/                 # Public website pages
│   │   ├── page.tsx            # Homepage
│   │   ├── about/
│   │   ├── services/
│   │   │   └── [slug]/         # Dynamic service pages
│   │   ├── projects/
│   │   │   └── [slug]/         # Dynamic project pages
│   │   ├── gallery/
│   │   ├── reviews/
│   │   ├── contact/
│   │   ├── privacy-policy/
│   │   └── terms/
│   ├── admin/                  # Admin panel
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── services/
│   │   ├── projects/
│   │   ├── gallery/
│   │   ├── reviews/
│   │   ├── inquiries/
│   │   ├── settings/
│   │   └── profile/
│   ├── api/                    # REST API routes
│   │   ├── auth/
│   │   ├── services/
│   │   ├── projects/
│   │   ├── gallery/
│   │   ├── reviews/
│   │   ├── contact/
│   │   ├── settings/
│   │   └── dashboard/
│   ├── layout.tsx
│   ├── globals.css
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/                 # Navbar, Footer
│   ├── sections/               # Homepage sections
│   ├── admin/                  # Admin components
│   └── shared/                 # Reusable components
├── models/                     # Mongoose schemas
├── lib/                        # DB, Auth, Cloudinary, Email, Seed
├── hooks/                      # Custom React hooks
├── store/                      # Zustand stores
├── types/                      # TypeScript types
├── constants/                  # App constants
├── utils/                      # Utility functions
└── middleware.ts               # Route protection
```

---

## 🗄️ Database Models

| Model | Description |
|-------|-------------|
| `User` | Admin users with bcrypt passwords |
| `Service` | Services with CRUD, slugs, FAQs |
| `Project` | Projects with images, categories, status |
| `Review` | Client testimonials with ratings |
| `Gallery` | Cloudinary-hosted images by category |
| `ContactInquiry` | Form submissions with status tracking |
| `WebsiteSettings` | Dynamic site config, SEO, hero, social |

---

## 🔐 Admin Panel

**URL:** `/admin/login`

**Features:**
- JWT authentication with HTTP-only cookies
- Protected routes via Next.js middleware
- Dashboard analytics with charts
- Full CRUD for Services, Projects, Reviews
- Gallery management with Cloudinary upload
- Contact inquiry management with status updates
- Website settings control (SEO, hero, social, contact)

---

## 🌐 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/login` | ❌ | Admin login |
| `POST` | `/api/auth/logout` | ❌ | Admin logout |
| `GET` | `/api/services` | ❌ | List services |
| `POST` | `/api/services` | ✅ | Create service |
| `PUT` | `/api/services/[id]` | ✅ | Update service |
| `DELETE` | `/api/services/[id]` | ✅ | Delete service |
| `GET` | `/api/projects` | ❌ | List projects |
| `POST` | `/api/projects` | ✅ | Create project |
| `GET` | `/api/reviews` | ❌ | List reviews |
| `POST` | `/api/reviews` | ✅ | Add review |
| `GET` | `/api/gallery` | ❌ | List gallery |
| `POST` | `/api/gallery` | ✅ | Upload image |
| `DELETE` | `/api/gallery/[id]` | ✅ | Delete image |
| `GET` | `/api/contact` | ✅ | List inquiries |
| `POST` | `/api/contact` | ❌ | Submit inquiry |
| `GET` | `/api/settings` | ❌ | Get settings |
| `PUT` | `/api/settings` | ✅ | Update settings |
| `GET` | `/api/dashboard` | ✅ | Analytics data |

---

## 🚢 Deployment (Vercel + MongoDB Atlas)

### 1. MongoDB Atlas
- Create cluster at mongodb.com/atlas
- Add IP 0.0.0.0/0 (or Vercel IPs)
- Get connection string

### 2. Cloudinary
- Sign up at cloudinary.com
- Get Cloud Name, API Key, API Secret

### 3. Gmail SMTP
- Enable 2FA on Gmail
- Generate App Password (16-char)
- Use as `SMTP_PASS`

### 4. Deploy to Vercel
```bash
vercel
```
Set all environment variables in Vercel dashboard.

### 5. Run seed on production
```bash
MONGODB_URI=your_prod_uri npm run seed
```

---

## 🏢 Company Details

| Field | Value |
|-------|-------|
| Company | RCR ENTERPRISES |
| Proprietor | Momin Noor Alam Shaikh |
| Type | RCC Work Contractor |
| Phone | 9619439243 |
| Email | rcrenterprises786@gmail.com |
| Location | Virar East, Maharashtra – 401305 |
| GST | 27CIMPR8276H1ZF |
| Udyog Aadhaar | MH33A0170011 |
| Gumasta | 108000061903 |

---

## 📦 Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **Animations:** Framer Motion
- **UI:** ShadCN, Radix UI, Lucide Icons
- **Slider:** Swiper.js
- **Forms:** React Hook Form + Zod
- **State:** Zustand
- **Backend:** Next.js API Routes + Server Actions
- **DB:** MongoDB + Mongoose
- **Auth:** JWT + bcryptjs
- **Storage:** Cloudinary
- **Email:** Nodemailer (Gmail SMTP)
- **Charts:** Recharts
- **Lightbox:** Yet Another React Lightbox
- **Deploy:** Vercel + MongoDB Atlas

---

*Built for RCR ENTERPRISES — Quality Work With Commitment* 🏗️



