import type { Locale } from "~/config/i18n-config";
import { getDictionary } from "~/lib/get-dictionary";
import type { DashboardConfig } from "~/types";

export const getDashboardConfig = async ({
  params: { lang },
}: {
  params: {
    lang: Locale;
  };
}): Promise => {
  const dict = await getDictionary(lang);

  return {
    mainNav: [
      {
        title: dict.dashboard.main_nav_documentation,
        href: "/docs",
      },
      {
        title: dict.dashboard.main_nav_support,
        href: "/support",
        disabled: true,
      },
    ],
    sidebarNav: [
      {
        id: "clusters",
        title: dict.dashboard.sidebar_nav_clusters,
        href: "/dashboard/",
      },
      {
        id: "billing",
        title: dict.dashboard.sidebar_nav_billing,
        href: "/dashboard/billing",
      },
      {
        id: "settings",
        title: dict.dashboard.sidebar_nav_settings,
        href: "/dashboard/settings",
      },
    ],
  };
};
