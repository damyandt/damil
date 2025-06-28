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

const cssStyles = (theme: Theme) => ({
  appBar: css({
    height: TOP_RIGHT_NAV_HEIGHT,
    boxShadow: "none",
    zIndex: theme.zIndex.drawer + 1,
    background: theme.palette.common.white,
    paddingBottom: TOP_NAV_SPACING_WITH_SITE_CONTENT,
  }),
  toolbar: css({
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
    ...cssStyles(theme),
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
              paddingLeft: !openLeftNav ? "1em" : "0",
              transition: "padding-left 0.4s ease",
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
