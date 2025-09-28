import React, { useState } from "react";
import { Typography, Box, Divider } from "@mui/material";
import Button from "../../components/MaterialUI/Button";
// import callApi from "../../API/callApi";
// import { Response } from "../../Global/Types/commonTypes";
// import { useAuthedContext } from "../../context/AuthContext";
// import { getUrlForredirect } from "./api/postQuery";

// Material-UI icons
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useAuthedContext } from "../../context/AuthContext";
import callApi from "../../API/callApi";
import { stripePaymentIntent } from "./api/postQuery";
// import { loadStripe } from "@stripe/stripe-js";
// import StripeCheckout from "./StripeCheckout";

// const stripePromise = loadStripe(
//   "pk_test_51QvfuNLUFZoOhiqe3J3T3jI2ZNGu3q9yZmrJH2vHWRG9QFT2RkzDkUf9PgxsSuC0uyjAE9BoVbP3GxNkNdp2UC8100WFoRALgJ"
// );

interface PlanDetailsProps {
  type: "Starter" | "Growth" | "Pro";
}

const planData = {
  Starter: {
    headline: "Kickstart Your Gym’s Digital Journey",
    description:
      "All the essential tools you need to manage clients, track attendance, and keep your fitness business organized — perfect for small gyms and personal trainers.",
    icon: <FitnessCenterIcon sx={{ mr: 1, fontSize: 32 }} />,
  },
  Growth: {
    headline: "Grow Your Gym With Powerful Tools",
    description:
      "Take your business to the next level with unlimited members, staff management, detailed analytics, and automation. Everything you need to scale your fitness operations with ease.",
    icon: (
      <RocketLaunchIcon sx={{ mr: 1, fontSize: 32, color: "primary.main" }} />
    ),
  },
  Pro: {
    headline: "The Ultimate Solution for Fitness Businesses",
    description:
      "Unlock advanced analytics, multi-location support, custom branding, and API integrations. Designed for gym chains and large fitness centers that want complete control and top-tier performance.",
    icon: (
      <EmojiEventsIcon sx={{ mr: 1, fontSize: 32, color: "secondary.main" }} />
    ),
  },
};

const PlanDetails: React.FC<PlanDetailsProps> = ({ type }) => {
  const { headline, description, icon } = planData[type];
  const { setAuthedUser } = useAuthedContext();
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const redirect = async () => {
    try {
      const input = { amount: 1000, currency: "usd", planType: type };
      const res = await callApi<any>({
        query: stripePaymentIntent(input),
        auth: { setAuthedUser },
      });

      const url = res.url;
      window.location.href = url;
    } catch (error) {
      console.error("Failed", error);
    }
  };

  return (
    <Box sx={{ px: 3 }}>
      <Box display="flex" alignItems="center" mb={1}>
        {icon}
        <Typography
          variant="h4"
          sx={{ fontWeight: 700 }}
          color={
            type === "Growth"
              ? "primary"
              : type === "Pro"
                ? "secondary"
                : "text.primary"
          }
        >
          {type}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
        {headline}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {description}
      </Typography>

      <Box width={"100%"} display={"flex"} justifyContent={"flex-end"}>
        <Button
          color={type === "Pro" ? "secondary" : "primary"}
          sx={{ py: 1.5 }}
          onClick={redirect}
        >
          Buy {type} Plan
        </Button>
      </Box>
      {/* {!showCheckout ? ( */}
      {/* <Box width={"100%"} display={"flex"} justifyContent={"flex-end"}>
        <Button
          color={type === "Pro" ? "secondary" : "primary"}
          sx={{ py: 1.5 }}
          // onClick={() => setShowCheckout(true)}
        >
          Buy {type} Plan
        </Button>
      </Box> */}
      {/* ) : ( */}
      {/* <StripeCheckout planType={type} amount={100} /> */}
      {/* )} */}
    </Box>
  );
};

export default PlanDetails;
