import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CustomTooltip from "../CustomTooltip";

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
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        ml: "-1em",
        width: "100%",
        borderRadius: "0 0 20px 20px",
        padding: 2,
        pb: 2,
        pt: 2,
        zIndex: 10,
        borderTop: "1px solid #e0e0e0",
        backgroundColor: "#fff",
        boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.08)",
      }}
    >
      <CustomTooltip title="Back">
        <IconButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <NavigateBeforeIcon />
        </IconButton>
      </CustomTooltip>
      <Typography
        sx={{
          fontSize: "0.875rem",
          px: 2,
          py: 1,
          border: "1px solid #ccc",
          textAlign: "center",
        }}
      >
        Page {currentPage < 10 ? `0${currentPage}` : currentPage} of{" "}
        {totalPages < 10 ? `0${totalPages}` : totalPages}
      </Typography>

      <CustomTooltip title="Next" placement="left">
        <IconButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <NavigateNextIcon />
        </IconButton>
      </CustomTooltip>
    </Box>
  );
};

export default PaginationControls;
