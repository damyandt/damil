import { useState, useEffect } from "react";
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import callApi from "../../API/callApi";
import { useAuthedContext } from "../../context/AuthContext";
import CustomModal from "../../components/MaterialUI/Modal";
import { useLanguageContext } from "../../context/LanguageContext";
import { getQRCode } from "../Access Control/API/getQueries";

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

  useEffect(() => {
    if (open) {
      const fetchQRCode = async () => {
        try {
          setLoading(true);
          setError(null);

          const response = await callApi<any>({
            query: {
              ...getQRCode(authedUser.id),
              responseType: "blob", // ✅ tell callApi to return blob
            },
            auth: { setAuthedUser },
          });

          //   const blob = await response.blob();
          //   const imageUrl = URL.createObjectURL(blob);
          const imageUrl = URL.createObjectURL(response); // <-- Създай URL от Blob
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

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Show QR Code
      </Button>

      <CustomModal open={open} onClose={handleClose} title={t("QR Code")}>
        <Box
          sx={{ alignContent: "center", width: "100%", textAlign: "center" }}
        >
          {loading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}
          {!loading && !error && qrCodeUrl && (
            <img
              src={qrCodeUrl}
              alt="QR Code"
              style={{ width: "100%", marginTop: 16 }}
            />
          )}
        </Box>
      </CustomModal>
    </>
  );
};

export default QRCode;
