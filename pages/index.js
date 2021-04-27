import "tailwindcss/tailwind.css";
import { useState } from "react";
import CSVReader from "react-csv-reader";

export default function Home() {
  const [uploaded, setUploaded] = useState(false);
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState(null);
  const [predictionColumn, setPredictionColumn] = useState(1);
  const [dateColumn, setDateColumn] = useState(0);
  return (
    <div className="min-h-screen w-screen bg-gray-50 ">
      <div className="min-h-screen w-full flex items-center justify-center flex-col">
        <div className="w-full text-center block mb-5">
          <span
            className="text-gray-900 text-6xl font-bold"
            style={{
              background: "-webkit-linear-gradient(right, #7000FF, #00A3FF)",
              "-webkit-background-clip": "text",
              "-webkit-text-fill-color": "transparent",
            }}
          >
            Dashboost
          </span>
        </div>
        <div className="w-full text-center block">
          <span className="text-gray-900 text-3xl font-bold"> Forecasting </span>
        </div>
        <div className="w-full block text-center mt-8">
          <span className="text-gray-400">Drop your CSV file below</span>
        </div>
        <div className="w-full block text-center mt-8">
          <span className="text-gray-500">
            Forecast time series data to get insight into the future! <br></br>Predict anything - the sales for the next quarter <br></br> or how many cups of coffee you are going to have next month
          </span>
        </div>
      </div>
      <div className="min-h-screen w-full">
        <div className="px-56">
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  stroke-width="2"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  for="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span className="p-2">
                    {" "}
                    {uploaded ? (
                      <span className="text-gray-800">
                        <div className="bg-green-500 w-3 h-3 inline-block rounded-xl mr-2"></div>
                        File Uploaded
                      </span>
                    ) : (
                      <span className="text-gray-800">
                        <div className="bg-indigo-500 w-3 h-3 inline-block rounded-xl mr-2"></div>
                        Upload a file
                      </span>
                    )}
                  </span>
                  <div className="flex block w-full justify-center">
                    <CSVReader
                      onFileLoaded={(data, fileInfo) => {
                        setUploaded(true);
                        let parsedData = data.splice(1, 6);
                        setFile(parsedData);
                        setColumns(data[0]);
                      }}
                    ></CSVReader>
                  </div>
                </label>
              </div>
              <p className="text-xs text-gray-500">CSV, XLS, JSON</p>
            </div>
          </div>
          {uploaded && (
            <>
              <div className="flex flex-row justify-between mt-10">
                <div className="py-4 inline-block">
                  <div className="inline-block w-15">
                    <label
                      for="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Prediction Column
                    </label>
                    <select
                      id="country"
                      name="country"
                      autocomplete="country"
                      className="mt-1 py-2 px-3 w-40 border border-text-300 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                      onClick={(event) =>
                        setPredictionColumn(columns.indexOf(event.target.value))
                      }
                    >
                      {columns != null &&
                        columns.map((i, index) => <option>{i}</option>)}
                    </select>
                  </div>
                </div>
                <div className="py-4 inline-block">
                  <div className="inline-block w-15">
                    <label
                      for="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date Column
                    </label>
                    <select
                      id="country"
                      name="country"
                      autocomplete="country"
                      className="mt-1 py-2 px-3 w-40 border border-text-300 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                      onClick={(event) =>
                        setDateColumn(columns.indexOf(event.target.value))
                      }
                    >
                      {columns != null &&
                        columns.map((i, index) => <option>{i}</option>)}
                    </select>
                  </div>
                </div>
                <div className="py-4 inline-block">
                  <div className="inline-block w-15">
                    <label
                      for="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Task
                    </label>
                    <select
                      id="country"
                      name="country"
                      autocomplete="country"
                      className="mt-1 py-2 px-3 w-40 border border-text-300 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                    >
                      <option>Forecasting</option>
                      <option>Prediction</option>
                      <option>Segmentation</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="w-full my-10">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      {columns != null &&
                        columns.map((i, index) => (
                          <th className="border border-indigo-500 px-4 py-2 text-indigo-600 font-medium">
                            {i}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {file != null &&
                      file.map(
                        (i, index) =>
                          index != 0 && (
                            <tr>
                              {i.map((item, ind) => (
                                <td
                                  className={
                                    "border border-indigo-500 px-4 py-2 text-indigo-600 "
                                  }
                                >
                                  {item}
                                </td>
                              ))}
                            </tr>
                          )
                      )}
                  </tbody>
                </table>
              </div>
              <div className="">
                <button className="bg-indigo-500 px-4 py-2 rounded-md text-white ">
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
