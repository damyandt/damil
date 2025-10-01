import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper } from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const SuccessPayment: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ width: "100%", maxWidth: 500 }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 4,
            textAlign: "center",
            bgcolor: "background.paper",
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
          >
            <CheckCircleOutlineIcon
              color="success"
              sx={{ fontSize: 80, mb: 2 }}
            />
          </motion.div>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: "text.primary",
            }}
          >
            Payment Successful!
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, fontSize: "1.1rem" }}
          >
            Thank you for your purchase 🎉 Your plan is now active and ready to
            use.
          </Typography>

          {sessionId && (
            <Typography variant="body2" color="text.disabled" sx={{ mb: 2 }}>
              Session ID: {sessionId}
            </Typography>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: 2, px: 4, py: 1.2, fontWeight: 600 }}
              onClick={() => navigate("/")}
            >
              Go to Dashboard
            </Button>
          </motion.div>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default SuccessPayment;
