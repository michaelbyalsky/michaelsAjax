const COLLECTION_ID = "5f1d6d37c58dc34bf5dafba4";
const API_URL = "https://api.jsonbin.io/v3/b"; // todo: use API v2
// fix: don't store API_KEY on window object! use `import {API_KEY} from "./secret.js"`
import("./secret.js").then(m => window.API_KEY = m.API_KEY);

// todo later: move common functionality from all CRUD functions to a single function

function create(binName, binData) { // todo: use await
  const options = {
    method: "POST", // todo: use instance methods
    headers: { // todo: use axios default headers
      "Content-Type": "application/json; charset=utf-8",
      "X-COLLECTION-ID": COLLECTION_ID,
      "X-Bin-Name": binName,
      "X-Master-Key": API_KEY
    },
    data: binData,
    url: API_URL // todo: use axios default base_url
  }
  return axios(options)
    .then(res => res.data) // todo: use axios interceptor to return the data
    .catch(e => Promise.reject(`${e.message} : '${e.response.data.message}'`)); // todo: use axios interceptor to return create error message
}
  
function read(binId) { // exercise: replace axios with XMLHttpRequest with callback
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-COLLECTION-ID": COLLECTION_ID,
      "X-Master-Key": API_KEY
    },
    url: `${API_URL}/${binId}`
  }
  return axios(options)
    .then(res => res.data)
    .catch(e => Promise.reject(`${e.message} : '${e.response.data.message}'`));
}
  
function update(binId, binData) { // exercise: replace axios with fetch.then
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-COLLECTION-ID": COLLECTION_ID,
      "X-Master-Key": API_KEY
    },
    data: binData,
    url: `${API_URL}/${binId}`
  }
  return axios(options)
    .then(res => res.data)
    .catch(e => Promise.reject(`${e.message} : '${e.response.data.message}'`));
}

function destroy(binId) { // exercise: replace axios with await and fetch
  const options = {
    method: "DELETE",
    headers: {
      "X-Master-Key": API_KEY
    },
    url: `${API_URL}/${binId}`
  }
  return axios(options)
    .then(res => res.data)
    .catch(e => Promise.reject(`${e.message} : '${e.response.data.message}'`));
}
