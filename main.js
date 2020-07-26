function showError(error) {
  const errorElement = document.querySelector("#comm > .error");
  errorElement.hidden = false;
  errorElement.innerText = error;
}

async function showResources(resources) {
  for (const resource of resources) {
    const data = await readResource(resource);
    console.log(resource, data);
  }
}

function load() {
  const input = document.querySelector("#comm > input").value;
  document.querySelector("#comm > .error").hidden = true;
  // ex: https://crudcrud.com/api/8fcdeea6a0984bcd965093ca68cdc93c
  const urlRegex = /https:\/\/crudcrud.com\/api\/[a-f0-9]{32}$/;

  if (input != "" && !urlRegex.test(input)) {
    showError(`invalid url: ${input}`);
    return;
  }
  initComm(input)
  .then(showResources)
  .catch((e) => {
      showError(`can't connect to url: ${input}`);
  })
}

const DEFAULT_RESOURCE_NAME = "todo-list";

async function createResource(resource, data) {
  return fetch(`${baseURL}/${resource}`, {method: "POST"}).then(r=>r.json()).catch(e=>console.log("!"));
  // return axios.post("/" + resource, data).then((r) => r.data);
}

function readAllResources() {
  return fetch(baseURL).then(r=>r.json());
  // return axios.get("/").then((r) => r.data, e=>console.log("!!!"));
}

function readResource(id) {
  return fetch(`${baseURL}/${id}`).then(r=>r.json()).then(j=>j.data);
  // return axios.get("/" + id).then((r) => r.data);
}

function updateResources(id, data) {
  return axios.put("/" + id, data).then((r) => r.data);
}

function deleteResources() {
  return axios.get("/").then((r) => r.data);
}

let connected = false;
let baseURL;

async function initComm(url) {
  /*
  let req = new XMLHttpRequest();

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    console.log(req.responseText);
  }
};

req.open("GET", "https://api.jsonbin.io/b/<BIN_ID>", true);
req.setRequestHeader("secret-key", "<SECRET_KEY>");
req.send();
  */
  baseURL = url;
  axios.defaults.baseURL = url;
  axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
  axios.defaults.validateStatus = (status) => status >= 200 && status < 300;
  try {
    connected = true;
    const resources = await readAllResources();
    console.log({ resources });
    return resources;
  } catch (e) {
    connected = false;
    throw "Could not connect";
  }
}

async function create() {
  const id = document.querySelector("#resource-id").value;
  const data = document.querySelector("#resource-data").value;
  try {
    const res = await createResource(id, data).catch(e=>console.log(e));
  } catch (e) {
    showError(e);
  }
}