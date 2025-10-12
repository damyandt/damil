import { Snackbar, IconButton, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomSnackbar = ({
  open,
  onClose,
  message,
  position = { vertical: "bottom", horizontal: "right" },
}: {
  open: boolean;
  onClose: () => void;
  message: string;
  position?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
}) => {
  const theme = useTheme();

  return (
    <Snackbar
      anchorOrigin={position}
      open={open}
      onClose={onClose}
      message={message}
      autoHideDuration={6000}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      }
      ContentProps={{
        sx: {
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.grey[900]
              : theme.palette.primary.main,
          color:
            theme.palette.mode === "dark"
              ? theme.palette.primary.contrastText
              : "#fff",
          borderRadius: 1,
          boxShadow: theme.shadows[4],
        },
      }}
    />
  );
};

export default CustomSnackbar;
