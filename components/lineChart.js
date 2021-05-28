import { ResponsiveLine } from "@nivo/line";

export default function LineChart({ data }) {
  const getTickValues = () => {
    let innerWidth = 1024;
    var xValues = data
      .map((d) => d.data.map((x) => x.x))
      .reduce((acc, data) => acc.concat(data), []);

    console.log(xValues);

    var gridWidth = Math.ceil(innerWidth / xValues.length);
    var tickDistance = Math.floor(200 / gridWidth);

    return {
      tickValues:
        tickDistance === 0
          ? xValues
          : xValues.filter((_, i) => i % tickDistance === 0),
    };
  };

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 10, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      enablePoints={false}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "date",
        legendOffset: 36,
        tickValues: getTickValues().tickValues,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "sales",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}
