import React from 'react';
import { motion, AnimatePresence } from "framer-motion"
import { Heading } from '@chakra-ui/react';
import useGameStore from './gameStore';

function Points() {

    const { playerPoints } = useGameStore()
    
    return (
        <div style={{height: "100%", width: "100%"}}>
            <AnimatePresence>
            {/* POINTS */}
                <motion.div
                    key={playerPoints.opp + "opp"}
                    style={{ marginTop: "15vh", position: "absolute", right: "3%" }}
                    initial={{ y: "-150px", opacity: 0 }}
                    animate={{ y: "0px", opacity: 1 }}
                    exit={{ y: "150px", opacity: 0 }}>
                    <Heading
                        fontFamily="cardFont"
                        textShadow="1px 1px 5px #000000"
                        fontSize={["80", "100"]}
                        color={'white'}>{playerPoints.opp}</Heading>
                </motion.div>

                <motion.div
                    key={playerPoints.player + "player"}
                    style={{ marginTop: "70vh", position: "absolute", right: "3%"}}
                    initial={{ y: "-150px", opacity: 0 }}
                    animate={{ y: "0px", opacity: 1 }}
                    exit={{ y: "150px", opacity: 0 }}>
                    <Heading
                        fontFamily="cardFont"
                        textShadow="1px 1px 5px #000000"
                        fontSize={["80", "100"]}
                        color={'white'}>{playerPoints.player}</Heading>
                </motion.div>

        </AnimatePresence>
        </div>
    );
}

export default Points;