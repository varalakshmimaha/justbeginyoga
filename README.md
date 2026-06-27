# Just Begin Yoga — Website + Admin

Full-stack site for **Just Begin Yoga** (Anusha Shetty), built from the Claude Design handoff.

- **Framework:** Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- **Database:** MySQL via **Prisma 7** driver adapter (`@prisma/adapter-mariadb`) — pure-JS, no native engine binary, so it runs on shared / cPanel hosting
- **Auth:** email + password admin login (JWT in an httpOnly cookie, `jose` + `bcryptjs`)

## What's built (Phase 1)

| Feature | Public | Admin |
| --- | --- | --- |
| **Dynamic blog** | `/blog`, `/blog/[slug]` — full SEO meta, JSON-LD `BlogPosting`, related-post back-linking | `/admin/blog` — create / edit / publish-toggle / delete, with SEO fields |
| **3 seeded SEO articles** | Body Alignment · General Fitness · Face Yoga (cross-linked) | editable |
| **Contact enquiry** | `/contact` form → saved to DB | `/admin/contact-enquiries` — list, filter, **status management**, notes, delete |
| **Group enquiry** | `/group-classes` form → saved to DB | `/admin/group-enquiries` — list, filter, **status management**, notes, delete |
| Marketing pages | Home, About, Services (+detail), FAQ (FAQ schema) | — |
| SEO | `sitemap.xml`, `robots.txt`, canonical URLs, OpenGraph/Twitter | — |

Enquiry statuses: **New → In progress → Contacted → Converted → Closed**.

## What's built (Phase 2)

| Feature | Public | Admin |
| --- | --- | --- |
| **Dynamic gallery** | `/gallery` — masonry grid + keyboard-navigable lightbox | `/admin/gallery` — add / edit / publish-toggle / reorder / delete |
| **Dynamic videos** | `/videos` — YouTube thumbnails, click-to-play inline (`youtube-nocookie`) | `/admin/videos` — paste any YouTube URL (auto-extracts id), publish-toggle / reorder / delete |
| **Google Analytics (GA4)** | loads site-wide via `next/script` | — |
| **Google Search Console** | HTML-tag verification in `<head>` | — |
| **Razorpay** | reusable `<RazorpayButton>` + `/api/razorpay/order` & `/api/razorpay/verify` | — |

All three integrations are **feature-flagged off by default** — they stay completely inert (render nothing / return `503`) until the matching env vars are set, so dev and unconfigured deploys are unaffected.

| Integration | Turn on by setting |
| --- | --- |
| Google Analytics | `NEXT_PUBLIC_GA_ID="G-XXXXXXX"` |
| Search Console | `NEXT_PUBLIC_GSC_VERIFICATION="<token>"` |
| Razorpay | `NEXT_PUBLIC_RAZORPAY_ENABLED="true"` + `NEXT_PUBLIC_RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` |

> **Razorpay** talks to the REST API with `fetch` + Basic auth (no extra npm dependency). Drop `<RazorpayButton amount={499} />` onto any page; it self-hides when disabled, creates an order server-side, opens checkout, and verifies the signature on `/api/razorpay/verify` before treating a payment as genuine.

---

## Local setup

1. **Install** (also runs `prisma generate`):
   ```bash
   npm install
   ```
   > On a network that intercepts TLS (corporate proxy), prefix Prisma/CLI commands with `NODE_OPTIONS=--use-system-ca`.

2. **Configure env** — copy and edit:
   ```bash
   cp .env.example .env
   ```
   Set `DATABASE_URL` to your MySQL, and a strong `ADMIN_SESSION_SECRET`:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Create tables** (no migration files needed — pushes the schema straight to MySQL):
   ```bash
   npm run db:push
   ```

4. **Seed** the admin user + 3 blog articles + sample gallery (uses `SEED_ADMIN_*` from `.env`):
   ```bash
   npm run db:seed
   ```

5. **Run**:
   ```bash
   npm run dev          # http://localhost:3000
   ```
   Admin panel: **/admin/login** (default seed login: `admin@justbeginyoga.in` / `ChangeMe123!` — change it).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run db:push` | Create/update MySQL tables from `prisma/schema.prisma` |
| `npm run db:seed` | Seed admin + blog posts |
| `npm run db:studio` | Visual DB browser |

After any change to `prisma/schema.prisma`, run `npx prisma generate` (or `npm run db:push`).

---

## Deploying to cPanel / shared hosting (Node.js app + MySQL)

1. In cPanel, create a **MySQL database** + user, note the connection details.
2. Create a **Node.js App** (Node 18+), application root = this folder.
3. Add **environment variables** in the cPanel Node app UI (same keys as `.env.example`):
   - `DATABASE_URL=mysql://USER:PASS@HOST:3306/DBNAME`
   - `ADMIN_SESSION_SECRET=...`
   - `NEXT_PUBLIC_SITE_URL=https://yourdomain`
   - the `SEED_ADMIN_*` values
4. From the app's terminal:
   ```bash
   npm install
   npm run db:push      # creates the tables
   npm run db:seed      # first admin + articles  (run once)
   npm run build
   ```
5. Set the start command to `npm start` and restart.

> The app connects to MySQL purely in JavaScript (mariadb driver) — no Prisma engine binary is needed at runtime, which is what makes it shared-hosting friendly. The Prisma CLI (`db:push`, `db:seed`, `studio`) is only used during setup.

### Deploying to Vercel
Set the same env vars, point `DATABASE_URL` at a managed MySQL (PlanetScale, Railway, etc.), and run `db:push` + `db:seed` once against that database. `postinstall` handles `prisma generate`.

---

## Project structure

```
prisma/
  schema.prisma        Admin, BlogPost, GalleryImage, Video, ContactEnquiry, GroupEnquiry
  seed.ts              admin + 3 SEO articles (back-linked) + 9 gallery images
prisma.config.ts       Prisma 7 datasource/config (URL lives here, not in schema)
src/
  app/
    (site)/            public site — home, about, services, faq, blog, gallery, videos, contact, group-classes
    admin/
      login/           sign-in
      (protected)/     guarded: dashboard, blog / gallery / video CRUD, contact + group enquiries
      actions.ts       login/logout
    actions/enquiries.ts  public form submissions
    api/razorpay/      order + verify route handlers (inert until enabled)
    sitemap.ts, robots.ts
  components/          SiteHeader, SiteFooter, forms, admin UI, GalleryGrid, VideoGallery,
                       Analytics (GA4), RazorpayButton
  lib/                 db (Prisma client + adapter), auth, blog / gallery / video queries,
                       razorpay config, site config
```

Brand tokens (colours, fonts) live in `src/app/globals.css` and `src/lib/site.ts`.
