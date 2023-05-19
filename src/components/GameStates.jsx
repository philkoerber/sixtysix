import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, Heading, Box } from '@chakra-ui/react';
import useGameStore from './gameStore';
import Marriage from './Marriage';

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
                    style={{ marginTop: "15vh" }}
                    className='gamePoints'
                    initial={{ y: "-150px", opacity: 0 }}
                    animate={{ y: "0px", opacity: 1 }}
                    exit={{ y: "150px", opacity: 0 }}>
                    <Heading textShadow="1px 1px 5px #000000" fontSize={"12vh"}>{playerPoints.opp}</Heading>
                </motion.div>

                <motion.div
                    key={playerPoints.player + "player"}
                    style={{ marginTop: "70vh" }}
                    className='gamePoints'
                    initial={{ y: "-150px", opacity: 0 }}
                    animate={{ y: "0px", opacity: 1 }}
                    exit={{ y: "150px", opacity: 0 }}>
                    <Heading textShadow="1px 1px 5px #000000" fontSize={"12vh"}>{playerPoints.player}</Heading>
                </motion.div>


                {/* TALON CLOSED OR NOT? */}
                <motion.div
                    key={talonClosed}
                    className='talonClosed'
                    initial={{ opacity: 0, scale: 3 }}
                    animate={talonClosed ? { opacity: 1, scale: 1, rotate: -38 } : {}}
                    exit={{ opacity: 0 }}
                >
                    <Heading textShadow="1px 1px 10px #000000" fontSize={"5vh"}>CLOSED!</Heading>
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