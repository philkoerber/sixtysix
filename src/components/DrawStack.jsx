import React, { useEffect } from 'react';
import useGameStore from './gameStore';
import Card from './Card';
import { motion } from "framer-motion";
import cardPositions from './cardPositions';




function DrawStack() {
    const {drawStack, playerDrawsCard, gameInitialized} = useGameStore();

    const drawCard = (targetPlayer) => {
        playerDrawsCard(targetPlayer);
    }

    return (
        <div>
          <motion.div 
            style={{
              position: "absolute",
              ...cardPositions.drawStack,
              zIndex: 1
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
            {true ? <Card card={drawStack[0]}/> : null}
          </motion.div>

        </div>
      );
}

export default DrawStack;