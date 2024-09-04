"use client";

import { useTransition } from "react";

import { Button } from "@saasfly/ui/button";
import * as Icons from "@saasfly/ui/icons";

import { trpc } from "~/trpc/client";
import type { SubscriptionPlan, UserSubscriptionPlan } from "~/types";
import { Dictionary } from "~/lib/get-dictionary";

interface BillingFormButtonProps {
  offer: SubscriptionPlan;
  subscriptionPlan: UserSubscriptionPlan;
  allowbuy: boolean;
  year: boolean;
  dict: Dictionary["price"];
}

export function BillingFormButton({
  year,
  offer,
  dict,
  subscriptionPlan,
  allowbuy = true,
}: BillingFormButtonProps) {
  const [isPending, startTransition] = useTransition();

  // Stripe SDK requires a private key (createSession)
  async function createSession(planId: string) {
    const res = await trpc.stripe.createSession.mutate({ planId: planId });
    if (res?.url) window.location.href = res?.url;
  }

  const stripePlanId = year
    ? offer?.stripeIds?.yearly
    : offer?.stripeIds?.monthly;

  const stripeSessionAction = () =>
    startTransition(async () => await createSession(stripePlanId!));

  return (
    <Button
      variant="default"
      className="w-full"
      disabled={isPending || !allowbuy}
      onClick={stripeSessionAction}
    >
      {isPending ? (
        <>
          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" /> Loading...
        </>
      ) : (
        <>
          {subscriptionPlan.stripePriceId
            ? dict.manage_subscription
            : dict.upgrade}
        </>
      )}
    </Button>
  );
}
