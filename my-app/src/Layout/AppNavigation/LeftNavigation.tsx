import { SerializedStyles, css } from "@emotion/react";
import { Box, Divider, Drawer } from "@mui/material";
import {
  LEFT_NAV_WIDTH,
  TOP_NAV_SPACING_WITH_SITE_CONTENT,
} from "../layoutVariables";
import LeftNavListMenu from "./LeftNavListMenu";
import { useTranslatedNav } from "../../Global/Hooks/useTranslatedNav";
import { NAV_DAMIL_ACCESS_CONTROL, NAV_DAMIL_GYMS } from "./leftNavData";

const cssStyles = (openLeftNav: boolean) => ({
  drawer: css({
    width: openLeftNav ? LEFT_NAV_WIDTH : "5.4em",
    flexShrink: 0,
    whiteSpace: "nowrap",
    transition: "width 0.4s ease",
    "& .MuiDrawer-paper": {
      width: openLeftNav ? LEFT_NAV_WIDTH : "5.4em",
      boxSizing: "border-box",
      border: "none",
      overflowX: "hidden",
      backgroundColor: "#f5f5f5",
      margin: !openLeftNav ? "1em" : 0,
      height: !openLeftNav ? "96%" : "100%",
      transition: "margin 0.4s ease, height 0.4s ease, width 0.4s ease",
    },
  }),
  leftNavContent: css({
    backgroundColor: "#fff",
    borderRadius: !openLeftNav ? "20px" : 0,
    transition: "borderRadius 0.4s ease",
    marginTop: TOP_NAV_SPACING_WITH_SITE_CONTENT,
    overflow: "auto",
    height: "100%",
  }),
  toggleButtonBox: css({
    display: "flex",
    justifyContent: "flex-start",
    padding: "3em 2em 1em 1.6em",
  }),
});

interface LeftNavigationProps {
  css?: SerializedStyles[] | SerializedStyles;
  className?: string;
  openLeftNav: boolean;
  setOpenLeftNav: React.Dispatch<React.SetStateAction<boolean>>;
  mobileLeftNav: boolean;
}

const LeftNavigation: React.FC<LeftNavigationProps> = ({
  className,
  openLeftNav,
  setOpenLeftNav,
  mobileLeftNav,
}) => {
  const styles = { ...cssStyles(openLeftNav) };
  const { NAV_DAMIL_HOME, NAV_DAMIL_ANALYTICS } = useTranslatedNav();

  const handleClose = () => {
    setOpenLeftNav((prev) => !prev);
    window.dispatchEvent(new Event("resize"));
  };

  return (
    <Drawer
      className={className}
      sx={styles.drawer}
      anchor="left"
      open={mobileLeftNav ? openLeftNav : true}
      onClose={handleClose}
      variant={mobileLeftNav ? "temporary" : "persistent"}
    >
      <Box component="div" sx={styles.leftNavContent}>
        <>
          <LeftNavListMenu
            navList={NAV_DAMIL_HOME.list}
            listTitle="Home"
            openLeftNav={openLeftNav}
          />
          <Divider variant="middle" />
          <LeftNavListMenu
            navList={NAV_DAMIL_ACCESS_CONTROL.list}
            listTitle={NAV_DAMIL_ACCESS_CONTROL.title}
            openLeftNav={openLeftNav}
          />
          <Divider variant="middle" />
          <LeftNavListMenu
            navList={NAV_DAMIL_ANALYTICS.list}
            listTitle={NAV_DAMIL_ANALYTICS.title}
            openLeftNav={openLeftNav}
          />
          <Divider variant="middle" />
          <LeftNavListMenu
            navList={NAV_DAMIL_GYMS.list}
            listTitle={NAV_DAMIL_GYMS.title}
            openLeftNav={openLeftNav}
          />
        </>
      </Box>
    </Drawer>
  );
};

export default LeftNavigation;
