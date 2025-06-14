import React from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { GaugeChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  GaugeChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  CanvasRenderer,
]);

interface GoalMembersGaugeChartProps {
  value: number;
  height: number;
}

const GoalMembersGaugeChart: React.FC<GoalMembersGaugeChartProps> = ({
  value,
  height,
}) => {
  const option: echarts.EChartsCoreOption = {
    title: {
      textStyle: {
        fontFamily: "Montserrat",
        fontSize: 18,
        fontWeight: "bold",
      },
      text: "Goal - Members for this mounth",
      left: "center",
      top: 25,
    },
    series: [
      {
        type: "gauge",
        center: ["50%", "60%"],
        radius: "80%",
        progress: {
          show: true,
          width: 18,
        },
        axisLine: {
          lineStyle: {
            width: 18,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          length: 15,
          lineStyle: {
            width: 2,
            color: "#999",
          },
        },
        axisLabel: {
          distance: 25,
          color: "#999",
          fontSize: 20,
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 25,
          itemStyle: {
            borderWidth: 10,
          },
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          fontSize: 80,
          offsetCenter: [0, "70%"],
        },
        data: [
          {
            value: value,
          },
        ],
      },
    ],
  };

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      style={{ height: `${height}vh`, width: "100%" }}
    />
  );
};

export default GoalMembersGaugeChart;
