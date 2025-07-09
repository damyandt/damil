import React from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageButtons = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, currentPage + 1);

    if (currentPage <= 2) end = Math.min(3, totalPages);
    if (currentPage >= totalPages - 1) start = Math.max(totalPages - 2, 1);

    for (let i = start; i <= end; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "contained" : "outlined"}
          color={i === currentPage ? "primary" : "inherit"}
          onClick={() => onPageChange(i)}
          sx={{
            minWidth: "36px",
            padding: "6px 12px",
            borderRadius: "999px",
            textTransform: "none",
            mx: 0.5,
            fontSize: "0.8rem",
          }}
        >
          {i < 10 ? `0${i}` : i}
        </Button>
      );
    }

    return pages;
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        startIcon={<NavigateBeforeIcon />}
        sx={{ textTransform: "none", fontSize: "0.85rem", color: "#555" }}
      >
        Previous
      </Button>

      {currentPage > 2 && totalPages > 4 && (
        <>
          <Button
            variant="outlined"
            onClick={() => onPageChange(1)}
            sx={{
              minWidth: "36px",
              mx: 0.5,
              padding: "6px 12px",
              borderRadius: "999px",
              textTransform: "none",
              fontSize: "0.8rem",
            }}
          >
            01
          </Button>
          {currentPage > 3 && (
            <Typography sx={{ mx: 1, color: "#aaa", fontSize: "0.85rem" }}>
              ...
            </Typography>
          )}
        </>
      )}

      {renderPageButtons()}

      {currentPage < totalPages - 1 && totalPages > 4 && (
        <>
          {currentPage < totalPages - 2 && (
            <Typography sx={{ mx: 1, color: "#aaa", fontSize: "0.85rem" }}>
              ...
            </Typography>
          )}
          <Button
            variant="outlined"
            onClick={() => onPageChange(totalPages)}
            sx={{
              minWidth: "36px",
              mx: 0.5,
              padding: "6px 12px",
              borderRadius: "999px",
              textTransform: "none",
              fontSize: "0.8rem",
            }}
          >
            {totalPages < 10 ? `0${totalPages}` : totalPages}
          </Button>
        </>
      )}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        endIcon={<NavigateNextIcon />}
        sx={{ textTransform: "none", fontSize: "0.85rem", color: "#555" }}
      >
        Next
      </Button>
    </Box>
  );
};

export default PaginationControls;
