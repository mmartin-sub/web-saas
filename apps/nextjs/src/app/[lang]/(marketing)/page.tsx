import Link from "next/link";

import * as Icons from "@saasfly/ui/icons";

import { XBlogArticle } from "~/components/blog-card";
import { Comments } from "~/components/comments";
import { DocumentGuide } from "~/components/document-guide";
import { FeaturesCard } from "~/components/features-card";
import { Meteorss } from "~/components/meteors-card";
import { Questions } from "~/components/questions";
import ShimmerButton from "~/components/shimmer-button";
import { TypewriterEffectSmooths } from "~/components/typewriterEffectSmooth";
import { WobbleCardShow } from "~/components/wobble";
import { WordReveal } from "~/components/word-reveal";
import type { Locale } from "~/config/i18n-config";
import * as constp from "~/lib/constants";
import { getDictionary } from "~/lib/get-dictionary";
import type { Meteor } from "~/types/meteors";

const meteors_data: Meteor = {
  name: "Join our Discord",
  description:
    "Join our Discord server to chat with a member of our support team and get help.",
  button_content: "Chat with us",
  url: constp.DISCORD_SERVER,
};

export default async function IndexPage({
  params: { lang },
}: {
  params: {
    lang: Locale;
  };
}) {
  const dict = await getDictionary(lang);

  return (
    <>
      <section className="w-full px-8 sm:px-48 md:px-48 xl:h-[100vh] xl:px-48">
        <div className="grid grid-cols-1 gap-10 pb-10 md:pb-40 xl:grid-cols-2">
          <div className="flex flex-col items-start">
            <div className="flex flex-col pt-4 md:pt-28 lg:pt-28 xl:pt-28">
              <DocumentGuide>
                {dict.marketing.introducing || "Introducing Substantifik"}
              </DocumentGuide>

              <div className="mt-6">
                <h1 className="relative mb-6 max-w-4xl text-left text-4xl font-bold dark:text-zinc-100 sm:text-7xl md:text-7xl xl:text-7xl">
                  {dict.marketing.title ||
                    "Substantifik: How can human better work together?"}
                </h1>
              </div>

              <div>
                <span className="text-zinc-500 sm:text-xl">
                  {dict.marketing.sub_title ||
                    "Unleash the power of unified AI to revolutionize cross-departmental transparency and collaboration."}
                </span>
                <TypewriterEffectSmooths />
              </div>

              <div className="mb-4 mt-6 flex w-full flex-col justify-center space-y-4 sm:flex-row sm:justify-start sm:space-x-8 sm:space-y-0">
                <Link href={`${lang}/login`}>
                  <ShimmerButton className="mx-auto flex justify-center">
                    <span className="z-10 w-48 whitespace-pre bg-gradient-to-b from-black from-30% to-gray-300/80 bg-clip-text text-center text-sm font-semibold leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 dark:text-transparent">
                      {dict.marketing.get_started}
                    </span>
                  </ShimmerButton>
                </Link>
              </div>
            </div>
          </div>

          {/* Discord link */}

          <div
            className="h-full w-full xl:block"
          >
            <div
            className={`${constp.HIDE_DISCORD_LINK ? "hidden" : ""} flex flex-col pt-28`}
            >
              <Meteorss meteor={meteors_data} />
              <div
              className={`${constp.HIDE_BLOG_HOMEPAGE ? "hidden" : ""} mt-4 flex w-full justify-between`}
              >
                <XBlogArticle />
                <div
                className={`${constp.HIDE_FEATURECARD_HOMEPAGE ? "hidden" : ""} ml-4`}
                >
                  <FeaturesCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section
            className={`${constp.HIDE_WORD_SECTION ? "hidden" : ""} h-[50vh] w-full xl:block`}
          >
        <div className="flex h-full w-full justify-between px-[200px]">
          <div className="flex w-[75%] flex-col pr-4 pt-40">
            <WobbleCardShow />
          </div>
          <div className={`${constp.HIDE_WORD_REVEAL ? "hidden" : ""} h-[50vh] w-[25%]`}
          >
            <div className="flex flex-col pl-[100px]">
              <WordReveal />
            </div>
          </div>
        </div>
      </section>

      <section
            className={`h-[100vh] w-full xl:block`}
          >
        <div className="flex h-full w-full justify-between px-[220px]">
          <div className="flex w-[60%] flex-col pr-4 pt-40">
            <div className="px-[120px]">
            {!constp.HIDE_QUESTIONS_SECTION &&
              <Questions />
            }
            </div>
          </div>
        </div>
      </section>

      <section className={`w-full px-8 xl:hidden`}
      >
            {!constp.HIDE_QUESTIONS_SECTION &&
              <Questions />
            }
      </section>

      <section className="w-full px-8 pt-10 sm:px-0 sm:pt-0 md:px-0 md:pt-0 xl:px-0 xl:pt-0">
        <div className="flex h-full w-full flex-col items-center pb-[100px] pt-10">
          <div>
            <h1 className="mb-6 text-center text-3xl font-bold dark:text-zinc-100 md:text-5xl">
              What People Are Saying
            </h1>
          </div>
          <div className="mb-6 text-xl dark:text-zinc-100 md:text-xl">
            Don’t just take our word for it. Here’s what{" "}
            <span className="font-bold">real people</span> are saying about
            Substantifik.
          </div>

          <div className="w-full overflow-x-hidden">
            <Comments />
          </div>
        </div>
      </section>
    </>
  );
}
