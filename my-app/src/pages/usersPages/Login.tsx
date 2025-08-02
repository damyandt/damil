import { useRef, useState } from "react";
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
  useTheme,
  hexToRgb,
} from "@mui/material";
import MuiLink from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditIcon from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "../../components/MaterialUI/FormFields/TextField";
import callApi, { COOKIE_REFRESH_TOKEN } from "../../API/callApi";
import { codeVerification, postLogin, validateEmail } from "./api/postQuery";
import { setCookie } from "../../Global/Utils/commonFunctions";
import { useAuthedContext } from "../../context/AuthContext";
import { SetCookieParams } from "../../Auth/authTypes";
import { Fade } from "../../components/MaterialUI/FormFields/Fade";
// import DarkVeil from "../../components/ogl/background";
import Orb from "../../components/ogl/background";
import CustomModal from "../../components/MaterialUI/Modal";
import { useLanguageContext } from "../../context/LanguageContext";

export const hexToVec3 = (hex: string): [number, number, number] => {
  const [r, g, b] = hexToRgb(hex)
    .match(/\d+/g)!
    .map((v: any) => parseInt(v) / 255);
  return [r, g, b];
};

export const errorMessages = {
  invalidEmail: "Account with this email does not exists.",
  invalidPassword: "Wrong password. Please double-check and try again.",
  unverified: "Account not verified. Please verify your account",
  invalidCode: "Invalid code.",
  internalServerError: "Oops, something happpend! Please try again in 5 min.",
};

const LoginPage = () => {
  const { setUserSignedIn } = useAuthedContext();
  const navigate = useNavigate();
  const theme = useTheme();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [showPasswordField, setShowPasswordField] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [disableEmail, setDisableEmail] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguageContext();
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
  });
  const primaryColor = hexToVec3(theme.palette.primary.main);
  const handleNextClick = async () => {
    try {
      if (!validator(true)) {
        console.warn("Form validation failed");
        return;
      }

      const responce = await callApi<any>({
        query: validateEmail({ email: formData.email }),
        auth: null,
      });

      if (responce.success === false) {
        return setErrors({ email: errorMessages.invalidEmail });
      }

      setShowPasswordField(true);
      setDisableEmail(true);
      setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 100);
    } catch (error) {
      console.error("Failed:", error);
      setErrors({
        email: errorMessages.internalServerError,
      });
    }
  };

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
      setUserSignedIn(false);
      setUserSignedIn(true);
      navigate("/");
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
    if (verificationCode.length !== 6) {
      setErrors({ verificationCode: "Verification Code must be 6 digits." });
      console.warn("Form validation failed!");
      return;
    }
    try {
      const responce = await callApi<any>({
        query: codeVerification({
          verificationCode: verificationCode,
          email: formData.email,
        }),
        auth: null,
      });
      setOpenModal(false);
      handleLogin();
      responce.success === true && navigate("/");
      responce.success === false && setErrors(responce.validationErrors);
    } catch (error) {
      console.log("Verification failed:", error);
    }
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
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 2,
            width: "100vw",
            height: "100vh",
            backgroundColor: theme.palette.customColors?.darkBackgroundColor,
          }}
        >
          <Orb
            primaryColor={primaryColor}
            hoverIntensity={1}
            rotateOnHover={true}
            hue={0.8}
            forceHoverState={false}
          />
        </Box>

        {/* <Box sx={{ zIndex: 10 }}> */}
        <Typography variant="h2" fontWeight={600} mb={4} zIndex={10}>
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
          <Typography
            variant="h3"
            fontWeight={500}
            sx={{
              color: theme.palette.primary.main,
              zIndex: 10,
              width: "fit-content",
              alignSelf: "center",
            }}
          >
            Sign in
          </Typography>
          <Grid container spacing={2} zIndex={10}>
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
            <Grid size={12} zIndex={10}>
              <Collapse in={showPasswordField}>
                <TextField
                  fullWidth
                  label={errors["password"] || "Password"}
                  type={showPassword ? "text" : "password"}
                  error={!!errors["password"]}
                  onChange={(e) => handleChange("password", e.target.value)}
                  inputRef={passwordInputRef}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleLogin();
                  }}
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
            sx={{
              alignSelf: "flex-center",
              mt: 1,
              zIndex: 10,
              width: "fit-content",
            }}
          />
          <Typography
            variant="body2"
            fontWeight={500}
            zIndex={10}
            width={"fit-content"}
            alignSelf={"center"}
          >
            You don't have an Account?{" "}
            <MuiLink component={RouterLink} to="/register" underline="hover">
              Register Here
            </MuiLink>
          </Typography>
        </Box>
      </Box>
      {/* </Box> */}
      <CustomModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={t("Verify Your Email")}
        width={"md"}
      >
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
      </CustomModal>
    </>
  );
};

export default LoginPage;
