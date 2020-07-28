// fix: dont load metadata
// fix: make delete and save enabled only when json is loaded
// fix: handle prompt cancellation gracefully
function loadBin() {
  const binId = prompt("binId"); // todo later: ask and load by bin name and not id
  read(binId)
    .then(res => { // todo: use await
      document.querySelector("#error").hidden = true;
      const binData = JSON.stringify(res); // fix: make jsonString a two spaced indented json
      console.log(`loaded bin: ${binId}`, binData);
      document.querySelector("#view > textarea").value = binData;
    })
    .catch(error => { // todo later: move functionality to a dedicated function to handle and display and all user errors
      document.querySelector("#error").hidden = false;
      document.querySelector("#error").innerText = error;
      console.error("error reading bin: ", error);
    });
}

function newBin() { // todo: confirm() wether to delete unsaved work
  const binName = prompt("bin name"); // todo later: replace prompt with querying an <input>
  const binData = {hello: "world"};

  create(binName, binData) // todo: use await
    .then(res => {
      document.querySelector("#error").hidden = true;
      console.log(`Created bin ${binName} with data`, res); // fix: display to the user the content of the json and metadata
      document.getElementById("metadata").innerText = res.metadata.id;
    })
    .catch(error => {
      document.querySelector("#error").hidden = false;
      document.querySelector("#error").innerText = error;
      console.error("error creating bin: ", error);
    });
}

function saveBin() {
  const binId = document.getElementById("metadata").innerText;
  const binData = document.querySelector("#view > textarea").value;  // exercise: use "object destructuring with alias"

  update(binId, binData)
    .then(res => {
      document.querySelector("#error").hidden = true;
      console.log(`Updated bin ${binId} with data`, res); // fix: display to the user the content of the json and metadata
    })
    .catch(error => {
      document.querySelector("#error").hidden = false;
      document.querySelector("#error").innerText = error;
      console.error("error creating bin: ", error);
    });
}

// fix: dont allow deleting an empty bin
// fix: remove metadata when deleted
function deleteBin() {
  const binId = document.getElementById("metadata").innerText;

  destroy(binId)
    .then(res => {
      document.querySelector("#error").hidden = true;
      console.log(`Deleted bin ${binId} with data`, res);
    })
    .catch(error => {
      document.querySelector("#error").hidden = false;
      document.querySelector("#error").innerText = error;
      console.error("error creating bin: ", error);
    });
}