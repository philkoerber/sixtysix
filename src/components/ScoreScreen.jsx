import { Button, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import useGameStore from './gameStore';
import { AnimatePresence, motion } from 'framer-motion';
import AnimateScore from './utilities/AnimateScore';
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai"

const buttonStyles = {
    maxW: "180px",
    size: "md",
    fontSize: ["18px", "19px", "20px"],
    fontFamily: "bodyFont",
    variant: "outline",
    color: "white",
    _hover: {bg: "#3E6990"}
}

function ScoreScreen(props) {

  const {
    marriages,
    talonClosed,
    tricks,
    resetGame} = useGameStore();
    
    const [trickPointsPlayer, setTrickPointsPlayer] = useState(0)
    const [trickPointsOpp, setTrickPointsOpp] = useState(0)
  
    const [marriagesPlayer, setMarriagesPlayer] = useState(0)
    const [marriagesOpp, setMarriagesOpp] = useState(0)


    
  const handleNextClick = () => {
      resetGame()
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
    console.log(playerPoints)
  },[])


    return (
        <AnimatePresence>
      <motion.div className='scoreScreenWrapper' >
          <div
            className='scoreScreen'>
            <Table
              variant='simple'
              fontFamily="bodyFont"
              marginBottom={10}>
              <Thead >
                
              <Tr >
                <Th color='white' fontSize="20">Game Points</Th>
                <Th color='white'>Player 1</Th>
                <Th color='white'>Player 2</Th>
              </Tr>
            </Thead>
            <Tbody>

                  <Tr>
                <Td fontWeight='bold'>TRICKS</Td>
                  <Td><AnimateScore>{trickPointsPlayer}</AnimateScore></Td>
                  <Td><AnimateScore>{trickPointsOpp}</AnimateScore></Td>
                </Tr>

              {/* Trick */}
              
                
              {/* Announcements */}
              <Tr>
                <Td fontWeight='bold'>MARRIAGES</Td>
                <Td><AnimateScore>{marriagesPlayer}
                  </AnimateScore></Td>
                <Td><AnimateScore>{marriagesOpp}
                  </AnimateScore></Td>
              </Tr>

              {/* Total */}
              <Tr>
                <Td fontWeight='bold'>TOTAL</Td>
                <Td><AnimateScore>{trickPointsPlayer}+{marriagesPlayer}</AnimateScore></Td>
                  <Td><AnimateScore>{trickPointsOpp}+{marriagesOpp}</AnimateScore></Td>
              </Tr>
              
              </Tbody>
              
            </Table>

            <Table variant='simple' fontFamily="bodyFont" marginBottom={10}>
            <Thead >
              <Tr >
                <Th color='white' fontSize="20">Round Points</Th>
                <Th color='white'>Player 1</Th>
                <Th color='white'>Player 2</Th>
              </Tr>
            </Thead>
              <Tbody>
                
               {/* Trick */}
              <Tr>
                <Td fontWeight='bold'>WON GAME</Td>
                <Td><AnimateScore>
                  </AnimateScore></Td>
                <Td></Td>
                </Tr>

              {/* Trick */}
              <Tr>
                <Td fontWeight='bold'>CLOSED TALON</Td>
                <Td><AnimateScore>
                  </AnimateScore></Td>
                <Td><AnimateScore>
                  </AnimateScore></Td>
                </Tr>
                
              {/* Announcements */}
              <Tr>
                <Td fontWeight='bold'>WIN DECLARED</Td>
                <Td><AnimateScore>
                  </AnimateScore></Td>
                <Td><AnimateScore>
                  </AnimateScore></Td>
              </Tr>

              {/* Total */}
              <Tr>
                <Td fontWeight='bold'>TOTAL</Td>
                <Td><AnimateScore>
                  </AnimateScore></Td>
                <Td><AnimateScore>
                  </AnimateScore></Td>
              </Tr>
              
              </Tbody>
              
            </Table>

            <Button {...buttonStyles} onClick={handleNextClick}>
            Next...
            </Button>
          </div>
           
        </motion.div>
       
    </AnimatePresence>
  
        
    );
}

export default ScoreScreen;