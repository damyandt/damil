import { useState } from "react";
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
import { postLogin, validateEmail } from "./api/postQuery";
import { setCookie } from "../../Global/Utils/commonFunctions";
import { useAuthedContext } from "../../context/AuthContext";
import { Fade } from "./Register";
export type DecodedJWTToken = {
  sub: string;
  exp: number;
};
export type SetCookieParams = {
  name: string;
  value: string;
  exp: number;
  path?: string;
  sameSite: "none" | "lax" | "strict";
  secure: boolean;
};
const LoginPage = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [disableEmail, setDisableEmail] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
  });
  const { setUserSignedIn } = useAuthedContext();

  const handleNextClick = async () => {
    try {
      if (!validator(true)) {
        console.warn("Form validation failed");
        return;
      }
      await callApi<any>({
        query: validateEmail(formData.email),
        auth: null,
      });
      setShowPasswordField(true);
      setDisableEmail(true);
    } catch (error) {
      console.error("Invalid email:", error);
      setErrors({ email: "Email not found. Please check and try again." });
    }
  };

  const handleLogin = async () => {
    if (!validator(false)) {
      console.warn("Form validation failed");
      return;
    }
    try {
      const user = await callApi<any>({
        query: postLogin(formData),
        auth: null,
      });
      console.log(user);

      if (user) {
        const refresh_token = user.refreshToken;

        const refreshCookie: SetCookieParams = {
          name: COOKIE_REFRESH_TOKEN,
          value: refresh_token,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
          sameSite: "strict",
          secure: true,
        };

        setCookie(refreshCookie);
        setUserSignedIn(true);
      } else if (user.detail) {
        throw new Error(user.detail);
      }
      console.log("Login success");
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({
        password: "Wrong password. Please double-check and try again.",
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
          <Grid container spacing={0}>
            <Grid size={12}>
              <TextField
                disabled={disableEmail}
                placeholder="Email or Phone Number"
                fullWidth
                error={!!errors["email"]}
                helperText={errors["email"] || " "}
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
                  placeholder="Password"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  error={!!errors["password"]}
                  helperText={errors["password"] || " "}
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
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #fff",
              borderRadius: "1em",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Code
            </Typography>
            <Grid size={12}>
              <TextField
                placeholder="Code"
                fullWidth
                type={showPassword ? "text" : "password"}
                error={!!errors["code"]}
                helperText={errors["code"] || " "}
                onChange={(e) => handleChange("code", e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Box sx={{ display: "flex", gap: 0, padding: 0 }}>
                      <InputAdornment position="end" sx={{ ml: 0 }}>
                        <IconButton
                          edge="end"
                          onClick={() => {
                            setOpenModal(false);
                          }}
                          size="small"
                        >
                          <ArrowForwardIcon />
                        </IconButton>
                      </InputAdornment>
                    </Box>
                  ),
                  sx: {
                    borderRadius: 1.7,
                    backgroundColor: "#fff",
                  },
                }}
              />
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default LoginPage;
