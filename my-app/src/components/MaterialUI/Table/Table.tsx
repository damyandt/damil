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
  Typography,
  Grid,
  InputAdornment,
  MenuItem,
  useTheme,
} from "@mui/material";
import CustomTooltip from "../CustomTooltip";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CellRenderer from "./CellRenderer";

import { MenuActions } from "./MenuActions";
import PaginationControls from "./PaginationControls";
import TextField from "../FormFields/TextField";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { useLanguageContext } from "../../../context/LanguageContext";
import {
  Column,
  Configuration,
  DeleteQueueType,
  Row,
  TableAction,
} from "../../../Global/Types/commonTypes";
import ColumnVisibilityModal from "./ColumnVisibility";
import Button from "../Button";
import { DeleteUndo } from "./actions/DeleteAction";

export type TableProps = {
  columns: Column[] | [];
  rows: Row[];
  configurations?: Configuration;
  setRefreshTable?: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  customActions?: any;
};

const TableComponent = ({
  columns = [],
  rows = [],
  configurations,
  setRefreshTable,
  title,
  customActions,
}: TableProps) => {
  const theme = useTheme();
  const { t } = useLanguageContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [columnVisibilityConfig, setColumnVisibilityConfig] = useState<Record<
    string,
    boolean
  > | null>(configurations?.columnsLayoutConfig?.columnVisibility ?? null);
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<
    null | HTMLElement | "closeOnlyAnchor"
  >(null);
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [deleteQueue, setDeleteQueue] = useState<DeleteQueueType>({});
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, row: Row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };
  const filteredRows = rows?.filter((row: Row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  let sortedRows = [...(filteredRows || [])];
  if (configurations?.sortable?.field) {
    const { field, desc } = configurations.sortable;

    const columnDef = columns.find((col: Column) => col.field === field);
    const colType = columnDef?.type || "string"; // default to string

    sortedRows.sort((a: Row, b: Row) => {
      const valA = a[field];
      const valB = b[field];

      switch (colType) {
        case "date": {
          const timeA = valA ? new Date(valA).getTime() : 0;
          const timeB = valB ? new Date(valB).getTime() : 0;
          return desc ? timeB - timeA : timeA - timeB;
        }
        case "number":
          return desc
            ? Number(valB) - Number(valA)
            : Number(valA) - Number(valB);

        default:
          return desc
            ? valB?.toString().localeCompare(valA?.toString())
            : valA?.toString().localeCompare(valB?.toString());
      }
    });
  }

  const paginatedRows = sortedRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const isRowDeleting = (id: string) => !!deleteQueue[id];

  const visibleColumns = columnVisibilityConfig
    ? columns.filter((col: Column) => columnVisibilityConfig[col.field])
    : columns;
  return (
    <>
      <Grid container spacing={2} alignItems={"center"} py={2}>
        <Grid size={3}>
          <TextField
            size="small"
            label={t("Search...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: "250px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid size={6}>
          <Typography variant="h4" sx={{ textAlign: "center", flexGrow: 1 }}>
            {title}
          </Typography>
        </Grid>

        <Grid size={1} alignItems="right">
          <TextField
            select
            size="small"
            label={t("Rows")}
            value={rowsPerPage}
            onChange={(e) => {
              setPage(1);
              setRowsPerPage(parseInt(e.target.value, 10));
            }}
          >
            {[5, 7, 10, 15, 20].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={2} alignItems="right">
          <Button
            borderWidth={1}
            borderColor="#ccc"
            color="inherit"
            onClick={() => setModalOpen(true)}
            startIcon={<SettingsIcon fontSize="small" />}
          >
            <Typography
              sx={{
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  border: "none",
                  transform: "scale(1.05)",
                },
              }}
            >
              {t("Columns")}
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <TableContainer
        sx={{
          backgroundColor: theme.palette.customColors?.tableBackground,
          paddingX: "5px",
          marginBottom: "10vh",
        }}
      >
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
              backgroundColor: theme.palette.customColors?.tableBackground,
            },
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: theme.palette.customColors?.tableBackground,
              }}
            >
              {visibleColumns?.map((col: Column) => (
                <TableCell
                  key={col.field as string}
                  align={col.align || "left"}
                  sx={{
                    paddingLeft: "2em",
                    fontWeight: "400",
                    minWidth: col.header.toLowerCase() === "id" ? 50 : 180,
                  }}
                >
                  {col.header}
                </TableCell>
              ))}
              {configurations?.actions && (
                <TableCell sx={{ fontWeight: "400" }} align="right">
                  {t("Actions")}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.length === 0 ? (
              <Typography>{t("No Data...")}</Typography>
            ) : (
              paginatedRows?.map((row: Row) => {
                const isDeleting = isRowDeleting(row.id);
                const progress = deleteQueue[row.id]?.progress || 0;

                return (
                  <TableRow
                    onClick={() => {
                      if (
                        configurations?.actions?.find(
                          (action: TableAction) => action.id === "details"
                        )
                      ) {
                        setOpenDetails(true);
                        setAnchorEl("closeOnlyAnchor");
                        setSelectedRow(row);
                      }
                    }}
                    key={row.id}
                    sx={{
                      position: "relative",
                      backgroundColor: isDeleting
                        ? theme.palette.mode === "dark"
                          ? "#5a2a2a"
                          : "#ffe6e6"
                        : theme.palette.customColors?.tableRow,
                      transition: "background-color 0.3s ease",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "rgba(96, 96, 96, 0.78)"
                            : "#fff",
                        cursor: "pointer",
                        // transform: "scale(0.99)",
                        zIndex: 10,
                        position: "relative",
                      },
                    }}
                  >
                    {visibleColumns.map((col: Column) => {
                      return (
                        <TableCell
                          align={col.align}
                          key={col.field}
                          sx={{ borderBottom: "none", border: "none" }}
                        >
                          <CellRenderer
                            key={col.field}
                            value={row[col.field]}
                            dataType={col.type}
                            table={true}
                          />
                        </TableCell>
                      );
                    })}

                    {(configurations?.actions || customActions) && (
                      <TableCell
                        align="right"
                        sx={{
                          zIndex: 100,
                          borderBottom: "none",
                          display: "flex",
                          alignItems: "flex-end",
                        }}
                      >
                        {isDeleting ? (
                          <DeleteUndo
                            deleteQueue={deleteQueue}
                            setDeleteQueue={setDeleteQueue}
                            rowId={row.id}
                          />
                        ) : (
                          <CustomTooltip
                            title="Show Actions"
                            placement="left"
                            sx={{ width: "fit-content" }}
                          >
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMenuOpen(e, row);
                              }}
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
              })
            )}
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
        columns={columns}
        open={openDetails}
        setOpen={setOpenDetails}
        customActions={customActions}
      />
      <PaginationControls
        currentPage={page}
        totalPages={Math.ceil(filteredRows.length / rowsPerPage)}
        onPageChange={(newPage) => setPage(newPage)}
      />
      <ColumnVisibilityModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        columnVisibility={columnVisibilityConfig}
        onSave={(updated) => setColumnVisibilityConfig(updated)}
      />
    </>
  );
};

export default TableComponent;
