import { ResponsiveBar } from "@nivo/bar";

export default function BarChart({
  data,
  keys,
  index,
  xLabel = "",
  yLabel = "",
  bottomAxisRotation = 0,
  padding = 0.7,
  borderRadius = 5,
  showBottomAxis = true,
  showLeftAxis = true,
}) {
  // const defs = COLOR_GRADIENTS;
  const reduceObject = (arr, index) => {
    let initialValue = [];
    return arr.reduce((accumulator, currentValue) => {
      return [...accumulator, currentValue[index]];
    }, initialValue);
  };
  // let fill = [];
  // let gradientIds = reduceObject(defs, "id");
  // data.map((dataPoint, ind) =>
  //   fill.push({
  //     match: { id: dataPoint[index] },
  //     id: gradientIds[ind % gradientIds.length],
  //   })
  // );
  return (
    <ResponsiveBar
      data={data}
      keys={keys}
      indexBy={index}
      margin={{
        top: 0,
        right: 0,
        bottom: showBottomAxis ? 50 : 20,
        left: showLeftAxis ? 60 : 10,
      }}
      padding={padding}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      // defs={defs}
      // fill={fill}
      borderRadius={borderRadius}
      borderColor={{ from: "color", modifiers: [["darker", "0.5"]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={
        showBottomAxis
          ? {
              tickSize: 0,
              tickPadding: 15,
              tickRotation: bottomAxisRotation,
              legend: xLabel,
              legendPosition: "middle",
              legendOffset: 32,
            }
          : null
      }
      axisLeft={
        showLeftAxis
          ? {
              tickSize: 0,
              tickPadding: 15,
              tickRotation: 0,
              tickValues: 4,
              legend: yLabel,
              legendPosition: "middle",
              legendOffset: -50,
            }
          : null
      }
      enableLabel={false}
      labelSkipWidth={14}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      animate={true}
      motionStiffness={80}
      motionDamping={22}
      theme={{
        background: "transparent",
        axis: {
          fontSize: "14px",
          tickColor: "#eee",
          domain: {
            line: {
              stroke: "#4B5563",
              strokeWidth: 1,
            },
          },
          ticks: {
            line: {
              stroke: "#4B5563",
              strokeWidth: 1,
            },
            text: {
              fill: "#9CA3AF",
            },
          },
          legend: {
            text: {
              fill: "#aaaaaa",
            },
          },
        },
        grid: {
          line: {
            stroke: "rgba(75, 85, 99, 0.5)",
            strokeWidth: 1,
            // strokeDasharray: "10 10",
          },
        },
      }}
    />
  );
}

const FADE_GRADIENTS = [
  {
    id: "gradientA",

    type: "linearGradient",

    colors: [
      { offset: 0, color: "#7080F5" },

      { offset: 100, color: "rgba(60, 62, 74, 0)" },
    ],
  },
  {
    id: "gradientB",

    type: "linearGradient",

    colors: [
      { offset: 0, color: "#F0827E" },

      { offset: 100, color: "rgba(60, 62, 74, 0)" },
    ],
  },
  {
    id: "gradientC",

    type: "linearGradient",

    colors: [
      { offset: 0, color: "#84F4A4" },

      { offset: 100, color: "rgba(60, 62, 74, 0)" },
    ],
  },
  {
    id: "gradientD",

    type: "linearGradient",

    colors: [
      { offset: 0, color: "#EC5099" },

      { offset: 100, color: "rgba(60, 62, 74, 0)" },
    ],
  },
];

const COLOR_GRADIENTS = [
  {
    id: "gradientA",

    type: "linearGradient",

    colors: [
      { offset: 0, color: "#7080F5" },

      { offset: 100, color: "#ED5F88" },
    ],
  },
  {
    id: "gradientB",

    type: "linearGradient",

    colors: [
      { offset: 0, color: "#F0827E" },

      { offset: 100, color: "#CAF9D4" },
    ],
  },
  {
    id: "gradientC",

    type: "linearGradient",

    colors: [
      { offset: 0, color: "#84F4A4" },

      { offset: 100, color: "#51CCFA" },
    ],
  },
  {
    id: "gradientD",

    type: "linearGradient",

    colors: [
      { offset: 0, color: "#EC5099" },

      { offset: 100, color: "#F49E31" },
    ],
  },
];
