import React, { useEffect } from 'react';

import OppHand from './components/OppHand';
import PlayerHand from './components/PlayerHand';
import DrawStack from './components/DrawStack';
import PlayStack from './components/PlayStack';

import useGameStore from './components/gameStore';

function Game() {
    const {initializeDeck, 
        setGameInitialized, 
        playerDrawsCard, 
        setCurrentPlayer,
        tricks} = useGameStore();

    useEffect(()=>{
        //setting up game...
        const firstLeader = Math.floor(Math.random() * 2)===1?"player":"opp"
        initializeDeck();
        for(var i = 0;i < 12; i++){
            let k = i;
            setTimeout(function(){
                playerDrawsCard(k%2===1?"opp":"player");
                if(k===11){setTimeout(()=>{setGameInitialized(true),
                    setCurrentPlayer(firstLeader)},1000)};
            }, 320 * (k + 1));
        }
        
    },[])

    useEffect(()=>{
        if(tricks.length>0){
        //check if all 12 tricks has been played first
        if(tricks.length===12){
          console.log("gameOver");

            }
                else{
          //get the winner of the last trick
              const winner = tricks[tricks.length-1].winner;
               playerDrawsCard(winner);
             setTimeout(()=>{playerDrawsCard(winner==="player"?"opp":"player");
             setTimeout(()=>{setCurrentPlayer(winner)},1500)}
             , 400)
}
        }
       
    },[tricks])


    return (
        <div>
            <PlayerHand/>
            <OppHand/>
            <DrawStack/>
            <PlayStack/>
        </div>
    );
}

export default Game;