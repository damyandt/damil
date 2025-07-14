import { IconButton, Menu, MenuItem } from "@mui/material";
import { DeleteAction } from "./DeleteAction";
import CustomTooltip from "../CustomTooltip";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";

type MenuActionsProps = {
  setDeleteQueue: any;
  deleteQueue: any;
  configurations: any;
  setRefreshTable: any;
  selectedRow: any;
  anchorEl: any;
  setSelectedRow: any;
  setAnchorEl: any;
};

export const MenuActions = ({
  setDeleteQueue,
  deleteQueue,
  configurations,
  setRefreshTable,
  selectedRow,
  anchorEl,
  setSelectedRow,
  setAnchorEl,
}: MenuActionsProps) => {
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      MenuListProps={{
        sx: {
          display: "flex",
          flexDirection: "row",
          padding: "1em",
          margin: 0,
        },
      }}
    >
      <MenuItem
        sx={{
          padding: 0,
          "&:hover": { backgroundColor: "#fff", cursor: "none" },
        }}
      >
        <CustomTooltip title="Edit" placement="bottom">
          <IconButton
            onClick={() => {
              console.log("Edit", selectedRow);
              handleMenuClose();
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </CustomTooltip>
      </MenuItem>

      <MenuItem
        sx={{
          padding: 0,
          "&:hover": { backgroundColor: "#fff", cursor: "none" },
        }}
      >
        <DeleteAction
          setDeleteQueue={setDeleteQueue}
          deleteQueue={deleteQueue}
          configurations={configurations}
          setRefreshTable={setRefreshTable}
          handleMenuClose={handleMenuClose}
          selectedRow={selectedRow}
        />
      </MenuItem>
      <MenuItem
        sx={{
          padding: 0,
          "&:hover": { backgroundColor: "#fff", cursor: "none" },
        }}
      >
        <CustomTooltip title="Details" placement="bottom">
          <IconButton
            onClick={() => {
              console.log("Details", selectedRow);
              handleMenuClose();
            }}
          >
            <InfoIcon fontSize="small" />
          </IconButton>
        </CustomTooltip>
      </MenuItem>
    </Menu>
  );
};
