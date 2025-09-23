import { LeftNavSingleItem } from "../layoutVariables";
import { LEFT_NAV_SECTION } from "./leftNavData";

export const pageRoles: Record<string, string[]> = {
  // Home

  "/": ["Facility Admin", "System Admin", "Facility Member"],

  // DAMIL Analytics
  "/DAMIL-Analytics/Overview": ["Facility Admin", "System Admin"],
  "/DAMIL-Analytics/Visits": ["Facility Admin", "System Admin"],
  "/DAMIL-Analytics/Goal": ["Facility Admin", "System Admin"],
  "/DAMIL-Analytics/Ages": ["Facility Admin", "System Admin"],
  "/DAMIL-Analytics/Memberships": ["Facility Admin", "System Admin"],

  // DAMIL Access Control
  "/DAMIL-Access-Control/All-Clients": [
    "Facility Admin",
    "System Admin",
    "Facility Staff",
  ],
  "/DAMIL-Access-Control/All-Clients/:filter": [
    "Facility Admin",
    "System Admin",
    "Facility Staff",
  ],
  "/DAMIL-Access-Control/Daily-Visitors": [
    "Facility Admin",
    "System Admin",
    "Facility Staff",
  ],

  // DAMIL Staff Members
  "/DAMIL-Staff/All": ["Facility Admin", "System Admin"],
  "/DAMIL-Staff/Roles": ["Facility Admin", "System Admin"],
  "/DAMIL-Staff/Shifts": ["Facility Admin", "System Admin"],
  "/DAMIL-Staff/Events": ["Facility Admin", "Facility Staff", "System Admin"],

  // DAMIL Configurations
  "/DAMIL-Configurations/Profile": ["ALL"],
  "/DAMIL-Configurations/Member-Plans": ["Facility Admin", "System Admin"],
  "/DAMIL-Configurations/Subscription-Plans": [
    "Facility Admin",
    "System Admin",
  ],
  "/account/change-credentials": ["ALL"],
};

export const getRolesForPage = (url: string): string[] => {
  return pageRoles[url] || ["ALL"];
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

type LeftNavMenu = {
  title: keyof typeof LEFT_NAV_SECTION;
  list: LeftNavSingleItem[];
};
