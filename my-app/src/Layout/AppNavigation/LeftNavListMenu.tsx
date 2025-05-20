import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Theme,
} from "@mui/material";
import { useState } from "react";
import { SerializedStyles, css } from "@emotion/react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { LeftNavList, LeftNavSingleItem } from "../layoutVariables";
import cssLayoutStyles from "../../Global/Styles/layout";
import cssSpacingStyles from "../../Global/Styles/spacing";
import Collapse from "../../components/MaterialUI/Collapse";
import cssComponentsStyles from "../../Global/Styles/components";
import { FormStatuses } from "../../Global/Types/commonTypes";

const cssStyles = (theme: Theme) => ({
  listSubheaderContainer: css({
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.palette.background.default,
  }),
  editIconButton: css({
    marginRight: theme.spacing(1),
    backgroundColor: "inherit",
  }),
  linkItem: css({
    width: `calc(100% - ${theme.spacing(2)})`,
    position: "relative",
  }),
  itemDivider: css({
    position: "absolute",
    left: theme.spacing(1),
    top: theme.spacing(6),
    height: `calc(100% - ${theme.spacing(7)})`,
  }),
  openedParent: css({
    background:
      theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[900],
    borderRadius: theme.shape.borderRadius,
  }),
  openedChild: css({
    color: theme.palette.primary.main,
  }),
  activeItem: css({
    background: theme.palette.mode === "light" ? "#E8E8E8" : "#313131",
    borderRadius: theme.shape.borderRadius,
  }),
  pinIcon: css({
    padding: theme.spacing(0.5),
    marginRight: "0.2px",
    transform: "rotate(180deg)",
  }),
});


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
}

const LeftNavListMenu: React.FC<LeftNavListMenuProps> = ({
  // className,
  navList,
}) => {
console.log(navList)
  return (
    <List component="nav">


      <>
        {navList.map((item, index) => (
          <NavItem
            key={`parent-item${index}-${item.text}`}
            text={item.text}
            url={item.url}
            nested={item.nested}
            Icon={item.Icon}
            disabled={item.disabled}
            isAlreadyOpen={item.open == true ? true : false}
            isParent

          />
        ))}
      </>
    </List>
  );
};

export default LeftNavListMenu;

interface NavItemProps extends LeftNavSingleItem {
  isParent?: boolean;
  listTitle?: string;
  isAlreadyOpen: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  text,
  url,
  nested,
  isParent,
  Icon,
  isAlreadyOpen,
  disabled,
}) => {
  const theme = useTheme();
  const styles = {
    ...cssStyles(theme),
    ...cssLayoutStyles,
    ...cssSpacingStyles(theme),
    ...cssComponentsStyles(theme),
  };
  const [open, setOpen] = useState<boolean>(isAlreadyOpen);

  const handleItemIconClick = () => {
    setOpen(!open);
  };


  const itemIconButtonProps = {
    ...(url ? { component: Link, to: url } : { onClick: handleItemIconClick }),
  };


  return (
    <Box
      component="div"
    >
      {open && isParent ? (
        <Divider sx={styles.itemDivider} orientation="vertical" />
      ) : null}
      <Box component="div" sx={styles.width100}>
        <ListItemButton
          sx={[
            styles.width100,
            styles.hoverItem,
          ]}
          {...itemIconButtonProps}
          disabled={disabled}
        >
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText sx={[!isParent && open && styles.openedChild]} primary={text} />
          {nested ? <>{open ? <ExpandLess /> : <ExpandMore />}</> : null}

        </ListItemButton>

        {nested ? (
          <Collapse in={open} timeout="auto" unmountOnExit>
            {nested.map((nestedItem, index) => (
              <NavItem
                key={`parent-item-${nestedItem.url}-${index}`}
                text={nestedItem.text}
                url={nestedItem.url}
                nested={nestedItem.nested}
                Icon={nestedItem.Icon}
                disabled={nestedItem.disabled}
                isAlreadyOpen={false} />
            ))}
          </Collapse>
        ) : null}
      </Box>
    </Box>
  );
};
