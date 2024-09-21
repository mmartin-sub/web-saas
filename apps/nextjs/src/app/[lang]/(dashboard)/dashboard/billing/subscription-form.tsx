"use client";

import Link from "next/link";

import { cn } from "@saasfly/ui";
import { buttonVariants } from "@saasfly/ui/button";

import { Dictionary } from "~/lib/get-dictionary";

export function SubscriptionForm(props: {
  hasSubscription: boolean;
  dict: Dictionary["business_billing"];
}) {
  return (
    <Link href="/pricing" className={cn(buttonVariants())}>
      {props.hasSubscription
        ? props.dict.manage_subscription
        : props.dict.upgrade}
    </Link>
  );
}
