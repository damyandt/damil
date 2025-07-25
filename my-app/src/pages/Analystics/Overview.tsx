import React from "react";
import { Box, Grid } from "@mui/material";
import GymVisitsChart from "./GymVisitsChart";
import Memberships from "./Memberships";
import GoalMembersGaugeChart from "./Goal";
import AgeDistributionChart from "./AgeChart";

const OverviewPage: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <Box
          sx={{
            border: `1px solid #bcbcbcb0`,
            borderRadius: "20px",
            paddingX: 3,
          }}
        >
          <GoalMembersGaugeChart value={68} height={55} />
        </Box>
      </Grid>
      <Grid size={4}>
        <Box
          sx={{
            border: `1px solid #bcbcbcb0`,
            borderRadius: "20px",
            paddingX: 3,
          }}
        >
          <AgeDistributionChart height={55} />
        </Box>
      </Grid>
      <Grid size={4}>
        <Box
          sx={{
            border: `1px solid #bcbcbcb0`,
            borderRadius: "20px",
            paddingX: 3,
          }}
        >
          <GoalMembersGaugeChart value={38} height={55} />
        </Box>
      </Grid>
      <Grid size={6}>
        <Box
          sx={{
            border: `1px solid #bcbcbcb0`,
            borderRadius: "20px",
            paddingX: 3,
          }}
        >
          <Memberships />
        </Box>
      </Grid>
      <Grid
        size={6}
        sx={{ display: "flex", flexDirection: "column", gap: "1em" }}
      >
        <Box
          sx={{
            border: `1px solid #bcbcbcb0`,
            borderRadius: "20px",
            paddingX: 3,
          }}
        >
          <GoalMembersGaugeChart value={68} height={50} />
        </Box>

        <Box
          sx={{
            border: `1px solid #bcbcbcb0`,
            borderRadius: "20px",
            paddingX: 3,
          }}
        >
          <GymVisitsChart height={35} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default OverviewPage;
