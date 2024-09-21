import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  shared: {},
  server: {
    STRIPE_API_KEY: z.string(),
    WEBHOOK_SIGNING_SECRET: z.string().optional(),
  },
  client: {},
  // Client side variables gets destructured here due to Next.js static analysis
  // Shared ones are also included here for good measure since the behavior has been inconsistent
  experimental__runtimeEnv: {},
  skipValidation:
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",
});
