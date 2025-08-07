import ReactECharts from "echarts-for-react";
import { forwardRef } from "react";
import { Box, useTheme } from "@mui/material";
import LoadingScreen from "./LoadingPage";

const MIN_BOTTOM_MARGIN = "20px";

interface BaseChartProps {
  className?: string;
  option?: any;
  height?: number | string;
  ref?: React.RefObject<HTMLDivElement>;
  echarts?: any;
  onEvents?: Record<string, (params?: any) => void>;
  isStatic?: boolean;
  isLoading?: boolean;
  style?: any;
  addToSeries?: (series: object) => object;
}

const BaseChart = forwardRef<ReactECharts, BaseChartProps>(
  (
    {
      className,
      option,
      style,
      echarts,
      height,
      onEvents,
      isStatic = false,
      isLoading = false,
      addToSeries,
    },
    ref
  ) => {
    const chartHeight =
      height ?? (isStatic ? "100%" : `calc(100% - ${MIN_BOTTOM_MARGIN})`);
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const enhancedOption = {
      ...option,
      backgroundColor: "transparent",
      animation: true,
      animationDuration: 1300,
      animationEasing: "elasticOut",
      animationThreshold: 2000,
      series: (Array.isArray(option?.series)
        ? option.series
        : [option.series || {}]
      ).map((series: any, idx: number) => ({
        ...series,
        ...(addToSeries ? addToSeries(series) : {}),
        ...(isStatic ? { silent: true } : {}),
        animationDelay: function () {
          return idx * 120;
        },
      })),
    };

    return (
      <Box
        component="div"
        className={className}
        sx={{
          height: chartHeight,
          width: "100%",
          pointerEvents: isStatic ? "none" : "auto",
          position: "relative",
        }}
      >
        {isLoading ? (
          !isStatic && <LoadingScreen />
        ) : (
          <ReactECharts
            ref={ref}
            option={enhancedOption}
            // theme={echartsThemeName}
            theme={isDark ? "dark" : undefined}
            echarts={echarts}
            notMerge={true}
            style={{ height: chartHeight, width: "100%" }}
            onEvents={onEvents}
          />
        )}
      </Box>
    );
  }
);

export default BaseChart;
