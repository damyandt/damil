import DoneIcon from "@mui/icons-material/Done";
import {
  Box,
  lighten,
  Typography,
  useTheme,
  Button,
  darken,
} from "@mui/material";
import { shiftHue } from "../Home/Home";
import { useState } from "react";
import CustomModal from "../../components/MaterialUI/Modal";
import PlanDetails from "./PlanDetails";
import { useLanguageContext } from "../../context/LanguageContext";

interface PlanCardProps {
  plan: any;
  period: "monthly" | "annual";
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, period }) => {
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const { t } = useLanguageContext();
  const theme = useTheme();
  const colorStart =
    theme.palette.mode === "dark"
      ? shiftHue(lighten(plan.color, 0.1), -20)
      : shiftHue(lighten(plan.color, 0.1), -20);
  const colorEnd =
    theme.palette.mode === "dark"
      ? shiftHue(darken(plan.color, 0.2), 20)
      : shiftHue(lighten(plan.color, 0.3), 20);
  return (
    <>
      <Box
        sx={{
          border: plan.active
            ? `2px solid ${theme.palette.mode === "dark" ? theme.palette.common.black : theme.palette.common.white}`
            : "none",
          background:
            plan.name === "PRO"
              ? `linear-gradient(90deg, ${colorStart}, ${colorEnd})`
              : theme.palette.mode === "dark"
                ? "linear-gradient(160deg, #0e0b1d 0%, #1b1433 100%)"
                : "linear-gradient(160deg, #ffffff 0%, #f3f4f6 100%)",
          borderRadius: "20px",
          height: "100%",
          width: "100%",
          p: 3,
          boxShadow: theme.palette.customColors?.shodow,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            color:
              plan.name === "PRO" ? "#ffffffff" : theme.palette.common.black,
          }}
        >
          <Box
            component={"div"}
            display={"flex"}
            width={"100%"}
            justifyContent={"space-between"}
            textAlign={"center"}
            alignItems={"center"}
          >
            <Typography variant="h5" fontWeight={700} gutterBottom>
              {plan.name}
            </Typography>
            {plan.active && (
              <Typography
                variant="subtitle2"
                fontWeight={600}
                gutterBottom
                sx={{
                  backgroundColor: "primary.contrastText",
                  color: "primary.main",
                  px: 1,
                  py: 0.5,
                  borderRadius: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontSize: "0.7rem",
                  boxShadow: 1,
                }}
              >
                {t("Current Plan")}
              </Typography>
            )}
          </Box>

          <Typography variant="h2" fontWeight={600}>
            ${period === "monthly" ? plan.price : plan.priceYear}
            <Typography component="span" variant="body1">
              {period === "monthly" ? "/month" : "/year"}
            </Typography>
          </Typography>
          <Typography variant="body2" mt={1} mb={2}>
            {plan.description}
          </Typography>

          <Box gap={2} display="flex" flexDirection="column" my={2}>
            {plan.features.map((feature: string, idx: number) => (
              <Box
                key={idx}
                display="flex"
                gap={1}
                alignItems="flex-start"
                textAlign="left"
              >
                <DoneIcon
                  sx={{
                    mt: "2px", // slight vertical alignment tweak
                    fontSize: "1rem",
                    color: plan.name === "PRO" ? "#fff" : "inherit",
                  }}
                />
                <Typography
                  fontSize="0.9rem"
                  lineHeight={1.4}
                  sx={{
                    textDecoration: "underline",
                    textDecorationThickness: "1px",
                    textUnderlineOffset: "4px",
                    wordBreak: "break-word",
                  }}
                >
                  {feature}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box mt="auto" pt={2}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                setOpenDetails(true);
              }}
              sx={
                plan.name === "PRO"
                  ? {
                      bgcolor: theme.palette.common.white,
                      color: theme.palette.common.black,
                      fontWeight: "bold",
                      borderRadius: 2,
                      transition:
                        "ease 0.4s color, ease 0.4s background-color, transform 0.4s ease ",
                      "&:hover": {
                        bgcolor: lighten(plan.color, 0.4),
                        color: "#fff",
                        transform: "scale(1.03)",
                      },
                    }
                  : {
                      fontWeight: "bold",
                      borderRadius: 2,
                      // textTransform: "none",
                      transition:
                        "ease 0.4s color, ease 0.4s background-color, transform 0.4s ease ",
                      "&:hover": {
                        // bgcolor: lighten(plan.color, 0.4),
                        color: "#fff",
                        transform: "scale(1.03)",
                      },
                    }
              }
            >
              {plan.buttonText}
            </Button>
          </Box>
        </Box>
      </Box>
      <CustomModal
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        title={"Details"}
        width={"lg"}
      >
        <PlanDetails
          type={plan.name}
          period={period}
          price={period === "monthly" ? plan.price : plan.priceYear}
        />
      </CustomModal>
    </>
  );
};

export default PlanCard;
