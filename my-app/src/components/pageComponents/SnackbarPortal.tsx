import {
  SnackbarMessage,
  useSnackbarContext,
} from "../../context/SnackbarContext";
import CustomSnackbar from "../MaterialUI/FormFields/Snackbar";
import { Box } from "@mui/material";
import { AnimatePresence } from "framer-motion";

export default function SnackbarPortal() {
  const { messages, handleCloseMessage } = useSnackbarContext();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        display: "flex",
        flexDirection: "row",
        gap: "0.5rem",
        zIndex: 2000,
        pointerEvents: "none",
      }}
    >
      <AnimatePresence initial={false}>
        {messages?.map((msg: SnackbarMessage) => (
          <Box key={msg.id} sx={{ pointerEvents: "auto" }}>
            <CustomSnackbar
              severaty={msg.severity}
              message={msg.message}
              onClose={() => handleCloseMessage(String(msg.id))}
            />
          </Box>
        ))}
      </AnimatePresence>
    </Box>
  );
}
