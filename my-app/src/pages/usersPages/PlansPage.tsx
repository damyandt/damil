import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
    Button,
    ListItemIcon,
    useTheme,
    FormControlLabel,
    Switch,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";

const plans = [
    {
        name: "Basic",
        price: "Free",
        priceYear: "Free",
        description: "Free plan for all users.",
        color: "#f7b2d9",
        features: [
            "Store up to 20 songs",
            "2 collaborators",
            "Unlimited shares",
            "128-bit AES encryption",
            "Mac, PC, Android, iOS, and Browser",
        ],
        buttonText: "Get Started Free",
    },
    {
        name: "Professional",
        price: "$15",
        priceYear: "$165",
        sub: "/month",
        description: "Ideal for individual creators.",
        color: "#d4f961",
        features: [
            "Everything in Basic",
            "250GB of song storage",
            "250GB of asset storage",
            "2 collaborators",
            "Share link password protection",
        ],
        buttonText: "Get Professional",
    },
    {
        name: "Team",
        price: "$25",
        priceYear: "$275",
        sub: "/month",
        description: "Small teams with up to 10 users.",
        color: "#ffc84a", // оранжево
        features: [
            "Everything in Professional",
            "Shared team workspace",
            "Custom storage plans",
            "Custom branding by team",
        ],
        buttonText: "Get Team Plan",
    },
];

const PricingPage = () => {
    const theme = useTheme();
    const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
    return (
        <Box
            sx={{
                height: "100%",
                p: 4,
                overflow: 'hidden',
            }}
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
                                setPeriod((prev) => (prev === "monthly" ? "yearly" : "monthly"))
                            }
                            color="primary"
                        />
                    }
                    label={
                        <Typography variant="body2" color="textSecondary">
                            {period === "yearly" ? "Yearly billing (Save 20%)" : "Monthly billing"}
                        </Typography>
                    }
                    labelPlacement="end"
                />
            </Box>
            <Typography
                variant="body1"
                align="center"
            >
                Choose the plan that works best for your team.
            </Typography>
            <Box sx={{ height: "100%", alignItems: "center", mt: "-10px" }}>

                <Grid container spacing={4} sx={{ height: "100%" }} justifyContent={"center"} display={'flex'} alignContent={"center"}>
                    {plans.map((plan, index) => (
                        <Grid size={4} key={index} maxWidth={"25em"}>
                            <Card
                                sx={{

                                    backgroundColor: plan.color,
                                    borderRadius: '20px',
                                    height: "100%",
                                    p: 3,
                                    boxShadow: theme.palette.customColors?.shodow
                                }}
                            >
                                <CardContent
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                        color: "#1f1f1fff",
                                    }}
                                >
                                    <Typography variant="h5" fontWeight={700} gutterBottom>
                                        {plan.name}
                                    </Typography>
                                    <Typography variant="h2" fontWeight={900}>
                                        {period === 'monthly' ? plan.price : plan.priceYear}
                                        <Typography component="span" variant="body1">
                                            {plan.sub}
                                        </Typography>
                                    </Typography>
                                    <Typography variant="body2" mt={1} mb={2}>
                                        {plan.description}
                                    </Typography>

                                    <Box gap={2} display={'flex'} flexDirection={'column'} my={2}>
                                        {plan.features.map((feature, idx) => (
                                            <Box key={idx} display={'flex'} gap={1}>
                                                <ListItemIcon sx={{ minWidth: 30 }}>
                                                    <CheckCircleIcon fontSize="small" />
                                                </ListItemIcon>

                                                <Typography color={'#1f1f1fff'} >{feature}</Typography>

                                            </Box>
                                        ))}
                                    </Box>

                                    <Box mt="auto" pt={2}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                bgcolor: theme.palette.common.black,
                                                color: theme.palette.common.white,
                                                fontWeight: "bold",
                                                borderRadius: 2,
                                                textTransform: "none",
                                                // "&:hover": {
                                                //     bgcolor: "#222",
                                                // },
                                            }}
                                        >
                                            {plan.buttonText}
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default PricingPage;
