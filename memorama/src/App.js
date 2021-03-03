

import { cleanup } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const url = "https://pokeres.bastionbot.org/images/pokemon"

  const [openCard, setOpenCard] = useState([]);
  const [matched, setMatched] = useState([]);

  const pokemons = [
    { id: 3, name: "Venusaur" },
    { id: 6, name: "Blastoise" },
    { id: 9, name: "Charizard" }
  ];

  //making pairs of each card
  const pairOfPokemons = [...pokemons, ...pokemons];


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
    console.log({ firstMatch });
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
              if (openCard.length < 2) handleFlip(index);
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


