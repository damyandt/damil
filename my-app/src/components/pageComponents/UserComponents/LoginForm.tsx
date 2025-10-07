import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Tooltip,
  Typography,
} from "@mui/material";
import TextField from "../../MaterialUI/FormFields/TextField";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import Collapse from "../../MaterialUI/Collapse";
import { useLanguageContext } from "../../../context/LanguageContext";
import { useEffect, useRef, useState } from "react";
import {
  codeVerification,
  codeVerificationResend,
  postLogin,
  validateEmail,
} from "../../../pages/usersPages/api/postQuery";
import callApi, { COOKIE_REFRESH_TOKEN } from "../../../API/callApi";
import { setCookie } from "../../../Global/Utils/commonFunctions";
import { useAuthedContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { SetCookieParams } from "../../../Auth/authTypes";
import CustomModal from "../../MaterialUI/Modal";
import { errorMessagesEN } from "../../../pages/usersPages/api/userTypes";

const LoginForm = () => {
  const { setUserSignedIn } = useAuthedContext();
  const navigate = useNavigate();
  const { t } = useLanguageContext();
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [disableEmail, setDisableEmail] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPasswordField, setShowPasswordField] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
  });

  const validator = (onlyEmial: boolean) => {
    const newErrors: { [key: string]: string } = {};
    if (
      formData.email === undefined ||
      formData.email === null ||
      formData.email === ""
    ) {
      newErrors[`email`] = t("This field is required");
    }

    if (
      formData.password === undefined ||
      formData.password === null ||
      formData.password === ""
    ) {
      !onlyEmial && (newErrors[`password`] = t("This field is required"));
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
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
        return setErrors({ email: responce.message });
      }

      setShowPasswordField(true);
      setDisableEmail(true);
      setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 100);
    } catch (error) {
      console.error("Failed:", error);
      // setErrors({
      //   email: errorMessages(t).internalServerError,
      // });
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

      if (responce.message === errorMessagesEN.unverified) {
        return setOpenModal(true);
      } else if (responce.success === false) {
        return setErrors({
          password: responce.message,
        });
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
      window.location.reload();
    } catch (error) {
      console.error("Login failed:", error);
      // setErrors({
      //   password: errorMessages(t).internalServerError,
      // });
    }
  };

  const handleSubmitVerificationCode = async () => {
    if (verificationCode.length !== 6) {
      setErrors({ verificationCode: t("Verification Code must be 6 digits.") });
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
      responce.success === true && setOpenModal(false);
      responce.success === true && handleLogin();
      responce.success === true && navigate("/");
      responce.success === false && setErrors(responce.validationErrors);
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  const handleResend = async () => {
    if (resendCooldown === 0) {
      localStorage.setItem("lastResendTimestamp", Date.now().toString());
      setResendCooldown(60);
      await callApi<any>({
        query: codeVerificationResend({
          email: formData.email,
        }),
        auth: null,
      });
    }
  };

  useEffect(() => {
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

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [resendCooldown]);

  return (
    <>
      <Grid container spacing={2} zIndex={10}>
        <Grid size={12}>
          <TextField
            fullWidth
            disabled={disableEmail}
            label={errors["email"] || t("Email")}
            error={!!errors["email"]}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                handleNextClick();
              }
            }}
            onChange={(e) => handleChange("email", e.target.value)}
            InputProps={{
              endAdornment: !showPasswordField ? (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={handleNextClick} size="small">
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
              label={errors["password"] || t("Password")}
              type={showPassword ? "text" : "password"}
              error={!!errors["password"]}
              onChange={(e) => handleChange("password", e.target.value)}
              inputRef={passwordInputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();
                  handleLogin();
                }
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
                      <IconButton edge="end" onClick={handleLogin} size="small">
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
      <CustomModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={t("Verify Your Email")}
        width={"md"}
      >
        <Typography variant="body2" color="text.secondary">
          {t("Please enter the 6-digit code sent to your email address.")}
        </Typography>

        <TextField
          placeholder={t("Enter code")}
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
                ? t("Click to Resend Code")
                : `${t("Wait")} ${resendCooldown}${t(
                    "s before you try again!"
                  )}`
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
      </CustomModal>
    </>
  );
};

export default LoginForm;
