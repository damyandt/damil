import { Typography, Box, Divider } from "@mui/material";
import Button from "../../components/MaterialUI/Button";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useAuthedContext } from "../../context/AuthContext";
import callApi from "../../API/callApi";
import { stripePaymentIntent } from "./api/postQuery";

interface PlanDetailsProps {
  type: "STARTER" | "GROWTH" | "PRO";
  period: "MONTHLY" | "ANNUALLY";
  price: number;
}

const planData = {
  STARTER: {
    headline: "Kickstart Your Gym’s Digital Journey",
    description:
      "All the essential tools you need to manage clients, track attendance, and keep your fitness business organized — perfect for small gyms and personal trainers.",
    icon: <FitnessCenterIcon sx={{ mr: 1, fontSize: 32 }} />,
  },
  GROWTH: {
    headline: "Grow Your Gym With Powerful Tools",
    description:
      "Take your business to the next level with unlimited members, staff management, detailed analytics, and automation. Everything you need to scale your fitness operations with ease.",
    icon: (
      <RocketLaunchIcon sx={{ mr: 1, fontSize: 32, color: "primary.main" }} />
    ),
  },
  PRO: {
    headline: "The Ultimate Solution for Fitness Businesses",
    description:
      "Unlock advanced analytics, multi-location support, custom branding, and API integrations. Designed for gym chains and large fitness centers that want complete control and top-tier performance.",
    icon: (
      <EmojiEventsIcon sx={{ mr: 1, fontSize: 32, color: "secondary.main" }} />
    ),
  },
};

const PlanDetails: React.FC<PlanDetailsProps> = ({ type, period, price }) => {
  const { headline, description, icon } = planData[type];
  const { tenant } = useAuthedContext();
  const { setAuthedUser } = useAuthedContext();
  const redirect = async () => {
    try {
      const input = {
        tenantId: tenant.id,
        plan: type,
        amount: price * 100,
        currency: "usd",
        abonnementDuration: period,
      };
      console.log(input);
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
            type === "GROWTH"
              ? "primary"
              : type === "PRO"
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
          color={type === "PRO" ? "secondary" : "primary"}
          sx={{ py: 1.5 }}
          onClick={redirect}
        >
          Buy {type} Plan
        </Button>
      </Box>
    </Box>
  );
};

export default PlanDetails;
