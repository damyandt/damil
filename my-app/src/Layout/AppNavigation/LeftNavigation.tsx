import { SerializedStyles, css } from "@emotion/react";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { LEFT_NAV_WIDTH } from "../layoutVariables";
import LeftNavListMenu from "./LeftNavListMenu";
import { useTranslatedNav } from "../../Global/Hooks/useTranslatedNav";
import { NAV_DAMIL_ACCESS_CONTROL, NAV_DAMIL_STAFF } from "./leftNavData";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { LanguageOutlined } from "@mui/icons-material";
import CustomTooltip from "../../components/MaterialUI/CustomTooltip";
import { useLanguageContext } from "../../context/LanguageContext";
import { handleUserSignOut } from "../../context/authContextUtils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const cssStyles = (openLeftNav: boolean, theme: any) => ({
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
      backgroundColor: theme.palette.customColors.sectionBackgroundColor,
      margin: !openLeftNav ? "1em" : "1em 1em 0.9em 0",
      height: "-webkit-fill-available",
      transition: "margin 0.4s ease, width 0.4s ease, border-radius 0.4s ease",
      boxShadow: theme.palette.customColors.shodow,
      borderRadius: !openLeftNav ? "20px" : "0 20px 20px 0",
    },
  }),
  leftNavContent: css({
    backgroundColor: theme.palette.customColors.sectionBackgroundColor,
    borderRadius: !openLeftNav ? "20px" : 0,
    transition: "borderRadius 0.4s ease",
    overflow: "auto",
    scrollbarWidth: "none", // for Firefox
    "&::-webkit-scrollbar": {
      display: "none", // for Chrome, Safari, and Edge
    },
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
    backgroundColor: theme.palette.customColors.sectionBackgroundColor,
    boxShadow: `0 -2px 8px ${theme!.palette!.customColors!.shodowColor}`,
  }),
  openLeftNav: css({
    position: "absolute",
    top: 0,
    padding: "1em",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    boxShadow: `0 2px 8px ${theme!.palette!.customColors!.shodowColor}`,
    transition: "justify-content 0.4s ease",
    backgroundColor: theme.palette.customColors.sectionBackgroundColor,
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
  const { t, setLanguage, language } = useLanguageContext();
  const theme = useTheme();
  const [anchorElSettings, setAnchorElSettings] = useState<any>(null);
  // const [anchorElLanguage, setAnchorElLanguage] = useState<any>(null);
  const styles = { ...cssStyles(openLeftNav, theme) };
  const { NAV_DAMIL_HOME, NAV_DAMIL_ANALYTICS } = useTranslatedNav();

  return (
    <Drawer
      sx={styles.drawer}
      anchor="left"
      open={mobileLeftNav ? openLeftNav : true}
      onClose={() => {
        setOpenLeftNav((prev) => !prev);
        window.dispatchEvent(new Event("resize"));
      }}
      variant={mobileLeftNav ? "temporary" : "persistent"}
    >
      <Box
        sx={{
          paddingTop: "5em",
          paddingBottom: "2em",
          height: "-webkit-fill-available",
          backgroundColor: theme!.palette!.customColors!.sectionBackgroundColor,
        }}
      >
        <Box component="div" sx={styles.openLeftNav}>
          <Box
            sx={{
              fontWeight: 500,
              opacity: openLeftNav ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          >
            <Typography>{t("Collapse")}</Typography>
          </Box>
          <CustomTooltip title={!openLeftNav ? "Expand" : ""}>
            <IconButton
              size="large"
              aria-label="site menu"
              onClick={() => setOpenLeftNav((prev) => !prev)}
              sx={{
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
            mobileLeftNav={mobileLeftNav}
            setOpenLeftNav={setOpenLeftNav}
          />
          <Divider variant="middle" />
          <LeftNavListMenu
            navList={NAV_DAMIL_ACCESS_CONTROL.list}
            listTitle={NAV_DAMIL_ACCESS_CONTROL.title}
            openLeftNav={openLeftNav}
            mobileLeftNav={mobileLeftNav}
            setOpenLeftNav={setOpenLeftNav}
          />
          <Divider variant="middle" />
          <LeftNavListMenu
            navList={NAV_DAMIL_STAFF.list}
            listTitle={NAV_DAMIL_STAFF.title}
            openLeftNav={openLeftNav}
            mobileLeftNav={mobileLeftNav}
            setOpenLeftNav={setOpenLeftNav}
          />
          <Divider variant="middle" />
          <LeftNavListMenu
            navList={NAV_DAMIL_ANALYTICS.list}
            listTitle={NAV_DAMIL_ANALYTICS.title}
            openLeftNav={openLeftNav}
            mobileLeftNav={mobileLeftNav}
            setOpenLeftNav={setOpenLeftNav}
          />
        </Box>

        <Box component="div" sx={styles.profile}>
          <Avatar
            alt="Damyan"
            src="/profile.jpg"
            sx={{ width: 40, height: 40, ml: "0.4em", cursor: "pointer" }}
            onClick={(event: any) => {
              if (openLeftNav) {
                navigate("Profile");
              } else {
                setAnchorElSettings(event.currentTarget);
              }
            }}
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
              <Typography variant="body1" fontWeight={500}>
                Damyan Todorov
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("Admin")}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <CustomTooltip title={t("Settings")} placement="left">
                <IconButton
                  onClick={(event: any) =>
                    setAnchorElSettings(event.currentTarget)
                  }
                >
                  <SettingsIcon />
                </IconButton>
              </CustomTooltip>
              <Menu
                anchorEl={anchorElSettings}
                open={Boolean(anchorElSettings)}
                onClose={() => setAnchorElSettings(null)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                transformOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <MenuItem
                  onClick={() => {
                    navigate("Profile");
                    setAnchorElSettings(null);
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">{t("Profile")}</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleUserSignOut(navigate)}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">{t("Logout")}</Typography>
                </MenuItem>
              </Menu>

              <CustomTooltip
                title={
                  language === "bg"
                    ? "Превключи на Английски"
                    : "Switch to Bulgarian"
                }
              >
                <IconButton
                  onClick={() => setLanguage(language === "bg" ? "en" : "bg")}
                >
                  <LanguageOutlined />
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
