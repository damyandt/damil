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
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { LanguageOutlined } from "@mui/icons-material";
import CustomTooltip from "../../components/MaterialUI/CustomTooltip";
import { useLanguageContext } from "../../context/LanguageContext";
import { handleUserSignOut } from "../../context/authContextUtils";
import { useState } from "react";
import { useAuthedContext } from "../../context/AuthContext";
import { filterNavByAbonnement, filterNavByRole } from "./PageRoles";
// import { useNavigationGuard } from "../../context/UnsavedChangesProvider";
// import { useNavigate } from "react-router-dom";
import { useNavigationGuard } from "../../context/UnsavedChangesProvider";

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
      height: "calc(100dvh - 2em)",
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
  const { requestNavigation } = useNavigationGuard();
  const { t, setLanguage, language } = useLanguageContext();
  const theme = useTheme();
  const [anchorElSettings, setAnchorElSettings] = useState<any>(null);
  const { authedUser, tenant } = useAuthedContext();
  const styles = { ...cssStyles(openLeftNav, theme) };
  const {
    NAV_DAMIL_HOME,
    NAV_DAMIL_CLASSES,
    NAV_DAMIL_CLIENTS,
    NAV_DAMIL_ANALYTICS,
    NAV_DAMIL_STAFF,
    NAV_DAMIL_ACCESS_CONTROL,
    NAV_DAMIL_CONFIGURATIONS,
  } = useTranslatedNav();
  const userRoles = authedUser?.roles || ["ALL"];
  const abonnement = tenant?.abonnement || ["ALL"];

  const filteredNavSectionsByRole: any = filterNavByRole(
    [
      {
        title: "Home",
        list: NAV_DAMIL_HOME.list,
      },
      {
        title: NAV_DAMIL_CLASSES.title,
        list: NAV_DAMIL_CLASSES.list,
      },
      {
        title: NAV_DAMIL_ACCESS_CONTROL.title,
        list: NAV_DAMIL_ACCESS_CONTROL.list,
      },
      {
        title: NAV_DAMIL_STAFF.title,
        list: NAV_DAMIL_STAFF.list,
      },
      {
        title: NAV_DAMIL_CLIENTS.title,
        list: NAV_DAMIL_CLIENTS.list,
      },
      {
        title: NAV_DAMIL_ANALYTICS.title,
        list: NAV_DAMIL_ANALYTICS.list,
      },
      {
        title: NAV_DAMIL_CONFIGURATIONS.title,
        list: NAV_DAMIL_CONFIGURATIONS.list,
      },
    ],
    userRoles
  );

  const filteredNavSections: any = filterNavByAbonnement(
    filteredNavSectionsByRole,
    abonnement
  );

  const visibleSections = filteredNavSections.filter(
    (section: any) => section.list.length > 0
  );
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
          height: "calc(100dvh - 2em)",
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
          {visibleSections.map((section: any, index: any) => (
            <div key={section.title}>
              <LeftNavListMenu
                navList={section.list}
                listTitle={section.title}
                openLeftNav={openLeftNav}
                mobileLeftNav={mobileLeftNav}
                setOpenLeftNav={setOpenLeftNav}
              />
              {/* Render divider only if not the last visible section */}
              {index < visibleSections.length - 1 && (
                <Divider variant="middle" />
              )}
            </div>
          ))}
        </Box>

        <Box component="div" sx={styles.profile}>
          <Avatar
            alt={authedUser?.username}
            src=""
            sx={{ width: 40, height: 40, ml: "0.4em", cursor: "pointer" }}
            onClick={(event: any) => {
              if (openLeftNav) {
                requestNavigation("DAMIL-Configurations/Profile");
              } else {
                setAnchorElSettings(event.currentTarget);
              }
            }}
          >
            {authedUser?.firstName?.charAt(0)}
          </Avatar>

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
                {authedUser?.firstName || authedUser?.username}{" "}
                {authedUser?.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {authedUser?.roles?.join(", ")}
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
                    requestNavigation("DAMIL-Configurations/Profile");
                    setOpenLeftNav(false);
                    setAnchorElSettings(null);
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">{t("Profile")}</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleUserSignOut(requestNavigation)}>
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
