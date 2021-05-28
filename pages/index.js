import { useState } from "react";
import CSVReader from "react-csv-reader";
import { postJob } from "../api/forecasting";
import { RiSendPlaneFill } from "react-icons/ri";
import { useRouter } from 'next/router'

export default function Home() {
  // ===========================
  // STATES
  // check if user uploaded a file
  const [uploaded, setUploaded] = useState(false);
  // file content
  const [file, setFile] = useState(null);
  // file columns
  const [columns, setColumns] = useState(null);
  // prediction column from the user input, after the file was uploaded
  const [predictionColumn, setPredictionColumn] = useState(1);
  // date column from the user input, after the file was uploaded
  const [dateColumn, setDateColumn] = useState(0);
  // sample input ( Daily, Weekly, Monthly ), after the file was uploaded
  const [sample, setSample] = useState("Daily");
  // loading screen after the request for forecast is sent
  const [loading, setLoading] = useState(false);
  // ===========================

  const router = useRouter()

  // ===========================
  // post request for forecast
  const PostJob = async () => {
    setLoading(true);
    await postJob(columns, file, predictionColumn, dateColumn, sample).then(
      (response) => {
        console.log(response.data);
        localStorage.setItem('results', JSON.stringify(response.data));
        router.push('/forecast')
        setLoading(false);
      }
    );
  };
  // ===========================

  return (
    <div
      className={`min-h-screen max-w-screen w-screen bg-gray-50 relative overflow-hideen`}
    >
      <div
        className={`fixed right-10 bottom-10 h-64 w-64 bg-transparent-200 z-50 flex justify-center items-center ${
          loading ? "visible" : "hidden"
        }`}
      >
        <div className="bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur-sm p-4 rounded-lg">
          <span class="inline-flex">
            <button
              type="button"
              class="inline-flex items-center px-4 text-indigo-500 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-rose-600 hover:bg-rose-500 focus:border-rose-700 active:bg-rose-700 transition ease-in-out duration-150 cursor-not-allowed"
              disabled=""
            >
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating your results
            </button>
          </span>
        </div>
      </div>
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
          <span className="text-gray-900 text-3xl font-bold">
            {" "}
            Forecasting{" "}
          </span>
        </div>
        <div className="w-full block text-center mt-8">
          <span className="text-gray-400">Drop your CSV file below</span>
        </div>
        <div className="w-full block text-center mt-8">
          <span className="text-gray-500">
            Forecast time series data to get insight into the future! <br></br>
            Predict anything - the sales for the next quarter <br></br> or how
            many cups of coffee you are going to have next month
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
                        setColumns(data[0]);
                        let parsedData = data.splice(1, data.length);
                        setFile(parsedData);
                      }}
                      disabled={loading}
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
                      disabled={loading}
                      className="mt-1 py-2 px-3 w-40 border border-text-300 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                      onChange={(event) =>
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
                      disabled={loading}
                      className="mt-1 py-2 px-3 w-40 border border-text-300 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                      onChange={(event) =>
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
                      Sample
                    </label>
                    <select
                      id="country"
                      name="country"
                      autocomplete="country"
                      disabled={loading}
                      className="mt-1 py-2 px-3 w-40 border border-text-300 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                      onChange={(event) => setSample(event.target.value)}
                    >
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
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
                      file.splice(0, 6).map((i, index) => (
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
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="">
                <button
                  className={`px-4 py-2 rounded-md text-white transition duration-500 ease-in-out flex items-center justify-center ${
                    loading ? "bg-green-500" : "bg-indigo-500"
                  }`}
                  disabled={loading}
                  onClick={PostJob}
                >
                  <div className="w-4 h-4 relative">
                    <RiSendPlaneFill
                      color="#FFFFFF"
                      className={`w-4 h-4 absolute transition duration-500 ease-in-out ${
                        loading ? "opacity-0" : "opacity-100"
                      }`}
                    />
                    <svg
                      class={`animate-spin w-4 h-4 absolute transition duration-500 ease-in-out ${
                        loading ? "opacity-100" : "opacity-0"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>{" "}
                  <span className="ml-2">
                    {loading ? "Processing" : "Submit"}
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
