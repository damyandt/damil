import { Box, IconButton } from "@mui/material";
import CustomTooltip from "../../CustomTooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import UndoIcon from "@mui/icons-material/Undo";
import { deleteQueryAction } from "../../../API/componentsQueries";
import callApi from "../../../../API/callApi";
import { useAuthedContext } from "../../../../context/AuthContext";

type DeleteActionProps = {
  setDeleteQueue: any;
  deleteQueue: any;
  configurations: any;
  setRefreshTable: any;
  handleMenuClose: any;
  selectedRow: any;
};

export const DeleteAction = ({
  setDeleteQueue,
  deleteQueue,
  configurations,
  setRefreshTable,
  handleMenuClose,
  selectedRow,
}: DeleteActionProps) => {
  const { setAuthedUser } = useAuthedContext();
  const handleDeleteClick = (row: any) => {
    const id = row.id;
    if (deleteQueue[id]) return;

    let deleteTasks: Promise<void>[] = [];

    const timerId = setInterval(() => {
      setDeleteQueue((prev: any) => {
        const progress = prev[id]?.progress || 0;
        if (progress >= 108) {
          clearInterval(timerId);

          const deletePromise = sendDelete(row);
          deleteTasks.push(deletePromise);

          const newQueue = { ...prev };
          delete newQueue[id];

          deletePromise.finally(() => {
            setTimeout(() => {
              setDeleteQueue((current: any) => {
                if (Object.keys(current).length === 0) {
                  setRefreshTable?.((prev: any) => !prev);
                }
                return current;
              });
            }, 100);
          });

          return newQueue;
        }

        return {
          ...prev,
          [id]: { progress: progress + 2, timerId },
        };
      });
    }, 100);
  };

  const sendDelete = async (row: any): Promise<void> => {
    const id = row.id;
    const urlConfig = configurations.actions?.find(
      (el: { id: string }) => el.id === "delete"
    );

    if (!urlConfig) return;

    const rawUrl = urlConfig.url.replace("{id}", id);
    const url = rawUrl.startsWith("/") ? rawUrl.slice(1) : rawUrl;

    try {
      await callApi<any>({
        query: deleteQueryAction(url),
        auth: { setAuthedUser },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CustomTooltip title="Delete" placement="bottom">
      <IconButton
        onClick={() => {
          handleDeleteClick(selectedRow);
          handleMenuClose();
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </CustomTooltip>
  );
};

type DeleteUndoProps = {
  deleteQueue: any;
  setDeleteQueue: any;
  rowId: string;
};

export const DeleteUndo = ({
  deleteQueue,
  setDeleteQueue,
  rowId,
}: DeleteUndoProps) => {
  const handleUndo = (id: string) => {
    if (deleteQueue[id]) {
      clearInterval(deleteQueue[id].timerId);
      setDeleteQueue((prev: any) => {
        const newQueue = { ...prev };
        delete newQueue[id];
        return newQueue;
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        justifyContent: "flex-end",
        zIndex: 100,
      }}
    >
      <CustomTooltip title="Undo" placement="left">
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleUndo(rowId);
          }}
        >
          <UndoIcon />
        </IconButton>
      </CustomTooltip>
    </Box>
  );
};
