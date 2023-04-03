import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import Card from "./Card";
import useGameStore from "./gameStore";

import rotateHandCard from "./rotateHandCard";

import cardPositions from "./cardPositions";


const OppHand = ({}) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const {oppPlayerHand, setOppPlayerHand, setPlayedCards, setCurrentPlayer} = useGameStore();
  const [shuffledHand, setShuffledHand] = useState([]);
  const [handcopy, setHandcopy] = useState([]);
  
  useEffect(() => {
    if (oppPlayerHand && selectedCard) {
      const leftHandCards = oppPlayerHand.filter((card) => card != selectedCard);
      setHandcopy(leftHandCards);
    }
  }, [selectedCard]);

  useEffect(() => {
    const newHand = oppPlayerHand;
    setShuffledHand(newHand);
    setHandcopy(newHand);
  }, [oppPlayerHand]);

  

  const handleClick = (card) => {
      setCurrentPlayer("player");
      setSelectedCard(card)};

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
            zIndex: index+11
          }}
          onClick={() => handleClick(card)}
          className={"card"}
          animate={
            selectedCard === card
              ? {
                  animationId: "playedCard",
                  ...cardPositions.oppCard,
                  zIndex: index+10,
                  transform: `rotate(0deg)`,
                  transition: { type: "spring", bounce: 0 },
                }
              : {
                  left: `${20 +(handcopy.indexOf(card) / handcopy.length) * 50}vw`,
                  top: "-2vh",
                  zIndex: index+10,
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
          <Card card={{suit: "back"}} />
        </motion.div>
      ))}
    </div>
  );
};

export default OppHand;
