import React from "react";
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import {
  TooltipComponent,
  LegendComponent,
  GridComponent,
  TitleComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import BaseChart from "../../components/pageComponents/BaseChart";
import { useLanguageContext } from "../../context/LanguageContext";

echarts.use([
  GridComponent,
  PieChart,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  CanvasRenderer,
]);
interface GAgeChartProps {
  height: number;
}

const AgeDistributionChart: React.FC<GAgeChartProps> = ({ height }) => {
  const { t } = useLanguageContext();
  const option: echarts.EChartsCoreOption = {
    grid: {
      left: "3%",
      right: "5%",
      top: "10%",
      bottom: "10%",
      containLabel: true,
      itemStyle: {
        borderRadius: "20px",
      },
    },
    title: {
      textStyle: {
        fontFamily: "Noto Sans",
        fontSize: 18,
        fontWeight: "bold",
      },
      text: t("Ages of members"),
      left: "center",
      top: 25,
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      top: "12%",
      left: "center",
    },
    series: [
      {
        name: t("Age Distribution"),
        type: "pie",
        center: ["50%", "55%"],
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: "20px",
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: "bold",
            formatter: "{b}\n{d}%",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 320, name: "18–24" },
          { value: 450, name: "25–34" },
          { value: 300, name: "35–44" },
          { value: 150, name: "45–54" },
          { value: 80, name: "55+" },
        ],
      },
    ],
  };

  return <BaseChart echarts={echarts} option={option} height={`${height}vh`} />;
};

export default AgeDistributionChart;
