export type ResizeHandle = "s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne";

const chartsPerRow = 2;
const chartWidth = 6;
const chartHeight = 6;
export const defaultLayout = (key: string, index: number) => ({
  i: key,
  x: (index % chartsPerRow) * chartWidth,
  y: Math.floor(index / chartsPerRow) * chartHeight,
  w: chartWidth,
  h: chartHeight,
  resizeHandles: ["se", "sw", "ne", "nw"] as ResizeHandle[],
});
