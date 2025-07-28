import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { useState } from "react";
import { SerializedStyles } from "@emotion/react";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link, useLocation } from "react-router-dom";
import { LeftNavList, LeftNavSingleItem, MAIN_COLOR } from "../layoutVariables";
import Collapse from "../../components/MaterialUI/Collapse";
import { FormStatuses } from "../../Global/Types/commonTypes";
import CustomTooltip from "../../components/MaterialUI/CustomTooltip";

interface LeftNavListMenuProps {
  css?: SerializedStyles[] | SerializedStyles;
  className?: string;
  navList: LeftNavList;
  listTitle: string;
  isEditFavouritesMode?: boolean;
  onEditClick?: () => void;
  toggleFavourite?: (item: LeftNavSingleItem) => void;
  favourites?: string[];
  formStatus?: FormStatuses;
  alertMessage?: string | null;
  collapsed?: boolean;
  openLeftNav: boolean;
}

const LeftNavListMenu: React.FC<LeftNavListMenuProps> = ({
  navList,
  openLeftNav,
}) => {
  const location = useLocation();
  return (
    <List component="nav">
      {navList.map((item, index) => (
        <NavItem
          openLeftNav={openLeftNav}
          key={`parent-item${index}-${item.text}`}
          text={item.text}
          url={item.url}
          nested={item.nested}
          Icon={item.Icon}
          disabled={item.disabled}
          isAlreadyOpen={item.open == true ? true : false}
          currentPath={location.pathname}
        />
      ))}
    </List>
  );
};

export default LeftNavListMenu;

interface NavItemProps extends LeftNavSingleItem {
  listTitle?: string;
  isAlreadyOpen: boolean;
  marginLeft?: boolean;
  currentPath?: string;
  openLeftNav: boolean;
}
const NavItem: React.FC<NavItemProps> = ({
  text,
  url,
  nested,
  Icon,
  isAlreadyOpen,
  disabled,
  marginLeft,
  currentPath,
  openLeftNav,
}) => {
  const location = useLocation();
  const hasCurrentPath = (
    nestedItems: LeftNavSingleItem[] = [],
    path: string
  ): boolean => {
    return nestedItems.some(
      (item) => item.url === path || hasCurrentPath(item.nested || [], path)
    );
  };

  const [open, setOpen] = useState<boolean>(
    isAlreadyOpen || hasCurrentPath(nested, currentPath ?? "")
  );

  const isSelected = url === location.pathname;
  const itemIconButtonProps = {
    ...(url ? { component: Link, to: url } : { onClick: () => setOpen(!open) }),
  };

  return (
    <Box component="div">
      <ListItemButton
        {...itemIconButtonProps}
        disabled={disabled}
        selected={isSelected}
        sx={{
          overflowX: "hidden",
          ...(openLeftNav && marginLeft ? { paddingLeft: "2em" } : {}),
          transition: "padding-left 0.4s ease",
          "&:hover": { backgroundColor: MAIN_COLOR + "20" },
          "&.Mui-selected": {
            backgroundColor: MAIN_COLOR + "20",
            color: MAIN_COLOR,
            "& .MuiListItemIcon-root": { color: MAIN_COLOR },
          },
          borderRadius: "1em",
          margin: "0.1em 1em",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <CustomTooltip title={openLeftNav ? "" : text} placement="right">
            <ListItemIcon sx={{ alignItems: "center", minHeight: "2em" }}>
              <Icon />
            </ListItemIcon>
          </CustomTooltip>

          <ListItemText
            primary={text}
            sx={{
              opacity: openLeftNav ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          />

          {openLeftNav && nested ? (
            <ExpandMore
              sx={{
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.4s ease",
              }}
            />
          ) : null}
        </Box>
      </ListItemButton>
      {nested && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {nested.map((nestedItem, index) => (
            <NavItem
              marginLeft={true}
              key={`parent-item-${nestedItem.url}-${index}`}
              text={nestedItem.text}
              url={nestedItem.url}
              nested={nestedItem.nested}
              Icon={nestedItem.Icon}
              disabled={nestedItem.disabled}
              isAlreadyOpen={false}
              currentPath={currentPath}
              openLeftNav={openLeftNav}
            />
          ))}
        </Collapse>
      )}
    </Box>
  );
};
