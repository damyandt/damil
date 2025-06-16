import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import {
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Grid,
  Modal,
  Tooltip,
} from "@mui/material";
import MuiLink from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "../../components/TextField";
import { MAIN_COLOR } from "../../Layout/layoutVariables";
import callApi, { COOKIE_REFRESH_TOKEN } from "../../API/callApi";
import { codeVerification, postRegister, validateEmail } from "./api/postQuery";
import { useAuthedContext } from "../../context/AuthContext";
import { setCookie } from "../../Global/Utils/commonFunctions";
import { SetCookieParams } from "../../Auth/authTypes";
import { Fade } from "../../components/Fade";
import { errorMessages } from "./Login";
import { Password } from "@mui/icons-material";

const RegisterPage = () => {
  const { setUserSignedIn } = useAuthedContext();
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
      console.warn("Form validation failed");
      return;
    }
    try {
      const responce = await callApi<any>({
        query: postRegister(formData),
        auth: null,
      });
      setOpenModal(true);
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
            email: "Please enter a valid email address.",
          }));
        }
        const responce = await callApi<any>({
          query: validateEmail(formData.email),
          auth: null,
        });

        if (responce.message !== errorMessages.invalidEmail) {
          return setErrors((prev) => ({
            ...prev,
            email: "Account with this email already exist!",
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
            password: "Password must be at least 8 characters.",
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
            confirmPassword: "Passwords do not match.",
          }));
        }
      }
    }, 700);
    return () => clearTimeout(delayDebounce);
  }, [formData.confirmPassword]);

  const validator = (isVerificationCode: boolean) => {
    const newErrors: { [key: string]: string } = {};
    if (!isVerificationCode) {
      const fields: string[] = [
        "username",
        "email",
        "password",
        "confirmPassword",
      ];
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email && !emailPattern.test(formData.email)) {
        newErrors["email"] = "Please enter a valid email address.";
      }
      fields.map((el: string) => {
        if (
          formData[el] === undefined ||
          formData[el] === null ||
          formData[el] === ""
        ) {
          newErrors[el] = "This field is required";
        }
      });

      formData.password.length < 8 &&
        (newErrors["password"] = "Password must be at least 8 characters.");

      formData.password !== formData.confirmPassword &&
        (newErrors["confirmPassword"] = "Passwords do not match.");
    } else {
      verificationCode.length !== 6 &&
        (newErrors["verificationCode"] = "Verification Code must be.");
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
    let responce;
    try {
      responce = await callApi<any>({
        query: codeVerification({
          verificationCode: verificationCode,
          email: formData.email,
        }),
        auth: null,
      });
    } catch (error) {
      console.log("Register failed:", error);
    }
    if (responce.message === errorMessages.invalidCode) {
      return setErrors({
        verificationCode: errorMessages.invalidCode,
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
    setUserSignedIn(true);

    console.log("Register success");
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
          Make new Profile
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
            Sign up
          </Typography>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                label={errors["username"] || "Username"}
                error={!!errors["username"]}
                onChange={(e) => handleChange("username", e.target.value)}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label={errors["email"] || "Email"}
                error={!!errors["email"]}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label={errors["password"] || "Password"}
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
                label={errors["confirmPassword"] || "Repeat Password"}
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

          <Typography variant="body2">
            {"You already have an Account? "}
            <MuiLink component={RouterLink} to="/login" underline="hover">
              Login Here
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

export default RegisterPage;
