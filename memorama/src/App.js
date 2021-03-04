

import { cleanup } from "@testing-library/react";
import React, { useEffect, useState, useRef } from "react";
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

  //stopwatch function
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const increment = useRef(null);

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  }


  const handleStart = () => {
    setIsActive(true)
    setIsPaused(true)
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const handlePause = () => {
    clearInterval(increment.current)
    setIsPaused(false)
  }


  //Fliping logic
  const handleFlip = index => {
    setOpenCard((opened) => [...opened, index])
  }

  //open only the card which was matched

  useEffect(() => {
    const firstMatch = pairOfPokemons[openCard[0]];
    const secondMatch = pairOfPokemons[openCard[1]];

    console.log(matched.length);
    if (matched.length === 16) {
      console.log("pausando...")
      handlePause();
    }
    if (secondMatch && firstMatch.id === secondMatch.id) {
      //setMatched([...matched, firstMatch.id])
      setTimeout(() => setMatched([...matched, firstMatch.id]), 1000)
    }
    if (openCard.length === 2) setTimeout(() => setOpenCard([]), 1000);
  }, [openCard])

  return (
    <div className="app">
      <div className='stopwatch-card'>
        <p>{formatTime()}</p>
      </div>
      <div className="cards">
        {pairOfPokemons.map((pokemon, index) => {
          //flipping the cards with the css class
          let flipCard;
          flipCard = false;

          let matchedCard;
          matchedCard = false;

          //if open Cards has index of current card then open the card
          if (openCard.includes(index)) flipCard = true;

          if (matched.includes(pokemon.id)) matchedCard = true;

          return <div className={`pokemon-card ${matchedCard ? "hidden" : ""} ${flipCard ? "flipped" : ""}`}
            key={index}
            onClick={() => {
              if (!isActive) {
                handleStart();
              }

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


