import { Box, IconButton, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutlined";
import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from "@mui/icons-material/Error";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function CustomSnackbar({
  message,
  onClose,
  severaty,
}: {
  message: string;
  onClose: () => void;
  severaty: "success" | "info" | "error";
}) {
  const theme = useTheme();

  // Auto-close after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // 5000ms = 5 seconds
    return () => clearTimeout(timer); // cleanup if unmounted
  }, [onClose]);

  // Border colors for severity
  const borderColor = {
    success: theme.palette.success.main,
    info: theme.palette.info.main,
    error: theme.palette.error.main,
  }[severaty];

  // Light background colors for severity
  const backgroundColor = {
    success: "#d4edda", // light green
    info: "#d1ecf1", // light blue
    error: "#f8d7da", // light red
  }[severaty];

  // Icon colors
  const iconColor = {
    success: theme.palette.success.main,
    info: theme.palette.info.main,
    error: theme.palette.error.main,
  }[severaty];

  const getSeverityIcon = () => {
    switch (severaty) {
      case "success":
        return <CheckCircleIcon fontSize="small" sx={{ color: iconColor }} />;
      case "error":
        return <ErrorIcon fontSize="small" sx={{ color: iconColor }} />;
      case "info":
      default:
        return <InfoIcon fontSize="small" sx={{ color: iconColor }} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          padding: "0.8em 1em",
          borderRadius: "8px",
          border: `1px solid ${borderColor}`,
          backgroundColor: backgroundColor,
          color: "#000", // dark text for readability on light background
          boxShadow: theme.shadows[2],
          minWidth: "220px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {getSeverityIcon()}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            textAlign: "center",
            lineHeight: 1.3,
            fontSize: "0.9rem",
          }}
        >
          {message}
        </Box>
        <IconButton size="small" onClick={onClose} sx={{ color: "#000" }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </motion.div>
  );
}
