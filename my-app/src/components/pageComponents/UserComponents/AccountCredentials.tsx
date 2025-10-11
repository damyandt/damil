import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import callApi from "../../../API/callApi";
import { Response } from "../../../Global/Types/commonTypes";
import { useAuthedContext } from "../../../context/AuthContext";
import { updateCredentials } from "../../../Auth/API/apiAuthGetQueries";
import { updateProfile } from "../../../pages/usersPages/api/postQuery";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Alert from "../../MaterialUI/Alert";
import TextField from "../../MaterialUI/FormFields/TextField";
import Button from "../../MaterialUI/Button";

const AccountCredentials = () => {
  const { authedUser, setAuthedUser, setRefreshUserData } = useAuthedContext();
  const navigate = useNavigate();
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [successEmail, setSuccessEmail] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const [successPassword, setSuccessPassword] = useState<string | null>(null);

  const handleSaveEmail = async () => {
    setErrorEmail(null);
    setLoading(true);

    try {
      const emailRes = await callApi<Response<any>>({
        query: updateProfile({ email: newEmail }),
        auth: { setAuthedUser },
      });

      emailRes.success === true && setRefreshUserData(true);
      emailRes.success === true &&
        setSuccessEmail("Email updated successfully.");
      emailRes.success === false &&
        setSuccessEmail(emailRes.message || "Failed to update email.");
    } catch (err: any) {
      setErrorEmail(err?.message || "Failed to update email.");
    } finally {
      setLoading(false);
    }
  };
  const handleSavePassword = async () => {
    setErrorPassword(null);

    if (newPassword && newPassword !== confirmPassword) {
      setErrorPassword("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const passwordResp = await callApi<Response<any>>({
        query: updateCredentials({
          oldPassword,
          newPassword: newPassword,
        }),
        auth: { setAuthedUser },
      });
      passwordResp.success === true && setRefreshUserData(true);

      passwordResp.success === true &&
        setSuccessPassword("Password updated successfully.");
      passwordResp.success === false &&
        setSuccessPassword(
          passwordResp.message || "Failed to update password."
        );
    } catch (err: any) {
      setErrorPassword(err?.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid
      container
      spacing={2}
      minHeight="100%"
      p={4}
      width={"80%"}
      margin={"0 auto"}
      alignContent={"center"}
    >
      <Grid size={6}>
        <Typography variant="h4" margin={"0 auto"} mb={3}>
          Change Email
        </Typography>

        <Grid container spacing={2} mt={1} width={"100%"}>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Current Email"
              type="email"
              value={authedUser?.email || ""}
              disabled
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              label="New Email"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </Grid>

          <Grid
            size={12}
            display="flex"
            justifyContent="space-between"
            // mt={2}
            gap={2}
          >
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              color="error"
            >
              Back
            </Button>
            <Button onClick={handleSaveEmail} disabled={loading || !newEmail}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid size={6}>
        <Typography variant="h4" margin={"0 auto"} mb={3}>
          Change Password
        </Typography>
        <Grid container spacing={2} mt={1}>
          <Grid size={12}>
            <TextField
              type={showOldPassword ? "text" : "password"}
              fullWidth
              label="Current Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <Box sx={{ display: "flex", gap: 0, padding: 0 }}>
                    <InputAdornment
                      position="start"
                      sx={{ margin: "0", paddingLeft: "0" }}
                    >
                      <IconButton
                        onClick={() => setShowOldPassword((prev) => !prev)}
                        edge="start"
                        tabIndex={-1}
                        size="small"
                        sx={{ mr: -0.5 }}
                      >
                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  </Box>
                ),
              }}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              type={showNewPassword ? "text" : "password"}
              fullWidth
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <Box sx={{ display: "flex", gap: 0, padding: 0 }}>
                    <InputAdornment
                      position="start"
                      sx={{ margin: "0", paddingLeft: "0" }}
                    >
                      <IconButton
                        onClick={() => setShowNewPassword((prev) => !prev)}
                        edge="start"
                        tabIndex={-1}
                        size="small"
                        sx={{ mr: -0.5 }}
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  </Box>
                ),
              }}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <Box sx={{ display: "flex", gap: 0, padding: 0 }}>
                    <InputAdornment
                      position="start"
                      sx={{ margin: "0", paddingLeft: "0" }}
                    >
                      <IconButton
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        edge="start"
                        tabIndex={-1}
                        size="small"
                        sx={{ mr: -0.5 }}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  </Box>
                ),
              }}
            />
          </Grid>

          <Grid size={12} display="flex" justifyContent="flex-end" gap={2}>
            <Button
              onClick={handleSavePassword}
              disabled={
                loading || !oldPassword || !newPassword || !confirmPassword
              }
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid size={12}>
        <Alert
          message={errorEmail}
          showAlert={!!errorEmail}
          severity="error"
          autoClose
        />
      </Grid>

      <Grid size={12}>
        <Alert
          message={successEmail}
          showAlert={!!successEmail}
          severity="success"
          autoClose
        />
      </Grid>

      <Grid size={12}>
        <Alert
          message={errorPassword}
          showAlert={!!errorPassword}
          severity="error"
          autoClose
        />
      </Grid>

      <Grid size={12}>
        <Alert
          message={successPassword}
          showAlert={!!successPassword}
          severity="success"
          autoClose
        />
      </Grid>
    </Grid>
  );
};

export default AccountCredentials;
