# Headless E-commerce Starter

Un squelette d'application e-commerce modulaire séparant le frontend (Storefront) du backend (API Gateway).

## Stack Technique

- **Frontend :** Next.js 15 (App Router), Zustand, TailwindCSS.
- **Backend :** Node.js, Fastify, TypeScript.
- **Paiement :** Stripe Checkout.
- **Architecture :** Monorepo (pnpm workspaces).

## Installation

À la racine du projet :

```bash
pnpm install
Configuration
Créez les fichiers d'environnement nécessaires :
```

### Backend

Chemin : apps/api-gateway/.env

```bash
PORT=4000
# La clé secrète Stripe (en mode test)
STRIPE_SECRET_KEY=sk_test_...
```

### Frontend

Chemin : apps/storefront/.env.local
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```


Pour lancer l'environnement de développement complet, ouvrez deux terminaux :

Terminal 1 : API Gateway

```bash
cd apps/api-gateway
pnpm dev
```

Terminal 2 : Storefront

```bash
cd apps/storefront
pnpm dev
```

L'application est accessible sur : http://localhost:3000

