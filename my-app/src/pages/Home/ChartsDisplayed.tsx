import { useState } from "react";
import { Box, Grid, MenuItem, Select } from "@mui/material";
import GymVisitsChart from "../Analystics/OldCharts/GymVisitsChart";
import AgeDistributionChart from "../Analystics/OldCharts/AgeChart";
import GoalMembersGaugeChart from "../Analystics/OldCharts/Goal";
import Memberships from "../Analystics/OldCharts/Memberships";
import { useLanguageContext } from "../../context/LanguageContext";

const ChartDisplay = () => {
  const { t } = useLanguageContext();
  const chartOptions: { label: string; value: string }[] = [
    { label: t("Gym Visits"), value: "gym" },
    { label: t("Age Distribution"), value: "age" },
    { label: t("Goals"), value: "goal" },
    { label: t("Memberships"), value: "memberships" },
  ];
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
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
