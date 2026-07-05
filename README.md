# PureBloom Beauty

A full-stack beauty affiliate marketing platform with admin dashboard, 3D UI components, dark mode, and Android app conversion target.

**Frontend:** React 18 + Vite + Tailwind CSS 3 + Framer Motion  
**Backend:** Node.js + Express + MongoDB + Mongoose  
**Target Platform:** Web + Android (conversion in progress)

---

## Brand

- **Colors:** Blush pink (`#F4C6CE`), beige (`#C9A47E`), navy near-black (`#1A1A1A`)
- **Fonts:** Playfair Display (serif headings), Inter (sans-serif body)
- **Tone:** Elegant, editorial, modern luxury

---

## Features

### Public Pages
- Cinematic hero with particle sparkle effect (left-half only)
- 3D rotating image carousels (ImageSlider3D)
- Lightswind-style angled slider (Trending Products)
- 3D tilt product cards with cursor-following rotation
- Interactive glow cards (WhyPureBloom)
- Holographic image card with color-shifting overlay
- Dark mode toggle with localStorage persistence
- Product grid with filters, search, categories
- Product details with affiliate Amazon redirect
- Quick View modal + Wishlist (localStorage)
- Newsletter subscription, contact form
- WhatsApp floating button with pulse animation
- Responsive design (mobile-first)

### Admin Panel (JWT-protected)
- Dashboard with metrics & charts
- CRUD management for products & categories
- Image upload with preview (multer, 20MB limit)
- Analytics dashboard
- Contact message & subscriber management
- Password reset flow

### Interactions & Animations
- Framer Motion staggered entrance animations
- 3D tilt on hover (sprung motion values)
- Aurora text glow effect on headings
- Angled 3D cards with infinite auto-scroll
- Starry night sky background (dark mode, About page)
- Particle orbit cursor effect (global)
- Smooth scroll reveals with `whileInView`
- Card hover: translateY(-3px) + shadow elevation

---

## Tech Stack

| Layer | Tools |
|-------|-------|
| Frontend | React 18, Vite 5, Tailwind CSS 3, Framer Motion 11 |
| Backend | Express.js, Mongoose, JWT, bcryptjs |
| Database | MongoDB (local or Atlas) |
| Email | Nodemailer (SMTP) |
| Uploads | Multer (local `/uploads` storage) |
| Icons | react-icons, lucide-react |
| Particles | @tsparticles/react (sparkles) |

---

## Project Structure

```
purebloom-beauty/
├── client/                    # React frontend (Vite)
│   ├── src/
│   │   ├── assets/images/     # Local images (cover.png, mybrand.png)
│   │   ├── components/
│   │   │   ├── common/        # ProductCard, AngledSlider, ImageSlider3D, etc.
│   │   │   ├── home/          # HeroSection, WhyPureBloom, FeaturedCategories
│   │   │   ├── layout/        # Header, Footer, MainLayout
│   │   │   └── ui/            # AuroraTextEffect, StarsBg, SparklesCore
│   │   ├── context/           # WishlistContext
│   │   ├── lib/               # cn() utility
│   │   ├── pages/
│   │   │   ├── public/        # Home, About, Contact, ProductDetails, etc.
│   │   │   └── admin/         # Dashboard, ManageProducts, Analytics, etc.
│   │   ├── services/          # API layer (axios)
│   │   └── styles/            # index.css (Tailwind + custom classes)
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                    # Express backend
│   ├── src/
│   │   ├── config/            # DB connection
│   │   ├── controllers/       # Auth, product, category, contact, etc.
│   │   ├── middleware/        # Auth middleware
│   │   ├── models/            # Mongoose schemas
│   │   ├── routes/            # API route definitions
│   │   ├── seed/              # Database seeder + Amazon fetcher
│   │   └── index.js           # Server entry
│   └── uploads/               # Uploaded images (served statically)
└── README.md
```

---

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Setup

```bash
# Install dependencies
cd server && npm install
cd ../client && npm install

# Configure environment
# Edit server/.env (see below)

# Seed database (creates admin + sample data)
cd ../server && npm run seed

# Run development
# Terminal 1:
cd server && npm run dev          # Backend on :5000
# Terminal 2:
cd client && npm run dev          # Frontend on :5173
```

### Environment Variables (`server/.env`)

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/purebloom
JWT_SECRET=your_jwt_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=sriharipechettis@gmail.com
ADMIN_PASSWORD=Srihari@777
```

### Default Admin
- Email: `sriharipechettis@gmail.com`
- Password: `Srihari@777`

---

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products (filterable) |
| GET | `/api/products/slug/:slug` | Product by slug |
| GET | `/api/categories` | List categories |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/subscribers` | Subscribe to newsletter |
| POST | `/api/auth/login` | Admin login |
| GET/POST/PUT/DELETE | `/api/products` | Admin CRUD |
| GET/POST/PUT/DELETE | `/api/categories` | Admin CRUD |
| POST | `/api/upload` | Image upload (max 20MB) |
| GET | `/api/dashboard/stats` | Dashboard stats |

---

## Android Conversion

This project is being converted to an Android application. The web frontend architecture (React components, API layer, auth flow) serves as the reference implementation for the Android port.

---

## License

MIT
