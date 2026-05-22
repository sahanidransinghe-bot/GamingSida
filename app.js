import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs
}
from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "YOUR_API_KEY",

  authDomain: "YOUR_PROJECT.firebaseapp.com",

  projectId: "YOUR_PROJECT_ID",

  storageBucket: "YOUR_PROJECT.appspot.com",

  messagingSenderId: "123456789",

  appId: "YOUR_APP_ID"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

  if(window.scrollY > 50){

    navbar.style.background = "#02040d";

  }
  else{

    navbar.style.background = "#070b1b";

  }

});

const setups = [

  {
    title:"Neon Dream",
    image:"https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1200&auto=format&fit=crop",
    tags:["PC","RGB","Minimal"],
    rating:"4.9"
  },

  {
    title:"Cyber Beast",
    image:"https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?q=80&w=1200&auto=format&fit=crop",
    tags:["Gaming","Purple","Dark"],
    rating:"4.8"
  },

  {
    title:"Red Dragon",
    image:"https://images.unsplash.com/photo-1616588589676-62b3bd9e98d1?q=80&w=1200&auto=format&fit=crop",
    tags:["FPS","RGB","Setup"],
    rating:"4.7"
  },

  {
    title:"Midnight Blue",
    image:"https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    tags:["Blue","Modern","LED"],
    rating:"4.9"
  },

  {
    title:"Forest Vibes",
    image:"https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=1200&auto=format&fit=crop",
    tags:["Green","Nature","Clean"],
    rating:"4.6"
  },

  {
    title:"Streamer Pro",
    image:"https://images.unsplash.com/photo-1629429407756-01cd3d7cfb38?q=80&w=1200&auto=format&fit=crop",
    tags:["Streaming","RGB","Ultra"],
    rating:"5.0"
  }

];

const gamesGrid = document.querySelector(".games-grid");

function displaySetups(items){

  gamesGrid.innerHTML = "";

  items.forEach(setup => {

    const card = document.createElement("div");

    card.classList.add("game-card");

    card.innerHTML = `

      <img src="${setup.image}">

      <div class="game-info">

        <div class="top-card">

          <h3>${setup.title}</h3>

          <span class="rating">
            ⭐ ${setup.rating}
          </span>

        </div>

        <div class="tags">

          ${setup.tags.map(tag => `<span>${tag}</span>`).join("")}

        </div>

        <div class="card-buttons">

          <button class="view-btn">
            VIEW
          </button>

          <button class="fav-btn">
            ❤️
          </button>

        </div>

      </div>

    `;

    const favBtn = card.querySelector(".fav-btn");

    favBtn.addEventListener("click", () => {

      saveFavorite(setup);

    });

    gamesGrid.appendChild(card);

  });

}

displaySetups(setups);

async function saveFavorite(setup){

  try{

    await addDoc(collection(db, "favorites"), {

      title: setup.title,
      image: setup.image,
      tags: setup.tags,
      rating: setup.rating

    });

    alert("Saved to Firebase ❤️");

  }
  catch(error){

    console.log(error);

  }

}

async function loadFavorites(){

  const querySnapshot = await getDocs(collection(db, "favorites"));

  querySnapshot.forEach((doc) => {

    console.log(doc.data());

  });

}

loadFavorites();

const searchInput = document.querySelector(".search-input");

if(searchInput){

  searchInput.addEventListener("input", () => {

    const value = searchInput.value.toLowerCase();

    const filtered = setups.filter(setup => {

      return (

        setup.title.toLowerCase().includes(value)

      );

    });

    displaySetups(filtered);

  });

}

const API_KEY = "YOUR_RAWG_API_KEY";

async function fetchGames(){

  try{

    const response = await fetch(

      `https://api.rawg.io/api/games?key=${API_KEY}`

    );

    const data = await response.json();

    console.log(data.results);

  }
  catch(error){

    console.log(error);

  }

}

fetchGames();