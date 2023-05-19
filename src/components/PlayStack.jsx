import React, { useState, useEffect } from 'react';
import Card from './Card';
import { motion } from 'framer-motion';
import useGameStore from './gameStore';
import cardPositions from './cardPositions';
import { compareTrick } from './gameLogic';


function PlayStack() {
    const {playedCards, endTrick, drawStack, setCurrentPlayer} = useGameStore();
    const [trick, setTrick] = useState({done: false, winner: null});
    const [firstCard, setFirstCard] = useState("")

    useEffect(() => {
        if(playedCards.opp?.isFirst){
            setFirstCard("opp")
        }
        else(setFirstCard("player"))
        if(playedCards.opp&&playedCards.player===null){
            setCurrentPlayer("player")
        }
        if(playedCards.player&&playedCards.opp===null){
            setCurrentPlayer("opp")
        }
        if (playedCards.opp && playedCards.player) {
        //if both players played a card, handle logic
            const trickWinner = compareTrick(playedCards, drawStack);
            
            
          const winner = playedCards.player === trickWinner ? "player" : "opp";
          setTimeout(() => {
            setTrick({ done: true, winner: winner });
            //push the current trick to the tricks array in the store and end the trick
            setTimeout(() => {
              endTrick(winner);
              setTrick({ done: false, winner: null });
            }, 1000);
            
          }, 1000);
        }
      }, [playedCards]);

    const animation = {top: trick.winner==="player"?"110%":"-20%",
    left: "45%",
    transition:{type:"spring", bounce: 0}}

    return (
        <div>
            {/* OPPONENT */}
            <motion.div 
            style={{position: "absolute",
            zIndex: firstCard==="opp"?0:1,
            }}
            animate={
                trick.done?
                {
                    ...animation
                }
                :
                {
                    ...cardPositions.oppCard
                }
            }
            >
            <Card card={playedCards?.opp} />
            </motion.div>
            {/* PLAYER */}
            <motion.div 
            style={{position: "absolute",
            zIndex: firstCard==="player"?0:1,
        }}
            animate={
                trick.done?
                {
                    ...animation
                }
                :
                {
                    ...cardPositions.playerCard
                }
            }>
            <Card card={playedCards?.player} />
            </motion.div>
        </div>
    );
}

export default PlayStack;