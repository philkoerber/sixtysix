import React from 'react';
import Card from './Card';
import { motion } from 'framer-motion';
import { Heading } from '@chakra-ui/react';

function Marriage(props) {
    let getKingIndex = null;
    if (props.suit === "diamonds") {
        getKingIndex = 21;
    } else if (props.suit === "hearts") {
        getKingIndex = 15;
    } else if (props.suit === "spades") {
        getKingIndex = 9;
    } else {
        getKingIndex = 3;
    }
    const getQueenIndex = getKingIndex + 1;

    return (
        <div>
            <div style={{opacity:"0.3"}}>

            <motion.div
                style={{ position: "absolute" }}
                animate={{ rotate: "-10deg", x: "-30%", scale:0.75 }}>
                <Card card={{ id: getKingIndex.toString() }} />
            </motion.div>

            <motion.div
                style={{ position: "absolute" }}
                animate={{ rotate: "10deg", x: "10%", scale:0.75 }}>
                <Card card={{ id: getQueenIndex.toString() }} />
            </motion.div>
            </div>
            


            <motion.div 
                style={{position: "absolute", color:"white"}}
                initial={{y:"5vh", scale: 5}}
                animate={{scale: 1}}
            >
            <Heading textShadow="1px 1px 3px #000000" fontSize={"4.5vh"}>
                +{props.points}
            </Heading>
            </motion.div>
            
        </div>
    );
}

export default Marriage;