document.addEventListener("DOMContentLoaded", () => {

  const gamesContainer = document.querySelector('.games-grid');

  const API_KEY = '4df25c2226dd4e2e8f79e305677ef996';

  async function fetchGames(){

    try{

      const response = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}`
      );

      const data = await response.json();

      displayGames(data.results);

    }
    catch(error){

      console.log(error);

    }

  }

  function displayGames(games){

    gamesContainer.innerHTML = "";

    games.slice(0,8).forEach(game => {

      const card = document.createElement('div');

      card.classList.add('game-card');

      card.innerHTML = `
      
        <img src="${game.background_image}" alt="${game.name}">

        <div class="game-info">

          <h3>${game.name}</h3>

          <p>⭐ ${game.rating}</p>

          <div class="game-buttons">

            <button class="open-btn">
              Open
            </button>

            <button class="favorite-btn">
              ❤️
            </button>

          </div>

        </div>

      `;

      gamesContainer.appendChild(card);

    });

  }

  fetchGames();

});