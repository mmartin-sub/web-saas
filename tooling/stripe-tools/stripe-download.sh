#!/bin/sh

stripe products list --expand data.default_price --api-key $1 > apps/nextjs/src/config/price/products.json
stripe prices list --expand=data.currency_options --api-key $1 > apps/nextjs/src/config/price/prices.json
bun run apps/nextjs/src/config/price/generate-pricing.js > apps/nextjs/src/config/price/stripe-pricing.json
cp apps/nextjs/src/config/price/stripe-pricing.json apps/nextjs/src/config/price/stripe-pricing.prod.json
