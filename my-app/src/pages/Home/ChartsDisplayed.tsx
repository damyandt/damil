import { useState } from "react";
import { Box, Grid, MenuItem, Select } from "@mui/material";
import GymVisitsChart from "../Analystics/GymVisitsChart";
import AgeDistributionChart from "../Analystics/AgeChart";
import GoalMembersGaugeChart from "../Analystics/Goal";
import OverviewPage from "../Analystics/Overview";
import Memberships from "../Analystics/Memberships";

const chartOptions = [
  { label: "Gym Visits", value: "gym" },
  { label: "Age Distribution", value: "age" },
  { label: "Goals", value: "goal" },
  { label: "Memberships", value: "memberships" },
];

const ChartDisplay = () => {
  const [selectedChart, setSelectedChart] = useState("gym");

  const renderChart = () => {
    switch (selectedChart) {
      case "gym":
        return <GymVisitsChart height={60} />;
      case "age":
        return <AgeDistributionChart height={60} />;
      case "goal":
        return <GoalMembersGaugeChart height={60} value={12} />;

      case "memberships":
        return <Memberships />;
      default:
        return null;
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <Select
          fullWidth
          value={selectedChart}
          onChange={(e) => setSelectedChart(e.target.value)}
          displayEmpty
        >
          {chartOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      <Grid size={12}>
        <Box>{renderChart()}</Box>
      </Grid>
    </Grid>
  );
};

export default ChartDisplay;
