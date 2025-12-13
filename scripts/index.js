const body = document.querySelector("body[theme]");
const breedsList = document.querySelector("#breeds-list");
const carousel = document.querySelector("#carousel");
const themeToggleButton = document.querySelector("#theme-toggle-button");
const urlParams = new URLSearchParams(window.location.search);


async function fetchBreeds() {
  const response = await fetch('./db/breeds.json');
  return await response.json();
}


function toggleTheme() {
  if (body.getAttribute("theme") == "dark") {
    body.setAttribute("theme", "light");
  } else {
    body.setAttribute("theme", "dark");
  }
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


function breedsCarousel() {
  carousel.innerHTML = "";
  fetchBreeds().then(data => {
    for (let i = 0; i < 2; i++) {
      for (const breed in data) {
        const card = `<li class="card"><img src="./assets/cats/${breed}.png" title="${breed}"><span class="overlay">${breed}</span></li>`;
        carousel.insertAdjacentHTML("beforeend", card);
      }
    }
  })
}


function homePage() {
  window.location.href = `/index.html?theme=${body.getAttribute("theme")}`;
}


function setupHook() {
  const themeParam = urlParams.get("theme");
  if ((themeParam != null) && ["dark", "light"].includes(themeParam.toString().toLowerCase())) {
    body.setAttribute("theme", urlParams.get("theme").toLowerCase());
  }
  listBreeds();
  breedsCarousel();
}


setupHook();