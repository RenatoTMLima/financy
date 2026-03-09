# Financy

A small financial management application built as a post-graduation course project by **Rocketseat**. Track income and expenses, manage categories, and keep your finances organized with a modern stack and a clean, focused experience.

---

## Overview

Financy lets users create accounts, log in, and manage their own **transactions** and **categories**. You can create, edit, list, and delete both transactions and categories, with data scoped per user so everyone sees only their own data.

---

## Tech Stack

### Backend

| Area | Technology |
|------|------------|
| **Runtime** | Node.js with TypeScript |
| **API** | GraphQL (Apollo Server 5) with Express 5 |
| **Schema / Resolvers** | TypeGraphQL (decorators, type-safe schema) |
| **Database** | SQLite with Prisma ORM |
| **Auth** | JWT (jsonwebtoken) + bcryptjs for password hashing |
| **CORS** | Configured for the frontend origin |

**Notable details:**

- Resolvers for **Auth**, **User**, **Category**, and **Transaction**
- Prisma migrations and generated client for type-safe DB access
- JWT-based authentication and context building for GraphQL requests

### Frontend

| Area | Technology |
|------|------------|
| **Framework** | React 19 with TypeScript |
| **Build** | Vite 7 |
| **Routing** | React Router v7 |
| **Data / API** | Apollo Client 4 + GraphQL |
| **State** | Zustand (e.g. auth store) |
| **Styling** | Tailwind CSS (with Tailwind Variants, CVA, clsx, tailwind-merge) |
| **UI** | Radix UI (Dialog, Select), Lucide React icons, Sonner toasts |
| **Validation** | Zod |

**Notable details:**

- Pages: Login, Register, Dashboard, Transactions, Categories, Account
- Route guards for protected routes
- Modals for creating/editing transactions and categories
- Path alias `@/` for `src/`

---

## Running Locally

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm** or **yarn**

---

### 1. Backend

```bash
cd backend
```

**Environment**

Create a `.env` file in `backend/` (you can copy from `.env.example` and keep or adjust the values):

```env
JWT_SECRET=supersecret

DATABASE_URL="file:./dev.db"
```

**Database**

Generate the Prisma client and run migrations (this creates/updates the SQLite DB):

```bash
npm run generate
npm run migrate
```

**Start the server**

```bash
npm run dev
```

The API will be available at **http://localhost:4000**.

**GraphQL**

- **Endpoint:** `http://localhost:4000/graphql`
- Use [Apollo Sandbox](https://studio.apollographql.com/sandbox/explorer) or any GraphQL client; set the endpoint to `http://localhost:4000/graphql` to run queries and mutations.

---

### 2. Frontend

In a new terminal:

```bash
cd frontend
```

**Environment**

Create a `.env` or `.env.local` file in `frontend/` (same values as `.env.example` are fine for local dev):

```env
VITE_BACKEND_URL=http://localhost:4000/graphql
```

**Install and run**

```bash
npm install
npm run dev
```

The app will open at **http://localhost:5173** (or the port Vite prints). Make sure the backend is running so login, register, and data loading work.

---

## Quick Start Summary

1. **Backend:** `cd backend` → create `.env` from `.env.example` → `npm run generate` → `npm run migrate` → `npm run dev`
2. **Frontend:** `cd frontend` → create `.env` or `.env.local` from `.env.example` → `npm install` → `npm run dev`
3. Open **http://localhost:5173** in the browser and **http://localhost:4000/graphql** for the GraphQL API (e.g. via Apollo Sandbox).

---

## Project structure

```
financy/
├── backend/          # GraphQL API, Prisma, auth
│   ├── prisma/       # Schema and migrations
│   └── src/          # Resolvers, context, server entry
├── frontend/         # React + Vite app
│   └── src/          # Pages, components, GraphQL, stores
└── README.md
```

---

*Built as a Rocketseat post-graduation course project.*
