import Link from "next/link";
import { Page } from "contentlayer/generated";

import { cn } from "@saasfly/ui";
import { buttonVariants } from "@saasfly/ui/button";
import * as Icons from "@saasfly/ui/icons";

import { getPagesConfig } from "~/config/ui/pages";

interface PagesPagerProps {
  doc: Page;
}

export function PagesPager({ doc }: PagesPagerProps) {
  const pager = getPagerForPages(doc);

  if (!pager) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between">
      {pager?.prev && (
        <Link
          href={pager.prev.href}
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <Icons.ChevronLeft className="mr-2 h-4 w-4" />
          {pager.prev.title}
        </Link>
      )}
      {pager?.next && (
        <Link
          href={pager.next.href}
          className={cn(buttonVariants({ variant: "ghost" }), "ml-auto")}
        >
          {pager.next.title}
          <Icons.ChevronRight className="ml-2 h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

export function getPagerForPages(doc: Page) {
  const flattenedLinks = [
    null,
    ...flatten(getPagesConfig("en").sidebarNav),
    null,
  ];
  const activeIndex = flattenedLinks.findIndex(
    (link) => doc.slug === link?.href,
  );
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null;
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null;
  return {
    prev,
    next,
  };
}

// @ts-ignore
export function flatten(
  links: {
    items?: { items?: any }[];
  }[],
) {
  return links.reduce((flat, link) => {
    return flat.concat(link.items ? flatten(link.items) : link);
  }, []);
}
