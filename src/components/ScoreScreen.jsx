import { Box, Heading, Text, SimpleGrid, Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import useGameStore from './gameStore';
import { AnimatePresence, motion } from 'framer-motion';


function ScoreScreen(props) {
  const {
    marriages,
    talonClosed,
    tricks,
    resetGame} = useGameStore();
    
    const [trickPointsPlayer, setTrickPointsPlayer] = useState(0)
    const [trickPointsOpp, setTrickPointsOpp] = useState(0)

    useEffect(() => {
  const updatePoints = (trick) => {
    const trickPoints = Number(trick.player.rank) + Number(trick.opp.rank);
    if (trick.winner === "player") {
      setTrickPointsPlayer((prevPoints) => prevPoints + trickPoints);
    } else {
      setTrickPointsOpp((prevPoints) => prevPoints + trickPoints);
    }
  };

  const timeoutFunctions = tricks.map((trick, i) => {
    return () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          updatePoints(trick);
          resolve();
        }, 300 * (i + 1));
      });
    };
  });

  Promise.all(timeoutFunctions.map((fn) => fn())).then(() => {
    
  });
    }, []);
    
    const animateStyles = {
        initial: { opacity: 0, scale: 2, y: "-20px" },
        animate: { opacity: 1, scale: 1, y: "0px" },
    }

  const handleNextClick = () => {
      resetGame()
    }


    return (
        <AnimatePresence>
            <motion.div className='scoreScreenWrapper'>
                <div className='scoreScreen'>
            
                    {/* HEADING */}
                    <motion.div key={""} {...animateStyles}>
                    <SimpleGrid columns={2}>
                <Heading>You</Heading>
                 <Heading>Opponent</Heading>
                </SimpleGrid>

                    </motion.div>
                

            {/* MARRIAGES */}
            <motion.div key={"marriages"} {...animateStyles}>
              <Heading>Marriages</Heading>
                <SimpleGrid columns={2}>
                <Box>
              {marriages.player.map((marriage, i)=>{return(
              <div key={i}>
             <Text>{marriage.suit} {marriage.points}</Text>
                 </div>
                  )})}
                      </Box>
                  <Box>
                  {marriages.opp.map((marriage, i)=>{return(
               <div key={i}>
               <Text>{marriage.suit} {marriage.points}</Text>
              </div>
                     )})}
  </Box>
                
                </SimpleGrid>

              
            </motion.div>
                
            <motion.div  key={"tricks"} {...animateStyles}>
                    <Heading>Tricks</Heading>
                {/* POINTS FROM TRICKS */}
                <SimpleGrid columns={2}>
                        <Box>
                            <motion.div key={trickPointsPlayer + "player"} {...animateStyles}>
                             <Text>
                            {trickPointsPlayer}
                            </Text>
                            </motion.div>
                           
                    </Box>
                        <Box>
                            <motion.div key={trickPointsOpp + "opp"} {...animateStyles}>
                             <Text>
                            {trickPointsOpp}
                            </Text>
                            </motion.div>
                        
                </Box>
     </SimpleGrid>

            </motion.div>
                
  
                {/* TALON CLOSED? */}
                <Heading>{talonClosed?"Talon closed...":null}</Heading>
                <SimpleGrid columns={2}>
                
                    <Box>{talonClosed === "player"
                        ?
                        <>
                            <Text>...by player</Text>
                        <Text></Text>
                        </>
                        
                        : null}</Box>
                    <Box>{talonClosed === "opp" ? "...by opponent" : ""}</Box>
            </SimpleGrid>
            
              <Button onClick={()=>{handleNextClick()}} fontSize="25px" size={"md"} variant={"outline"}>Next...</Button>
                    
        </div>
                    
        </motion.div>
        

        </AnimatePresence>
        
        
    );
}

export default ScoreScreen;