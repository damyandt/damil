import { LeftNavSingleItem } from "../layoutVariables";
import { LEFT_NAV_SECTION } from "./leftNavData";

export const pageRoles: any = {
  // Home
  "/": {
    roles: ["Admin", "Administrator", "Member"],
    abonnement: ["ALL"],
  },
  "Member/Classes": {
    roles: ["Member"],
    abonnement: ["ALL"],
  },
  "Member/Subscription": {
    roles: ["Member"],
    abonnement: ["ALL"],
  },

  // DAMIL Analytics
  "/DAMIL-Analytics/Overview": {
    roles: ["Admin", "Administrator"],
    abonnement: ["PRO"],
  },
  "/DAMIL-Analytics/Visits": {
    roles: ["Admin", "Administrator"],
    abonnement: ["PRO"],
  },
  "/DAMIL-Analytics/Goal": {
    roles: ["Admin", "Administrator"],
    abonnement: ["PRO"],
  },
  "/DAMIL-Analytics/Ages": {
    roles: ["Admin", "Administrator"],
    abonnement: ["PRO"],
  },
  "/DAMIL-Analytics/Memberships": {
    roles: ["Admin", "Administrator"],
    abonnement: ["PRO"],
  },

  // DAMIL Access Control
  "/DAMIL-Access-Control/All-Clients": {
    roles: ["Admin", "Administrator", "Staff"],
    abonnement: ["STARTER", "GROWTH", "PRO"],
  },
  "/DAMIL-Access-Control/All-Clients/:filter": {
    roles: ["Admin", "Administrator", "Staff"],
    abonnement: ["STARTER", "GROWTH", "PRO"],
  },
  "/DAMIL-Access-Control/Daily-Visitors": {
    roles: ["Admin", "Administrator", "Staff"],
    abonnement: ["STARTER", "GROWTH", "PRO"],
  },
  "/DAMIL-Access-Control/Accept-New-Client/subscriptionStatus=PENDING": {
    roles: ["Admin", "Administrator", "Staff"],
    abonnement: ["STARTER", "GROWTH", "PRO"],
  },

  // DAMIL Clients
  "/DAMIL-Clients/News": {
    roles: ["Admin", "Administrator", "Staff"],
    abonnement: ["STARTER", "GROWTH", "PRO"],
  },
  "/DAMIL-Clients/Classes": {
    roles: ["Admin", "Administrator", "Staff"],
    abonnement: ["STARTER", "GROWTH", "PRO"],
  },

  // DAMIL Staff Members
  "/DAMIL-Staff/All": {
    roles: ["Admin", "Administrator"],
    abonnement: ["PRO", "GROWTH"],
  },
  "/DAMIL-Staff/Roles": {
    roles: ["Admin", "Administrator"],
    abonnement: ["PRO", "GROWTH"],
  },
  "/DAMIL-Staff/Shifts": {
    roles: ["Admin", "Administrator"],
    abonnement: ["PRO", "GROWTH"],
  },
  "/DAMIL-Staff/Events": {
    roles: ["Admin", "Administrator"],
    abonnement: ["PRO", "GROWTH"],
  },

  // DAMIL Configurations
  "/DAMIL-Configurations/Profile": { roles: ["ALL"], abonnement: ["ALL"] },
  "/DAMIL-Configurations/Member-Plans": {
    roles: ["Admin", "Administrator"],
    abonnement: ["PRO", "GROWTH", "STARTER"],
  },
  "/DAMIL-Configurations/Subscription-Plans": {
    roles: ["Admin", "Administrator"],
    abonnement: ["PRO", "GROWTH", "STARTER"],
  },
  "/account/change-credentials": { roles: ["ALL"], abonnement: ["ALL"] },
};

export const getRolesForPage = (url: string): string[] => {
  return pageRoles[url]?.roles || ["ALL"];
};
export const getAbonnementsForPage = (url: string): string[] => {
  return pageRoles[url]?.abonnement || ["ALL"];
};

export const filterNavByRole = (menu: LeftNavMenu[], userRole: any) => {
  return menu.map((section) => ({
    ...section,
    list: section.list
      .map((item) => ({
        ...item,
        nested: item.nested
          ? item.nested.filter((nestedItem) => {
              if (!nestedItem.url) return false;
              const roles = getRolesForPage(nestedItem.url);
              return roles.includes(userRole[0]) || roles.includes("ALL");
            })
          : undefined,
      }))
      .filter((item) => {
        if (!item.url && !item.nested?.length) return false;
        if (item.url) {
          const roles = getRolesForPage(item.url);
          return roles.includes(userRole[0]) || roles.includes("ALL");
        }
        return item.nested && item.nested.length > 0;
      }),
  }));
};

export const filterNavByAbonnement = (
  menu: LeftNavMenu[],
  userAbonnement: string
) => {
  return menu.map((section) => ({
    ...section,
    list: section.list
      .map((item) => ({
        ...item,
        nested: item.nested
          ? item.nested.filter((nestedItem) => {
              if (!nestedItem.url) return false;
              const roles = getAbonnementsForPage(nestedItem.url);
              return roles.includes(userAbonnement) || roles.includes("ALL");
            })
          : undefined,
      }))
      .filter((item) => {
        if (!item.url && !item.nested?.length) return false;
        if (item.url) {
          const roles = getAbonnementsForPage(item.url);
          return roles.includes(userAbonnement) || roles.includes("ALL");
        }
        return item.nested && item.nested.length > 0;
      }),
  }));
};

type LeftNavMenu = {
  title: keyof typeof LEFT_NAV_SECTION;
  list: LeftNavSingleItem[];
  abonnement?: string[] | null;
};
