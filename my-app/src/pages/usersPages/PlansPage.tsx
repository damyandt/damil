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

const float = keyframes`
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;
const PricingPage = () => {
  const theme = useTheme();
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const plans = [
    {
      name: "Basic",
      price: "Free",
      priceYear: "Free",
      description: "Free plan for all users.",
      color: shiftHue(darken(theme.palette.primary.main, 0.2), -20),

      features: [
        "Store up to 20 songs",
        "2 collaborators",
        "Unlimited shares",
        "128-bit AES encryption",
        "Mac, Android, Browser",
      ],
      buttonText: "Get Started Free",
      active: false,
    },
    {
      name: "Professional",
      price: "$15",
      priceYear: "$165",
      description: "Ideal for individual creators.",
      color: theme.palette.primary.main,
      features: [
        "Everything in Basic",
        "250GB of song storage",
        "250GB of asset storage",
        "2 collaborators",
        "Password protection",
      ],
      buttonText: "Get Professional",
      active: true,
    },
    {
      name: "Team",
      price: "$25",
      priceYear: "$275",
      description: "Small teams with up to 10 users.",
      color: shiftHue(darken(theme.palette.primary.main, 0.2), 20),
      features: [
        "Everything in Professional",
        "Shared team workspace",
        "Custom storage plans",
        "Custom branding by team",
      ],
      buttonText: "Get Team Plan",
      active: false,
    },
  ];

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
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
          Pricing
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <FormControlLabel
            control={
              <Switch
                checked={period === "yearly"}
                onChange={() =>
                  setPeriod((prev) =>
                    prev === "monthly" ? "yearly" : "monthly"
                  )
                }
                color="primary"
              />
            }
            label={
              <Typography variant="body2" color="textSecondary">
                {period === "yearly"
                  ? "Yearly billing (Save 1 Month)"
                  : "Monthly billing"}
              </Typography>
            }
            labelPlacement={"top"}
          />
        </Box>
      </Box>

      <Box width={"100%"} height={"100%"}>
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
              size={4}
              key={index}
              sx={{
                transition: "transform ease 0.4s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                animation: plan.active
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
