import * as React from "react";
import {
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Grid,
  Tooltip,
  useTheme,
} from "@mui/material";
import MuiLink from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LanguageOutlined from "@mui/icons-material/LanguageOutlined";
import TextField from "../../components/MaterialUI/FormFields/TextField";
import callApi, { COOKIE_REFRESH_TOKEN } from "../../API/callApi";
import { codeVerification, postLogin, postRegister } from "./api/postQuery";
import { useAuthedContext } from "../../context/AuthContext";
import { setCookie } from "../../Global/Utils/commonFunctions";
import { SetCookieParams } from "../../Auth/authTypes";
import CustomModal from "../../components/MaterialUI/Modal";
import { useLanguageContext } from "../../context/LanguageContext";
import Orb from "../../components/ogl/background";
import { hexToVec3 } from "./Login";
import TextType from "../../components/ogl/textTyping";
import CustomTooltip from "../../components/MaterialUI/CustomTooltip";

const RegisterPage = () => {
  const { setUserSignedIn } = useAuthedContext();
  const { t, setLanguage, language } = useLanguageContext();
  const theme = useTheme();
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [resendCooldown, setResendCooldown] = React.useState<number>(0);
  const [verificationCode, setCode] = React.useState<string>("");
  const [formData, setFormData] = React.useState<any>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    if (!validator(false)) {
      console.warn("Form validation failed!");
      return;
    }
    try {
      const responce = await callApi<any>({
        query: postRegister(formData),
        auth: null,
      });
      if (responce.success === false) {
        setErrors(responce.validationErrors);
      } else if (responce.success === true) {
        setOpenModal(true);
      }
    } catch (error) {
      console.error("Register failed:", error);
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

  React.useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (formData.email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailPattern.test(formData.email)) {
          return setErrors((prev) => ({
            ...prev,
            email: "Invalid Email!",
          }));
        }
      }
    }, 700);

    return () => clearTimeout(delayDebounce);
  }, [formData.email]);

  React.useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (formData.password) {
        if (formData.password.length < 8) {
          return setErrors((prev) => ({
            ...prev,
            password: t("At least 8 characters"),
          }));
        }
      }
    }, 700);
    return () => clearTimeout(delayDebounce);
  }, [formData.password]);

  React.useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (formData.confirmPassword) {
        if (formData.confirmPassword !== formData.password) {
          return setErrors((prev) => ({
            ...prev,
            confirmPassword: t("Passwords do not match."),
          }));
        }
      }
    }, 700);
    return () => clearTimeout(delayDebounce);
  }, [formData.confirmPassword]);

  const validator = (isVerificationCode: boolean) => {
    const newErrors: { [key: string]: string } = {};
    if (!isVerificationCode) {
      const fields: string[] = ["username", "email", "password"];
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email && !emailPattern.test(formData.email)) {
        newErrors["email"] = t("Please enter a valid email address.");
      }
      fields.map((el: string) => {
        if (
          formData[el] === undefined ||
          formData[el] === null ||
          formData[el] === ""
        ) {
          newErrors[el] =
            `${el.charAt(0).toUpperCase() + el.slice(1)} is Required`;
        }
      });

      formData.password.length < 8 &&
        (newErrors["password"] = t("Password must be at least 8 characters."));
      formData.confirmPassword.length === 0 &&
        (newErrors["confirmPassword"] = t("Confirm Password is Required"));
      formData.confirmPassword !== formData.password &&
        (newErrors["confirmPassword"] = t("Passwords do not match."));
    } else {
      verificationCode.length !== 6 &&
        (newErrors["verificationCode"] = t(
          "Verification Code must be 6 digits."
        ));
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

  React.useEffect(() => {
    const lastResend = localStorage.getItem("lastResendTimestamp");
    if (lastResend) {
      const secondsPassed = Math.floor(
        (Date.now() - Number(lastResend)) / 1000
      );
      const remaining = 60 - secondsPassed;
      if (remaining > 0) {
        setResendCooldown(remaining);
      }
    }
  }, []);

  React.useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [resendCooldown]);

  const handleSubmitVerificationCode = async () => {
    if (!validator(true)) {
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
      if (responce.success === true) {
        const responce = await callApi<any>({
          query: postLogin({
            email: formData.email,
            password: formData.password,
          }),
          auth: null,
        });

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
      } else {
        setErrors(responce.validationErrors);
      }
    } catch (error) {
      console.log("Verification failed:", error);
    }
  };
  const primaryColor = hexToVec3(theme.palette.primary.main);
  return (
    <>
      <CustomTooltip
        title={
          language === "bg" ? "Превключи на Английски" : "Switch to Bulgarian"
        }
        placement="left"
        sx={{ zIndex: 100, position: "absolute", top: 0, right: 0, m: 3 }}
      >
        <IconButton
          onClick={() => setLanguage(language === "bg" ? "en" : "bg")}
        >
          <LanguageOutlined />
        </IconButton>
      </CustomTooltip>
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

        <Typography variant="h2" fontWeight={600} mb={1} sx={{ zIndex: 10 }}>
          <TextType
            text={[
              t("Make new Profile"),
              t("Make new Profile"),
              t("Make new Profile"),
            ]}
            typingSpeed={75}
            pauseDuration={3000}
            showCursor={true}
            cursorCharacter="|"
          />
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
            variant="h4"
            fontWeight={500}
            sx={{
              color: theme.palette.primary.main,
              zIndex: 10,
              width: "fit-content",
              alignSelf: "center",
            }}
          >
            {t("Sign up")}
          </Typography>
          <Grid container spacing={2} zIndex={10}>
            <Grid size={12}>
              <TextField
                fullWidth
                label={errors["username"] || t("Username")}
                error={!!errors["username"]}
                onChange={(e) => handleChange("username", e.target.value)}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label={errors["email"] || t("Email")}
                error={!!errors["email"]}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label={errors["password"] || t("Password")}
                fullWidth
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
                    </Box>
                  ),
                }}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label={errors["confirmPassword"] || "Confirm Password"}
                fullWidth
                type={showPassword ? "text" : "password"}
                error={!!errors["confirmPassword"]}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                InputProps={{
                  endAdornment: (
                    <Box sx={{ display: "flex", gap: 0, padding: 0 }}>
                      <InputAdornment position="end" sx={{ ml: 0 }}>
                        <IconButton
                          edge="end"
                          onClick={() => {
                            handleRegister();
                          }}
                          size="small"
                        >
                          <ArrowForwardIcon />
                        </IconButton>
                      </InputAdornment>
                    </Box>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Typography variant="body2" zIndex={10}>
            {"You already have an Account? "}
            <MuiLink component={RouterLink} to="/login" underline="hover">
              {t("Login Here")}
            </MuiLink>
          </Typography>
        </Box>
      </Box>
      <CustomModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={t("Verify Your Email")}
        width={"md"}
      >
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
          <Typography variant="body2" color="text.secondary">
            {t("Please enter the 6-digit code sent to your email address.")}
          </Typography>

          <TextField
            placeholder="Enter code"
            fullWidth
            value={verificationCode || ""}
            error={!!errors["verificationCode"]}
            helperText={errors["verificationCode"] || " "}
            onChange={(e) => setCode(e.target.value)}
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
                  ? t("Click to Resend Code")
                  : `${t("Wait")} ${resendCooldown}${t("s before you try again!")}`
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
                {t("Resend Code")}
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
      </CustomModal>
    </>
  );
};

export default RegisterPage;
