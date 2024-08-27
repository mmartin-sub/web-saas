import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@saasfly/ui";

import { ModeToggle } from "~/components/mode-toggle";

function getCopyrightText(dict: Record<string, Record<string, string>>) {
  const currentYear = new Date().getFullYear();
  const copyrightTemplate = String(dict.copyright);
  return copyrightTemplate?.replace("${currentYear}", String(currentYear));
}

export function SiteFooter({
  className,
  dict,
}: {
  className?: string;
  params: {
    lang: string;
  };

  dict: Record<string, Record<string, string>>;
}) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Image
            src="/images/avatars/sub-logo.svg"
            width="36"
            height="36"
            alt="small-logo"
          />
          <p className="text-center text-sm leading-loose md:text-left">
            {getCopyrightText(dict)}
          </p>
          <div className="flex space-x-4">
            <Link href="/${lang}/external/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/${lang}/external/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
          </div>
        </div>
        <ModeToggle />
      </div>
    </footer>
  );
}
