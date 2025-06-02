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

const LoginPage = () => {
  const [showPasswordField, setShowPasswordField] = useState(false);

  const handleNextClick = () => {
    setShowPasswordField(true);
  };

  const handleLogin = () => {
    console.log("Login initiated");
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
