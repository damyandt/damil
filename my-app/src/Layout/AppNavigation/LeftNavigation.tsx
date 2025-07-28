import { SerializedStyles, css } from "@emotion/react";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import { LEFT_NAV_WIDTH, MAIN_COLOR } from "../layoutVariables";
import LeftNavListMenu from "./LeftNavListMenu";
import { useTranslatedNav } from "../../Global/Hooks/useTranslatedNav";
import { NAV_DAMIL_ACCESS_CONTROL, NAV_DAMIL_STAFF } from "./leftNavData";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import CustomTooltip from "../../components/MaterialUI/CustomTooltip";
import { useLanguageContext } from "../../context/LanguageContext";
import { handleUserSignOut } from "../../context/authContextUtils";
import { useNavigate } from "react-router-dom";

const cssStyles = (openLeftNav: boolean) => ({
  drawer: css({
    width: openLeftNav ? LEFT_NAV_WIDTH : "5.4em",
    flexShrink: 0,
    whiteSpace: "nowrap",
    overflowX: "hidden",
    transition: "width 0.4s ease",
    "& .MuiDrawer-paper": {
      width: openLeftNav ? LEFT_NAV_WIDTH : "5.4em",
      boxSizing: "border-box",
      border: "none",
      overflowX: "hidden",
      backgroundColor: "#f0f2f5",
      margin: !openLeftNav ? "1em" : "1em 1em 1em 0",
      height: "-webkit-fill-available",
      transition: "margin 0.4s ease, width 0.4s ease, border-radius 0.4s ease",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: !openLeftNav ? "20px" : "0 20px 20px 0",
    },
  }),
  leftNavContent: css({
    backgroundColor: "#fff",
    borderRadius: !openLeftNav ? "20px" : 0,
    transition: "borderRadius 0.4s ease",
    overflow: "auto",
    height: "94%",
  }),
  toggleButtonBox: css({
    display: "flex",
    justifyContent: "flex-start",
    padding: "3em 2em 1em 1.6em",
  }),
  profile: css({
    position: "absolute",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    padding: "1em",
    width: "100%",
    borderTop: "1px solid #e0e0e0",
    backgroundColor: "#fff",
    boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.08)",
  }),
  openLeftNav: css({
    position: "absolute",
    top: 0,
    borderBottom: "1px solid #e0e0e0",
    padding: "1em",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    transition: "justify-content 0.4s ease",
    backgroundColor: "#fff",
    zIndex: 10,
    gap: 1,
  }),
});

interface LeftNavigationProps {
  css?: SerializedStyles[] | SerializedStyles;
  openLeftNav: boolean;
  setOpenLeftNav: React.Dispatch<React.SetStateAction<boolean>>;
  mobileLeftNav: boolean;
}

const LeftNavigation: React.FC<LeftNavigationProps> = ({
  openLeftNav,
  setOpenLeftNav,
  mobileLeftNav,
}) => {
  const navigate = useNavigate();
  const { t } = useLanguageContext();
  const styles = { ...cssStyles(openLeftNav) };
  const { NAV_DAMIL_HOME, NAV_DAMIL_ANALYTICS } = useTranslatedNav();

  const handleClose = () => {
    setOpenLeftNav((prev) => !prev);
    window.dispatchEvent(new Event("resize"));
  };

  return (
    <Drawer
      sx={styles.drawer}
      anchor="left"
      open={mobileLeftNav ? openLeftNav : true}
      onClose={handleClose}
      variant={mobileLeftNav ? "temporary" : "persistent"}
    >
      <Box
        sx={{
          mt: "3em",
          paddingY: "2em",
          height: "-webkit-fill-available",
          backgroundColor: "#fff",
        }}
      >
        <Box component="div" sx={styles.openLeftNav}>
          <Box
            sx={{
              fontWeight: 500,
              color: MAIN_COLOR,
              opacity: openLeftNav ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          >
            <Typography>Collapse</Typography>
          </Box>
          <CustomTooltip title={!openLeftNav ? "Expend" : ""}>
            <IconButton
              size="large"
              aria-label="site menu"
              onClick={() => setOpenLeftNav((prev) => !prev)}
              sx={{
                color: MAIN_COLOR,
                transform: !openLeftNav ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.4s ease",
              }}
            >
              <MenuIcon />
            </IconButton>
          </CustomTooltip>
        </Box>
        <Box component="div" sx={styles.leftNavContent}>
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
            navList={NAV_DAMIL_STAFF.list}
            listTitle={NAV_DAMIL_STAFF.title}
            openLeftNav={openLeftNav}
          />
          <Divider variant="middle" />
          <LeftNavListMenu
            navList={NAV_DAMIL_ANALYTICS.list}
            listTitle={NAV_DAMIL_ANALYTICS.title}
            openLeftNav={openLeftNav}
          />
        </Box>
        <Box component="div" sx={styles.profile}>
          <Avatar
            alt="User Name"
            src="/profile.jpg"
            sx={{ width: 40, height: 40, ml: "0.4em" }}
          />
          <Box
            sx={{
              opacity: openLeftNav ? 1 : 0,
              transition: "opacity 0.4s ease",
              justifyContent: "space-between",
              display: "flex",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                marginLeft: "1em",
              }}
            >
              <Typography variant="body1" fontWeight="bold">
                Damyan Todorov
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Admin
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <CustomTooltip title={t("Settings")} placement="left">
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </CustomTooltip>
              <CustomTooltip title={t("Logout")}>
                <IconButton onClick={() => handleUserSignOut(navigate)}>
                  <LogoutIcon />
                </IconButton>
              </CustomTooltip>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default LeftNavigation;
