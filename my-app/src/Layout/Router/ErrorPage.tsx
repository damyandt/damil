import {
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";
import { Button, Box, Typography, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  // Prepare detailed error info
  let errorMessage = "Unknown error";
  let errorStack = "";
  let statusInfo = null;

  if (isRouteErrorResponse(error)) {
    errorMessage =
      error.statusText ||
      (typeof error.data === "string" ? error.data : "") ||
      errorMessage;
    statusInfo = (
      <Typography variant="body2" color="error" sx={{ mt: 1 }}>
        Status: {error.status} {error.statusText}
      </Typography>
    );
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorStack = error.stack || "";
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8d7da",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        sx={{
          minHeight: "90vh",
          maxWidth: "90vw",
          width: "100%",
          p: 4,
          textAlign: "center",
          backgroundColor: "#fff0f1",
          border: "1px solid #f5c2c7",
          borderRadius: 2,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 60, color: "#d32f2f", mb: 2 }} />
        <Typography variant="h4" color="error" gutterBottom>
          Oops! Something went wrong.
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          An unexpected error has occurred. This may be due to a bug or an issue
          with loading data. You can go back and try again.
        </Typography>

        <Typography
          variant="body2"
          component="pre"
          sx={{
            textAlign: "left",
            background: "#fff",
            color: "#d32f2f",
            p: 2,
            borderRadius: 1,
            overflow: "auto",
            maxHeight: "auto",
            fontSize: "0.9rem",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {errorMessage}
          {errorStack && `\n\nStack trace:\n${errorStack}`}
        </Typography>

        {statusInfo}

        <Button
          variant="outlined"
          color="error"
          sx={{ mt: 3 }}
          onClick={handleBack}
        >
          Go Back
        </Button>
      </Paper>
    </Box>
  );
}
