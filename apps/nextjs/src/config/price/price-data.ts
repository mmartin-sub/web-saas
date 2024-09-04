import { env } from "~/env.mjs";
import { SubscriptionPlanTranslation } from "./generate-pricing";
import pricingDataProd from "./stripe-pricing.prod.json";
import pricingDataDev from "./stripe-pricing.dev.json";

let pricingData: typeof pricingDataProd ; // | typeof pricingDataDev;

if (process.env.NODE_ENV === "development") {
 pricingData = pricingDataDev;
}
else
{
 pricingData = pricingDataProd;
}

// import pricingData from "./stripe-pricing.json";

export const priceDataMap: Record<string, SubscriptionPlanTranslation[]> =
  pricingData;
