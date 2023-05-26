import React, { useEffect } from 'react';
import useGameStore from './gameStore';
import Card from './utilities/Card';
import { motion } from "framer-motion";
import cardPositions from './utilities/cardPositions';




function DrawStack() {
    const {drawStack, playerDrawsCard, gameInitialized, isPlayerSwitchingTrumpCard} = useGameStore();

    const drawCard = (targetPlayer) => {
        playerDrawsCard(targetPlayer);
    }

    return (
        <div>
          <motion.div 
            style={{
              position: "absolute",
              ...cardPositions.drawStack,
              zIndex: 50
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1}}
          >
            {drawStack.length > 1 ? <Card card={{suit:"back"}}/> : null}
          </motion.div>
          <motion.div 
            style={{
              position: "absolute",
              ...cardPositions.drawStack,
              zIndex: 40
          }}
          initial={{opacity: 0}}
          
          animate={gameInitialized ? {
              opacity: 1,
              ...cardPositions.trumpCard,
              transform: cardPositions.trumpCard.transform,
            }:
            {
                ...cardPositions.drawStack,
                opacity: 1
            }}
            
          >
          {!isPlayerSwitchingTrumpCard
            ? gameInitialized
              ? <Card card={drawStack[0]} />
              : <Card card={{ suit: "back" }} />
            : null}
          </motion.div>

        </div>
      );
}

export default DrawStack;