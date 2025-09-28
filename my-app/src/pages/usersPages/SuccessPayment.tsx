import React from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const SuccessPayment: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <Box sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        ✅ Payment Successful!
      </Typography>
      {sessionId && (
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Session ID: {sessionId}
        </Typography>
      )}
      <Typography variant="body1" sx={{ mt: 2 }}>
        Thank you for your purchase. You can now access your plan.
      </Typography>

      <Button sx={{ mt: 4 }} variant="contained" color="primary" href="/">
        Go Home
      </Button>
    </Box>
  );
};

export default SuccessPayment;
