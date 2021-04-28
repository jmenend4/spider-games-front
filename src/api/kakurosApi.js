import { handleResponse, handleError, formatFileTransfer } from "./apiUtils";
const javaApiBaseUrl = process.env.API_URL + "/kakuros";
const pythonApiBaseUrl = process.env.PYTHON_API_URL + "/kakuros";

export function save(kakuro) {
  return fetch(javaApiBaseUrl, {
    method: "PUT", // PUT to create or update if id is provided and correct.
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(kakuro)
  })
    .then(async (res) => {
      //todo simplify this once there is a toast
      const response = await handleResponse(res);
      console.log("Kakuro saved successfully!");
      return response;
    })
    .catch(handleError);
}

export const retrieveDraftKakuro = async () => {
  const uri = javaApiBaseUrl + "/drafts";
  return fetch(uri)
    .then(async (response) => {
      let kakuro = { height: 14, width: 14, grid: [] };
      if (response.status === 200) {
        const body = await response.json();
        kakuro = body.result.kakuro;
      }
      return kakuro;
    })
    .catch(handleError);
};

export const solve = (kakuroGrid) => {
  return fetch(pythonApiBaseUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(kakuroGrid)
  })
    .then(handleResponse)
    .catch(handleError);
};

export const detect = (kakuroImageFile) => {
  // const formData = formatFileTransfer(kakuroImageFile);
  return fetch(pythonApiBaseUrl + "/detections", {
    method: "POST",
    // headers: { "content-type": "multipart/form-data" },
    // headers: {
    //   "Content-type": "application/json"
    // },
    // body: JSON.stringify({ hola: "holahola" })
    // body: formData
    body: kakuroImageFile
  })
    .then(handleResponse)
    .catch(handleError);
};
