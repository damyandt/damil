import { LeftNavSingleItem } from "../layoutVariables";
import { LEFT_NAV_SECTION } from "./leftNavData";

export const pageRoles: Record<string, string[]> = {
  // Home
  "/": ["FACILITY_ADMIN", "SYSTEM_ADMIN", "FACILITY_MEMBER"],

  // DAMIL Analytics
  "/DAMIL-Analytics/Overview": ["FACILITY_ADMIN", "SYSTEM_ADMIN"],
  "/DAMIL-Analytics/Visits": ["FACILITY_ADMIN", "SYSTEM_ADMIN"],
  "/DAMIL-Analytics/Goal": ["FACILITY_ADMIN", "SYSTEM_ADMIN"],
  "/DAMIL-Analytics/Ages": ["FACILITY_ADMIN", "SYSTEM_ADMIN"],
  "/DAMIL-Analytics/Memberships": ["FACILITY_ADMIN", "SYSTEM_ADMIN"],

  // DAMIL Access Control
  "/DAMIL-Access-Control/All-Clients": [
    "FACILITY_ADMIN",
    "SYSTEM_ADMIN",
    "FACILITY_MEMBER",
  ],
  "/DAMIL-Access-Control/All-Clients/:filter": [
    "FACILITY_ADMIN",
    "SYSTEM_ADMIN",
  ],
  "/DAMIL-Access-Control/Daily-Visitors": ["FACILITY_ADMIN", "SYSTEM_ADMIN"],

  // DAMIL Staff Members
  "/DAMIL-Staff/All": ["FACILITY_ADMIN", "SYSTEM_ADMIN"],
  "/DAMIL-Staff/Roles": ["FACILITY_ADMIN", "SYSTEM_ADMIN"],
  "/DAMIL-Staff/Shifts": ["FACILITY_ADMIN", "FACILITY_STAFF", "SYSTEM_ADMIN"],
  "/DAMIL-Staff/Events": ["FACILITY_ADMIN", "FACILITY_STAFF", "SYSTEM_ADMIN"],

  // DAMIL Configurations
  "/DAMIL-Configurations/Profile": ["ALL"],
  "/DAMIL-Configurations/Member-Plans": ["FACILITY_ADMIN", "SYSTEM_ADMIN"],
  "/DAMIL-Configurations/Subscription-Plans": [
    "FACILITY_ADMIN",
    "SYSTEM_ADMIN",
  ],
};

export const getRolesForPage = (url: string): string[] => {
  return pageRoles[url] || ["ALL"];
};

export const filterNavByRole = (menu: LeftNavMenu[], userRole: any) => {
  console.log(userRole);
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
