# pg-api

Production-oriented REST API for user authentication and personal posts management.

## Overview

`pg-api` is a Node.js + Express service with PostgreSQL (via Prisma).  
It provides:

- JWT-based authentication (`/auth`)
- User profile endpoints (`/users`)
- Post CRUD scoped to the authenticated user (`/posts`)
- Role-based access control for admin-only user listing

## Tech Stack

- Node.js (CommonJS)
- Express 5
- PostgreSQL
- Prisma ORM (`@prisma/client`, `@prisma/adapter-pg`)
- Zod for request validation
- JWT (`jsonwebtoken`) for auth
- `bcrypt` for password hashing

## Project Structure

```text
.
├── index.js
├── prisma/
│   ├── schema.prisma
│   └── migrations/
└── src/
    ├── app.js
    ├── config/
    │   └── env.js
    ├── controllers/
    ├── db/
    ├── middleware/
    ├── routes/
    ├── schemas/
    └── services/
```

## Environment Variables

Configuration is validated at startup (`src/config/env.js`).  
Invalid or missing required variables fail fast.

Use `.env.example` as the template:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/pg_api
JWT_SECRET=replace_with_a_strong_secret_at_least_32_chars
```

Minimum requirements:

- `DATABASE_URL` must be non-empty
- `JWT_SECRET` must be at least 32 characters

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Create local environment

```bash
cp .env.example .env
```

Update values in `.env` for your local DB and secrets.

### 3) Run database migrations

```bash
npx prisma migrate dev
```

### 4) Start the API

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Default URL: `http://localhost:3000`

## Database

Schema is defined in `prisma/schema.prisma`.

Main entities:

- `User` (`id`, `name`, `email`, `password`, `role`, timestamps)
- `Post` (`id`, `title`, `body`, `userId`, timestamps)

Role enum:

- `USER` (default)
- `ADMIN`

## Authentication & Authorization

- JWT is issued on login and must be sent as:
  - `Authorization: Bearer <token>`
- Auth middleware populates:
  - `req.userId`
  - `req.userRole`
- RBAC:
  - `GET /users` is admin-only
- Ownership restrictions:
  - `GET /users/:id`, `PUT /users/:id`, `DELETE /users/:id` are self-only
  - Posts endpoints are scoped to the authenticated user

## API Endpoints

### Auth

- `POST /auth/register`
- `POST /auth/login`

### Users (authenticated)

- `GET /users/me`
- `GET /users/:id` (self-only)
- `PUT /users/:id` (self-only)
- `DELETE /users/:id` (self-only)
- `GET /users` (admin-only)

### Posts (authenticated)

- `GET /posts`
- `GET /posts/:id`
- `POST /posts`
- `PUT /posts/:id`
- `DELETE /posts/:id`

## Validation & Error Handling

- Request body validation is implemented with Zod (`src/schemas`, `src/middleware/validate.js`)
- Route parameter `id` validation is centralized in `src/middleware/validateId.js`
- Centralized error handling middleware: `src/middleware/errorHandler.js`

## Security Notes

- Passwords are hashed with `bcrypt`
- JWT secret is not stored in repo
- `.env` is gitignored; commit only `.env.example`
- Duplicate email conflicts are mapped to `409`

## Development Notes

- Prisma client regeneration:

```bash
npx prisma generate
```

- Apply migrations in deployment environments:

```bash
npx prisma migrate deploy
```

## Current Gaps / Next Improvements

- Add automated tests (unit + integration with Supertest)
- Add JSON 404 handler for unknown routes
- Add structured logging (replace `console.*` runtime logging)
- Add graceful shutdown for Prisma connections

---

If you use this repository as a template, update project name, license, and deployment instructions for your environment.
