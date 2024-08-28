import { env } from "~/env.mjs";
import { SubscriptionPlanTranslation } from "./generate-pricing";
import pricingData from "./stripe-pricing.json";

export const priceDataMap: Record<string, SubscriptionPlanTranslation[]> =
  pricingData;

/*
export const priceDataMap: Record<string, SubscriptionPlanTranslation[]> = {
  "en": [
    {
      "id": "business",
      "title": "Enterprise",
      "description": "AI that suits your needs.",
      "benefits": [
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
        "Support custom-made and private best practice's workflows"
      ],
      "limitations": [],
      "currencySign": "$",
      "prices": {
        "monthly": null,
        "yearly": null
      },
      "stripeIds": {
        "monthly": null,
        "yearly": null
      },
      "createLocaleData": {}
    },
    {
      "id": "pro",
      "title": "Pro-business",
      "description": "The best AI offer for professional",
      "benefits": [
        "Select automatically the best AI model",
        "Privacy & Trust by default",
        "Chat capability for the User Experience",
        "Limit to 100 requests per day",
        "Advanced analytics and reporting",
        "Access to business templates",
        "Priority customer support"
      ],
      "limitations": [
        "Support Substantifik best practices workflow",
        "Limited access to business resources"
      ],
      "currencySign": "$",
      "prices": {
        "monthly": 39.95,
        "yearly": 399
      },
      "stripeIds": {
        "monthly": "price_1Pln4wRomOsbKybGSJCfNQEU",
        "yearly": "price_1Pln67RomOsbKybG36hBuhqv"
      },
      "createLocaleData": {
        "monthly": null,
        "yearly": null
      }
    },
    {
      "id": "starter",
      "title": "Starter",
      "description": "Starter Offer - Get the best of AI.",
      "benefits": [
        "Select automatically the best AI model",
        "Privacy & Trust by default",
        "Chat capability for the User Experience",
        "Limit to 30 requests per day"
      ],
      "limitations": [
        "No priority access to new features",
        "Limited customer support\"",
        "Limited access to business resources"
      ],
      "currencySign": "$",
      "prices": {
        "monthly": 19.95,
        "yearly": 199
      },
      "stripeIds": {
        "monthly": "price_1Pln3KRomOsbKybGfAn7XXDR",
        "yearly": "price_1Pln5fRomOsbKybGGQUoMb3k"
      },
      "createLocaleData": {
        "monthly": null,
        "yearly": null
      }
    }
  ],
  "fr": [
    {
      "id": "business",
      "title": "Enterprise",
      "description": "AI that suits your needs.",
      "benefits": [
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
        "Support custom-made and private best practice's workflows"
      ],
      "limitations": [],
      "currencySign": "€",
      "prices": {
        "monthly": null,
        "yearly": null
      },
      "stripeIds": {
        "monthly": null,
        "yearly": null
      },
      "createLocaleData": {}
    },
    {
      "id": "pro",
      "title": "Pro-business",
      "description": "The best AI offer for professional",
      "benefits": [
        "Select automatically the best AI model",
        "Privacy & Trust by default",
        "Chat capability for the User Experience",
        "Limit to 100 requests per day",
        "Advanced analytics and reporting",
        "Access to business templates",
        "Priority customer support"
      ],
      "limitations": [
        "Support Substantifik best practices workflow",
        "Limited access to business resources"
      ],
      "currencySign": "€",
      "prices": {
        "monthly": 39.95,
        "yearly": 399
      },
      "stripeIds": {
        "monthly": "price_1Pln4wRomOsbKybGSJCfNQEU",
        "yearly": "price_1Pln67RomOsbKybG36hBuhqv"
      },
      "createLocaleData": {
        "monthly": null,
        "yearly": null
      }
    },
    {
      "id": "starter",
      "title": "Starter",
      "description": "Starter Offer - Get the best of AI.",
      "benefits": [
        "Select automatically the best AI model",
        "Privacy & Trust by default",
        "Chat capability for the User Experience",
        "Limit to 30 requests per day"
      ],
      "limitations": [
        "No priority access to new features",
        "Limited customer support\"",
        "Limited access to business resources"
      ],
      "currencySign": "€",
      "prices": {
        "monthly": 19.95,
        "yearly": 199
      },
      "stripeIds": {
        "monthly": "price_1Pln3KRomOsbKybGfAn7XXDR",
        "yearly": "price_1Pln5fRomOsbKybGGQUoMb3k"
      },
      "createLocaleData": {
        "monthly": null,
        "yearly": null
      }
    }
  ],
  "de": [
    {
      "id": "business",
      "title": "Enterprise",
      "description": "AI that suits your needs.",
      "benefits": [
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
        "Support custom-made and private best practice's workflows"
      ],
      "limitations": [],
      "currencySign": "€",
      "prices": {
        "monthly": null,
        "yearly": null
      },
      "stripeIds": {
        "monthly": null,
        "yearly": null
      },
      "createLocaleData": {}
    },
    {
      "id": "pro",
      "title": "Pro-business",
      "description": "The best AI offer for professional",
      "benefits": [
        "Select automatically the best AI model",
        "Privacy & Trust by default",
        "Chat capability for the User Experience",
        "Limit to 100 requests per day",
        "Advanced analytics and reporting",
        "Access to business templates",
        "Priority customer support"
      ],
      "limitations": [
        "Support Substantifik best practices workflow",
        "Limited access to business resources"
      ],
      "currencySign": "€",
      "prices": {
        "monthly": 39.95,
        "yearly": 399
      },
      "stripeIds": {
        "monthly": "price_1Pln4wRomOsbKybGSJCfNQEU",
        "yearly": "price_1Pln67RomOsbKybG36hBuhqv"
      },
      "createLocaleData": {
        "monthly": null,
        "yearly": null
      }
    },
    {
      "id": "starter",
      "title": "Starter",
      "description": "Starter Offer - Get the best of AI.",
      "benefits": [
        "Select automatically the best AI model",
        "Privacy & Trust by default",
        "Chat capability for the User Experience",
        "Limit to 30 requests per day"
      ],
      "limitations": [
        "No priority access to new features",
        "Limited customer support\"",
        "Limited access to business resources"
      ],
      "currencySign": "€",
      "prices": {
        "monthly": 19.95,
        "yearly": 199
      },
      "stripeIds": {
        "monthly": "price_1Pln3KRomOsbKybGfAn7XXDR",
        "yearly": "price_1Pln5fRomOsbKybGGQUoMb3k"
      },
      "createLocaleData": {
        "monthly": null,
        "yearly": null
      }
    }
  ],
  "es": [
    {
      "id": "business",
      "title": "Enterprise",
      "description": "AI that suits your needs.",
      "benefits": [
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
        "Support custom-made and private best practice's workflows"
      ],
      "limitations": [],
      "currencySign": "€",
      "prices": {
        "monthly": null,
        "yearly": null
      },
      "stripeIds": {
        "monthly": null,
        "yearly": null
      },
      "createLocaleData": {}
    },
    {
      "id": "pro",
      "title": "Pro-business",
      "description": "The best AI offer for professional",
      "benefits": [
        "Select automatically the best AI model",
        "Privacy & Trust by default",
        "Chat capability for the User Experience",
        "Limit to 100 requests per day",
        "Advanced analytics and reporting",
        "Access to business templates",
        "Priority customer support"
      ],
      "limitations": [
        "Support Substantifik best practices workflow",
        "Limited access to business resources"
      ],
      "currencySign": "€",
      "prices": {
        "monthly": 39.95,
        "yearly": 399
      },
      "stripeIds": {
        "monthly": "price_1Pln4wRomOsbKybGSJCfNQEU",
        "yearly": "price_1Pln67RomOsbKybG36hBuhqv"
      },
      "createLocaleData": {
        "monthly": null,
        "yearly": null
      }
    },
    {
      "id": "starter",
      "title": "Starter",
      "description": "Starter Offer - Get the best of AI.",
      "benefits": [
        "Select automatically the best AI model",
        "Privacy & Trust by default",
        "Chat capability for the User Experience",
        "Limit to 30 requests per day"
      ],
      "limitations": [
        "No priority access to new features",
        "Limited customer support\"",
        "Limited access to business resources"
      ],
      "currencySign": "€",
      "prices": {
        "monthly": 19.95,
        "yearly": 199
      },
      "stripeIds": {
        "monthly": "price_1Pln3KRomOsbKybGfAn7XXDR",
        "yearly": "price_1Pln5fRomOsbKybGGQUoMb3k"
      },
      "createLocaleData": {
        "monthly": null,
        "yearly": null
      }
    }
  ],
  "ch": [
    {
      "id": "business",
      "title": "Enterprise",
      "description": "AI that suits your needs.",
      "benefits": [
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
        "Support custom-made and private best practice's workflows"
      ],
      "limitations": [],
      "currencySign": "CHF",
      "prices": {
        "monthly": null,
        "yearly": null
      },
      "stripeIds": {
        "monthly": null,
        "yearly": null
      },
      "createLocaleData": {}
    },
    {
      "id": "pro",
      "title": "Pro-business",
      "description": "The best AI offer for professional",
      "benefits": [
        "Select automatically the best AI model",
        "Privacy & Trust by default",
        "Chat capability for the User Experience",
        "Limit to 100 requests per day",
        "Advanced analytics and reporting",
        "Access to business templates",
        "Priority customer support"
      ],
      "limitations": [
        "Support Substantifik best practices workflow",
        "Limited access to business resources"
      ],
      "currencySign": "CHF",
      "prices": {
        "monthly": 39.95,
        "yearly": 399
      },
      "stripeIds": {
        "monthly": "price_1Pln4wRomOsbKybGSJCfNQEU",
        "yearly": "price_1Pln67RomOsbKybG36hBuhqv"
      },
      "createLocaleData": {
        "monthly": null,
        "yearly": null
      }
    },
    {
      "id": "starter",
      "title": "Starter",
      "description": "Starter Offer - Get the best of AI.",
      "benefits": [
        "Select automatically the best AI model",
        "Privacy & Trust by default",
        "Chat capability for the User Experience",
        "Limit to 30 requests per day"
      ],
      "limitations": [
        "No priority access to new features",
        "Limited customer support\"",
        "Limited access to business resources"
      ],
      "currencySign": "CHF",
      "prices": {
        "monthly": 19.95,
        "yearly": 199
      },
      "stripeIds": {
        "monthly": "price_1Pln3KRomOsbKybGfAn7XXDR",
        "yearly": "price_1Pln5fRomOsbKybGGQUoMb3k"
      },
      "createLocaleData": {
        "monthly": null,
        "yearly": null
      }
    }
  ]
}
;


*/
