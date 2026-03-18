# Clawwar

Clawwar is a Next.js App Router project for indexing claws, publishing SEO-friendly detail pages, and letting signed-in users rate them.

## Stack

- Next.js 14 + TypeScript + Tailwind CSS
- `next-auth` with Google OAuth
- Prisma + PostgreSQL for users, sessions, and ratings

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

3. Fill in `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and a random `NEXTAUTH_SECRET`.

4. Point `DATABASE_URL` at a Postgres database, then create the schema:

   ```bash
   npx prisma db push
   ```

5. Start development:

   ```bash
   npm run dev
   ```

## Google OAuth setup

- In Google Cloud Console, create an OAuth Client ID for a web app.
- Authorized JavaScript origin: `http://localhost:3000`
- Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

## Vercel production env

- `DATABASE_URL`: hosted Postgres connection string
- `NEXTAUTH_URL`: your production site URL
- `NEXTAUTH_SECRET`: long random secret
- `GOOGLE_CLIENT_ID`: Google OAuth client id
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret

## Notes

- The current claw archive is curated static content in `src/data/claws.ts`.
- Ratings are persisted per user in Postgres through Prisma.
- `metadataBase` and sitemap URLs currently use `https://clawwar.example.com`; replace them with your real production domain.
