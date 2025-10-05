import {
  Box,
  Grid,
  Typography,
  useTheme,
  FormControlLabel,
  Switch,
  darken,
} from "@mui/material";
import { useState } from "react";
import { shiftHue } from "../Home/Home";
import PlanCard from "./PlanCard";
import { keyframes } from "@mui/system";
import { useLanguageContext } from "../../context/LanguageContext";

const float = keyframes`
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;
const PricingPage = () => {
  const theme = useTheme();
  const { t } = useLanguageContext();
  const [period, setPeriod] = useState<"monthly" | "annual">("monthly");
  const plans = [
    {
      name: "STARTER",
      price: 29,
      priceYear: 299,
      description: "Perfect for small gyms and personal trainers.",
      color: shiftHue(darken(theme.palette.primary.main, 0.2), -50),
      features: [
        "Up to 100 active members",
        "Check-in and attendance tracking",
        "View client profiles and history",
        "Basic analytics and reports",
        "Access from any device (web & mobile)",
      ],
      buttonText: "Get Started",
      active: false,
    },
    {
      name: "GROWTH",
      price: 59,
      priceYear: 599,
      description: "Best choice for growing gyms with more clients and staff.",
      color: theme.palette.primary.main,
      features: [
        "Everything in Starter",
        "Unlimited members",
        "Staff and roles management module",
        "Detailed analytics and performance insights",
        "Customizable client profiles",
        "Email notifications and automation",
      ],
      buttonText: "Choose Growth",
      active: true,
    },
    {
      name: "PRO",
      price: 99,
      priceYear: 999,
      description:
        "All-in-one solution for gym chains and large fitness centers.",
      color: shiftHue(darken(theme.palette.primary.main, 0.2), 50),
      features: [
        "Everything in Growth",
        "Multi-location support",
        "Custom branding with your logo and colors",
        "API access and third-party integrations",
        "24/7 priority support",
        "Advanced analytics and custom reporting",
      ],
      buttonText: "Upgrade to Pro",
      active: false,
    },
  ];
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        p: 2,
      }}
    >
      <Box
        component={"div"}
        display={"flex"}
        flexDirection={"column"}
        width={"100%"}
        height={"fit-content"}
      >
        <Typography variant="h3" align="center" gutterBottom>
          {t("Pricing")}
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <FormControlLabel
            control={
              <Switch
                checked={period === "annual"}
                onChange={() =>
                  setPeriod((prev) =>
                    prev === "monthly" ? "annual" : "monthly"
                  )
                }
                color="primary"
              />
            }
            label={
              <Typography variant="body2" color="textSecondary">
                {period === "annual"
                  ? "Yearly billing (Save 1 Month)"
                  : "Monthly billing"}
              </Typography>
            }
            labelPlacement={"top"}
          />
        </Box>
      </Box>

      <Box width={"100%"}>
        <Grid
          container
          spacing={4}
          sx={{ height: "100%" }}
          justifyContent={"center"}
          display={"flex"}
          alignContent={"center"}
          fontSize={"0.85rem"}
          width={"100%"}
        >
          {plans.map((plan, index) => (
            <Grid
              size={{ xs: 12, sm: 6, lg: 4 }}
              key={index}
              sx={{
                transition: "transform ease 0.4s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                animation:
                  plan.name === "PRO"
                    ? `${float} 3s ease-in-out infinite`
                    : "none",
              }}
            >
              <PlanCard plan={plan} period={period} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default PricingPage;
