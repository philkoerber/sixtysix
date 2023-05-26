import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import Card from "./utilities/Card";
import useGameStore from "./gameStore";

import rotateHandCard from "./utilities/rotateHandCard";
import offsetHandCard from "./utilities/offsetHandCard";

import cardPositions from "./utilities/cardPositions";
import { isPlayerMoveLegal } from "./utilities/gameLogic";

const PlayerHand = () => {

  const [selectedCard, setSelectedCard] = useState(null);
  const [sortedHand, setSortedHand] = useState([])
  const [handcopy, setHandcopy] = useState([]);

  const {
    playerHand,
    setPlayerHand,
    playedCards,
    setPlayedCards,
    currentPlayer,
    setCurrentPlayer,
    isPlayerSwitchingTrumpCard,
    setIsPlayerSwitchingTrumpCard,
    talonClosed,
    drawStack,
    drawTrumpCard} = useGameStore();

  
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
    //only for animation purposes
    if (playerHand && selectedCard) {
      const leftHandCards = sortedHand.filter((card) => card != selectedCard);
      setHandcopy(leftHandCards);
    }
  }, [selectedCard]);

  useEffect(() => {
    if (isPlayerSwitchingTrumpCard === "player") {
      const findNine = playerHand.find(card => card.rank === 0);
      if (findNine && isPlayerSwitchingTrumpCard) {
        drawTrumpCard("player");
        setTimeout(() => {
          setSelectedCard(findNine);
        }, 600);
        
    }
    }
  },[isPlayerSwitchingTrumpCard])

    const handleClick = (card) => {
      if (currentPlayer === "player" && !isPlayerSwitchingTrumpCard) {
        if (talonClosed || drawStack === 0) {
          const playedCardByOpp = playedCards?.opp
          if (playedCardByOpp) {
            if (isPlayerMoveLegal(card, playedCardByOpp, playerHand, drawStack[0])) {
              setCurrentPlayer(null)
              setSelectedCard(card)
            }
            else {
              console.log("your move is illegal!")
              return null
            }
          }
          
        }
        setCurrentPlayer(null);
        setSelectedCard(card)
      }
      else{console.log("you cannot play a card now!")}
  }
  
  const handlePlayCard = (card) => {
    if (!isPlayerSwitchingTrumpCard) {
      setSelectedCard(null);
    setPlayedCards(card, "player");
    setPlayerHand(handcopy);
    }
    else {
      setIsPlayerSwitchingTrumpCard(false, card);
      setPlayerHand(handcopy)
    }
    
  };
  
  return (
    <div className="handDiv">
      {sortedHand.map((card, index) => (
        <motion.div
          key={card.id}
          style={{
            position: "absolute",
            ...cardPositions.drawStack,
          }}
          initial={{transform: (!isPlayerSwitchingTrumpCard?"rotate(0deg)":"rotate(90deg)")}}
          onClick={() => handleClick(card)}
          className={"card"}
          animate={
            selectedCard === card
              ? {
                  animationId: "playedCard",
                  ...((!isPlayerSwitchingTrumpCard)?cardPositions.playerCard:cardPositions.trumpCard),
                  zIndex: (!isPlayerSwitchingTrumpCard)?index+100:5,
                  transform: (!isPlayerSwitchingTrumpCard)?`rotate(0deg)`:`rotate(90deg)`,
                  transition: { type: "spring", bounce: 0 },
                }
              : {
                  left: `${24.5 +(handcopy.indexOf(card) / handcopy.length) * 50}%`,
                  top: `${offsetHandCard(handcopy.length, handcopy.indexOf(card)) + 87}vh`,
                  scale: 1.2,
                  zIndex: (!isPlayerSwitchingTrumpCard?index+100:index+10),
                  transform: `rotate(${rotateHandCard(
                    handcopy.length,
                    handcopy.indexOf(card)
                  )}deg)`,
                  transition: { type: "spring", bounce: 0.1 },
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
