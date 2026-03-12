# Headless E-Commerce Integration Funnel Template

A modern, fork-ready e-commerce template built with a headless architecture separating the **storefront** (Next.js) from the **API gateway** (Express).

## 🏗️ Architecture

```
eshop-template/
├── apps/
│   ├── api-gateway/          # Express REST API (TypeScript strict)
│   │   ├── src/
│   │   │   ├── config/       # Zod-validated environment
│   │   │   ├── middleware/    # Auth, validation, error handling
│   │   │   └── modules/
│   │   │       ├── auth/         # JWT authentication
│   │   │       ├── products/     # Mock product repository
│   │   │       ├── cart/         # Cart validation
│   │   │       └── payments/     # Strategy pattern (mock/Stripe)
│   │   │           └── providers/
│   │   │               ├── mock.provider.ts
│   │   │               └── stripe.provider.ts
│   │   └── .env.example
│   └── storefront/           # Next.js 16 (App Router)
│       └── src/
│           ├── app/              # Pages (home, checkout, login, register, success)
│           ├── components/ui/    # shadcn/ui components
│           └── features/
│               ├── auth/         # Zustand auth store + API service
│               ├── cart/         # Zustand cart store + drawer
│               └── products/     # Product types + cards
├── docker-compose.yml        # PostgreSQL + Redis + API
└── pnpm-workspace.yaml
```

## ⚡ Tech Stack

| Layer       | Technology                                               |
|-------------|----------------------------------------------------------|
| Frontend    | Next.js 16, React 19, Tailwind CSS 4, shadcn/ui, Zustand |
| Backend     | Express 5, TypeScript (strict), Zod, JWT, bcryptjs       |
| Payments    | Strategy pattern — Mock (default) / Stripe               |
| Infra       | Docker Compose, PostgreSQL 16, Redis                     |
| Monorepo    | pnpm workspaces                                          |

## 🚀 Quick Start

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9

### Installation

```bash
# Clone and install
git clone https://github.com/your-username/eshop-template.git
cd eshop-template
pnpm install
```

### Environment Setup

Copy the example env files:

```bash
cp apps/api-gateway/.env.example apps/api-gateway/.env
```

The frontend env (`apps/storefront/.env.local`) should contain:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Development

```bash
# Start both API and frontend in parallel
pnpm dev

# Or separately
pnpm dev:api   # API on http://localhost:4000
pnpm dev:web   # Frontend on http://localhost:3000
```

### Docker (optional)

```bash
docker-compose up -d
```

This starts PostgreSQL, Redis, and the API gateway.

## 🔑 Environment Variables

### Backend (`apps/api-gateway/.env`)

| Variable          | Required | Default           | Description                          |
|-------------------|----------|-------------------|--------------------------------------|
| `PORT`            | No       | `4000`            | API server port                      |
| `JWT_SECRET`      | Yes      | —                 | Secret for JWT signing (≥ 16 chars)  |
| `JWT_EXPIRES_IN`  | No       | `7d`              | Token expiration duration            |
| `CORS_ORIGIN`     | No       | `localhost:3000`  | Allowed CORS origins                 |
| `PAYMENT_PROVIDER`| No       | `mock`            | `mock` or `stripe`                   |
| `STRIPE_SECRET_KEY`| If Stripe| —                | Stripe secret key                    |
| `DATABASE_URL`    | No       | —                 | PostgreSQL connection string         |
| `REDIS_URL`       | No       | —                 | Redis connection string              |

## 💳 Payment Providers

The payment module uses a **Strategy pattern**. Switch providers via the `PAYMENT_PROVIDER` env variable:

- **`mock`** (default) — Simulates checkout, no external dependencies
- **`stripe`** — Real Stripe Checkout Sessions

### Adding a new provider

1. Create `src/modules/payments/providers/your-provider.ts` implementing `PaymentProvider`
2. Add the provider name to the Zod enum in `src/config/env.ts`
3. Add a case in `payments.factory.ts`

## 🔐 Authentication

JWT-based auth with bcrypt password hashing:

- `POST /api/auth/register` — Create account
- `POST /api/auth/login` — Login, returns JWT
- `GET /api/auth/me` — Get current user (protected)

## 📦 API Endpoints

| Method | Endpoint                           | Auth | Description              |
|--------|------------------------------------|------|--------------------------|
| GET    | `/api/health`                      | No   | Health check             |
| POST   | `/api/auth/register`               | No   | Register                 |
| POST   | `/api/auth/login`                  | No   | Login                    |
| GET    | `/api/auth/me`                     | Yes  | Current user             |
| GET    | `/api/products`                    | No   | List products            |
| GET    | `/api/products/categories`         | No   | List categories          |
| GET    | `/api/products/:id`                | No   | Get product by ID        |
| POST   | `/api/cart/validate`               | No   | Validate cart            |
| POST   | `/api/payments/create-checkout-session` | No | Create checkout      |
| GET    | `/api/payments/verify/:sessionId`  | No   | Verify payment           |

## 🍴 Forking Guide

This template is designed to be forked and customized:

1. **Products**: Replace mock data in `products.repository.ts` with a real database
2. **Payments**: Set `PAYMENT_PROVIDER=stripe` and add your Stripe key, or implement a new provider
3. **Auth**: The in-memory user store can be replaced with PostgreSQL
4. **Theme**: Customize `globals.css` oklch values for your brand colors
5. **i18n**: All UI text is in French — update or add i18n as needed

## 📄 License

ISC
