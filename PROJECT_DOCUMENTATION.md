# Mini E-Commerce Module - Project Documentation

## 📋 Project Overview

A full-stack e-commerce web application built as an internship assessment project. The application demonstrates proficiency in modern web development practices, including React for frontend, Node.js/Express for backend, and MongoDB for database management.

**Live Demo:** [ecommerce-website-pi-liart.vercel.app](https://ecommerce-website-pi-liart.vercel.app)  
**Backend API:** [ecommerce-backend-hepj.onrender.com](https://ecommerce-backend-hepj.onrender.com)  
**Source Code:** [github.com/Rajdeep2922/Ecommerce-Website](https://github.com/Rajdeep2922/Ecommerce-Website)

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 18, Vite, React Router v6, Context API, CSS3 |
| **Backend** | Node.js, Express.js, Mongoose |
| **Database** | MongoDB Atlas (Cloud) |
| **Deployment** | Vercel (Frontend), Render (Backend) |
| **Dev Tools** | ESLint, Prettier, Docker |

---

## ✨ Key Features

### User Features
- **Product Catalog** - Browse 12 curated products across 5 categories
- **Search & Filter** - Real-time search by name with category filtering
- **Shopping Cart** - Add, remove, adjust quantities with localStorage persistence
- **Wishlist** - Save favorite products with heart toggle
- **Product Details** - Dedicated page for each product with full descriptions
- **Responsive Design** - Mobile-first with hamburger navigation

### Technical Features
- **RESTful API** - GET /products, GET /products/:id, POST /cart
- **MongoDB Integration** - Mongoose ODM with graceful fallback to in-memory
- **Rate Limiting** - 500 requests/15min per IP using express-rate-limit
- **Toast Notifications** - User feedback for cart/wishlist actions
- **Loading Skeletons** - Animated placeholders for better UX
- **SPA Routing** - Client-side navigation with React Router

---

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│    Backend      │────▶│   MongoDB       │
│   (Vercel)      │     │   (Render)      │     │   (Atlas)       │
│   React + Vite  │     │   Express.js    │     │   Cloud DB      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## 📁 Project Structure

```
Ecommerce-Website/
├── frontend/                 # React Application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # React Context (Cart, Wishlist, Toast)
│   │   ├── pages/            # Route pages
│   │   └── styles/           # CSS styling
│   └── vercel.json           # Vercel deployment config
│
├── backend/                  # Express API Server
│   ├── src/
│   │   ├── config/           # Database connection
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API endpoints
│   │   ├── middleware/       # Validation & error handling
│   │   └── scripts/          # Database seeding
│   └── package.json
│
└── docker-compose.yml        # Container orchestration
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products (supports `?search=` & `?category=`) |
| GET | `/products/:id` | Get single product by ID |
| GET | `/products/categories` | Get all category names |
| POST | `/cart` | Add item to cart |
| GET | `/health` | Health check endpoint |

---

## 🎨 Design Decisions

1. **No UI Libraries** - Implemented custom CSS with modern design patterns (glassmorphism, gradients, animations)
2. **Context API over Redux** - Simpler state management sufficient for project scope
3. **localStorage Persistence** - Cart/wishlist data persists across browser sessions
4. **Graceful Fallback** - App works with in-memory data if MongoDB is unavailable
5. **Rate Limiting** - Protects API from abuse in production

---

## 🚀 Deployment Strategy

- **Frontend**: Deployed on Vercel with automatic GitHub deployments
- **Backend**: Deployed on Render with environment variables for MongoDB
- **Database**: MongoDB Atlas M0 (Free tier) with network access configured
- **CI/CD**: Push to `main` branch triggers automatic redeployment

---

## 📊 What I Learned

1. Building full-stack applications with React and Node.js
2. MongoDB database design and Mongoose ODM
3. RESTful API design with Express.js
4. State management with React Context API
5. Responsive CSS without frameworks
6. Cloud deployment (Vercel, Render, MongoDB Atlas)
7. Git version control and GitHub workflows
8. Docker containerization basics

---

## 🔮 Future Improvements

- User authentication (JWT)
- Payment gateway integration
- Order history and tracking
- Admin dashboard for product management
- Unit and integration tests

---

**Developed by:** Rajdeep Singh  
**Date:** February 2026  
**Duration:** 1 Day
