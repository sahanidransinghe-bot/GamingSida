const gamesContainer = document.getElementById('gamesContainer');

const searchInput = document.getElementById('searchInput');

const API_KEY = '4df25c2226dd4e2e8f79e305677ef996';

let allGames = [];

async function fetchGames(){

  try{

    const response = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}`
    );

    const data = await response.json();

    allGames = data.results;

    displayGames(allGames);

  }
  catch(error){

    console.log(error);

  }

}

function displayGames(games){

  gamesContainer.innerHTML = '';

  games.forEach(game => {

    const card = document.createElement('div');

    card.classList.add('game-card');

    card.innerHTML = `
    
      <img src="${game.background_image}" alt="${game.name}">

      <div class="game-info">

        <div class="top-card">

          <h3>${game.name}</h3>

          <span class="rating">
            ⭐ ${game.rating}
          </span>

        </div>

        <div class="tags">

          ${
            game.genres
            .slice(0,2)
            .map(genre => `<span>${genre.name}</span>`)
            .join('')
          }

        </div>

        <div class="card-buttons">

          <button
            class="view-btn"
            onclick="openGame(${game.id})"
          >
            View
          </button>

          <button class="fav-btn">
            ❤️
          </button>

        </div>

      </div>

    `;

    gamesContainer.appendChild(card);

  });

}

function openGame(id){

  window.location.href = `details.html?id=${id}`;

}

searchInput.addEventListener('input', () => {

  const value = searchInput.value.toLowerCase();

  const filteredGames = allGames.filter(game => {

    return game.name.toLowerCase().includes(value);

  });

  displayGames(filteredGames);

});

fetchGames();

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

  if(window.scrollY > 50){

    navbar.style.background = "#02040d";

  }
  else{

    navbar.style.background = "#070b1b";

  }

});

const menuBtn = document.querySelector(".menu-btn");

const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

  navLinks.classList.toggle("active");

});