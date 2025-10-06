import React, { useState } from "react";
import {
  Box,
  Menu as MUIAccountMenu,
  IconButton,
  Theme,
  useTheme,
} from "@mui/material";
import { css } from "@emotion/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import cssLayoutStyles from "../../Global/Styles/layout";

const cssStyles = (theme: Theme) => ({
  accountMenuDropdown: css({
    marginTop: 1.5,
  }),
  accountIcon: css({
    fontSize: "3rem",
    color: "gray",
  }),
  accountImage: css({
    width: "3rem",
    height: "3rem",
    border: "1px solid " + theme.palette.grey[300],
  }),
});

interface AccountMenuProps {
  children: React.ReactNode;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ children }) => {
  const theme = useTheme();
  const styles = {
    ...cssStyles(theme),
    ...cssLayoutStyles,
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box component="div" sx={styles.flexCenter}>
        <IconButton
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          size="small"
          disableRipple
        >
          {/* {profilePicture?.url ? (
            <Avatar
              sx={styles.accountImage}
              src={profilePicture.url}
              alt={`${authedUser?.given_name} ${authedUser?.family_name}`}
            />
          ) : ( */}
          <AccountCircleIcon sx={styles.accountIcon} />
          {/* )} */}
        </IconButton>
      </Box>
      <MUIAccountMenu
        sx={styles.accountMenuDropdown}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        elevation={0}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {children}
      </MUIAccountMenu>
    </React.Fragment>
  );
};

export default AccountMenu;
