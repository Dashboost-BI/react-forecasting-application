import axios from "axios";

const URL = "http://127.0.0.1:5000";

const postJob = async (
  columns,
  file,
  predictionColumn,
  dateColumn,
  sample
) => {
  let body = {
    columns,
    file,
    predictionColumn,
    dateColumn,
    sample,
  };
  let resp = await axios.post(`${URL}/forecast`, body);
  return resp;
};

export { postJob };
