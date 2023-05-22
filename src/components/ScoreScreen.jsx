import { Box, Button, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import useGameStore from './gameStore';
import { AnimatePresence, motion } from 'framer-motion';

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
    console.log("counting done")
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
                <Th color={'white'}>Player 2</Th>
              </Tr>
            </Thead>
            <Tbody>

              {/* Trick */}
              <Tr>
                <Td fontWeight='bold'>TRICKS</Td>
                <Td>10</Td>
                <Td>8</Td>
                </Tr>
                
              {/* Announcements */}
              <Tr>
                <Td fontWeight='bold'>MARRIAGES</Td>
                <Td>20</Td>
                <Td>40</Td>
              </Tr>

              {/* Total */}
              <Tr>
                <Td fontWeight='bold'>TOTAL</Td>
                <Td>56</Td>
                <Td>42</Td>
              </Tr>
              
              </Tbody>
              
            </Table>

            <Table variant='simple' fontFamily="bodyFont" marginBottom={10}>
            <Thead >
              <Tr >
                <Th color='white' fontSize="20">Round Points</Th>
                <Th color='white'>Player 1</Th>
                <Th color={'white'}>Player 2</Th>
              </Tr>
            </Thead>
              <Tbody>
                
               {/* Trick */}
              <Tr>
                <Td fontWeight='bold'>WON GAME</Td>
                <Td>0</Td>
                <Td>0</Td>
                </Tr>

              {/* Trick */}
              <Tr>
                <Td fontWeight='bold'>CLOSED TALON</Td>
                <Td>0</Td>
                <Td>0</Td>
                </Tr>
                
              {/* Announcements */}
              <Tr>
                <Td fontWeight='bold'>WIN DECLARED</Td>
                <Td>0</Td>
                <Td>0</Td>
              </Tr>

              {/* Total */}
              <Tr>
                <Td fontWeight='bold'>TOTAL</Td>
                <Td>3</Td>
                <Td>0</Td>
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