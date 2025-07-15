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
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={4}
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
