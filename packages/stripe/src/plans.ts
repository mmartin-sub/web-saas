import { SubscriptionPlan } from "@saasfly/db";

import { env } from "./env.mjs";

// const priceDataMap: Record<string, SubscriptionPlan[]> = {};

import priceDataMap from "./../../api/src/router/stripe-pricing-prod.json";

// We load the 'en' default one to get the mapping
const transformedPlans = priceDataMap.en.reduce((acc, plan) => {
  const planType = plan.id.toUpperCase() as PlanType;

  if (plan.stripeIds.monthly) {
    acc[plan.stripeIds.monthly] = planType;
    acc[plan.stripeIds.yearly] = planType;
  }
  return acc;
}, {} as Record<string, PlanType>);


export const PLANS: Record<
  string,
  (typeof SubscriptionPlan)[keyof typeof SubscriptionPlan]
> = transformedPlans;

type PlanType = (typeof SubscriptionPlan)[keyof typeof SubscriptionPlan];

// @warning: not sure it is working as expected:
// SubscriptionPlan.BUSINESS has no price (custom) and it should not be maopped to free (price is 0)

// getSubscriptionPlan returns the corresponding subscription plan based on the provided priceId
export function getSubscriptionPlan(priceId: string | undefined): PlanType {
  return priceId && PLANS[priceId] ? PLANS[priceId]! : SubscriptionPlan.FREE;
}
