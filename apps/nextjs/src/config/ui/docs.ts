import type { DocsConfig } from "~/types";

/**
 * Returns the configuration for the documentation.
 */
export const getDocsConfig = (_lang: string): DocsConfig => {
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
