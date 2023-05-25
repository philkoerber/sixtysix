import { Box, Button, Divider, Flex, SimpleGrid, Spacer, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import useGameStore from './gameStore';
import { AnimatePresence, motion } from 'framer-motion';
import { calculateRoundPoints } from './utilities/gameLogic';
// import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai"

const getAnimationProps = (index) => {
  return ({
    initial: { opacity: 0, translateY: 10 },
    animate: { opacity: 1, translateY: 0 },
    transition: {delay: index*0.4, duration: 0.6}})
}

const boxStyles = {
  fontFamily: "bodyFont",
}

const dividerStyles = {
  marginY: "1.5%"
}

function ScoreScreen(props) {

  const {
    marriages,
    talonClosed,
    setPlayerPoints,
    tricks,
    resetGame,
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



    
  const handleNextClick = () => {
    resetGame()
  };

  const handleAnimationComplete = () => {
    roundPoints.winner
      ? setTimeout(setPlayerPoints(roundPoints.winner, roundPoints.points), 800)
      : null;
  }

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
  
 
    return (
        <AnimatePresence>
      <motion.div className='scoreScreenWrapper' {...getAnimationProps(0)}>
          <div
            className='scoreScreen'>
            <div>
              
                <motion.div {...getAnimationProps(1)}>
                  <Flex {...boxStyles} fontWeight={"bold"} fontSize={26}>
                    <Box flex={2}>Game Points</Box>
                    <Box textAlign={"center"} flex={1}>You</Box>
                    <Box textAlign={"center"} flex={2}>Opponent</Box>
                  </Flex>
                </motion.div>

                <Divider {...dividerStyles} />

                <motion.div {...getAnimationProps(2)}>
                  <Flex {...boxStyles} fontWeight={"bold"}>
                    <Box flex={2}>Tricks</Box>
                    <Box textAlign={"center"} flex={1}>{trickPointsPlayer}</Box>
                    <Box textAlign={"center"} flex={2}>{trickPointsOpp}</Box>
                  </Flex>
                </motion.div>

                <Divider {...dividerStyles} />
                
                <motion.div {...getAnimationProps(3)}>
                  <Flex {...boxStyles} fontWeight={"bold"}>
                    <Box flex={2}>Marriages</Box>
                    <Box textAlign={"center"} flex={1}>{marriagesPlayer}</Box>
                    <Box textAlign={"center"} flex={2}>{marriagesOpp}</Box>
                  </Flex>
                </motion.div>

                <Divider {...dividerStyles} />
                
                <motion.div {...getAnimationProps(4)}>
                  <Flex {...boxStyles} fontWeight={"bold"}>
                    <Box flex={2}>Total</Box>
                    <Box textAlign={"center"} flex={1}>{marriagesPlayer + trickPointsPlayer}</Box>
                    <Box textAlign={"center"} flex={2}>{marriagesOpp + trickPointsOpp}</Box>
                  </Flex>
                </motion.div>


                <motion.div {...getAnimationProps(5)}>
                  <Flex {...boxStyles} fontWeight={"bold"} fontSize={26} marginTop={8}>
                    <Box flex={1}>Round Points</Box>
                    <Box textAlign="center" flex={2}>{roundPoints.winner==="player"?"You":"Opponent"}</Box>
                  </Flex>
                </motion.div>

                <Divider {...dividerStyles} />

                <motion.div {...getAnimationProps(6)}>
                  <Flex {...boxStyles} fontWeight={"bold"}>
                    <Box flex={1}>Game Won</Box>
                    <Box textAlign="center" flex={2}>1</Box>
                  </Flex>
                </motion.div>

                <Divider {...dividerStyles} />

                <motion.div {...getAnimationProps(7)}>
                  <Flex {...boxStyles} fontWeight={"bold"}>
                    <Box flex={1}>Scheider</Box>
                    <Box textAlign="center" flex={2}>{roundPoints.schneider ? "1" : "0"}</Box>
                  </Flex>
                </motion.div>

                <Divider {...dividerStyles} />

                <motion.div {...getAnimationProps(8)}>
                  <Flex {...boxStyles} fontWeight={"bold"}>
                    <Box flex={1}>Schwarz</Box>
                    <Box textAlign="center" flex={2}>{roundPoints.schwarz ? "1" : "0"}</Box>
                  </Flex>
                </motion.div>

                <Divider {...dividerStyles} />

                <motion.div {...getAnimationProps(9)} onAnimationComplete={()=>{handleAnimationComplete()}}>
                  <Flex {...boxStyles} fontWeight={"bold"} fontSize={"26"}>
                    <Box flex={1}>Total</Box>
                    <Box textAlign="center" flex={2}>{roundPoints.points}</Box>
                  </Flex>
                </motion.div>

            </div>
          </div>
           
        </motion.div>
       
    </AnimatePresence>
  
        
    );
}

export default ScoreScreen;