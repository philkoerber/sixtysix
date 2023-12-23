import React from 'react';
import { motion, AnimatePresence } from "framer-motion"
import { Text, Box, VStack, StackDivider } from '@chakra-ui/react';
import useGameStore from './gameStore';

function Points() {

    const { playerPoints } = useGameStore()
    
    return (
        <div style={{height: "100%", width: "100%"}}>
            <AnimatePresence>
                <Box
                    position={"absolute"}
                    height={"30%"}
                    width={"200px"}
                    right={"0px"}
                    top={"50%"}
                    transform={"translateY(-50%)"}
                    rounded={"5px"}
                    color={"#FFFCF2"}
                    padding={"20px"}
                    
                >
                    <VStack
                        fontSize={["8vh", "10vh", "12vh"]}
                        justifyContent={"center"}
                        fontFamily={"cardFont"}
                        height={"100%"}>
                        <Box
                            textAlign={"right"}
                            width={"100%"}>
                            <motion.div 
                            key={"opp" + playerPoints.opp}
                            initial={{opacity: 0, y: 100}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -100}}>
                                {playerPoints.opp}
                            </motion.div>
                            
                        </Box>
                        <Text
                            fontFamily={"bodyFont"}
                            textAlign={"right"}
                            width={"100%"}
                            fontSize={["14", "16", "18"]}>...first to 7</Text>
                        <Box
                            textAlign={"right"}
                            width={"100%"}>
                        <motion.div 
                        key={"player" + playerPoints.player}
                        initial={{opacity: 0, y: 100}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -100}}>
                                {playerPoints.player}
                            </motion.div>
                        </Box>
                    </VStack>
                    

                </Box>
            {/* POINTS */}
                

        </AnimatePresence>
        </div>
    );
}

export default Points;