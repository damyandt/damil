import React, { useState } from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  useTheme,
  Typography,
} from "@mui/material";
import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";

// Column type
export type Column<T> = {
  header: string;
  field: keyof T;
  align?: "left" | "right" | "center";
};

// Props type
export type TableProps<T extends object> = {
  columns: Column<T>[];
  rows: T[];
  configurations: any;
};

const TableComponent = <T extends object>({
  columns,
  rows,
  configurations,
}: TableProps<T>) => {
  const theme = useTheme();
  const [page, setPage] = useState<number>(0);

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };
  const rowsPerPage = configurations.pagination.pageSize;
  console.log(rowsPerPage);
  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(page + 1);
  };

  const handleLastPageButtonClick = () => {
    onPageChange(Math.max(0, Math.ceil(rows.length / rowsPerPage) - 1));
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          border: "1px solid rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          overflow: "hidden", // optional: prevents double borders from child elements
        }}
      >
        <MuiTable
          sx={{
            minWidth: 650,
            borderCollapse: "collapse",

            "& tbody tr:last-of-type td": {
              borderBottom: "none", // <-- removes bottom border from last row
            },
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.field as string}
                  align={col.align || "left"}
                  sx={{ fontWeight: "bold" }}
                >
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col) => (
                  <TableCell
                    key={col.field as string}
                    align={col.align || "left"}
                  >
                    {String(row[col.field])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>

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
