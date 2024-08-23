import { env } from "~/env.mjs";

interface SubscriptionPlanTranslation {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  limitations: string[];
  currencySign: string;
  prices: {
    monthly: number;
    yearly: number;
  };
  stripeIds: {
    monthly: string | null;
    yearly: string | null;
  };
}

export const priceDataMap: Record = {
  en: [
    {
      id: "starter",
      title: "Starter",
      description: "For Beginners",
      benefits: [
        "Select automatically the best AI model",
        "Privacy & Trust by default",
        "Chat capability for the User Experience",
        "Limit to 30 requests per day",
      ],
      limitations: [
        "No priority access to new features",
        "Limited customer support",
        "Limited access to business resources",
      ],
      currencySign: "$",
      prices: {
        monthly: 0,
        yearly: 0,
      },
      stripeIds: {
        monthly: env.NEXT_PUBLIC_STRIPE_STD_MONTHLY_PRICE_ID!,
        yearly: env.NEXT_PUBLIC_STRIPE_STD_YEARLY_PRICE_ID!,
      },
    },
    {
      id: "pro",
      title: "Pro",
      description: "Unlock Advanced Features",
      benefits: [
        "Select automatically the best AI model",
        "Privacy & Trust by default",
        "Chat capability for the User Experience",
        "Limit to 100 requests per day",
        "Advanced analytics and reporting",
        "Access to business templates",
        "Priority customer support",
      ],
      limitations: [
        "Support Substantifik best practices workflow",
        "Limited access to business resources",
      ],
      currencySign: "$",
      prices: {
        monthly: 30,
        yearly: 288,
      },
      stripeIds: {
        monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID!,
        yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID!,
      },
    },
    {
      id: "business",
      title: "Business",
      description: "For Power Users",
      benefits: [
        "Select automatically the best AI model",
        "Privacy & Trust by default",
        "Chat capability for the User Experience",
        "Limit to 500 requests per day",
        "Access to all templates, including custom branding",
        "Assigned account manager and business support team",
        "Personalized configuration and account management",
        "Exclusive webinars and training",
        "SSO and other enterprise audit capabilities",
        "Cloud, private or hybrid hosting options",
        "Support custom-made and private best practice's workflows",
      ],
      limitations: [],
      currencySign: "$",
      prices: {
        monthly: 60,
        yearly: 600,
      },
      stripeIds: {
        monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PRICE_ID!,
        yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PRICE_ID!,
      },
    },
  ],
};
