const CARDS = 8;

// Peticion de pokemones al API

for (let i = 1; i <= CARDS; i++) {
  let id = getRandomId(150);
  searchPokemonById(id);
}

function getRandomId(max) {
  return Math.floor(Math.random() * max) + 1;
}
let draggableElements = document.querySelector(".draggable-elements");
let droppableElements = document.querySelector(".droppable-elements");

let pokemonSearched = [];
let pokemonNames = [];
async function searchPokemonById(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const data = await res.json();
  //Arreglos con las imagenes de los pokemones
  pokemonSearched.push(data);
  //Arreglo con los nombres de los pokemones
  pokemonNames.push(data.name);

  //Desordenamos el arreglo de los nombres de los pokemones
  pokemonNames = pokemonNames.sort(() => Math.random() - 0.5);

  //Dibujando los pokemones
  draggableElements.innerHTML = "";
  pokemonSearched.forEach((pokemon) => {
    draggableElements.innerHTML += `
    <div class="pokemon">
        <img id="${pokemon.name}" draggable="true" class="image" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="pokemon">
    </div>
    `;
  });

  //Insertando nombres de los pokemones
  droppableElements.innerHTML = "";
  pokemonNames.forEach((names) => {
    droppableElements.innerHTML += `
    <div class="names">
        <p>${names}</p>
    </div>
`;
  });

  let pokemons = document.querySelectorAll(".image");
  //Transformamos el nodelist en un arreglo
  pokemons = [...pokemons];
  pokemons.forEach((pokemon) => {
    pokemon.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text", event.target.id);
    });
  });

  let names = document.querySelectorAll(".names");
  let loseMsg = document.querySelector(".lose");
  let point = 0;
  names = [...names];
  names.forEach((name) => {
    name.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    name.addEventListener("drop", () => {
      const draggableElementData = event.dataTransfer.getData("text");
      let pokemonElement = document.querySelector(`#${draggableElementData}`)
      if (event.target.innerText == draggableElementData) {
        console.log('SI')
        point++
        event.target.innerHTML = ''
        event.target.appendChild(pokemonElement)
        loseMsg.innerHTML = "";

        if (point == CARDS ){
            draggableElements.innerHTML = `<p class="win"> GANASTE!!! </p>`;
        }

      } else {
        console.log('NO')
        loseMsg.innerHTML = "upss!!";
      }
    });
  });
}
