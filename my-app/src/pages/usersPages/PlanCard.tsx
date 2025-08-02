import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const planDescriptions: any = {
  starter: {
    label: "Starter Plan",
    color: "default",
    features: ["Access to front desk", "Basic check-in", "Email support"],
  },
  core: {
    label: "Core Plan",
    color: "primary",
    features: ["Access to classes", "Staff management", "Priority support"],
  },
  elite: {
    label: "Elite Plan",
    color: "success",
    features: ["Full analytics", "Unlimited access", "Dedicated manager"],
  },
};

const PlanCard = ({ plan = "starter" }) => {
  const planInfo = planDescriptions[plan] || planDescriptions.starter;
  const theme = useTheme();
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 400,
        p: 2,
        borderRadius: 3,
        boxShadow: theme.palette.customColors?.shodow,
        height: "25em",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{planInfo.label}</Typography>
          <Chip
            label={plan.toUpperCase()}
            color={planInfo.color}
            sx={{ fontWeight: 600 }}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" mt={1} mb={2}>
          {plan === "starter"
            ? "You are currently on the free Starter plan."
            : plan === "core"
              ? "Enjoy more tools and features for growing gyms."
              : "You have full access to all modules and premium support."}
        </Typography>

        <List dense>
          {planInfo.features.map((feature: any, index: any) => (
            <ListItem key={index} disablePadding>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <CheckCircleIcon fontSize="small" color="action" />
              </ListItemIcon>
              <ListItemText primary={feature} />
            </ListItem>
          ))}
        </List>

        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button variant="outlined" size="small">
            View Plans
          </Button>
          {plan !== "elite" && (
            <Button variant="contained" size="small">
              Upgrade Plan
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlanCard;
