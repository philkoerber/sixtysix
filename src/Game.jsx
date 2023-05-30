import React, { useEffect, useState } from 'react';

import OppHand from './components/OppHand';
import PlayerHand from './components/PlayerHand';
import DrawStack from './components/DrawStack';
import PlayStack from './components/PlayStack';
import PlayerUI from './components/PlayerUI';

import useGameStore from './components/gameStore';
import GameStates from './components/GameStates';
import ScoreScreen from './components/ScoreScreen';
import { AnimatePresence, motion } from 'framer-motion';
import Points from './components/Points';

function Game() {
    const {
        gameCount,
        initializeDeck,
        setGameInitialized,
        gameInitialized,
        playerHand,
        playerDrawsCard,
        setCurrentPlayer,
        talonClosed,
        endRound,
        setEndRound,
        tricks
    } = useGameStore();

    const [renderKey, setRenderKey] = useState(0)
    useEffect(()=>{
        //setting up game...
        if (!gameInitialized) {
            const firstLeader = Math.floor(Math.random() * 2)===1?"player":"opp"
        initializeDeck();
        
        for(var i = 0;i < 12; i++){
            let k = i;
            setTimeout(function () {
                playerDrawsCard(k%2===1?"opp":"player");
                if(k===11){setTimeout(()=>{setGameInitialized(true),
                    setCurrentPlayer(firstLeader)},800)};
            }, 330 * (k + 1));
        }
        }
    },[gameInitialized])

    useEffect(()=>{
        if(tricks.length>0){
        //check if game ended
        if(playerHand.length===0){
            setEndRound("finished");
        }
                else{
          //get the winner of the last trick
            const winner = tricks[tricks.length - 1].winner;
            if (!talonClosed)
                    //if the talon is not closed, players are drawing their cards
               {playerDrawsCard(winner);
            setTimeout(() => {
                playerDrawsCard(winner === "player" ? "opp" : "player");
             setTimeout(()=>{setCurrentPlayer(winner)},800)}
                , 400)
            }
            else {
                //if talon closed...
                setTimeout(()=>{setCurrentPlayer(winner)},400)
            }}
        }
    }, [tricks])
    
    useEffect(() => {
        setTimeout(setGameInitialized(false),1000)
    },[gameCount])


    return (
        <div>
            
            <AnimatePresence>
                <motion.div
                    className='gameWrapper'

                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    <motion.div
                        key={gameCount} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0}}
                    >
                    {endRound?<ScoreScreen/>:null}
                    <OppHand />

                    <PlayStack />
                    <DrawStack />

                    

                    
                    <PlayerHand />

                    
                    <GameStates />
                    
                    <PlayerUI />
                    </motion.div>
                    
                    <Points/>
                    
                    
                </motion.div>
            </AnimatePresence>
                
            </div>
        
    );
}

export default Game;