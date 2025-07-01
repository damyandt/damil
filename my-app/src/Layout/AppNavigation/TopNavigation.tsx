import {
  AppBar,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { css, SerializedStyles } from "@emotion/react";
import { Theme, useTheme } from "@mui/material/styles";
import {
  MAIN_COLOR,
  TOP_NAV_PADDING,
  TOP_NAV_SPACING_WITH_SITE_CONTENT,
  TOP_RIGHT_NAV_HEIGHT,
} from "../layoutVariables";
import cssComponentsStyles from "../../Global/Styles/components";
import cssLayoutStyles from "../../Global/Styles/layout";
import AccountMenu from "./AccountMenu";
import { handleUserSignOut } from "../../context/authContextUtils";

interface TopNavigationProps {
  css?: SerializedStyles[] | SerializedStyles;
  setOpenLeftNav: React.Dispatch<React.SetStateAction<boolean>>;
  openLeftNav: boolean;
}

const cssStyles = (theme: Theme, openLeftNav: boolean) => ({
  appBar: css({
    height: TOP_RIGHT_NAV_HEIGHT,
    borderRadius: !openLeftNav ? "20px" : "0 0 20px 20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: theme.zIndex.drawer + 2,
    background: theme.palette.common.white,
    paddingBottom: TOP_NAV_SPACING_WITH_SITE_CONTENT,
    margin: !openLeftNav ? "1em" : "0 1em 1em 1em",
    transition:
      "margin 0.4s ease, border-radius 0.4s ease, box-shadow 0.4s ease",
    width: "-webkit-fill-available",
  }),
  toolbar: css({
    borderRadius: "12px",
    background: theme.palette.common.white,
    padding: TOP_NAV_PADDING,
    paddingTop: theme.spacing(4.7),
    minHeight: `${TOP_RIGHT_NAV_HEIGHT} !important`,
    paddingLeft: "1.2em",
  }),
  userMenu: css({ padding: "1rem 3rem" }),
  userMenuLink: css({
    textDecoration: "none",
    color: theme.palette.text.primary,
  }),
});

const TopNavigation: React.FC<TopNavigationProps> = ({
  setOpenLeftNav,
  openLeftNav,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const styles = {
    ...cssStyles(theme, openLeftNav),
    ...cssLayoutStyles,
    ...cssComponentsStyles(theme),
  };

  return (
    <AppBar position="fixed" sx={styles.appBar}>
      <Toolbar sx={styles.toolbar} disableGutters>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          <Stack
            spacing={4}
            alignItems="center"
            direction="row"
            sx={{
              paddingLeft: "0.1em",
            }}
          >
            <IconButton
              size="large"
              aria-label="site menu"
              onClick={() => setOpenLeftNav((prev) => !prev)}
              sx={{ color: MAIN_COLOR }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>

          <Stack spacing={2} alignItems="center" direction="row">
            <AccountMenu>
              <Link to={"/account/profile"}>
                <MenuItem sx={[styles.userMenu, styles.hoverItem]}>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  Profile
                </MenuItem>
              </Link>
              <Divider />
              <MenuItem
                onClick={() => handleUserSignOut(navigate)}
                sx={[styles.userMenu, styles.hoverItem]}
              >
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                Logout
              </MenuItem>
            </AccountMenu>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavigation;
