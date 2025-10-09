import { Box, Typography, Stepper, Step, StepLabel } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DownloadIcon from "@mui/icons-material/Download";
import { useLanguageContext } from "../../context/LanguageContext";
import { invoiceTemplate } from "../../components/templates/invoiceTemplate";
import Button from "../../components/MaterialUI/Button";

const SuccessPage = () => {
  const { t } = useLanguageContext();
  const steps = [
    t("Payment Accept"),
    t("Unlocked Sections"),
    t("Confirmation Email Sent"),
  ];

  const handleDownloadInvoice = () => {
    const blob = new Blob([invoiceTemplate], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "invoice.html"; // ✅ Use a string filename here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Box
      sx={{
        py: 6,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Stepper activeStep={3} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                sx: {
                  color: index <= 1 ? "#4caf50" : undefined,
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box textAlign="center" mt={4}>
        <CheckCircleIcon sx={{ fontSize: 72, color: "#4caf50", mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          {t("Thank You!")}
        </Typography>
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          {t("Your payment was successful and your order is complete.")}
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {t(
            "A confirmation email has been sent with your invoice and plan details."
          )}
        </Typography>

        <Button startIcon={<DownloadIcon />} onClick={handleDownloadInvoice}>
          {t("Download Invoice")}
        </Button>
      </Box>
    </Box>
  );
};

export default SuccessPage;
