import { useState } from "react";
import { Responsive, WidthProvider, Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ChartWidget from "./ChartWidget";
import { Box, Typography } from "@mui/material";
import { defaultLayout } from "./analyticsTypes";

type ChartConfig = {
  name: string;
  option: any;
};

type DashboardProps = {
  title?: string;
  charts: ChartConfig[];
  chartKeys?: string[];
};

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = ({
  title = "Dashboard",
  charts,
  chartKeys,
}: DashboardProps) => {
  const keys = chartKeys || charts.map((_, idx) => `chart${idx + 1}`);
  const [layouts, setLayouts] = useState<Layouts>({
    lg: keys.map((key, idx) => defaultLayout(key, idx)),
  });

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
      >
        {title}
      </Typography>
      <Box sx={{ minHeight: "100%" }}>
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1000, md: 800, xs: 600 }}
          cols={{ lg: 12, md: 12, xs: 12 }}
          rowHeight={60}
          draggableHandle=".grid-drag-handle"
          onLayoutChange={(_, allLayouts) => setLayouts(allLayouts)}
        >
          {charts.map((chart, index) => (
            <Box key={keys[index]} sx={{ boxShadow: 1 }}>
              <ChartWidget title={chart.name} option={chart.option} />
            </Box>
          ))}
        </ResponsiveGridLayout>
      </Box>
    </Box>
  );
};

export default Dashboard;
