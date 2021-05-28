import { useEffect, useMemo, useState } from "react";
import GridLayout from "react-grid-layout";
import { SizeMe } from "react-sizeme";
import { LineChart, BarChart, CalendarChart } from "../components";

export default function Forecast() {
  // ===========================
  // STATES
  // data as it comes from the http response
  const [data, setData] = useState(null);
  // parsed data for the line chart
  const [parsedData, setParsedData] = useState([]);
  // get the active option for the select input ( line chart )
  const [active, setActive] = useState(null);
  // ===========================

  // ===========================
  // get data from local storage
  useEffect(() => {
    let tempData = JSON.parse(localStorage.getItem("results"));
    setData(tempData);
    setParsedData([tempData["data"]]);
  }, []);
  // ===========================

  // ===========================
  // update parsed data everytime the active input changes
  useEffect(() => {
    if (active) {
      let tempData = [data["data"]];
      if (active === "Forecast") {
        tempData.push(data["forecast"]);
      } else if (active === "Trend") {
        tempData.push(data["lr"]);
      } else if (active === "FFT") {
        tempData.push(data["fft"]);
      }
      setParsedData(tempData);
    }
  }, [active]);
  // ===========================

  // ===========================
  // helper function for the bar chart to get values for the x axis from the data object
  const reduceXaxis = (arr, index) => {
    let initialValue = [];
    return arr.reduce((accumulator, currentValue) => {
      return [...accumulator, currentValue[index]];
    }, initialValue);
  };
  // ===========================

  // ===========================
  // the grid layout, you can change the dimensions of the graphs, set static = true if you don't want to move/resize the graphs
  // a ---- line chart
  // b ---- bar chart ( histogram )
  // c ---- calendar chart
  const [layout, setLayout] = useState([
    { i: "a", x: 0, y: 0, w: 12, h: 7, static: true },
    { i: "b", x: 0, y: 7, w: 12, h: 7, static: true },
    { i: "c", x: 0, y: 14, w: 12, h: 7, static: true },
  ]);
  // ===========================
  return (
    <div
      className={`min-h-screen max-w-screen w-screen bg-gray-50 relative overflow-hideen p-20`}
    >
      <div className="w-full flex justify-center items-center mb-10">
        <span className="text-3xl text-gray-900 font-bold">
          Forecasting Results
        </span>
      </div>
      {/* ===========================
      SizeMe is used to get the dimensions of the parent element so we can make the grid layout responsive,
      there might be a better way of doing this but this is the best ( and safest ) way to do it as far as i know
      =========================== */}
      <SizeMe>
        {({ size }) => (
          <GridLayout
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={60}
            width={size.width}
            isResizable={true}
            isDraggable={true}
          >
            <div
              key="a"
              className="rounded-lg bg-gray-200 shadow-md flex flex-col"
            >
              <div className="w-full h-20 px-10 flex items-center justify-between">
                <span className="text-xl">Data Chart</span>
                <span>
                  <select
                    onChange={(e) => {
                      setActive(e.target.value);
                    }}
                  >
                    <option value="None">None</option>
                    <option value="Forecast">Forecast</option>
                    <option value="Trend">Trend</option>
                    <option value="FFT">Fast Fourier Transform</option>
                  </select>
                </span>
              </div>
              <div className="w-full h-full">
                {parsedData !== [] && <LineChart data={parsedData} />}
              </div>
            </div>
            <div
              key="b"
              className="rounded-lg bg-gray-200 shadow-md flex flex-col"
            >
              <div className="w-full h-20 px-10 flex items-center justify-between">
                <span className="text-xl">Histogram</span>
              </div>
              <div className="w-full h-full">
                {data && (
                  <BarChart
                    data={data["histogram"]}
                    keys={reduceXaxis(data["histogram"], "interval")}
                    index={"interval"}
                    xLabel={"Interval"}
                    yLabel={"Ammount"}
                    bottomAxisRotation={-45}
                    padding={0.6}
                    borderRadius={5}
                    showBottomAxis={false}
                  />
                )}
              </div>
            </div>
            <div
              key="c"
              className="rounded-lg bg-gray-200 shadow-md flex flex-col"
            >
              <div className="w-full h-20 px-10 flex items-center justify-between">
                <span className="text-xl">Calendar</span>
              </div>
              <div className="w-full h-full">
                {data && <CalendarChart data={data["calendar"]} />}
              </div>
            </div>
          </GridLayout>
        )}
      </SizeMe>
    </div>
  );
}
