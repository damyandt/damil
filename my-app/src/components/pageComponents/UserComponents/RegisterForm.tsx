import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import TextField from "../../MaterialUI/FormFields/TextField";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { Dispatch, useEffect, SetStateAction, useState } from "react";
import { useLanguageContext } from "../../../context/LanguageContext";
import {
  codeVerification,
  postLogin,
  postRegister,
} from "../../../pages/usersPages/api/postQuery";
import { Response } from "../../../Global/Types/commonTypes";
import callApi, { COOKIE_REFRESH_TOKEN } from "../../../API/callApi";
import { SetCookieParams } from "../../../Auth/authTypes";
import { setCookie } from "../../../Global/Utils/commonFunctions";
import { useAuthedContext } from "../../../context/AuthContext";
import CustomTooltip from "../../MaterialUI/CustomTooltip";
import { registerValidator } from "./registerValidator";
import {
  AdminDataRegister,
  BusinessDataRegister,
} from "../../../pages/usersPages/api/userTypes";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ step, setStep }) => {
  const { setUserSignedIn } = useAuthedContext();
  const navigate = useNavigate();
  const { t } = useLanguageContext();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [verificationCode, setCode] = useState<string>("");
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [business, setBusiness] = useState<BusinessDataRegister>({
    name: "",
    businessEmail: "",
    city: "",
    address: "",
  });

  const [admin, setAdmin] = useState<AdminDataRegister>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    if (!registerValidator(step, business, admin, setErrors)) {
      console.warn("Form validation failed!");
      return;
    }
    try {
      const responce = await callApi<Response<any>>({
        query: postRegister({ tenantDto: business, userDto: admin }),
        auth: null,
      });
      if (responce.success === false) {
        setErrors(responce.validationErrors);

        const errorFields = Object.keys(responce.validationErrors);

        if (
          errorFields.some((field) => ["name", "businessEmail"].includes(field))
        ) {
          setStep(0);
        } else if (
          errorFields.some((field) => ["city", "address"].includes(field))
        ) {
          setStep(1);
        }
      } else if (responce.success === true) {
        setStep(3);
      }
    } catch (error) {
      console.error("Register failed:", error);
    }
  };

  const handleChangeAdmin = (field: string, value: string) => {
    setAdmin((prev: AdminDataRegister) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleResend = () => {
    if (resendCooldown === 0) {
      console.log("Code resent!");
      localStorage.setItem("lastResendTimestamp", Date.now().toString());
      setResendCooldown(60);
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

  const handleSubmitVerificationCode = async () => {
    if (!registerValidator(step, business, admin, setErrors)) {
      console.warn("Form validation failed!");
      return;
    }
    try {
      const responce = await callApi<Response<any>>({
        query: codeVerification({
          verificationCode: verificationCode,
          email: admin.email,
        }),
        auth: null,
      });
      if (responce.success === true) {
        const responceLogin = await callApi<any>({
          query: postLogin({
            email: admin.email,
            password: admin.password,
          }),
          auth: null,
        });

        const refresh_token = responceLogin.refreshToken;
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
      } else {
        setErrors(responce.validationErrors);
      }
    } catch (error) {
      console.log("Verification failed:", error);
    }
  };
  return (
    <>
      {step === 0 && (
        <Grid container spacing={2} zIndex={10}>
          <Grid size={12}>
            <TextField
              fullWidth
              label={errors["name"] || t("Business Name")}
              error={!!errors["name"]}
              onChange={(e) =>
                setBusiness((prev: BusinessDataRegister) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label={errors["email"] || t("Business Email")}
              error={!!errors["email"]}
              onChange={(e) =>
                setBusiness((prev: BusinessDataRegister) => ({
                  ...prev,
                  businessEmail: e.target.value,
                }))
              }
              onKeyDown={(e) => {
                e.key === "Enter" &&
                  registerValidator(step, business, admin, setErrors) &&
                  setStep((prev: number) => (prev += 1));
              }}
              InputProps={{
                endAdornment: (
                  <Box sx={{ display: "flex", gap: 0, padding: 0 }}>
                    <InputAdornment position="end" sx={{ ml: 0 }}>
                      <IconButton
                        edge="end"
                        onClick={() => {
                          registerValidator(step, business, admin, setErrors) &&
                            setStep((prev: number) => (prev += 1));
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
      )}
      {step === 1 && (
        <Grid container spacing={2} zIndex={10}>
          <Grid size={12}>
            <TextField
              fullWidth
              label={errors["city"] || t("City")}
              error={!!errors["city"]}
              onChange={(e) =>
                setBusiness((prev: BusinessDataRegister) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label={errors["address"] || t("Address")}
              error={!!errors["address"]}
              onKeyDown={(e) => {
                e.key === "Enter" &&
                  registerValidator(step, business, admin, setErrors) &&
                  setStep((prev: number) => (prev += 1));
              }}
              onChange={(e) =>
                setBusiness((prev: BusinessDataRegister) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              InputProps={{
                endAdornment: (
                  <Box sx={{ display: "flex", gap: 0, padding: 0 }}>
                    <InputAdornment position="end" sx={{ ml: 0 }}>
                      <IconButton
                        edge="end"
                        onClick={() => {
                          registerValidator(step, business, admin, setErrors) &&
                            setStep((prev: number) => (prev += 1));
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
      )}
      {step === 2 && (
        <Grid container spacing={2} zIndex={10}>
          <Grid size={12}>
            <TextField
              fullWidth
              label={errors["email"] || t("Email")}
              error={!!errors["email"]}
              onChange={(e) => handleChangeAdmin("email", e.target.value)}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label={errors["password"] || t("Password")}
              fullWidth
              type={showPassword ? "text" : "password"}
              error={!!errors["password"]}
              onChange={(e) => handleChangeAdmin("password", e.target.value)}
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
                handleChangeAdmin("confirmPassword", e.target.value)
              }
              onKeyDown={(e) => {
                e.key === "Enter" && handleRegister();
              }}
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
      )}
      {step === 3 && (
        <>
          <Typography variant="body2" color="text.secondary" zIndex={10}>
            {t("Please enter the 6-digit code sent to your email address.")}
          </Typography>
          <TextField
            placeholder="Enter code"
            fullWidth
            value={verificationCode || ""}
            error={!!errors["verificationCode"]}
            helperText={errors["verificationCode"] || " "}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => {
              e.key === "Enter" && handleSubmitVerificationCode();
            }}
            InputProps={{
              endAdornment: (
                <Box sx={{ display: "flex", gap: 0, padding: 0 }}>
                  <InputAdornment position="end" sx={{ ml: 0 }}>
                    <IconButton
                      edge="end"
                      onClick={handleSubmitVerificationCode}
                      size="small"
                    >
                      <ArrowForwardIcon />
                    </IconButton>
                  </InputAdornment>
                </Box>
              ),
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
            }}
          >
            <CustomTooltip
              placement="top"
              title={
                resendCooldown === 0
                  ? t("Click to Resend Code")
                  : `${t("Wait")} ${resendCooldown}${t("s before you try again!")}`
              }
            >
              <Typography
                variant="body2"
                onClick={handleResend}
                sx={{
                  textDecoration: "underline",
                  zIndex: 10,
                  "&:hover": {
                    cursor: "pointer",
                    color: resendCooldown === 0 ? "primary.main" : "",
                  },
                }}
              >
                {t("Resend Code")}
              </Typography>
            </CustomTooltip>
          </Box>
        </>
      )}
    </>
  );
};

export default RegisterForm;
