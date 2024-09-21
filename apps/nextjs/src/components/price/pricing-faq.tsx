import Balancer from "react-wrap-balancer";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@saasfly/ui/accordion";

import type { Locale } from "~/config/i18n-config";
import { priceFaqDataMap } from "~/config/price/price-faq-data";
import { Dictionary } from "~/lib/get-dictionary";

export function PricingFaq({
  params: { lang },
  dict,
}: {
  params: {
    lang: Locale;
  };
  dict: Dictionary["price"];
}) {
  const pricingFaqData = priceFaqDataMap[lang];
  return (
    <section className="container max-w-3xl py-2">
      <div className="mb-14 space-y-6 text-center">
        <h1 className="font-heading text-center text-3xl md:text-5xl">
          <Balancer>{dict.faq}</Balancer>
        </h1>
        <p className="text-md text-muted-foreground">
          <Balancer>{dict.faq_detail}</Balancer>
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {pricingFaqData?.map(
          (faqItem: { id: string; question: string; answer: string }) => (
            <AccordionItem key={faqItem.id} value={faqItem.id}>
              <AccordionTrigger>{faqItem.question}</AccordionTrigger>
              <AccordionContent>{faqItem.answer}</AccordionContent>
            </AccordionItem>
          ),
        )}
      </Accordion>
    </section>
  );
}
