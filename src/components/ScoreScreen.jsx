import { Box, Button, Divider, Flex} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import useGameStore from './gameStore';
import { AnimatePresence, motion } from 'framer-motion';
import { calculateRoundPoints } from './utilities/gameLogic';
// import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai"

const getAnimationProps = (index) => {
  return ({
    initial: { opacity: 0, translateY: 10 },
    animate: { opacity: 1, translateY: 0 },
    transition: {delay: index*0.6, duration: 0.5}})
}

const boxStyles = {
  fontFamily: "bodyFont",
  fontSize: "14"
}

const dividerStyles = {
  marginY: "1.5%",
  variant: "dashed"
}

const buttonStyles = {
  margin: "auto",
  marginTop: "8",
    maxW: "180px",
    size: "md",
    fontSize: ["14px", "15px", "16px"],
    fontFamily: "bodyFont",
    variant: "outline",
    color: "white",
    bg: "#2e2c62",
    _hover: {bg: "#4e5296"}
}

function ScoreScreen(props) {

  const {
    gameCount,
    marriages,
    playerPoints,
    setPlayerPoints,
    tricks,
    resetGame,
    endGame,
    gameEnded,
    endRound} = useGameStore();
    
    const [trickPointsPlayer, setTrickPointsPlayer] = useState(0)
    const [trickPointsOpp, setTrickPointsOpp] = useState(0)
  
    const [marriagesPlayer, setMarriagesPlayer] = useState(0)
    const [marriagesOpp, setMarriagesOpp] = useState(0)
    const [roundPoints, setRoundPoints] = useState(
    {
      winner: null,
      points: 0,
      schneider: false,
      schwarz: false
      })
  
    const [disableButton, setDisableButton] = useState(true)



    
  const handleNextClick = () => {
    if (playerPoints.player > 6 || playerPoints.opp > 6) {
      return null
    }
    else {
      resetGame();
    }
  };

  const handleAnimationComplete = () => {
    roundPoints.winner
      ? setTimeout(() => {
        setPlayerPoints(roundPoints.winner, roundPoints.points);
        setDisableButton(false);
      }, 800)
      : null;
  }

  useEffect(() => {
    if (playerPoints.player > 6 || playerPoints.opp > 6) {
      endGame()
    }
    else {
      
    }
  },[playerPoints])

  useEffect(() => {
    let oppPoints = 0;
    tricks.map((trick) => { if (trick.winner === "opp") { oppPoints = oppPoints + trick.opp.rank + trick.player.rank } })
    setTrickPointsOpp(oppPoints)

    let playerPoints = 0;
    tricks.map((trick) => { if (trick.winner === "player") { playerPoints = playerPoints + trick.opp.rank + trick.player.rank } })
    setTrickPointsPlayer(playerPoints)

    oppPoints = 0;
    marriages.opp.map((marriage) => { oppPoints = oppPoints + marriage.points });
    setMarriagesOpp(oppPoints);

    playerPoints = 0;
    marriages.player.map((marriage) => { playerPoints = playerPoints + marriage.points });
    setMarriagesPlayer(playerPoints);
  }, [])

  useEffect(() => {
    const winnerPoints = calculateRoundPoints(trickPointsPlayer+marriagesPlayer, trickPointsOpp+marriagesOpp, endRound);
    setRoundPoints(winnerPoints);
  }, [trickPointsPlayer, trickPointsOpp, marriagesOpp, marriagesPlayer])

  useEffect(() => {
    
  },[playerPoints])
  
 
    return (
        <AnimatePresence>
      <motion.div className='scoreScreenWrapper' {...getAnimationProps(0)}>
          <div
            className='scoreScreen'>
            <div>
              {gameEnded ?
                (<div>hi</div>)
                :
                (
                  <>
                    <motion.div {...getAnimationProps(0)}>
                <Flex>
                  <Box margin={"auto"} marginBottom={4} fontSize={"30"} fontFamily={"cardFont"}>
                    Game {gameCount+1} finished...
                  </Box>
                </Flex>
                </motion.div>
              
                <motion.div {...getAnimationProps(1)}>
                  <Flex {...boxStyles} fontSize={24} fontFamily={"cardFont"}>
                    <Box flex={2}>Game Points</Box>
                    <Box textAlign={"center"} flex={1}>You</Box>
                    <Box textAlign={"center"} flex={2}>Opponent</Box>
                  </Flex>
                </motion.div>

                <Divider {...dividerStyles} />

                <motion.div {...getAnimationProps(2)}>
                  <Flex {...boxStyles}>
                    <Box flex={2}>Tricks</Box>
                    <Box textAlign={"center"} flex={1}>{trickPointsPlayer}</Box>
                    <Box textAlign={"center"} flex={2}>{trickPointsOpp}</Box>
                  </Flex>
                </motion.div>

                <Divider {...dividerStyles} />
                
                <motion.div {...getAnimationProps(3)}>
                  <Flex {...boxStyles}>
                    <Box flex={2}>Marriages</Box>
                    <Box textAlign={"center"} flex={1}>{marriagesPlayer}</Box>
                    <Box textAlign={"center"} flex={2}>{marriagesOpp}</Box>
                  </Flex>
                </motion.div>

                <Divider {...dividerStyles}/>
                
                <motion.div {...getAnimationProps(4)}>
                  <Flex {...boxStyles} fontSize={24} fontFamily={"cardFont"}>
                    <Box flex={2}>Total</Box>
                    <Box textAlign={"center"} flex={1}>{marriagesPlayer + trickPointsPlayer}</Box>
                    <Box textAlign={"center"} flex={2}>{marriagesOpp + trickPointsOpp}</Box>
                  </Flex>
                </motion.div>


                <motion.div {...getAnimationProps(5)}>
                  <Flex {...boxStyles} fontSize={24} fontFamily={"cardFont"} marginTop={8}>
                    <Box flex={1}>Round Points</Box>
                    <Box textAlign="center" flex={2}>Winner: {roundPoints.winner==="player"?"You":"Opponent"}</Box>
                  </Flex>
                </motion.div>

                <Divider {...dividerStyles} />

                <motion.div {...getAnimationProps(6)}>
                  <Flex {...boxStyles}>
                    <Box flex={1}>Game Won</Box>
                    <Box textAlign="center" flex={2}>1</Box>
                  </Flex>
                </motion.div>

                <Divider {...dividerStyles} />

                <motion.div {...getAnimationProps(7)}>
                  <Flex {...boxStyles}>
                    <Box flex={1}>Scheider</Box>
                    <Box textAlign="center" flex={2}>{roundPoints.schneider ? "1" : "0"}</Box>
                  </Flex>
                </motion.div>

                <Divider {...dividerStyles} />

                <motion.div {...getAnimationProps(8)}>
                  <Flex {...boxStyles}>
                    <Box flex={1}>Schwarz</Box>
                    <Box textAlign="center" flex={2}>{roundPoints.schwarz ? "1" : "0"}</Box>
                  </Flex>
                </motion.div>

                <Divider {...dividerStyles} />

                <motion.div {...getAnimationProps(9)} onAnimationComplete={()=>{handleAnimationComplete()}}>
                  <Flex {...boxStyles} fontSize={24} fontFamily={"cardFont"}>
                    <Box flex={1}>Total</Box>
                    <Box textAlign="center" flex={2}>{roundPoints.points}</Box>
                  </Flex>
              </motion.div>
              
              <motion.div {...getAnimationProps(12)}>
                <Flex>
                  <Button onClick={() => { handleNextClick() }}
                    
                    {...buttonStyles}
                    isDisabled={disableButton}
                    >Next...</Button>
                  </Flex>
              </motion.div>
                </>)
            }
              

            </div>
          </div>
           
        </motion.div>
       
    </AnimatePresence>
  
        
    );
}

export default ScoreScreen;