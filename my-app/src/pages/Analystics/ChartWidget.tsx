import { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { useResizeDetector } from "react-resize-detector";
import { Box, useTheme } from "@mui/material";

const ChartWidget = ({ title, option }: { title: string; option: any }) => {
  const echartsRef = useRef<any>(null);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const { width, height, ref } = useResizeDetector({
    handleHeight: true,
    refreshMode: "debounce",
    refreshRate: 10,
  });

  useEffect(() => {
    const chartInstance = echartsRef.current?.getEchartsInstance();
    if (chartInstance) {
      chartInstance.resize();
    }
  }, [width, height]);

  const defaultToolbox = {
    show: true,
    feature: {
      mark: { show: false },
      dataView: { show: true, readOnly: true },
      restore: { show: false },
      saveAsImage: { show: true },
    },
  };

  const defaultItemStyle = {
    borderRadius: 8,
  };

  const mergedOption = {
    ...option,
    toolbox: option.toolbox || defaultToolbox,
    legend: option.legend || { top: "bottom" },
    series: Array.isArray(option.series)
      ? option.series.map((s: any) => ({
          ...s,
          itemStyle: s.itemStyle || defaultItemStyle,
        }))
      : option.series,
  };

  return (
    <Box
      ref={ref}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: isDark
          ? theme.palette?.customColors?.sectionBackgroundColor
          : "#fff",
        boxShadow: isDark
          ? "0 2px 12px rgba(0,0,0,0.5)"
          : "0 2px 12px rgba(84,112,198,0.08)",
      }}
    >
      <Box
        sx={{
          padding: "10px",
          fontWeight: "bold",
          background: isDark ? theme.palette.background.default : "#f5f5f5",
          color: isDark ? theme.palette.text.primary : "#222",
          cursor: "move",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
        className="grid-drag-handle"
      >
        {title}
      </Box>

      <Box sx={{ flex: 1, minHeight: 0, minWidth: 100 }}>
        <ReactECharts
          ref={echartsRef}
          option={mergedOption}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </Box>
    </Box>
  );
};

export default ChartWidget;
