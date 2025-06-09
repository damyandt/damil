import { useState } from "react";
import {
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Link,
  Collapse,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TextField from "../../components/TextField";
import { MAIN_COLOR } from "../../Layout/layoutVariables";
import callApi, { COOKIE_REFRESH_TOKEN } from "../../API/callApi";
import { postLogin } from "./api/postQuery";
import { jwtDecode } from "jwt-decode"
import { setCookie } from "../../Global/Utils/commonFunctions";
import { useAuthedContext } from "../../context/AuthContext";
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
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
  });
  const { setUserSignedIn } = useAuthedContext();

  const handleNextClick = () => {
    setShowPasswordField(true);
  };

  const handleLogin = async () => {
    try {
      const user = await callApi<any>({
        query: postLogin(formData),
        auth: null,
      });

      console.log("Login success:", user);
      if (user) {
        const refresh_token = user.token;
        const decodedRefreshToken: DecodedJWTToken = jwtDecode(refresh_token);

        // save the refresh_token as a cookie
        const refreshCookie: SetCookieParams = {
          name: COOKIE_REFRESH_TOKEN,
          value: refresh_token,
          exp: decodedRefreshToken.exp,
          sameSite: "strict",
          secure: true,
        };

        setCookie(refreshCookie);
        setUserSignedIn(true)
      } else if (user.detail) {
        throw new Error(user.detail);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
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

        <TextField
          placeholder="Email or Phone Number"
          fullWidth
          onKeyDown={(e) => e.key === "Enter" && handleNextClick()}
          onChange={(e) => handleChange("email", e.target.value)}
          InputProps={{
            endAdornment: !showPasswordField && (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handleNextClick}>
                  <ArrowForwardIcon />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              borderRadius: 1.7,
              backgroundColor: "#fff",
            },
          }}
        />

        <Collapse in={showPasswordField}>
          <TextField
            placeholder="Password"
            fullWidth
            type="password"
            onChange={(e) => handleChange("password", e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={handleLogin}>
                    <ArrowForwardIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                borderRadius: 1.7,
                backgroundColor: "#fff",
              },
            }}
          />
        </Collapse>

        <FormControlLabel
          control={<Checkbox />}
          label="Remember me"
          sx={{ alignSelf: "flex-center", mt: 1 }}
        />

        <Typography variant="body2">
          Forgot your password?{" "}
          <Link href="#" underline="hover">
            Change Password
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
