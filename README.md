# Clawwar

Clawwar is a Next.js App Router project for indexing claws, publishing SEO-friendly detail pages, and letting signed-in users rate them.

## Stack

- Next.js 14 + TypeScript + Tailwind CSS
- `next-auth` with Google OAuth
- Prisma + SQLite for users, sessions, and ratings

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

4. Create the local database schema:

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

## Notes

- The current claw archive is curated static content in `src/data/claws.ts`.
- Ratings are persisted per user in SQLite and can be upgraded to Postgres later by changing the Prisma datasource.
- `metadataBase` and sitemap URLs currently use `https://clawwar.example.com`; replace them with your real production domain.
