import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heading } from '@chakra-ui/react';
import useGameStore from './gameStore';
import Marriage from './utilities/Marriage';

function GameStates(props) {
    const {
        talonClosed,
        marriages
    } = useGameStore();

    return (
        <div style={{ height: "100%", width: "100%", position: "absolute", top: "0"}} >

            <AnimatePresence>

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
                        initial={{ x: `${(index * -20 + 72)}%`, y: "60vh" }}>
                        <Marriage suit={marriage.suit} points={marriage.points} />
                    </motion.div>
                ))}




            </AnimatePresence>

        </div>

    );
}

export default GameStates;