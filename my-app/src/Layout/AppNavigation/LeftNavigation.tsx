import { SerializedStyles, css } from "@emotion/react";
import { Box, Divider, Drawer } from "@mui/material";
import {
  LEFT_NAV_WIDTH,
  TOP_NAV_SPACING_WITH_SITE_CONTENT,
} from "../layoutVariables";
import LeftNavListMenu from "./LeftNavListMenu";
import { useTranslatedNav } from "../../Global/Hooks/useTranslatedNav";
import { NAV_DAMIL_GYMS } from "./leftNavData";

const cssStyles = (openLeftNav: boolean) => ({
  drawer: css({
    width: openLeftNav ? LEFT_NAV_WIDTH : "30em",
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: openLeftNav ? LEFT_NAV_WIDTH : "30em",
      boxSizing: "border-box",
      border: "none",
    },
  }),
  leftNavContent: css({
    marginTop: TOP_NAV_SPACING_WITH_SITE_CONTENT,
    overflow: "auto",
    height: "100%",
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
    setOpenLeftNav(false);
    window.dispatchEvent(new Event("resize"));
    console.log("dada");
  };

  return (
    <Drawer
      className={className}
      sx={styles.drawer}
      anchor="left"
      open={openLeftNav}
      onClose={handleClose}
      variant={mobileLeftNav ? "temporary" : "persistent"}
    >
      <Box component="div" sx={styles.leftNavContent}>
        <>
          <LeftNavListMenu navList={NAV_DAMIL_HOME.list} listTitle="Home" />
          <Divider variant="middle" />
          <LeftNavListMenu
            navList={NAV_DAMIL_ANALYTICS.list}
            listTitle={NAV_DAMIL_ANALYTICS.title}
          />
          <Divider variant="middle" />
          <LeftNavListMenu
            navList={NAV_DAMIL_GYMS.list}
            listTitle={NAV_DAMIL_GYMS.title}
          />
        </>
      </Box>
    </Drawer>
  );
};

export default LeftNavigation;
