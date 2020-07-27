const COLLECTION_ID = "5f1d6d37c58dc34bf5dafba4";
const API_URL = "https://api.jsonbin.io/v3/b"; // todo: use API v2
let API_KEY = "";
import("./secret.js").then(m => API_KEY = m.API_KEY); // todo: use `import {API_KEY} from "./secret.js"`

function createBin(binName, data) {
  const jsonString = JSON.stringify(data); // todo: make jsonString a two spaced indented json
  console.log("creating a bin with data: ", jsonString);
  const options = {
    method: "POST", // todo: use instance methods
    headers: { // todo: use axios default headers
      "Content-Type": "application/json; charset=utf-8",
      "X-COLLECTION-ID": COLLECTION_ID,
      "X-Bin-Name": binName,
      "X-Master-Key": API_KEY
    },
    data: jsonString,
    url: API_URL // todo: use axios default base_url
  }
  return axios(options) // todo: use await
    .then(res => res.data) // todo: use axios interceptor to return the data
    .catch(e => Promise.reject(`${e.message} : '${e.response.data.message}'`)); // todo: use axios interceptor to return create error message
}

function readBin(collectionId) { // todo: use same function for all CRUD
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-COLLECTION-ID": COLLECTION_ID,
      "X-Master-Key": API_KEY
    },
    url: API_URL
  }
  return axios(options)
    .then(res => res.data)
    .catch(e => Promise.reject(`${e.message} : '${e.response.data.message}'`));
}

function create() {
  const collectionId = document.querySelector("#create > .collection-id").value; // todo: use "object destructuring with alias"
  const jsonString = document.querySelector("#create > textarea").value;
  const jsonData = JSON.parse(jsonString); // todo: validate json, show error if not valid
 
  createBin("some name", jsonData)
    .then(res => console.log(res))
    .catch(error => {
      document.querySelector("#create > .error").innerText = error;
      console.error("error creating bin: ", error);
    });
}

function read() {
  const collectionId = document.querySelector("#read > .collection-id").value; // todo: use "object destructuring with alias"
  readBin(collectionId)
    .then(res => {
      document.querySelector("#read > textarea").value = res;
    })
    .catch(error => {
      document.querySelector("#read > .error").innerText = error;
      console.error("error reading bin: ", error);
    });
}