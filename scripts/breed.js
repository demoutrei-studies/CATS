const body = document.querySelector("body[theme]");
const breedsList = document.querySelector("#breeds-list");
const urlParams = new URLSearchParams(window.location.search);


async function fetchBreeds() {
  const response = await fetch('./db/breeds.json');
  return await response.json();
}


function homePage() {
  window.location.href = `/?theme=${body.getAttribute("theme")}`;
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
}


setupHook();