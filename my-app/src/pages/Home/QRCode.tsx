import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Button,
} from "@mui/material";
import callApi from "../../API/callApi";
import { useAuthedContext } from "../../context/AuthContext";
import CustomModal from "../../components/MaterialUI/Modal";
import { useLanguageContext } from "../../context/LanguageContext";
import { getQRCode } from "../Access Control/API/getQueries";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

const QRCode = () => {
  const [open, setOpen] = useState(false);
  const { authedUser, setAuthedUser } = useAuthedContext();
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguageContext();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (qrCodeUrl) URL.revokeObjectURL(qrCodeUrl);
    setQrCodeUrl(null);
    setError(null);
  };

  // const isIOS =
  //   /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

  useEffect(() => {
    if (open) {
      const fetchQRCode = async () => {
        try {
          setLoading(true);
          setError(null);

          const response = await callApi<any>({
            query: {
              ...getQRCode(authedUser.id),
              responseType: "blob", // get blob
            },
            auth: { setAuthedUser },
          });

          const imageUrl = URL.createObjectURL(response);
          setQrCodeUrl(imageUrl);
        } catch (err) {
          console.error("Error fetching QR code:", err);
          setError("Something went wrong");
        } finally {
          setLoading(false);
        }
      };

      fetchQRCode();
    }
  }, [open]);

  // const handleAddToWallet = () => {
  //   // Opens the .pkpass download URL for the current user
  //   window.location.href = `/api/pass/${authedUser.id}`;
  // };

  return (
    <>
      <IconButton color="primary" onClick={handleOpen}>
        <QrCodeScannerIcon />
      </IconButton>

      <CustomModal open={open} onClose={handleClose} title={t("QR Code")}>
        <Box
          sx={{ alignContent: "center", width: "100%", textAlign: "center" }}
        >
          {loading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}

          {!loading && !error && qrCodeUrl && (
            <Box
              sx={{
                position: "relative",
                display: "inline-block",
                mt: 2,
                width: "100%",
              }}
            >
              <img src={qrCodeUrl} alt="QR Code" style={{ width: "100%" }} />
              <Box
                component="img"
                src="/damil-logo.png"
                alt="Logo"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "10%",
                  height: "auto",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  p: "1%",
                }}
              />
            </Box>
          )}
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2, mr: 1 }}
            onClick={() => {
              const link = document.createElement("a");
              link.href = qrCodeUrl || "";
              link.download = "qr-code.png"; // file name
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            {t("Download QR Code")}
          </Button>
          {/* {isIOS && !loading && !error && (
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleAddToWallet}
            >
              {t("Add to Apple Wallet")}
            </Button>
          )} */}
        </Box>
      </CustomModal>
    </>
  );
};

export default QRCode;
