import React, { useState } from "react";
import { Box, Grid, IconButton, InputAdornment } from "@mui/material";
import TextField from "../../MaterialUI/FormFields/TextField";
import Button from "../../MaterialUI/Button";
import CustomModal from "../../MaterialUI/Modal";
import { useLanguageContext } from "../../../context/LanguageContext";
import { Response } from "../../../Global/Types/commonTypes";
import callApi from "../../../API/callApi";
import { updateCredentials } from "../../../Auth/API/apiAuthGetQueries";
import { useAuthedContext } from "../../../context/AuthContext";
import { useSnackbarContext } from "../../../context/SnackbarContext";
import Alert from "../../MaterialUI/Alert";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const { t } = useLanguageContext();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { addMessage } = useSnackbarContext();
  const { setAuthedUser } = useAuthedContext();
  const handleSubmit = async () => {
    setErrorPassword(null);

    setLoading(true);
    try {
      const response = await callApi<Response<any>>({
        query: updateCredentials({
          oldPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        }),
        auth: { setAuthedUser },
      });
      setAuthedUser(response.data);
      onSubmit();
      addMessage(t("Password updated successfully."), "success");
    } catch (err: any) {
      console.error(err);
      setErrorPassword(err?.message || t("Failed to update password."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomModal title={t("Change Password")} open={open} onClose={onClose}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField
            label={t("Old Password")}
            type={showOldPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowOldPassword((show) => !show)}
                    edge="end"
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label={t("New Password")}
            type={showNewPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowNewPassword((show) => !show)}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label={t("Confirm New Password")}
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowConfirmPassword((show) => !show)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid size={12}>
          <Alert
            message={t("Loading...")}
            showAlert={loading}
            severity="info"
            autoClose
          />
        </Grid>
        <Grid size={12}>
          <Alert
            message={t(errorPassword!)}
            showAlert={!!errorPassword}
            severity="error"
            autoClose
          />
        </Grid>
        <Box
          width="100%"
          mt={2}
          display="flex"
          justifyContent="flex-end"
          gap={2}
        >
          <Button color="error" onClick={onClose} disabled={loading}>
            {t("Cancel")}
          </Button>
          <Button color="primary" onClick={handleSubmit} disabled={loading}>
            {t("Change Password")}
          </Button>
        </Box>
      </Grid>
    </CustomModal>
  );
};

export default ChangePasswordModal;
