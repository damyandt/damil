import React from "react";
import * as echarts from "echarts/core";
import { GaugeChart } from "echarts/charts";
import { TitleComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import BaseChart from "../../components/pageComponents/BaseChart";
import { darken, lighten, useTheme } from "@mui/material";
import { shiftHue } from "../Home/Home";
import { useMediaQuery } from "@mui/system";

echarts.use([GaugeChart, TitleComponent, TooltipComponent, CanvasRenderer]);
type Data = {
  value: number;
  name: string;
};
interface GaugeChartHomeProps {
  data: Data[];
}
const GaugeChartHome: React.FC<GaugeChartHomeProps> = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const colorStart = isDark
    ? shiftHue(lighten(primary, 0.1), -20)
    : shiftHue(lighten(primary, 0.1), -20);
  const colorEnd = isDark
    ? shiftHue(darken(primary, 0.2), 20)
    : shiftHue(lighten(primary, 0.3), 20);
  const gradientColor = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0, color: colorStart },
    { offset: 1, color: colorEnd },
  ]);
  const option: echarts.EChartsCoreOption = {
    series: [
      {
        type: "gauge",
        startAngle: 90,
        endAngle: -270,
        radius: "100%",
        center: ["50%", "50%"],
        pointer: { show: false },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            color: gradientColor,
            cursor: "pointer",
          },
        },
        data: data,
        axisLine: {
          lineStyle: {
            width: 10,
            length: 10,
          },
        },

        splitLine: {
          show: false,
          distance: 0,
          length: 10,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          distance: 50,
        },
        title: {
          show: true,
          fontSize: isMobile ? 8 : 14,
          color: theme.palette.text.secondary,
        },
        detail: {
          fontSize: 20,
          color: primary,
          borderColor: "inherit",
          formatter: "{value}%",
          offsetCenter: ["0%", "-10%"],
          cursor: "pointer",
        },
      },
    ],
  };
  return (
    <div style={{ width: "100%", height: "100%", cursor: "pointer" }}>
      <BaseChart
        echarts={echarts}
        option={option}
        //  height="100%"
      />
    </div>
  );
};

export default GaugeChartHome;
