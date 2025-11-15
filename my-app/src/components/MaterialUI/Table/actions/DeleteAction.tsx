import { Box, IconButton } from "@mui/material";
import CustomTooltip from "../../CustomTooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import UndoIcon from "@mui/icons-material/Undo";
import { deleteQueryAction } from "../../../API/componentsQueries";
import callApi from "../../../../API/callApi";
import { useAuthedContext } from "../../../../context/AuthContext";
import { Dispatch, SetStateAction } from "react";
import {
  Configuration,
  DeleteQueueType,
  Response,
  Row,
} from "../../../../Global/Types/commonTypes";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useSnackbarContext } from "../../../../context/SnackbarContext";

type DeleteActionProps = {
  setDeleteQueue: Dispatch<SetStateAction<DeleteQueueType>>;
  deleteQueue: DeleteQueueType;
  configurations?: Configuration;
  setRefreshTable?: React.Dispatch<React.SetStateAction<boolean>>;
  setFinalRows: any;
  handleMenuClose: (event?: MouseEvent | React.KeyboardEvent) => void;
  selectedRow: Row | null;
};

export const DeleteAction = ({
  setDeleteQueue,
  deleteQueue,
  configurations,
  setFinalRows,
  handleMenuClose,
  selectedRow,
}: DeleteActionProps) => {
  const { t } = useLanguageContext();
  const { setAuthedUser } = useAuthedContext();
  const { addMessage } = useSnackbarContext();
  const handleDeleteClick = (row: Row) => {
    const id = row.id;
    if (deleteQueue[id]) return;

    let deleteTasks: Promise<void>[] = [];

    const timerId = setInterval(() => {
      setDeleteQueue((prev: DeleteQueueType) => {
        const progress = prev[id]?.progress || 0;
        if (progress >= 108) {
          clearInterval(timerId);

          const deletePromise = sendDelete(row);
          deleteTasks.push(deletePromise);

          const newQueue = { ...prev };
          delete newQueue[id];

          return newQueue;
        }

        return {
          ...prev,
          [id]: { progress: progress + 2, timerId },
        };
      });
    }, 100);
  };

  const sendDelete = async (row: Row): Promise<void> => {
    const id = row.id;
    const urlConfig = configurations?.actions?.find(
      (el: { id: string }) => el.id === "delete"
    );

    if (!urlConfig) return;

    const rawUrl = urlConfig.url.replace("{id}", id);
    const url = rawUrl.startsWith("/") ? rawUrl.slice(1) : rawUrl;

    try {
      await callApi<Response<any>>({
        query: deleteQueryAction(url),
        auth: { setAuthedUser },
      });
      addMessage(`${row.id} successfully deleted.`, "success");

      setFinalRows((prevRows: Row[]) => prevRows.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      addMessage(
        err.message || "An unknown error occurred during deletion.",
        "error"
      );
    }
  };

  return (
    <>
      <CustomTooltip title={t("Delete")} placement="bottom">
        <IconButton
          onClick={() => {
            selectedRow && handleDeleteClick(selectedRow);
            handleMenuClose();
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CustomTooltip>
    </>
  );
};

type DeleteUndoProps = {
  deleteQueue: DeleteQueueType;
  setDeleteQueue: Dispatch<SetStateAction<DeleteQueueType>>;
  rowId: string;
};

export const DeleteUndo = ({
  deleteQueue,
  setDeleteQueue,
  rowId,
}: DeleteUndoProps) => {
  const { t } = useLanguageContext();
  const handleUndo = (id: string) => {
    if (deleteQueue[id]) {
      clearInterval(deleteQueue[id].timerId);
      setDeleteQueue((prev: DeleteQueueType) => {
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
      <CustomTooltip title={t("Undo")} placement="left">
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
