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
              zIndex: 100
            }}
          >
            {drawStack.length > 1 ? <Card card={{suit:"back"}}/> : null}
          </motion.div>
          <motion.div 
            style={{
              position: "absolute",
              ...cardPositions.drawStack,
              zIndex: 0
            }}
            animate={gameInitialized?{
              ...cardPositions.trumpCard,
              transform: cardPositions.trumpCard.transform,
            }:
            {
              ...cardPositions.drawStack,
            }}
            
          >
            {!isPlayerSwitchingTrumpCard ? <Card card={drawStack[0]}/> : null}
          </motion.div>

        </div>
      );
}

export default DrawStack;