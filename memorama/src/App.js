

import { cleanup } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import "./styles.css";

const url = "https://pokeres.bastionbot.org/images/pokemon"

const pokemons = [
  { id: 3, name: "Venusaur" },
  { id: 6, name: "Blastoise" },
  { id: 9, name: "Charizard" },
  { id: 100, name: "Voltorb" },
  { id: 135, name: "Joltreon" },
  { id: 72, name: "Tentacool" },
  { id: 37, name: "Vulpix" },
  { id: 10, name: "Caterpie" },
  { id: 149, name: "Dragonite" },
  { id: 61, name: "Poliwhirl" },
  { id: 66, name: "Machop" },
  { id: 127, name: "Pinsir" },
  { id: 146, name: "Moltres" },
  { id: 111, name: "Rhyhorn" },
  { id: 142, name: "Aerodactyl" },
  { id: 151, name: "Mew" },
];

//making pairs of each card and random the content
const randomizer = () => {
  let returnable = [...pokemons, ...pokemons];
  for (let i = 0; i < returnable.length; i++) {
    let temp = returnable[i];
    let randomIndex = Math.floor(Math.random() * (returnable.length - i)) + i;
    returnable[i] = returnable[randomIndex];
    returnable[randomIndex] = temp;
  }
  return returnable;
}

const pairOfPokemons = randomizer();

let index1 = undefined, index2 = undefined;

export default function App() {


  const [openCard, setOpenCard] = useState([]);
  const [matched, setMatched] = useState([]);


  const handleFlip = index => {
    setOpenCard((opened) => [...opened, index])
  }

  //open only the card which was matched

  useEffect(() => {
    const firstMatch = pairOfPokemons[openCard[0]];
    const secondMatch = pairOfPokemons[openCard[1]];

    if (secondMatch && firstMatch.id === secondMatch.id) {
      setMatched([...matched, firstMatch.id])
    }
    if (openCard.length === 2) setTimeout(() => setOpenCard([]), 1000);
  }, [openCard])

  return (
    <div className="app">
      <div className="cards">
        {pairOfPokemons.map((pokemon, index) => {
          //flipping the cards with the css class
          let flipCard;
          flipCard = false;

          //if open Cards has index of current card then open the card
          if (openCard.includes(index)) flipCard = true;

          if (matched.includes(pokemon.id)) flipCard = true;

          return <div className={`pokemon-card ${flipCard ? "flipped" : ""}`}
            key={index}
            onClick={() => {
              if (openCard.length < 2) {
                if (index1 === undefined) {
                  index1 = index;
                  handleFlip(index);
                }
                else if (index2 === undefined) {
                  index2 = index;
                  if (index2 != index1) {
                    handleFlip(index);
                    index1 = index2 = undefined;
                  }
                  else {
                    console.log("No cheating");
                    index2 = undefined;
                  }
                }
              }
            }}
          >
            <div className="inner">
              <div className="front">
                <img src={`${url}/${pokemon.id}.png`} alt="pokemon" width="100" />
              </div>
              <div className="back">

              </div>
            </div>

          </div>
        })}
      </div>
    </div>
  );
}


