import Dashboard from "./Dashboard";

const option1 = {
  series: [
    {
      type: "chord",
      label: { show: true },
      minAngle: 30,
      data: [
        { name: "A" },
        { name: "B" },
        { name: "C" },
        { name: "D" },
        { name: "F" },
        { name: "E" },
      ],
      links: [
        { source: "A", target: "B", value: 40 },
        { source: "B", target: "C", value: 20 },
        { source: "E", target: "A", value: 5 },
      ],
    },
  ],
};

const option2 = {
  xAxis: { type: "category", data: ["Sun", "Mon", "Tue"] },
  yAxis: { type: "value" },
  series: [{ data: [820, 932, 901], type: "line", label: { show: true } }],
};

const option3 = {
  xAxis: { type: "category", data: ["A", "B", "C"] },
  yAxis: { type: "value" },
  series: [{ data: [120, 200, 150], type: "bar", label: { show: true } }],
};

const option4 = {
  series: [
    {
      name: "Nightingale Chart",
      type: "pie",
      label: { show: true },
      center: ["50%", "50%"],
      roseType: "area",
      itemStyle: {
        borderRadius: 8,
      },
      data: [
        { value: 40, name: "rose 1" },
        { value: 38, name: "rose 2" },
        { value: 32, name: "rose 3" },
        { value: 30, name: "rose 4" },
        { value: 28, name: "rose 5" },
      ],
    },
  ],
};

const charts = [
  { name: "Sales Revenue", option: option1 },
  { name: "User Growth", option: option2 },
  { name: "Traffic Sources", option: option3 },
  { name: "Nightingale Chart", option: option4 },
];

const OverviewPage = () => {
  return <Dashboard title="Overview" charts={charts} />;
};

export default OverviewPage;
