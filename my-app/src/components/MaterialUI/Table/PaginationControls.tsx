import React from "react";
import { Box, Button, Typography } from "@mui/material";
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
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={4}
    >
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        startIcon={<NavigateBeforeIcon />}
        sx={{
          textTransform: "none",
          fontSize: "0.85rem",
          color: "#000",
          width: "10em",
        }}
      >
        Previous
      </Button>

      <Typography
        sx={{
          fontWeight: 500,
          fontSize: "0.875rem",
          color: "#333",
          px: 2,
          py: 1,
          border: "1px solid #ccc",
          borderRadius: "12px",
          minWidth: "80px",
          textAlign: "center",
        }}
      >
        Page {currentPage < 10 ? `0${currentPage}` : currentPage} of{" "}
        {totalPages < 10 ? `0${totalPages}` : totalPages}
      </Typography>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        endIcon={<NavigateNextIcon />}
        sx={{
          textTransform: "none",
          fontSize: "0.85rem",
          color: "#000",
          width: "10em",
        }}
      >
        Next
      </Button>
    </Box>
  );
};

export default PaginationControls;
