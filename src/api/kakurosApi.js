import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/kakuros/";

export function save(kakuro) {
  return fetch(baseUrl, {
    method: "PUT", // PUT to create or update if id is provided and correct.
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(kakuro)
  })
    .then(handleResponse)
    .catch(handleError);
}
