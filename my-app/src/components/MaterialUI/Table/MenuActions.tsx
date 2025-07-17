import { IconButton, Menu, MenuItem } from "@mui/material";
import { DeleteAction } from "./DeleteAction";
import CustomTooltip from "../CustomTooltip";
import InfoIcon from "@mui/icons-material/Info";
import { EditAction } from "./EditAction";
import { DetailsAction } from "./DetailsAction";

type MenuActionsProps = {
  setDeleteQueue: any;
  deleteQueue: any;
  configurations: any;
  setRefreshTable: any;
  selectedRow: any;
  anchorEl: any;
  setSelectedRow: any;
  setAnchorEl: any;
  columns: any;
  open: boolean;
  setOpen: any;
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
  columns,
  open,
  setOpen,
}: MenuActionsProps) => {
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };
  const editAction =
    configurations?.actions?.find((el: any) => el.id === "edit") ?? null;
  const deleteAction =
    configurations?.actions?.find((el: any) => el.id === "delete") ?? null;
  const detailsAction =
    configurations?.actions?.find((el: any) => el.id === "details") ?? null;
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      MenuListProps={{
        sx: {
          display: anchorEl === "closeOnlyAnchor" ? "none" : "flex",
          flexDirection: "row",
          padding: "1em",
          margin: 0,
        },
      }}
    >
      {editAction && (
        <MenuItem
          sx={{
            padding: 0,
            "&:hover": { backgroundColor: "#fff", cursor: "none" },
          }}
        >
          <EditAction
            columns={columns || []}
            selectedRow={selectedRow}
            actionUrl={editAction?.url ?? ""}
            setAnchorEl={setAnchorEl}
          />
        </MenuItem>
      )}

      {deleteAction && (
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
      )}
      {detailsAction && (
        <MenuItem
          sx={{
            padding: 0,
            "&:hover": { backgroundColor: "#fff", cursor: "none" },
          }}
        >
          <DetailsAction
            columns={columns || []}
            selectedRow={selectedRow}
            actionUrl={editAction?.url ?? ""}
            open={open}
            setOpen={setOpen}
            setAnchorEl={setAnchorEl}
          />
        </MenuItem>
      )}
    </Menu>
  );
};
