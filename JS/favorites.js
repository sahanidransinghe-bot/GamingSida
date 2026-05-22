function saveFavorite(game){

  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const exists = favorites.find(item => item.id === game.id);

  if(!exists){

    favorites.push(game);

    localStorage.setItem('favorites', JSON.stringify(favorites));

    alert('Added to favorites');

  }

}