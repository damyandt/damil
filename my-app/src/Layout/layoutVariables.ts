import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
export const TOP_RIGHT_NAV_HEIGHT = "54px";
export const TOP_NAV_PADDING = "25px";
export const RIGHT_NAV_PADDING = "12px";
export const TOP_NAV_SPACING_WITH_SITE_CONTENT = `calc(${TOP_RIGHT_NAV_HEIGHT} + ${TOP_NAV_PADDING})`;
export const LEFT_NAV_WIDTH = "350px";
// export const AUTH_LAYOUT_PADDING = "14px";
export const AUTH_LAYOUT_BACKGROUND_COLOR = "#f0f2f5";
export const AUTH_LAYOUT_DARK_BACKGROUND_COLOR = "#1E1E2F";
export const AUTH_LAYOUT_PADDING = {
  xs: "10px", // small phones
  sm: "14px", // tablets
  md: "14px", // small laptops
  lg: "14px", // desktops
};
export type LeftNavSingleItem = {
  text: string;
  url: string | null;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  nested?: LeftNavSingleItem[];
  disabled: boolean;
  open?: boolean;
  // roles?: string[];
};

export type LeftNavList = LeftNavSingleItem[];

export type AppRouterProps = {
  openLeftNav: boolean;
  setExtraRightNavMenu: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setExtraTopNavMenu: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  smMediaQuery: boolean;
};
