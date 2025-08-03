import { Box, IconButton, Typography } from "@mui/material";
import CustomModal from "../../components/MaterialUI/Modal";
import TextField from "../../components/MaterialUI/FormFields/TextField";
import CustomTooltip from "../../components/MaterialUI/CustomTooltip";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLanguageContext } from "../../context/LanguageContext";
import { useState } from "react";
import { SetCookieParams } from "../../Auth/authTypes";
import callApi, { COOKIE_REFRESH_TOKEN } from "../../API/callApi";
import { codeVerification, postLogin } from "./api/postQuery";

interface VerifyEmailProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({
  openModal,
  setOpenModal,
  email,
}) => {
  const { t } = useLanguageContext();
  const [verificationCode, setCode] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [resendCooldown, setResendCooldown] = useState<number>(0);

  const handleSubmitVerificationCode = async () => {
    // if (!validator(true)) {
    //   console.warn("Form validation failed!");
    //   return;
    // }
    try {
      const responce = await callApi<any>({
        query: codeVerification({
          verificationCode: verificationCode,
          email: email,
        }),
        auth: null,
      });
      //   if (responce.success === true) {
      //     const responce = await callApi<any>({
      //       query: postLogin({
      //         email: formData.email,
      //         password: formData.password,
      //       }),
      //       auth: null,
      //     });

      //     const refresh_token = responce.refreshToken;
      //     const refreshCookie: SetCookieParams = {
      //       name: COOKIE_REFRESH_TOKEN,
      //       value: refresh_token,
      //       exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      //       sameSite: "strict",
      //       secure: true,
      //     };

      //     setCookie(refreshCookie);
      //     setUserSignedIn(false);
      //     setUserSignedIn(true);
      //   } else {
      //     setErrors(responce.validationErrors);
      //   }
    } catch (error) {
      console.log("Verification failed:", error);
    }
  };

  const handleResend = () => {
    if (resendCooldown === 0) {
      console.log("Code resent!");
      localStorage.setItem("lastResendTimestamp", Date.now().toString());
      setResendCooldown(60);
    }
  };
  return (
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
          <CustomTooltip
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
          </CustomTooltip>
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
  );
};

export default VerifyEmail;
