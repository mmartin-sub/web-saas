import fs from "fs";
import path from "path";

import { env } from "~/env.mjs";
import { SubscriptionPlan } from "~/types";

export const priceDataMap: Record<string, SubscriptionPlanTranslation[]> = {};

export interface SubscriptionPlanTranslation extends SubscriptionPlan {}

export const pathProduct = path.join(__dirname, "products.json");
export const pathPrice = path.join(__dirname, "prices.json");

// Read and parse JSON files
const productsData = JSON.parse(fs.readFileSync(pathProduct, "utf-8"));
const pricesData = JSON.parse(fs.readFileSync(pathPrice, "utf-8"));

// Additional data file for full descriptions and benefits
// const additionalData = JSON.parse(fs.readFileSync(path.join(__dirname, 'additional-product-data.json'), 'utf-8'));

// Currency filter configuration
const localeCurrencyFilter: Record<string, string> = {
  en: "usd",
  fr: "eur",
  de: "eur",
  es: "eur",
  ch: "chf",
  // Add more locales and their corresponding currencies here
  // e.g., fr: 'eur', de: 'eur', etc.
};

// Helper function to get benefits from metadata
const getBenefits = (product: any) => {
  const marketingFeatures =
    product.marketing_features?.map((feature: any) => feature.name) || [];
  const metadataBenefits = [];
  for (let i = 1; product.metadata[`benefit_${i}`]; i++) {
    const benefit = product.metadata[`benefit_${i}`].trim();
    if (benefit) {
      metadataBenefits.push(benefit);
    }
  }
  return [...marketingFeatures, ...metadataBenefits];
};

// Helper function to get limitations from metadata
const getLimitations = (metadata: any) => {
  const limitations = [];
  for (let i = 1; metadata[`limitation_${i}`]; i++) {
    const limitation = metadata[`limitation_${i}`].trim();
    if (limitation) {
      limitations.push(limitation);
    }
  }
  return limitations;
};

// Helper function to find prices by product ID
const findPrices = (
  productId: string,
  options?: {
    currency?: string;
    interval?: string;
    active?: boolean;
  },
) => {
  return pricesData.data.filter((price: any) => {
    const matchesProduct = price.product === productId;
    const matchesCurrency =
      !options?.currency || price.currency === options.currency;
    const matchesInterval =
      !options?.interval || price.recurring?.interval === options.interval;
    const matchesActive =
      options?.active === undefined || price.active === options.active;

    return (
      matchesProduct && matchesCurrency && matchesInterval && matchesActive
    );
  });
};

// Helper function to get currency sign
const getCurrencySign = (currency: string) => {
  const currencySigns: Record<string, string> = {
    usd: "$",
    eur: "€",
    gbp: "£",
    chf: "CHF",
    // Add more currencies as needed
  };
  return currencySigns[currency.toLowerCase()] || currency.toUpperCase();
};

// Helper function to create price data for a specific locale
const createLocaleData = (locale: string): SubscriptionPlanTranslation[] => {
  /*
    console.log('Locale:', locale);
    console.log('LocaleCurrencyFilter:', localeCurrencyFilter);
   */

  const upperCurrencyFilter = (
    localeCurrencyFilter[locale] ||
    localeCurrencyFilter["en"] ||
    "usd"
  ).toUpperCase();

  /*
    console.log('CurrencyFilter:', upperCurrencyFilter);
    console.log('ProductsData length:', productsData.data?.length);
    */

  if (!productsData.data || productsData.data.length === 0) {
    console.error("productsData is empty or undefined");
    return [];
  }
  const result = productsData.data.map((product: any) => {
    const productId = product.metadata.product_id;
    const positionId = parseInt(product.metadata.position, 10) || undefined;

    // price_perProduct could be undefined if there is no price set (like for enterprise plan)
    const price_perProduct = findPrices(product.id);

    /*
            console.log('product Stripe ID:', product.id);
            console.log('productId (web key):', productId);

            console.log('Price per Product:', price_perProduct);
            console.log('we need prices for currency:', upperCurrencyFilter);
            console.log('p1:', price_perProduct.filter((price: any) => true));
            console.log('------');
            */
    const prices = price_perProduct.filter((price: any) => {
      // In the log will appear several times, for each period (monthly vs annualy)
      //          console.log('price options:', price.currency_options);
      // we need to use currency_options, because currency is more a default value
      return (
        price.currency.toUpperCase() === upperCurrencyFilter ||
        (price.currency_options &&
          Object.keys(price.currency_options)
            .map((key) => key.toUpperCase())
            .includes(upperCurrencyFilter))
      );
    });

    //   console.log('All price currencies:', price_perProduct.map(price => price.currency));
    /*
                    console.log('price currency:', price_perProduct[0]?.currency?.toUpperCase());
                    console.log('Price:', prices);
             console.log('trial_period_days:', price_perProduct[0]?.recurring?.trial_period_days);

                    */

    // if prices is empty, it is because there is no price for this currency, or not it is undefined
    // However, we still want to publish this dataset
    //      if (prices.length === 0) return null; // Skip products without prices in the specified currency

    const monthlyPrice = prices.find(
      (price: any) => price.recurring?.interval === "month",
    );
    const yearlyPrice = prices.find(
      (price: any) => price.recurring?.interval === "year",
    );

    /*
            * return objets
            console.log('monthlyPrice:', monthlyPrice);
            console.log('yearlyPrice:', yearlyPrice);
            yd= monthlyPrice?.recurring?.trial_period_days;
            */

    return {
      id: productId,
      title: product.name,
      description: product.description,
      benefits: getBenefits(product),
      limitations: getLimitations(product.metadata),
      currencySign: getCurrencySign(upperCurrencyFilter),
      position: positionId,
      prices: {
        monthly: monthlyPrice ? monthlyPrice.unit_amount / 100 : null,
        yearly: yearlyPrice ? yearlyPrice.unit_amount / 100 : null,
      },
      stripeIds: {
        monthly: monthlyPrice ? monthlyPrice.id : null,
        yearly: yearlyPrice ? yearlyPrice.id : null,
      },
      createLocaleData: {
        monthly: monthlyPrice?.recurring?.trial_period_days,
        yearly: yearlyPrice?.recurring?.trial_period_days,
      },
    };
  });
  //     .filter(Boolean) // Remove null entries (products without matching currency prices)
  //    console.log('R:', result);

  //   process.exit(0);
  return result;
};

Object.keys(localeCurrencyFilter).forEach((locale) => {
  priceDataMap[locale] = createLocaleData(locale);
});
