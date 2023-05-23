import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, Heading, Box } from '@chakra-ui/react';
import useGameStore from './gameStore';
import Marriage from './utilities/Marriage';

function GameStates(props) {
    const {
        playerPoints,
        talonClosed,
        marriages
    } = useGameStore();

    return (
        <div className='gameStateWrapper' >

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
                        fontSize={["100", "120", "130"]}
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
                        fontSize={["100", "110", "130"]}
                        color={'white'}>{playerPoints.player}</Heading>
                </motion.div>


                {/* TALON CLOSED OR NOT? */}
                <motion.div
                    key={talonClosed}
                    className='talonClosed'
                    initial={{ opacity: 0, scale: 3 }}
                    animate={talonClosed ? { opacity: 1, scale: 1, rotate: -38 } : {}}
                    exit={{ opacity: 0 }}
                >
                    <Heading
                        fontFamily="cardFont"
                        textShadow="1px 1px 10px #000000"
                        fontSize={["38", "45", "50"]}>
                        CLOSED!</Heading>
                </motion.div>

                {/* MARRIAGES */}

                <>
                    {/* opponentmarriages */}
                    {marriages.opp.map((marriage, index) => (
                        <motion.div
                            style={{ position: "relative" }}
                            key={marriage.suit + index}
                            initial={{ x: `${(index * 20 + 13)}%`, y: "20vh" }}>
                            <Marriage suit={marriage.suit} points={marriage.points} />
                        </motion.div>

                    ))}
                    {/* playermarriages */}
                </>

                {marriages.player.map((marriage, index) => (
                    <motion.div
                        style={{ position: "relative" }}
                        key={marriage.suit + index}
                        initial={{ x: `${(index * -20 + 72)}%`, y: "63vh" }}>
                        <Marriage suit={marriage.suit} points={marriage.points} />
                    </motion.div>
                ))}




            </AnimatePresence>

        </div>

    );
}

export default GameStates;