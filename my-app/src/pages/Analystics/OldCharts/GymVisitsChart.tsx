import React, { useRef } from "react";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  DatasetComponent,
  GridComponent,
  VisualMapComponent,
  TitleComponent,
  TooltipComponent,
  GraphicComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import BaseChart from "../../../components/pageComponents/BaseChart";
import { useLanguageContext } from "../../../context/LanguageContext";

echarts.use([
  BarChart,
  DatasetComponent,
  GridComponent,
  VisualMapComponent,
  TitleComponent,
  TooltipComponent,
  CanvasRenderer,
  GraphicComponent,
]);

interface VisitsProps {
  height: number;
}

const GymVisitsChart: React.FC<VisitsProps> = ({}) => {
  const chartRef = useRef<any>(null);
  const { t } = useLanguageContext();
  const drilldownData = [
    {
      dataGroupId: "Jan",
      data: [
        ["1", 12],
        ["2", 17],
        ["3", 13],
        ["4", 8],
        ["5", 8],
        ["6", 2],
        ["7", 19],
        ["8", 10],
        ["9", 30],
        ["10", 30],
        ["11", 3],
        ["12", 5],
        ["13", 10],
        ["14", 4],
        ["15", 14],
        ["16", 16],
        ["17", 13],
        ["18", 14],
        ["19", 19],
        ["20", 20],
        ["21", 24],
        ["22", 10],
        ["23", 4],
        ["24", 9],
        ["25", 15],
        ["26", 15],
        ["27", 12],
        ["28", 10],
        ["29", 3],
        ["30", 10],
      ],
    },
    {
      dataGroupId: "Feb",
      data: [
        ["1", 12],
        ["2", 17],
        ["3", 13],
        ["4", 8],
        ["5", 8],
        ["6", 2],
        ["7", 19],
        ["8", 10],
        ["9", 30],
        ["10", 30],
        ["11", 3],
        ["12", 5],
        ["13", 10],
        ["14", 4],
        ["15", 14],
        ["16", 16],
        ["17", 13],
        ["18", 14],
        ["19", 19],
        ["20", 20],
        ["21", 24],
        ["22", 10],
        ["23", 4],
        ["24", 9],
        ["25", 15],
        ["26", 15],
        ["27", 12],
        ["28", 10],
        ["29", 3],
        ["30", 10],
      ],
    },
    {
      dataGroupId: "Mar",
      data: [
        ["1", 12],
        ["2", 17],
        ["3", 13],
        ["4", 8],
        ["5", 8],
        ["6", 2],
        ["7", 19],
        ["8", 10],
        ["9", 30],
        ["10", 30],
        ["11", 3],
        ["12", 5],
        ["13", 10],
        ["14", 4],
        ["15", 14],
        ["16", 16],
        ["17", 13],
        ["18", 14],
        ["19", 19],
        ["20", 20],
        ["21", 24],
        ["22", 10],
        ["23", 4],
        ["24", 9],
        ["25", 15],
        ["26", 15],
        ["27", 12],
        ["28", 10],
        ["29", 3],
        ["30", 10],
      ],
    },
    {
      dataGroupId: "Apr",
      data: [
        ["1", 12],
        ["2", 17],
        ["3", 13],
        ["4", 8],
        ["5", 8],
        ["6", 2],
        ["7", 19],
        ["8", 10],
        ["9", 30],
        ["10", 30],
        ["11", 3],
        ["12", 5],
        ["13", 10],
        ["14", 4],
        ["15", 14],
        ["16", 16],
        ["17", 13],
        ["18", 14],
        ["19", 19],
        ["20", 20],
        ["21", 24],
        ["22", 10],
        ["23", 4],
        ["24", 9],
        ["25", 15],
        ["26", 15],
        ["27", 12],
        ["28", 10],
        ["29", 3],
        ["30", 10],
      ],
    },
  ];

  const onEvents = {
    click: (params: any) => {
      if (!params.data) return;
      const sub = drilldownData.find(
        (d) => d.dataGroupId === params.data.groupId
      );
      if (!sub) return;

      chartRef.current?.getEchartsInstance().setOption({
        xAxis: {
          data: sub.data.map((item) => item[0]),
        },
        series: {
          type: "bar",
          id: "sales",
          dataGroupId: sub.dataGroupId,
          data: sub.data.map((item) => item[1]),
          universalTransition: {
            enabled: true,
            divideShape: "clone",
          },
        },
        graphic: [
          {
            type: "text",
            left: 20,
            top: 20,
            style: {
              text: "← Back",
              fontSize: 16,
              cursor: "pointer",
            },
            onclick: () => {
              chartRef.current?.getEchartsInstance().setOption({
                ...option,
                graphic: [],
              });
            },
          },
        ],
      });
    },
  };

  const option: echarts.EChartsCoreOption = {
    title: {
      textStyle: {
        fontFamily: "Noto Sans",
        fontSize: 18,
        fontWeight: "bold",
      },
      text: t("Gym Visits"),
      left: "center",
      top: 25,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan",
        "Feb",
        "March",
        "Apr",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yAxis: {
      type: "value",
    },
    animationDurationUpdate: 500,
    series: {
      type: "bar",
      id: "sales",
      data: [
        { value: 120, groupId: "Jan" },
        { value: 200, groupId: "Feb" },
        { value: 180, groupId: "Mar" },
        { value: 120, groupId: "Apr" },
        { value: 150, groupId: "Jun" },
        { value: 80, groupId: "Jul" },
        { value: 130, groupId: "Aug" },
        { value: 139, groupId: "Sep" },
        { value: 90, groupId: "Oct" },
        { value: 100, groupId: "Nov" },
        { value: 190, groupId: "Dec" },
      ],
      universalTransition: {
        enabled: true,
        divideShape: "clone",
      },
    },
    grid: {
      top: 80,
      bottom: 70,
      left: 40,
      right: 40,
      containLabel: true,
    },
  };

  return (
    <BaseChart
      ref={chartRef}
      echarts={echarts}
      onEvents={onEvents}
      option={option}
      // height={`${height}dvh`}
    />
  );
};

export default GymVisitsChart;
