// @ts-ignore
// @ts-nocheck
"use client";

import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  useState,
} from "react";
import Link from "next/link";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Balancer from "react-wrap-balancer";

import { Alert, AlertDescription, AlertTitle } from "@saasfly/ui/alert";
import { Button, buttonVariants } from "@saasfly/ui/button";
import * as Icons from "@saasfly/ui/icons";
import { Switch } from "@saasfly/ui/switch";

import { BillingFormButton } from "~/components/price/billing-form-button";
import { priceDataMap } from "~/config/price/price-data";
import { useSigninModal } from "~/hooks/use-signin-modal";
import * as constp from "~/lib/constants";
import { UserSubscriptionPlan } from "~/types";

//import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface PricingCardsProps {
  userId?: string;
  subscriptionPlan?: UserSubscriptionPlan;
  dict: typeof Dictionary.price;
  params: {
    lang: string;
  };
}

interface InformationalBannerProps {
  messageHeader: string;
  messageText: string;
}
const InformationalBanner: React.FC<InformationalBannerProps> = ({
  messageHeader,
  messageText,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div
          id="informational-banner"
          tabindex="-1"
          class="fixed start-0 top-0 z-50 flex w-full flex-col justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700 md:flex-row"
        >
          <div class="mb-4 md:mb-0 md:me-4">
            <h2 class="mb-1 text-base font-semibold text-gray-900 dark:text-white">
              {messageHeader}
            </h2>
            <p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
              {messageText}
            </p>
          </div>
          {/* Source from https://flowbite.com/docs/components/banner/
           */}
          <div class="flex flex-shrink-0 items-center">
            <button
              data-dismiss-target="#informational-banner"
              type="button"
              class="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleClose}
            >
              <svg
                class="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close banner</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export function PricingCards({
  userId,
  subscriptionPlan,
  dict,
  params: { lang },
}: PricingCardsProps) {
  const isYearlyDefault = true;
  const [isYearly, setIsYearly] = useState<boolean>(isYearlyDefault);
  const signInModal = useSigninModal();
  const pricingData = priceDataMap[lang];
  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };
  return (
    <section className="container flex flex-col items-center text-center">
      <div className="mx-auto mb-10 flex w-full flex-col gap-5">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          {dict.pricing}
        </p>
        <h2 className="font-heading text-3xl leading-[1.1] md:text-5xl">
          {dict.slogan}
        </h2>

        <InformationalBanner
          messageHeader={dict.notice_limited}
          messageText={dict.notice_limited_long}
        />

        {/* Source from https://flowbite.com/docs/components/banner/


        <Alert variant="warning">
      <ExclamationTriangleIcon className="h-8 w-8" />
      <AlertTitle>{dict.notice_limited}</AlertTitle>
      <AlertDescription>
      {dict.notice_limited_long}
      </AlertDescription>
    </Alert>
        */}
      </div>

      <div className="mb-4 flex items-center gap-5">
        <span>{dict.monthly_bill}</span>
        <Switch
          checked={isYearly}
          onCheckedChange={toggleBilling}
          role="switch"
          aria-label="switch-year"
        />
        <span>{dict.annual_bill}</span>
      </div>

      <div className="mx-auto grid max-w-screen-lg gap-5 bg-inherit py-5 md:grid-cols-3 lg:grid-cols-3">
        {pricingData
          .sort((a, b) => a.position - b.position)
          .map(
            (offer: {
              title:
                | boolean
                | Key
                | ReactElement
                | Iterable
                | PromiseLikeOfReactNode
                | null
                | undefined;
              prices: {
                monthly:
                  | string
                  | number
                  | boolean
                  | ReactElement
                  | Iterable
                  | PromiseLikeOfReactNode
                  | null
                  | undefined;
                yearly: number;
              };
              benefits: any[];
              limitations: any[];
              currencySign: string;
              id: string;
              position: number;
            }) => (
              <div
                className="relative flex flex-col overflow-hidden rounded-xl border"
                key={offer?.title}
              >
                <div className="min-h-[150px] items-start space-y-4 bg-secondary/70 p-6">
                  <p className="font-urban flex text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    {offer?.title}
                  </p>

                  <div className="flex flex-row">
                    <div className="flex items-end">
                      <div className="flex text-left text-3xl font-semibold leading-6">
                        {offer?.prices?.monthly === 0 ? (
                          <span>{dict.free}</span>
                        ) : isYearly && offer?.prices?.monthly > 0 ? (
                          <>
                            <span className="mr-2 text-muted-foreground line-through">
                              {offer?.currencySign}
                              {offer?.prices?.monthly.toFixed(2)}
                            </span>
                            <span>
                              {offer?.currencySign}
                              {(offer?.prices?.yearly / 12).toFixed(2)}
                            </span>
                          </>
                        ) : offer?.prices?.monthly != null ? (
                          `${offer?.currencySign}${offer?.prices?.monthly.toFixed(2)}`
                        ) : (
                          `${dict.contact_us}`
                        )}
                      </div>
                      <div className="-mb-1 ml-2 text-left text-sm font-medium">
                        <div>
                          {offer?.prices?.monthly != null ? `${dict.mo}` : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  {offer?.prices?.monthly > 0 ? (
                    <div className="text-left text-sm text-muted-foreground">
                      {isYearly
                        ? `${offer?.currencySign}${offer?.prices?.yearly} ${dict.annual_info}`
                        : offer?.prices?.monthly != null
                          ? `${dict.monthly_info}`
                          : null}
                    </div>
                  ) : null}
                </div>

                <div className="flex h-full flex-col justify-between gap-16 p-6">
                  <ul className="space-y-2 text-left text-sm font-medium leading-normal">
                    {offer?.benefits.map((feature) => (
                      <li className="flex items-start" key={feature}>
                        <Icons.Check className="mr-3 h-5 w-5 shrink-0" />
                        <p>{feature}</p>
                      </li>
                    ))}

                    {offer?.limitations?.length > 0 &&
                      offer.limitations.map((feature) => (
                        <li
                          className="flex items-start text-muted-foreground"
                          key={feature}
                        >
                          <Icons.Close className="mr-3 h-5 w-5 shrink-0" />
                          <p>{feature}</p>
                        </li>
                      ))}
                  </ul>

                  {userId && subscriptionPlan ? (
                    offer?.price?.monthly === 0 ? (
                      <Link
                        href="/dashboard"
                        className={buttonVariants({
                          className: "w-full",
                          variant: "default",
                        })}
                      >
                        {dict.go_to_dashboard}
                      </Link>
                    ) : (
                      <BillingFormButton
                        year={isYearly}
                        offer={offer}
                        subscriptionPlan={subscriptionPlan}
                        allowBuy={constp.ALLOW_BUY}
                        dict={dict}
                      />
                    )
                  ) : (
                    <Link href={`/${lang}/register`}>
                      <Button onClick={signInModal.onOpen}>
                        {dict.signup}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ),
          )}
      </div>

      <p className="mt-3 text-center text-base text-muted-foreground">
        <Balancer>
          Email{" "}
          <a
            className="font-medium text-primary hover:underline"
            href="mailto:support@substantifik.com"
          >
            support@substantifik.com
          </a>{" "}
          {dict.contact}
          <br />
          <strong>{dict.contact_2}</strong>
        </Balancer>
      </p>
    </section>
  );
}
