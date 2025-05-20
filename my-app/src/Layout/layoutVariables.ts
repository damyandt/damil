import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export const TOP_RIGHT_NAV_HEIGHT = "54px";
export const TOP_NAV_PADDING = "24px";
export const RIGHT_NAV_PADDING = "12px";
export const TOP_NAV_SPACING_WITH_SITE_CONTENT = `calc(${TOP_RIGHT_NAV_HEIGHT} + ${TOP_NAV_PADDING})`;
export const LEFT_NAV_WIDTH = "350px";
export const HELP_PAGE_WIDTH = "50vw";
export const HELP_PAGE_WIDTH_MOBILE = "100vw";
export const AUTH_LAYOUT_PADDING = "14px";
export const AUTH_LAYOUT_BACKGROUND_COLOR = "#f5f5f5f5";
export const AUTH_LAYOUT_DARK_BACKGROUND_COLOR = "#313131";

export type LeftNavSingleItem = {
  text: string;
  url: string | null;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  nested?: LeftNavSingleItem[];
  disabled: boolean;
  open?: boolean;
};

export type LeftNavList = LeftNavSingleItem[];

export type AppRouterProps = {
  openLeftNav: boolean;
  setExtraRightNavMenu: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setExtraTopNavMenu: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  smMediaQuery: boolean;
  unsavedChanges: boolean;
  setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
};
