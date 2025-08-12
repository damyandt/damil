import { Menu, MenuItem } from "@mui/material";
import { EditAction } from "./actions/EditAction";
import { DeleteAction } from "./actions/DeleteAction";
import { DetailsAction } from "./actions/DetailsAction";
import CustomAction from "./actions/CustomAction";
import { Dispatch, SetStateAction } from "react";
import {
  Column,
  Configuration,
  DeleteQueueType,
  Row,
  TableAction,
} from "../../../Global/Types/commonTypes";

type MenuActionsProps = {
  setDeleteQueue: Dispatch<SetStateAction<DeleteQueueType>>;
  deleteQueue: DeleteQueueType;
  configurations?: Configuration;
  setRefreshTable?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRow: Row | null;
  anchorEl: null | HTMLElement | "closeOnlyAnchor";
  setSelectedRow: Dispatch<SetStateAction<Record<string, unknown> | null>>;
  setAnchorEl: Dispatch<SetStateAction<null | HTMLElement | "closeOnlyAnchor">>;
  columns: Column[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  customActions?: any;
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
  customActions,
}: MenuActionsProps) => {
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };
  const editAction =
    configurations?.actions?.find((el: TableAction) => el.id === "edit") ??
    null;
  const deleteAction =
    configurations?.actions?.find((el: TableAction) => el.id === "delete") ??
    null;
  const detailsAction =
    configurations?.actions?.find((el: TableAction) => el.id === "details") ??
    null;
  let editUrl = editAction?.url || "";
  if (editUrl.startsWith("/")) {
    editUrl = editUrl.slice(1);
  }
  if (selectedRow?.id) {
    editUrl = editUrl.replace("{id}", String(selectedRow.id));
  }

  return (
    <Menu
      anchorEl={anchorEl === "closeOnlyAnchor" ? null : anchorEl}
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
            "&:hover": { cursor: "none", backgroundColor: "inherit" },
          }}
        >
          <EditAction
            setRefreshTable={setRefreshTable}
            columns={columns || []}
            selectedRow={selectedRow}
            actionUrl={editUrl || ""}
            setAnchorEl={setAnchorEl}
            configurations={configurations || {}}
          />
        </MenuItem>
      )}

      {deleteAction && (
        <MenuItem
          sx={{
            padding: 0,
            "&:hover": { backgroundColor: "inherit", cursor: "none" },
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
            "&:hover": { backgroundColor: "inherit", cursor: "none" },
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

      {customActions?.map((action: any) => (
        <MenuItem
          key={`custom-action-${action.id}`}
          sx={{
            padding: 0,
            "&:hover": { backgroundColor: "inherit", cursor: "none" },
          }}
        >
          <CustomAction
            {...action}
            rowData={selectedRow}
            setAnchorEl={setAnchorEl}
          />
        </MenuItem>
      ))}
    </Menu>
  );
};
