import { unstable_noStore as noStore } from "next/cache";

import { db } from "@saasfly/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  mySubscription: protectedProcedure.query(async (opts) => {
    noStore();
    const userId = opts.ctx.userId as string;

//    console.log('Check Customer--');
    const customer = await db
      .selectFrom("Customer")
      .select(["plan", "stripeCurrentPeriodEnd"])
      .where("authUserId", "=", userId)
      .executeTakeFirst();

    if (!customer) return null;

    console.log('Actual plan: ', customer.plan);
    console.log('Valid until: ', customer.stripeCurrentPeriodEnd);

    return {
      plan: customer.plan,
      endsAt: customer.stripeCurrentPeriodEnd,
    };
  }),
});
