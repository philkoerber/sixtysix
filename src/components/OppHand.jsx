import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import Card from "./utilities/Card";
import useGameStore from "./gameStore";

import rotateHandCard from "./utilities/rotateHandCard";
import offsetHandCard from "./utilities/offsetHandCard";

import cardPositions from "./utilities/cardPositions";
import {getOpponentsCard} from "./utilities/gameLogic"


const OppHand = ({}) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [shuffledHand, setShuffledHand] = useState([]);
  const [handcopy, setHandcopy] = useState([]);
  const {
    oppPlayerHand,
    setOppPlayerHand,
    playedCards,
    setPlayedCards,
    currentPlayer,
    setCurrentPlayer,
    drawStack,
    talonClosed} = useGameStore();

  
  useEffect(() => {
    //for animation...
    if (oppPlayerHand && selectedCard) {
      const leftHandCards = oppPlayerHand.filter((card) => card != selectedCard);
      setHandcopy(leftHandCards);
    }
  }, [selectedCard]);

  useEffect(() => {
    //for animation...
    const newHand = oppPlayerHand;
    setShuffledHand(newHand);
    setHandcopy(newHand);
  }, [oppPlayerHand]);

  
  useEffect(()=>{
    //if current player is the AI, get the card and play it
    if (currentPlayer === "opp") {
      
      const card = getOpponentsCard(
        oppPlayerHand,
        playedCards,
        drawStack,
        talonClosed || drawStack === 0,
      )
      setCurrentPlayer(null);
      setTimeout(()=>{setSelectedCard(card);},
      500)
    }

  },[currentPlayer])

  const handlePlayCard = (index) => {
    setSelectedCard(null);
    setPlayedCards(oppPlayerHand[index], "opp");
    setOppPlayerHand(handcopy);

  };



  return (
    <div className="handDiv">
      {shuffledHand.map((card, index) => (
        <motion.div
          key={card.id}
          style={{
            position: "absolute",
            ...cardPositions.drawStack,
            transform: "rotate(0deg)",
            zIndex: index+100
          }}
          className={"card"}
          animate={
            selectedCard === card
              ? {
                  animationId: "playedCard",
                  ...cardPositions.oppCard,
                  zIndex: index+100,
                  transform: `rotate(0deg)`,
                  transition: { type: "spring", bounce: 0 },
                }
              : {
                  left: `${22 +(handcopy.indexOf(card) / handcopy.length) * 40}%`,
                  top: `${-1*offsetHandCard(handcopy.length, handcopy.indexOf(card)) + -8}vh`,
                  zIndex: index+100,
                  transform: `rotate(${-1*rotateHandCard(
                    handcopy.length,
                    handcopy.indexOf(card)
                  )}deg)`,
                  transition: { type: "spring", bounce: 0 },
                }
          }
          onAnimationComplete={(e) => {
            if (selectedCard === card) {
              if (e.animationId){handlePlayCard(index)}
            }
          }}
        >
          <Card card={selectedCard === card ? card : { suit: "back" }} />
          {/* <Card card={selectedCard===card?card:card} /> */}

        </motion.div>
      ))}
    </div>
  );
};

export default OppHand;
