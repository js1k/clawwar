# Clawwar

Clawwar is a Next.js App Router project for indexing OpenClaw-related claw projects (verified + X candidates), publishing SEO-friendly detail pages, and letting signed-in users rate them.

## Stack

- Next.js 14 + TypeScript + Tailwind CSS
- `next-auth` with Google OAuth
- Prisma + PostgreSQL for users, sessions, and ratings
- X API crawl script for `*claw` discovery candidates

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

## Sync candidates from X

Set X API token and run:

```bash
export X_BEARER_TOKEN=your_x_token
npm run sync:x
```

This writes discovered candidates to:

- `src/data/x-claw-candidates.json`

The website currently serves curated entries from:

- `src/data/claws.ts`

Icon behavior:

- Each entry first attempts remote icon loading.
- If icon URL fails, UI automatically renders a gradient monogram fallback.

## Google OAuth setup

- In Google Cloud Console, create an OAuth Client ID for a web app.
- Authorized JavaScript origin: `http://localhost:3000`
- Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

## Vercel production env

- `DATABASE_URL`: hosted Postgres connection string
- `NEXTAUTH_URL`: your production site URL (for this project: `https://clawwar.net`)
- `NEXTAUTH_SECRET`: long random secret
- `GOOGLE_CLIENT_ID`: Google OAuth client id
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret

## Notes

- The claw directory in `src/data/claws.ts` is seeded from official docs and X-related discovery links.
- Ratings are persisted per user in Postgres through Prisma.
- `metadataBase` and sitemap use `https://clawwar.net`.
