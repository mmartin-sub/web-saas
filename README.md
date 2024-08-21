<div align="center" width="100%">
    <img src="./sub-logo.svg" width="128" alt="" />
</div>

# Substantifik </br>

An easy-to-use and enterprise-grade Next.js boilerplate.
Fork from [SaasFly](https://github.com/saasfly/saasfly)

## ⭐ Features

On top of the fork:

- Crowdin support including github action.
- add @neondatabase/serverless driver

## Recommendations

- Install [Stripe Cli client](https://docs.stripe.com/stripe-cli) and [completion](https://docs.stripe.com/stripe-cli/autocomplete)
- in github, setup some secret (see workflows)
- install i18next-scanner/i18next-scanner-typescript (i.e. `bun run 18next:scanner`)

## Setup

- i18n [config](apps/nextjs/src/config/i18n-config.ts)
- Crowdin steps, see [documentation](https://docusaurus.io/docs/i18n/crowdin)
- update FAQ from [price-faq-data.ts]£(apps/nextjs/src/config/price/price-faq-data.ts)

## Todo

- [ ] Need to support i18n for the .md or.mdx files for Contentlayer
- [ ] Integrate Cloudinary/Imgix or other image optimizer
- [ ] `bun run crowdin` not using the .env.local data while it seems there. at least crowdin is confused; maybe it is an EXPORT issue?
- [ ] Automate and optimize the translation process (using i18next-scanner or [i18n-js](https://github.com/fnando/i18n-js))
- [ ] Script to deploy dev, stage and prod with proper stripe coonnexion
- [ ] Setup name of the company, website and email from dict so it is easier to deploy to multiple domains (i.e. using more siteConfig.url)
- [ ] Review cors setup
- [ ] Remove k8s references
- [ ] Create a sitemap for robots.ts
- [ ] Load the price from stripe dynamically at build time so it stays cached versus static one and support multiple currencies
- [ ] Make apps/nextjs/src/components/typewriterEffectSmooth.tsx working with a long string versus manual split.
- [X] Review the logos (apps/nextjs/src/app/layout.tsx) and svg to work in dark and light mode.
- [ ] Update the review from apps/nextjs/src/components/comments.tsx based on actual twitter and comments from database. Show the number of hashtags based on input
- [ ] Add errors, not-found, global-error and other specific pages related to [NextJS routing](https://nextjs.org/docs/app/building-your-application/routing)
- [ ] Improve dynamic routing for (pages)/external for terms and privacy so UI looks better with headers and footers
- [ ] Add apply job, use cases sections (Uses cases per industry)
- [ ] Many lint issue about any to clean-up from upstream
## Known issues

[ ] Stripe webhooks should return 200 as fast as possible, leverage sub/pub approach to do DB work async
[ ] If Resend is sending an error, it is not catched

### 🐭 Frameworks

- **[Next.js](https://nextjs.org/)** - The React Framework for the Web (with **App Directory**)
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication for Next.js
- **[Kysely](https://kysely.dev/)** - The type-safe SQL query builder for TypeScript
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM for Node.js and TypeScript, used as a schema management tool
- **[React-email](https://react.email/)** - A React renderer for creating beautiful emails using React components

### 🐮 Platforms

- **[Vercel](https://vercel.com/)** – Deploy your Next.js app with ease
- **[Stripe](https://stripe.com/)** – Payment processing for internet businesses
- **[Resend](https://resend.com/)** – Email marketing platform for developers

### 🐯 Enterprise Features

- **[i18n](https://nextjs.org/docs/app/building-your-application/routing/internationalization)** - Support for internationalization
- **[SEO](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)** - Search engine optimization
- **[MonoRepo](https://turbo.build/)** - Monorepo for better code management
- **[T3 Env](https://env.t3.gg/)** - Manage your environment variables with ease

### 🐰 Data Fetching

- **[trpc](https://trpc.io/)** – End-to-end typesafe APIs made easy
- **[tanstack/react-query](https://react-query.tanstack.com/)** – Hooks for fetching, caching and updating asynchronous data in React

### 🐲 Global State Management

- **[Zustand](https://zustand.surge.sh/)** – Small, fast and scalable state management for React

### 🐒 UI

- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework for rapid UI development
- **[Shadcn/ui](https://ui.shadcn.com/)** – Re-usable components built using Radix UI and Tailwind CSS
- **[Framer Motion](https://framer.com/motion)** – Motion library for React to animate components with ease
- **[Lucide](https://lucide.dev/)** – Beautifully simple, pixel-perfect icons
- **[next/font](https://nextjs.org/docs/basic-features/font-optimization)** – Optimize custom fonts and remove external network requests for improved performance

### 🐴 Code Quality

- **[TypeScript](https://www.typescriptlang.org/)** – Static type checker for end-to-end type safety
- **[Prettier](https://prettier.io/)** – Opinionated code formatter for consistent code style
- **[ESLint](https://eslint.org/)** – Pluggable linter for Next.js and TypeScript
- **[Husky](https://typicode.github.io/husky)** – Git hooks made easy

### 🐑 Performance

- **[Vercel Analytics](https://vercel.com/analytics)** – Real-time performance metrics for your Next.js app
- **[bun.sh](https://bun.sh/)** – npm alternative for faster and more reliable package management

### 🐘 Database

- **[PostgreSQL](https://www.postgresql.org/)** – The world's most advanced open source database

## 📦 Apps and Packages

- `web`: The main Next.js application
- `ui`: Shared UI components
- `db`: Database schema and utilities
- `auth`: Authentication utilities
- `email`: Email templates and utilities

## 📜 License

This project is licensed under the MIT License. For more information, see the [LICENSE](./LICENSE) file.

## 🙏 Credits

This project is a fork from [SaasFly](https://github.com/saasfly/saasfly)
