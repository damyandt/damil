import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { useState } from "react";
import { SerializedStyles } from "@emotion/react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link, useLocation } from "react-router-dom";
import { LeftNavList, LeftNavSingleItem, MAIN_COLOR } from "../layoutVariables";
import Collapse from "../../components/MaterialUI/Collapse";
import { FormStatuses } from "../../Global/Types/commonTypes";

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
  navList,
}) => {
  const location = useLocation();
  return (
    <List component="nav">
      {navList.map((item, index) => (
        <NavItem
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
  marginLeft?: boolean
  currentPath?: string;
}

const NavItem: React.FC<NavItemProps> = ({
  text,
  url,
  nested,
  Icon,
  isAlreadyOpen,
  disabled,
  marginLeft,
  currentPath
}) => {
  const location = useLocation();
  const [open, setOpen] = useState<boolean>(isAlreadyOpen);
  const handleItemIconClick = () => {
    setOpen(!open);
  };
  console.log(url)
  console.log(currentPath)
  const isSelected = url === location.pathname;
  const itemIconButtonProps = {
    ...(url ? { component: Link, to: url } : { onClick: handleItemIconClick }),
  };

  return (
    <Box
      component="div"
    >

      <Box component="div">
        <ListItemButton
          {...itemIconButtonProps}
          disabled={disabled}
          selected={isSelected}
          sx={{
            ...(marginLeft ? { paddingLeft: '2em' } : {}),
            '&:hover': {
              backgroundColor: MAIN_COLOR + "20",
            },
            '&.Mui-selected': {
              backgroundColor: MAIN_COLOR + "20",
              color: MAIN_COLOR,
              '& .MuiListItemIcon-root': {
                color: MAIN_COLOR,
              },
            },
            '& .MuiTouchRipple-root .MuiTouchRipple-rippleVisible': {
              backgroundColor: MAIN_COLOR,
            },
            borderRadius: '1em',
            margin: '0 1em'
          }}

        >
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={text} />
          {nested ? <>{open ? <ExpandLess /> : <ExpandMore />}</> : null}

        </ListItemButton>

        {nested ? (
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
                isAlreadyOpen={false} />

            ))}
          </Collapse>
        ) : null}
      </Box>
    </Box >
  );
};
