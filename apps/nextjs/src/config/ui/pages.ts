import type { PagesConfig } from "~/types";

// Copy-cat from docs
export const getPagesConfig = (_lang: string): PagesConfig => {
  return {
    mainNav: [
      {
        title: "Documentation",
        href: `/docs`,
      },
      {
        title: "Guides",
        href: `/guides`,
      },
    ],
    sidebarNav: [
      {
        id: "docs",
        title: "Getting Started",
        items: [
          {
            title: "Introduction",
            href: `/docs`,
          },
        ],
      },
      {
        id: "documentation",
        title: "Documentation",
        items: [
          {
            title: "Introduction",
            href: `/docs/documentation`,
            disabled: true,
          },

        ],
      },
      {
        id: "blog",
        title: "Blog",
        items: [
          {
            title: "Introduction",
            href: `/docs/in-progress`,
            disabled: true,
          },
        ],
      },
      {
        id: "dashboard",
        title: "Dashboard",
        items: [
          {
            title: "Introduction",
            href: "/docs/in-progress",
            disabled: true,
          },

        ],
      },
    ],
  };
};
