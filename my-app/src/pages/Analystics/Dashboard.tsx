import { useState } from "react";
import { Responsive, WidthProvider, Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ChartWidget from "./ChartWidget";
import { Box, Typography } from "@mui/material";
import { defaultLayout } from "./analyticsTypes";
import AddChartModal, { ChartType } from "./AddChartModal";
import Button from "../../components/MaterialUI/Button";
// import callApi from "../../API/callApi";
// import { getClientsTable } from "../Access Control/API/getQueries";
// import { useAuthedContext } from "../../context/AuthContext";
import { useLanguageContext } from "../../context/LanguageContext";

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
  charts: initialCharts,
  chartKeys,
}: DashboardProps) => {
  const { t } = useLanguageContext();
  // const { setAuthedUser } = useAuthedContext();
  const [charts, setCharts] = useState<ChartConfig[]>(initialCharts);
  const keys = chartKeys || charts.map((_, idx) => `chart${idx + 1}`);
  const [layouts, setLayouts] = useState<Layouts>({
    lg: keys.map((key, idx) => defaultLayout(key, idx)),
  });
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddChart = (chartConfig: {
    name: string;
    type: ChartType;
    data: any;
  }) => {
    // Build chart option based on type and data
    let option: any = {};
    if (chartConfig.type === "bar" || chartConfig.type === "line") {
      option = {
        xAxis: { type: "category", data: chartConfig.data.x || [] },
        yAxis: { type: "value" },
        series: [{ data: chartConfig.data.y || [], type: chartConfig.type }],
      };
    } else if (chartConfig.type === "pie") {
      option = {
        series: [{ type: "pie", data: chartConfig.data.data || [] }],
      };
    } else if (chartConfig.type === "gauge") {
      option = {
        series: [{ type: "gauge", data: chartConfig.data.data || [] }],
      };
    } else if (chartConfig.type === "scatter") {
      option = {
        xAxis: {},
        yAxis: {},
        series: [{ type: "scatter", data: chartConfig.data.data || [] }],
      };
    }
    setCharts([{ name: chartConfig.name, option }, ...charts]);
    setLayouts({
      lg: [...keys, `chart${charts.length + 1}`].map((key, idx) =>
        defaultLayout(key, idx)
      ),
    });
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: "bold", textAlign: "center" }}>
        {title}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="contained" onClick={() => setModalOpen(true)}>
          {t("Add Chart")}
        </Button>
      </Box>
      <AddChartModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddChart}
      />
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
