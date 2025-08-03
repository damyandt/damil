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
import { DeleteUndo } from "./DeleteAction";
import { MenuActions } from "./MenuActions";
import PaginationControls from "./PaginationControls";
import TextField from "../FormFields/TextField";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { useLanguageContext } from "../../../context/LanguageContext";
import { ColumnType } from "../../../Global/Types/commonTypes";
import ColumnVisibilityModal from "./ColumnVisibility";
import Button from "../Button";

export type Column = {
  header: string;
  field: any;
  align?: "left" | "right" | "center";
  type: ColumnType;
  styles?: any;
  dropDownConfig?: any;
};

export type TableProps = {
  columns: Column[];
  rows: any;
  configurations: any;
  setRefreshTable?: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
};

const TableComponent = ({
  columns = [],
  rows = [],
  configurations = {},
  setRefreshTable,
  title,
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
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [deleteQueue, setDeleteQueue] = useState<{
    [key: string]: { progress: number; timerId: any };
  }>({});
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, row: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };
  const filteredRows = rows?.filter((row: any) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const paginatedRows = filteredRows?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const isRowDeleting = (id: string) => !!deleteQueue[id];

  const visibleColumns = columnVisibilityConfig
    ? columns.filter((col: any) => columnVisibilityConfig[col.field])
    : columns;
  return (
    <>
      <Grid container spacing={2} alignItems={"center"} py={2}>
        <Grid size={3}>
          <TextField
            size="small"
            label="Search..."
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
            label="Rows"
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
        {/* {configurations.filters?.map((filter: any) => (
          <Grid key={filter.field} item xs={2}>
            <TextField
              select
              size="small"
              label={filter.label}
              value={filters[filter.field] || ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  [filter.field]: e.target.value,
                }))
              }
              fullWidth
            >
              <MenuItem value="">All</MenuItem>
              {filter.options.map((option: string) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        ))} */}
        <Grid size={2} alignItems="right">
          {/* <TextField
            select
            size="small"
            label="Status"
            value={""}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          >
            {["active", "inactive"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField> */}
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
                  transform: "scale(1.05)",
                },
              }}
            >
              Columns
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
              {visibleColumns?.map((col) => (
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
              {configurations.actions && (
                <TableCell sx={{ fontWeight: "400" }} align="right">
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.length === 0 ? (
              <Typography>{t("No Data...")}</Typography>
            ) : (
              paginatedRows?.map((row: any) => {
                const isDeleting = isRowDeleting(row.id);
                const progress = deleteQueue[row.id]?.progress || 0;

                return (
                  <TableRow
                    onClick={() => {
                      if (
                        configurations.actions?.find(
                          (action: any) => action.id === "details"
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
                        transform: "scale(0.99)",
                        zIndex: 1,
                        position: "relative",
                      },
                    }}
                  >
                    {visibleColumns.map((col) => {
                      return (
                        <TableCell
                          align={col.align}
                          key={col.field}
                          sx={{ borderBottom: "none" }}
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

                    {configurations.actions && (
                      <TableCell
                        align="right"
                        sx={{ zIndex: 100, borderBottom: "none" }}
                      >
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
