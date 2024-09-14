import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

import { cn } from "@saasfly/ui";
import { buttonVariants } from "@saasfly/ui/button";
import * as Icons from "@saasfly/ui/icons";

import { ThemedSVG } from "~/components/loadsvg"
import { UserAuthForm } from "~/components/user-auth-form";
import type { Locale } from "~/config/i18n-config";
import { getDictionary } from "~/lib/get-dictionary";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function LoginPage({
  params: { lang },
}: {
  params: {
    lang: Locale;
  };
}) {
  const dict = await getDictionary(lang);
  const dictLogin=dict.login;
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href={`/${lang}`}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8",
        )}
      >
        <>
          <Icons.ChevronLeft className="mr-2 h-4 w-4" />
          {dictLogin.back}
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <ThemedSVG
              svgurl_light="/logo.svg"
              svgurl_dark="/logo/logo-blackbg.svg"
              className=""
              width={64}
              height={64}
              alt="logo"
              />
          <h1 className="text-2xl font-semibold tracking-tight">
            {dictLogin.welcome_back}
          </h1>
          <p className="text-sm text-muted-foreground">
            {dictLogin.signin_title}
          </p>
        </div>
        <UserAuthForm lang={lang} dictLogin={dictLogin} typeform="login"/>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href={`/${lang}/register`}
            className="hover:text-brand underline underline-offset-4"
          >
            {dictLogin.singup_title}
          </Link>
        </p>
      </div>
    </div>
  );
}
