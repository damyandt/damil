import React, { useState } from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  LinearProgress,
} from "@mui/material";
import CustomTooltip from "../CustomTooltip";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CellRenderer from "./CellRenderer";
import { DeleteUndo } from "./DeleteAction";
import { MenuActions } from "./MenuActions";
import PaginationControls from "./PaginationControls";

export type Column = {
  header: string;
  field: any;
  align?: "left" | "right" | "center";
  type?: string;
  styles?: any;
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [deleteQueue, setDeleteQueue] = useState<{
    [key: string]: { progress: number; timerId: any };
  }>({});

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, row: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const paginatedRows = rows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

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
                    <CellRenderer
                      key={col.field}
                      value={row[col.field]}
                      dataType={"string"}
                      align={col.align}
                    />
                  ))}

                  {configurations.actions && (
                    <TableCell align="right">
                      {isDeleting ? (
                        <DeleteUndo
                          deleteQueue={deleteQueue}
                          setDeleteQueue={setDeleteQueue}
                          rowId={row.id}
                        />
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

      <MenuActions
        setDeleteQueue={setDeleteQueue}
        deleteQueue={deleteQueue}
        configurations={configurations}
        setRefreshTable={setRefreshTable}
        selectedRow={selectedRow}
        anchorEl={anchorEl}
        setSelectedRow={setSelectedRow}
        setAnchorEl={setAnchorEl}
      />
      <PaginationControls
        currentPage={page}
        totalPages={Math.ceil(rows.length / rowsPerPage)}
        onPageChange={(newPage) => setPage(newPage)}
      />
      {/* <Box
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
      </Box> */}
    </>
  );
};

export default TableComponent;
