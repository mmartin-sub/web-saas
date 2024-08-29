/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */

import { notFound } from "next/navigation";

import { Mdx } from "~/components/content/mdx-components";
import { DocsPageHeader } from "~/components/docs/page-header";
import { PagesPager } from "~/components/pages/pager";
import { SiteFooter } from "~/components/site-footer";
import { allPages } from ".contentlayer/generated";

import "~/styles/mdx.css";

import type { Metadata } from "next";

import { env } from "~/env.mjs";
import { getDictionary } from "~/lib/get-dictionary";
import { absoluteUrl } from "~/lib/utils";

interface PagePageProps {
  params: {
    slug: string[];
  };
}

function getPageFromParams(params: { slug: any }) {
  const slug = params.slug?.join("/") || "";
  const doc = allPages.find((doc) => doc.slugAsParams === slug);
  if (!doc) {
    null;
  }

  return doc;
}

export function generateMetadata({ params }: PagePageProps): Metadata {
  const doc = getPageFromParams(params);

  if (!doc) {
    return {};
  }

  const url = env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("heading", doc.description ?? doc.title);
  ogUrl.searchParams.set("type", "Documentation");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(doc.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: doc.title,
        },
      ],
    },
  };
}

export function generateStaticParams(): {
  slug: string[];
}[] {
  return allPages.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }));
}

export default async function PagePage({ params }: PagePageProps) {
  const doc = getPageFromParams(params);

  if (!doc) {
    notFound();
  }
  const lang = "en";
  const dict = await getDictionary(lang);

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <main className="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="mx-auto w-full min-w-0">
          <DocsPageHeader heading={doc.title} text={doc.description} />
          <Mdx code={doc.body.code} />
          <hr className="my-4 md:my-6" />
          <PagesPager doc={doc} />
        </div>
      </main>
      <SiteFooter
        className="border-t"
        params={{ lang: `${lang}` }}
        dictCommon={dict.common!}
      />
    </div>
  );
}
