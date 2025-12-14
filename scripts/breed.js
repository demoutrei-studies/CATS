const body = document.querySelector("body[theme]");
const breedDescriptionElement = document.querySelector("#breed-description");
const breedsList = document.querySelector("#breeds-list");
const breedNameElement = document.querySelector("#breed-name");
const image = document.querySelector("#image");
const tableContent = document.querySelector("#table-content");
const urlParams = new URLSearchParams(window.location.search);


async function displayInformation(breedName) {
  const breeds = await fetchBreeds();
  const breed = breeds[breedName];
  breedNameElement.textContent = breedName;
  breedDescriptionElement.innerHTML = breed["description"]? breed["description"] : "<i>No description provided.</i>";
  if (breed["common_nicknames"] != undefined) {
    const commonNicknamesTemplate = `<tr><th>Common Nicknames</th><td>${breed["common_nicknames"].join(", ")}</td></tr>`;
    tableContent.insertAdjacentHTML("beforeend", commonNicknamesTemplate);
  }
  if (breed["origin"] != undefined) {
    const originTemplate = `<tr><th>Origin</th><td>${breed["origin"]}</td></tr>`;
    tableContent.insertAdjacentHTML("beforeend", originTemplate);
  }
  if (breed["alternative_names"] != undefined) {
    const alternativeNamesTemplate = `<tr><th>Alternative Names</th><td>${breed["alternative_names"].join(", ")}</td></tr>`;
    tableContent.insertAdjacentHTML("beforeend", alternativeNamesTemplate);
  }
  if (breed["foundation_bloodstock"] != undefined) {
    const foundationBloodstockTemplate = `<tr><th>Foundation Bloodstock</th><td>${breed["foundation_bloodstock"]}</td></tr>`;
    tableContent.insertAdjacentHTML("beforeend", foundationBloodstockTemplate);
  }
  if (breed["breed_status"] != undefined) {
    const breedStatusTemplate = `<tr><th>Breed status</th><td>${breed["breed_status"]}</td></tr>`;
    tableContent.insertAdjacentHTML("beforeend", breedStatusTemplate);
  }
  if (breed["variety_status"] != undefined) {
    const varietyStatusTemplate = `<tr><th>Variety Status</th><td>${breed["variety_status"]}</td></tr>`;
    tableContent.insertAdjacentHTML("beforeend", varietyStatusTemplate);
  }
  if (breed["notes"] != undefined) {
    const notesTemplate = `<tr><th>Notes</th><td>${breed["notes"]}</td></tr>`;
    tableContent.insertAdjacentHTML("beforeend", notesTemplate);
  }
}


function displayImage(breedName) {
  image.src = `./assets/cats/${breedName}.png`;
}


async function fetchBreeds() {
  const response = await fetch('./db/breeds.json');
  return await response.json();
}


function homePage() {
  window.location.href = `./?theme=${body.getAttribute("theme")}`;
}


function listBreeds() {
  breedsList.innerHTML = "";
  fetchBreeds().then(data => {
    for (const breed in data) {
      const breedItem = `<li onclick="loadBreedPage('${breed}')">${breed}</li>`;
      breedsList.insertAdjacentHTML("beforeend", breedItem);
    }
  })
}


function loadBreedPage(breedName) {
  window.location.href = `breed.html?theme=${body.getAttribute("theme")}&breed=${breedName}`;
}


function toggleTheme() {
  if (body.getAttribute("theme") == "dark") {
    body.setAttribute("theme", "light");
  } else {
    body.setAttribute("theme", "dark");
  }
}


async function setupHook() {
  const themeParam = urlParams.get("theme");
  const breedName = urlParams.get("breed");
  const breeds = await fetchBreeds();
  if (!Object.keys(breeds).includes(breedName)) {
    window.location.href = `/?theme=${body.getAttribute("theme")}`;
  }
  document.title = urlParams.get("breed").toString();
  if ((themeParam != null) && ["dark", "light"].includes(themeParam.toString().toLowerCase())) {
    body.setAttribute("theme", urlParams.get("theme").toLowerCase());
  }
  listBreeds();
  displayImage(breedName);
  displayInformation(breedName);
}


setupHook();