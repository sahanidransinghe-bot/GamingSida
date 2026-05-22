const gamesContainer = document.getElementById('gamesContainer');

const API_KEY = 'AIzaSyAqw2oE3KkW8QtJXo0hMglLWELTcQBIH4k';

async function fetchGames(){

  try{

    const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`);

    const data = await response.json();

    displayGames(data.results);

  }
  catch(error){
    console.log(error);
  }

}

function displayGames(games){

  games.forEach(game => {

    const card = document.createElement('div');

    card.classList.add('game-card');

    card.innerHTML = `
    
      <img src="${game.background_image}" alt="${game.name}">

      <div class="game-info">

        <h3>${game.name}</h3>

        <p>⭐ ${game.rating}</p>

        <div class="game-buttons">

          <button class="open-btn" onclick="openGame(${game.id})">
            Open
          </button>

          <button class="favorite-btn" onclick='saveFavorite(${JSON.stringify(game)})'>
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

fetchGames();