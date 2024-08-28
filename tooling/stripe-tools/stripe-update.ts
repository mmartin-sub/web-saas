import dotenv from 'dotenv';
import Stripe from 'stripe';
import fs from 'fs';

import {  pathProduct, pathPrice } from "../../apps/nextjs/src/config/price/generate-pricing";
import { metadata } from '../../.history/apps/nextjs/src/app/[lang]/(dashboard)/dashboard/billing/page_20240823154414';

// Load environment variables from .env.production
dotenv.config({ path: './.env.production.local' });

type NonNullableKey<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

function removeNull<T extends Object>(data: T): NonNullableKey<T> {
  return JSON.parse(
    JSON.stringify(data, (_, value) => {
      return value === null ? undefined : value;
    })
  );
}

const stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY!);

const limitstripeAPI = 100;

const addKeyIfNotNullOrEmpty = (obj: any, key: string, value: any) => {
  if (value !== null && value !== undefined && value !== "") {
    obj[key] = value;
  }
};

const addKeyToProductForce = (product: Record<string, any>, key: string, value: any): Record<string, any> => {
    return {
      ...product,
      [key]: value
    };
};

const addKeyToProduct = (product: Record<string, any>, key: string, value: any): Record<string, any> => {
  if (value !== null && value !== undefined) {
    return {
      ...product,
      [key]: value
    };
  }
  return product;
};

async function importData() {

//  console.log('Path Product:', pathProduct);
  const products = JSON.parse(fs.readFileSync(pathProduct, 'utf-8'));
  const prices = JSON.parse(fs.readFileSync(pathPrice, 'utf-8'));

  for (const product of products.data) {
    // Check if the product already exists
    const existingProducts = await stripe.products.list({ limit: limitstripeAPI, active: true });
    const existingProduct = existingProducts.data.find(p => p.name === product.name);

    let newProduct: Stripe.Product;


const createProductObject  = (product: Stripe.ProductCreateParams) => {
  const result: any = {};
  addKeyIfNotNullOrEmpty(result, "name", product.name);
  addKeyIfNotNullOrEmpty(result, "description", product.description);
  addKeyIfNotNullOrEmpty(result, "active", product.active);
 //  addKeyIfNotNullOrEmpty(result, "attributes", product.attributes);
  //addKeyIfNotNullOrEmpty(result, "caption", product.caption);
  addKeyIfNotNullOrEmpty(result, "images", product.images);
  addKeyIfNotNullOrEmpty(result, "metadata", product.metadata);
  addKeyIfNotNullOrEmpty(result, "marketing_features", product.marketing_features);
  addKeyIfNotNullOrEmpty(result, "shippable", product.shippable);
  addKeyIfNotNullOrEmpty(result, "url", product.url);
  return result;
};

const newProductJson: Stripe.ProductCreateParams=createProductObject(product);
console.log('New Product:', newProductJson);

    if (existingProduct) {
      // Update the existing product
      // newProductJson (ProductCreateParams) is a superset of ProductUpdateParams
      newProduct = await stripe.products.update(existingProduct.id, newProductJson);
    } else {
      // Create a new product
      newProduct = await stripe.products.create(newProductJson);

    }

    const productPrices = prices.data.filter((price: any) => price.product === product.id);

    console.log('Product Prices:', productPrices);
    for (const price of productPrices) {
      // Check if the price already exists
      const existingPrices = await stripe.prices.list({ limit: limitstripeAPI, product: newProduct.id });
      const existingPrice = existingPrices.data.find(p => p.unit_amount === price.unit_amount && p.currency === price.currency);

      const removeUnitAmountFromCurrencyOptions = (price: Stripe.PriceCreateParams) => {
        if (!price.currency_options) {
          return price;
        }

        const hasNullUnitAmountDecimal = Object.values(price.currency_options).some(
          (option) => option.unit_amount_decimal === null
        );

        let updatedCurrencyOption:{
          [key: string]: Stripe.PriceCreateParams.CurrencyOptions  | null;
        } = Object.fromEntries(
          Object.entries(price.currency_options).map(([key, value]) => {
     // Remove some keys
            const { unit_amount, custom_unit_amount, ...rest } = value;
            return [key, rest];
          })
        );

        if (hasNullUnitAmountDecimal) {
          return {
            ...price,
            currency_options: null,
          };
        } else

        return {
          ...price,
          currency_options: updatedCurrencyOption,
        };
      };

      const updatedPrice = removeUnitAmountFromCurrencyOptions(price);

      if (updatedPrice?.currency_options === null) {
        console.log('skipped');
        null
      } else {

      const createPriceObject  = (price: Stripe.PriceCreateParams, product:Stripe.Product) => {
        const result: any = {};
        addKeyIfNotNullOrEmpty(result, "unit_amount", price.unit_amount);
        addKeyIfNotNullOrEmpty(result, "currency", price.currency);
        addKeyIfNotNullOrEmpty(result, "recurring", price.recurring);
        addKeyIfNotNullOrEmpty(result, "product", product.id);
        addKeyIfNotNullOrEmpty(result, "nickname", price.nickname);
        addKeyIfNotNullOrEmpty(result, "metadata", price.metadata);
        addKeyIfNotNullOrEmpty(result, "currency_options", price.currency_options);
        addKeyIfNotNullOrEmpty(result, "lookup_key", price.lookup_key);
        addKeyIfNotNullOrEmpty(result, "tax_behavior", price.tax_behavior);
        return result;
      };

      const createPriceJson: Stripe.PriceCreateParams=createPriceObject(updatedPrice, newProduct);

      console.log('Future Price:', createPriceJson);
      if (existingPrice) {
        // Update the existing price
        await stripe.prices.update(existingPrice.id, createPriceJson);
      } else {

        // Create a new price
        await stripe.prices.create(createPriceJson);
      }
    }
  }
  }
}

importData().catch(console.error);
