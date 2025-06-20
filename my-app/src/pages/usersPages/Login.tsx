import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Collapse,
  Grid,
  Modal,
  Backdrop,
  Tooltip,
} from "@mui/material";
import MuiLink from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditIcon from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "../../components/TextField";
import { MAIN_COLOR } from "../../Layout/layoutVariables";
import callApi, { COOKIE_REFRESH_TOKEN } from "../../API/callApi";
import { codeVerification, postLogin, validateEmail } from "./api/postQuery";
import { setCookie } from "../../Global/Utils/commonFunctions";
import { useAuthedContext } from "../../context/AuthContext";
import { SetCookieParams } from "../../Auth/authTypes";
import { Fade } from "../../components/Fade";

export const errorMessages = {
  invalidEmail: "Account with this email does not exists.",
  invalidPassword: "Wrong password. Please double-check and try again.",
  unverified: "Verify email before login.",
  invalidCode: "Invalid code.",
  internalServerError: "Oops, something happpend! Please try again in 5 min.",
};

const LoginPage = () => {
  const { setUserSignedIn } = useAuthedContext();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [showPasswordField, setShowPasswordField] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [disableEmail, setDisableEmail] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
  });

  const handleNextClick = async () => {
    try {
      if (!validator(true)) {
        console.warn("Form validation failed");
        return;
      }

      const responce = await callApi<any>({
        query: validateEmail(formData.email),
        auth: null,
      });

      if (responce.message === errorMessages.invalidEmail) {
        return setErrors({ email: errorMessages.invalidEmail });
      }

      setShowPasswordField(true);
      setDisableEmail(true);
    } catch (error) {
      console.error("Failed:", error);
      setErrors({
        email: errorMessages.internalServerError,
      });
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (formData.email) {
        const responce = await callApi<any>({
          query: validateEmail(formData.email),
          auth: null,
        });

        if (responce.message === errorMessages.invalidEmail) {
          return setErrors({ email: errorMessages.invalidEmail });
        }
      }
    }, 700); // 500ms debounce

    return () => clearTimeout(delayDebounce);
  }, [formData.email]);

  const handleLogin = async () => {
    if (!validator(false)) {
      console.warn("Form validation failed");
      return;
    }
    try {
      const responce = await callApi<any>({
        query: postLogin(formData),
        auth: null,
      });

      if (responce.message === errorMessages.invalidPassword) {
        return setErrors({
          password: errorMessages.invalidPassword,
        });
      } else if (responce.message === errorMessages.unverified) {
        return setOpenModal(true);
      }

      const refresh_token = responce.refreshToken;
      const refreshCookie: SetCookieParams = {
        name: COOKIE_REFRESH_TOKEN,
        value: refresh_token,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
        sameSite: "strict",
        secure: true,
      };

      setCookie(refreshCookie);
      setUserSignedIn(true);
      console.log("Login success");
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({
        password: errorMessages.internalServerError,
      });
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validator = (onlyEmial: boolean) => {
    const newErrors: { [key: string]: string } = {};
    if (
      formData.email === undefined ||
      formData.email === null ||
      formData.email === ""
    ) {
      newErrors[`email`] = "This field is required";
    }

    if (
      formData.password === undefined ||
      formData.password === null ||
      formData.password === ""
    ) {
      !onlyEmial && (newErrors[`password`] = "This field is required");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResend = () => {
    if (resendCooldown === 0) {
      console.log("Code resent!");
      localStorage.setItem("lastResendTimestamp", Date.now().toString());
      setResendCooldown(60);
    }
  };

  const handleSubmitVerificationCode = async () => {
    console.log("predi");

    try {
      const responce = await callApi<any>({
        query: codeVerification({
          verificationCode: verificationCode,
          email: formData.email,
        }),
        auth: null,
      });

      if (responce.message === errorMessages.invalidCode) {
        return setErrors({
          verificationCode: errorMessages.invalidCode,
        });
      }
    } catch (error) {
      console.error("Register failed:", error);
    }
    handleLogin();
    setOpenModal(false);
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          textAlign: "center",
          backgroundImage: 'url("/login.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
        }}
      >
        <Typography variant="h3" fontWeight={600} mb={4}>
          Sign in to your Gym.
        </Typography>

        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" fontWeight={500} sx={{ color: MAIN_COLOR }}>
            Sign in
          </Typography>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                disabled={disableEmail}
                label={errors["email"] || "Email"}
                error={!!errors["email"]}
                onKeyDown={(e) => e.key === "Enter" && handleNextClick()}
                onChange={(e) => handleChange("email", e.target.value)}
                InputProps={{
                  endAdornment: !showPasswordField ? (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleNextClick}
                        size="small"
                      >
                        <ArrowForwardIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => {
                          setDisableEmail(false);
                          setShowPasswordField(false);
                        }}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={12}>
              <Collapse in={showPasswordField}>
                <TextField
                  fullWidth
                  label={errors["password"] || "Password"}
                  type={showPassword ? "text" : "password"}
                  error={!!errors["password"]}
                  onChange={(e) => handleChange("password", e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <Box sx={{ display: "flex", gap: 0, padding: 0 }}>
                        <InputAdornment
                          position="start"
                          sx={{ margin: "0", paddingLeft: "0" }}
                        >
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="start"
                            tabIndex={-1}
                            size="small"
                            sx={{ mr: -0.5 }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                        <InputAdornment position="end" sx={{ ml: 0 }}>
                          <IconButton
                            edge="end"
                            onClick={handleLogin}
                            size="small"
                          >
                            <ArrowForwardIcon />
                          </IconButton>
                        </InputAdornment>
                      </Box>
                    ),
                  }}
                />
              </Collapse>
            </Grid>
          </Grid>
          <FormControlLabel
            control={<Checkbox />}
            label="Remember me"
            sx={{ alignSelf: "flex-center", mt: 1 }}
          />
          <Typography variant="body2">
            You don't have an Account?{" "}
            <MuiLink component={RouterLink} to="/register" underline="hover">
              Register Here
            </MuiLink>
          </Typography>
        </Box>
      </Box>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="verification-modal-title"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 450,
              bgcolor: "background.paper",
              borderRadius: 3,
              boxShadow: 10,
              p: 4,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Typography
              id="verification-modal-title"
              variant="h5"
              fontWeight="bold"
            >
              Verify Your Email
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Please enter the 6-digit code sent to your email address.
            </Typography>

            <TextField
              placeholder="Enter code"
              fullWidth
              value={verificationCode || ""}
              error={!!errors["verificationCode"]}
              helperText={errors["verificationCode"] || " "}
              onChange={(e) => setVerificationCode(e.target.value)}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Tooltip
                title={
                  resendCooldown === 0
                    ? "Click to Resend Code"
                    : `Wait ${resendCooldown}s before you try again!`
                }
                sx={{ ml: 2 }}
              >
                <Typography
                  variant="body2"
                  onClick={handleResend}
                  sx={{
                    textDecoration: "underline",
                    "&:hover": {
                      cursor: "pointer",
                      color: resendCooldown === 0 ? "primary.main" : "",
                    },
                  }}
                >
                  Resend Code
                </Typography>
              </Tooltip>
              <IconButton
                onClick={handleSubmitVerificationCode}
                sx={{
                  bgcolor: "primary.main",
                  color: "#fff",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default LoginPage;
