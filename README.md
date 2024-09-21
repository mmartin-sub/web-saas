# Substantifik

The first is that we have a single interface for interacting with multiple large language model providers. This means that users can easily switch between different models without having to learn new APIs or authentication mechanisms.

An easy-to-use and enterprise-grade (Next.js boilerplate)[https://github.com/ixartz/Next-js-Boilerplate].
Fork from [SaasFly](https://github.com/saasfly/saasfly)

## ⭐ Features

On top of the fork:

- Crowdin support including github action.
- add @neondatabase/serverless driver

## Recommendations

- Install [Stripe Cli client](https://docs.stripe.com/stripe-cli) and [completion](https://docs.stripe.com/stripe-cli/autocomplete)
- in github, setup some secret (see workflows)
- install i18next-scanner/i18next-scanner-typescript (i.e. `bun run 18next:scanner`)

## Install

### for Dev

```
bun db:push
bun run build
bun dev
```

### for prod

```
bun db:push:prod
```

## Setup

- i18n [config](apps/nextjs/src/config/i18n-config.ts)
- Crowdin steps, see [documentation](https://docusaurus.io/docs/i18n/crowdin)
- update FAQ from [price-faq-data.ts]£(apps/nextjs/src/config/price/price-faq-data.ts)
- extra documentation from (https://docs.saasfly.io/get-started/)[saasfly]

## Todo

- [ ] Need to support i18n for the .md or.mdx files for Contentlayer
- [ ] Integrate Cloudinary/Imgix or other image optimizer
- [ ] `bun run crowdin` not using the .env.local data while it seems there. at least crowdin is confused; maybe it is an EXPORT issue?
- [ ] Automate and optimize the translation process (using i18next-scanner or [i18n-js](https://github.com/fnando/i18n-js))
- [ ] Script to deploy dev, stage and prod with proper stripe connexion
- [ ] Setup name of the company, website and email from dict so it is easier to deploy to multiple domains (i.e. using more siteConfig.url)
- [ ] Review cors setup
- [ ] Remove k8s references
- [ ] Create a sitemap for robots.ts
- [ ] Load the price from stripe dynamically at build time so it stays cached versus static one and support multiple currencies
- [ ] Make apps/nextjs/src/components/typewriterEffectSmooth.tsx working with a long string versus manual split.
- [x] Review the logos (apps/nextjs/src/app/layout.tsx) and svg to work in dark and light mode.
- [ ] Update the review from apps/nextjs/src/components/comments.tsx based on actual twitter and comments from database. Show the number of hashtags based on input
- [ ] Add errors, not-found, global-error and other specific pages related to [NextJS routing](https://nextjs.org/docs/app/building-your-application/routing)
- [ ] Improve dynamic routing for (pages)/external for terms and privacy so UI looks better with headers and footers
- [ ] Add apply job, use cases sections (Uses cases per industry), terms and privacy link from footer
- [x] Many lint issue about any to clean-up from upstream
- [ ] Review dict variable types <Record> across code base
- [ ] Review stripe-pricing.json, so benefits and limitations can be translated with crowdin, need to extract sub-piece of the json.
- [ ] Propose Resend and other provider through (nodemailer)[https://community.nodemailer.com]
- [ ] Add a GDPR banner such as : We use tracking cookies to understand how you use the product and help us improve it! Please accept cookies to help us improve. if cookie is sent for tracking (not the case today)
- [ ] setup test scenario as per [https://authjs.dev/guides/testing] or Cypress
- [ ] Review the color using the browser extennsion from (Designer GUI)[https://www.designgui.io/]
- [ ] Review best practices from https://www.youtube.com/@WebDevEducation/featured
- [ ] Create a env.d.ts/env.mjs that support interface ProcessEnv and complete missing ones; review (T3 env)[https://env.t3.gg/docs/core]
- [ ] Split the DB connection url between the authentification, session and other activities (different schema/user credentials at the minimum). The best would be to move some production activities to a different url such as: api.example.com
- [ ] Need to define a signOut page and workflow for logout - handleSignOut
- [ ] Review the i18n integration and leverage next or React components, see Trans options within:
- [ ] add RSS for the (blog posts)[https://javascript.plainenglish.io/generate-an-rss-feed-for-your-next-js-website-ce921e2d04c6], other options from [https://news.ycombinator.com/item?id=41499905]

### UI

- [ ] Review how (shadcn)[https://ui.shadcn.com/docs/] is installed as it seems the code was copied without installing properly the lib; `bunx --bun shadcn-ui@latest add alert` is not working as expected.
- [ ] Review (RapidPages)[https://designer.rapidpages.com/] for quick mockup and module design

#### Emails

- [ ] refactor the code so the email piece and the templates and puut aside of the authentification module.
- [ ] Different API - Resend Key / from-email fields/ template could exist for dev and prod

#### Payments

- [ ] Refactor Stripe code to move products and prices from one env to another.
- [x] Refactor code for capture the pricing information and load them on the web page or internally, so the proper configuration is coming from env
- [ ] Stripe events source should come form package: https://github.com/kgajera/stripe-event-types and not be embeded directly
- [ ] Features and marketing information is coming from stripe in english only, it should be translated accordingly.
- [ ] Create a default variable STRIPE_CURRENCY
- [ ] Integrate or leverage (Next Store)[https://github.com/yournextstore/yournextstore], this is more for product but maybe stripe backend if better?

#### Authentification

What to review:

- [ ] See youtube video to review what can be done: https://www.youtube.com/watch?v=TLGFTH4s_0Y, see source from: https://github.com/DaliGabriel/NextAuthExample
- [ ] Review https://zenstack.dev/docs/guides/authentication/next-auth for good approach to use PrismaDialect and Credentials instead. Seems "easy" to implement.
- [ ] Possibly review the JWT token approach (https://github.com/nextauthjs/next-auth/issues/11295)
- [ ] If email service of DB service is delayed, details should be logged and users advised to wait as "the side is under scheduled maintenance and further details for the authentification migth be delayed"
- [ ] Implement Authentification with login/passswword, see youtube https://www.youtube.com/watch?v=v6TPcU23wP8 and: https://github.com/github/vscode-github-actions/issues/222
- [ ] Verification link is a bad design, code should be better so user could check the code in one device and keep going with a different. Need to implement this change.

#### Logging capability

- [ ] replace console.log or console.debug within the code with external service for logging purposes. for error messages, need to raise a notification; maybe one maximum per hour/day
- [ ] Include prisma logging into the main logging subsystem

### SVG

- [ ] check if needed to add attributes:
  - aria-hidden="true"
  - focusable="false"
- [ ] Replace SVG by ReactComponent using (blog)[https://medium.com/@luanvuonggia/how-to-change-the-color-of-svg-image-in-reactjs-689333cf76eb]

#### Review web sites

- [ ] Validate Production-ready scores in (Lighthouse)[https://web.dev/measure/] and (PageSpeed Insights reports)[https://pagespeed.web.dev/].
- [ ] Review 404 pages based on exmaple from: https://floatui.com/components/404-pages

## Known issues

- [ ] Stripe web-hooks should return 200 as fast as possible, leverage sub/pub approach to do DB work async
- [ ] If Resend is sending an error, it is not cached
- [x] <p> cannot be a descendant of <p> from TypewriterEffectSmooths/TypewriterEffectImpl animation; the code is different to the source code for this component.
- [ ] upgrade missing dependencies (see ncu -ws) - turbo
- [ ] in package/stripe (packages/api/src/router/stripe.ts) access to json should be in different place and coming frokk prodä/dev approach
- [ ] there are some dict.common! for exmple in the code, not sure why ! is needed
- [ ] Create an account (register page) should have sign-up button, not Login with email
- [ ] Github auth was not working, code has been removed
- [ ] (Link preview)[https://linkpreview.xyz/] reports preview of web site with logo not centered properly

## Extra Documentation

- tooling/tailwind-config/index.ts: tailwind extra configuration
- testing stripe can be done using test credit card number, see: https://docs.stripe.com/testing

## Production

- bun install --production for proper install

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
