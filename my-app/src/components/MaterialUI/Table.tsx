import React, { useState } from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  useTheme,
  Typography,
  Menu,
  MenuItem,
  LinearProgress,
} from "@mui/material";
import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import CustomTooltip from "./CustomTooltip";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UndoIcon from "@mui/icons-material/Undo";
import InfoIcon from "@mui/icons-material/Info";
import { useAuthedContext } from "../../context/AuthContext";
import callApi from "../../API/callApi";
import { deleteQueryAction } from "../ComponetsQueries";

export type Column = {
  header: string;
  field: any;
  align?: "left" | "right" | "center";
};

export type TableProps = {
  columns: Column[];
  rows: any;
  configurations: any;
  setRefreshTable?: React.Dispatch<React.SetStateAction<boolean>>;
};

const TableComponent = ({
  columns,
  rows,
  configurations,
  setRefreshTable,
}: TableProps) => {
  const theme = useTheme();
  const { setAuthedUser } = useAuthedContext();
  const [page, setPage] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [deleteQueue, setDeleteQueue] = useState<{
    [key: string]: { progress: number; timerId: any };
  }>({});

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, row: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };
  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };
  const rowsPerPage = configurations.pagination.pageSize;
  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleFirstPageButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    onPageChange(0);
  };

  const handleBackButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onPageChange(page - 1);
  };

  const handleNextButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onPageChange(page + 1);
  };

  const handleLastPageButtonClick = () => {
    onPageChange(Math.max(0, Math.ceil(rows.length / rowsPerPage) - 1));
  };

  const handleDeleteClick = (row: any) => {
    const id = row.id;

    if (deleteQueue[id]) return;

    const timerId = setInterval(() => {
      setDeleteQueue((prev) => {
        const progress = prev[id]?.progress || 0;
        if (progress >= 108) {
          clearInterval(timerId);
          sendDelete(row);
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

  const handleUndo = (id: string) => {
    if (deleteQueue[id]) {
      clearInterval(deleteQueue[id].timerId);
      setDeleteQueue((prev) => {
        const newQueue = { ...prev };
        delete newQueue[id];
        return newQueue;
      });
    }
  };

  const sendDelete = async (row: any) => {
    const id = row.id;
    const urlConfig = configurations.actions?.find(
      (el: { id: string }) => el.id === "delete"
    );

    if (!urlConfig) return;

    const url = urlConfig.url.split("{")[0];
    try {
      await callApi<any>({
        query: deleteQueryAction(url, id),
        auth: { setAuthedUser },
      });

      setRefreshTable?.((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const isRowDeleting = (id: string) => !!deleteQueue[id];

  return (
    <>
      <TableContainer sx={{ backgroundColor: "#f0f2f5", paddingX: "5px" }}>
        <MuiTable
          sx={{
            borderCollapse: "separate",
            borderSpacing: "0px 4px",
            "& .MuiTableCell-root": {
              paddingTop: "4px",
              paddingBottom: "4px",
              height: "3em",
            },
            "& .MuiTableRow-root": {
              height: "3em",
            },
            "& thead > tr:first-of-type > th": {
              borderBottom: "none",
              backgroundColor: "#f0f2f5",
            },
          }}
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#ffffff" }}>
              {columns.map((col) => (
                <TableCell
                  key={col.field as string}
                  align={col.align || "left"}
                  sx={{ fontWeight: "400" }}
                >
                  {col.header}
                </TableCell>
              ))}
              {configurations.actions && (
                <TableCell sx={{ fontWeight: "400" }} align="right">
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row: any) => {
              const isDeleting = isRowDeleting(row.id);
              const progress = deleteQueue[row.id]?.progress || 0;

              return (
                <TableRow
                  key={row.id}
                  sx={{
                    position: "relative",
                    backgroundColor: isDeleting ? "#ffe6e6" : "#fff",
                    transition: "background-color 0.3s ease",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      cursor: "pointer",
                      transform: "scale(0.99)",
                      zIndex: 1,
                      position: "relative",
                    },
                  }}
                >
                  {columns.map((col) => (
                    <TableCell key={col.field} align={col.align || "left"}>
                      {String(row[col.field])}
                    </TableCell>
                  ))}

                  {configurations.actions && (
                    <TableCell align="right">
                      {isDeleting ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            justifyContent: "flex-end",
                          }}
                        >
                          <CustomTooltip title="Undo" placement="left">
                            <IconButton
                              size="small"
                              onClick={() => handleUndo(row.id)}
                            >
                              <UndoIcon />
                            </IconButton>
                          </CustomTooltip>
                        </Box>
                      ) : (
                        <CustomTooltip title="Show Actions" placement="left">
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuOpen(e, row)}
                          >
                            <MoreHorizIcon />
                          </IconButton>
                        </CustomTooltip>
                      )}
                    </TableCell>
                  )}

                  {isDeleting && (
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: 3,
                        backgroundColor: "#fdd",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#d32f2f",
                        },
                      }}
                    />
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </MuiTable>
      </TableContainer>
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          p: 2,
        }}
      >
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <Typography variant="body2" sx={{ minWidth: 60, textAlign: "center" }}>
          Page {page + 1} of {Math.max(1, Math.ceil(rows.length / rowsPerPage))}
        </Typography>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(rows.length / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>

        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(rows.length / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    </>
  );
};

export default TableComponent;
