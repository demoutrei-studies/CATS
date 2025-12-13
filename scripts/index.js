const breedsList = document.querySelector("#breeds-list");
const carousel = document.querySelector("#carousel");
const themeToggleButton = document.querySelector("#theme-toggle-button");


async function fetchBreeds() {
  const response = await fetch('./db/breeds.json');
  return await response.json();
}


function toggleTheme() {
  const body = document.querySelector("body[theme]");
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
      const breedItem = `<li>${breed}</li>`;
      breedsList.insertAdjacentHTML("beforeend", breedItem);
    }
  })
}


function breedsCarousel() {
  carousel.innerHTML = "";
  fetchBreeds().then(data => {
    for (let i = 0; i < 2; i++) {
      for (const breed in data) {
        const card = `<div class="card"><img src="../assets/cats/${breed}.png" title="${breed}"><span class="overlay">${breed}</span></div>`;
        carousel.insertAdjacentHTML("beforeend", card);
      }
    }
  })
}


function setupHook() {
  listBreeds();
  breedsCarousel();
}


setupHook();