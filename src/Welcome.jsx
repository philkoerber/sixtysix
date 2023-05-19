import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, Stack, Text, Divider } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

import { useDisclosure } from '@chakra-ui/react';
import useGameStore from './components/gameStore';
import { motion, transform } from 'framer-motion';
import sixtysix from "./components/sixtysix.svg"
import RulesetBody from './components/RulesetBody';


const modalHeaderStyle = {
    textAlign:"left",
    fontSize: "40",
    mb: "4"
}

const modalTextStyle = {
    fontSize: "15",
    mb: "8"
}


function Welcome(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {setGameStarted} = useGameStore();
    const [animationIndex ,setAnimationIndex] = useState(0)

    useEffect((()=>{
        setTimeout(()=>{setAnimationIndex(1)},800)
        setTimeout(()=>{setAnimationIndex(2)},1500)
        setTimeout(()=>{setAnimationIndex(3)},2100)
    }),[])


    const handleStartButton = () => {
        setGameStarted(true);
    }
 
    return (
        <div className='welcomewrapper'>
            <Box fontFamily={"revert-layer"}>

                
                <motion.div className='welcome'>
                  <Text>welcome to...</Text>
                  <Heading textShadow="1px 1px 30px #000000" letterSpacing={40} fontSize={"80"}>SIXTYSIX</Heading>
                  <motion.div initial={{scale: 0}} animate={animationIndex>0?{scale: 1}:{}} onClick={handleStartButton} whileHover={{ scale: 1.4 }} whileTap={{ scale: 0.9 }}
     style={{margin: "50px"}}><Text textShadow="1px 1px 3px #000000" fontSize={"30"}>Play!</Text></motion.div>
                <motion.img className="sixtysixSvg"
                initial={{ opacity: 0, scale: 0.9, backdropFilter: "blur(50px)"}}
                animate={{ opacity: 1, scale: 1.3 }}
                transition={{ duration: 8 }} src={sixtysix} />
                </motion.div>
                
                
      {/* RULESET MODAL */}
      <motion.div onClick={onOpen} whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }} className="welcome" initial={{scale: 0}} animate={animationIndex>1?{rotate: -6, scale: 1, x: "-40%"}:{}}>
                <Text textShadow="1px 1px 3px #000000">Dont know the Rules?</Text>
                <Text textShadow="1px 1px 3px #000000" fontSize={32}>Read the Rules...</Text>
                </motion.div>

      
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay bg='blackAlpha.200'
      backdropFilter='blur(10px)'/>
        <ModalContent maxW={"800px"} bgGradient="linear(to-t, #a0a7d1, #e1e1f5)">
          <ModalHeader >Rules of Sixty-Six</ModalHeader>
          <ModalCloseButton />
          <RulesetBody/>
          <ModalFooter bg='alpha.200' backdropFilter='blur(10px)'>
            <Button onClick={handleStartButton} variant='blackAlpha'>Start the game</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    
    {/* CONTACT ME MODAL */}
      <motion.div whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }} className="welcome" initial={{scale: 0}} animate={animationIndex>2?{rotate: 12, scale: 1, x: "30%"}:{}}><Text textShadow="1px 1px 3px #000000">You like the App?</Text>
    <Text textShadow="1px 1px 3px #000000" fontSize={32}>Contact me!</Text></motion.div>
    
            </Box>
        </div>
    );
}

export default Welcome;