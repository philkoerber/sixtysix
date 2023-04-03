import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import Card from "./Card";
import useGameStore from "./gameStore";

import rotateHandCard from "./rotateHandCard";

import cardPositions from "./cardPositions";


const currentPlayer = -1;


const PlayerHand = () => {

  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const {playerHand, setPlayerHand, setPlayedCards, currentPlayer, setCurrentPlayer} = useGameStore();
  const [sortedHand, setSortedHand] = useState([])
  const [handcopy, setHandcopy] = useState([]);

  
  useEffect(() => {
    const sortedHand = [...playerHand].sort((a, b) => {
      if (a.suit < b.suit) return -1;
      if (a.suit > b.suit) return 1;
      if (a.rank < b.rank) return -1;
      if (a.rank > b.rank) return 1;
      return 0;
    });
    // update the state with the sorted hand
    setSortedHand(sortedHand);
    setHandcopy(sortedHand)
  }, [playerHand]);

  useEffect(() => {
    if (playerHand && selectedCard) {
      const leftHandCards = sortedHand.filter((card) => card != selectedCard);
      setHandcopy(leftHandCards);
    }
  }, [selectedCard]);


  

  const handleClick = (card) => {
      if(currentPlayer==="player"){
        setCurrentPlayer("opp");
        setSelectedCard(card)
      }
      else{console.log("not your turn!")}
    }

      

  const handlePlayCard = (card) => {
    setSelectedCard(null);
    setPlayedCards(card, "player");
    setPlayerHand(handcopy);
  };
  


  return (
    <div className="handDiv">
      {sortedHand.map((card, index) => (
        <motion.div
          key={card.id}
          style={{
            position: "absolute",
            ...cardPositions.drawStack,
            transform: "rotate(0deg)",
          }}
          onClick={() => handleClick(card)}
          className={"card"}
          onHoverStart={()=>setHoveredCard(card)}
          onHoverEnd={()=>setHoveredCard(null)}
          animate={
            selectedCard === card
              ? {
                  animationId: "playedCard",
                  ...cardPositions.playerCard,
                  zIndex: index+10,
                  transform: `rotate(0deg)`,
                  transition: { type: "spring", bounce: 0 },
                }
              : {
                  left: `${20 +(handcopy.indexOf(card) / handcopy.length) * 40}vw`,
                  top: "88vh",
                  zIndex: index+10,
                  transform: `rotate(${rotateHandCard(
                    handcopy.length,
                    handcopy.indexOf(card)
                  )}deg)`,
                  transition: { type: "spring", bounce: 0 },
                }
            
          }
          onAnimationComplete={(e) => {
            if (selectedCard === card) {
              if (e.animationId){handlePlayCard(card)}
            }
          }}
        >
          <Card card={card} />
        </motion.div>
      ))}
    </div>
  );
};

export default PlayerHand;
