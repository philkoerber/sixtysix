import { Box, Button, ButtonGroup, Heading, Icon, IconButton, SimpleGrid } from '@chakra-ui/react';
import { motion } from 'framer-motion';


import React, { useEffect, useState } from 'react';
import useGameStore from './gameStore';
import { BsFillSuitSpadeFill, BsFillSuitClubFill, BsFillSuitHeartFill, BsFillSuitDiamondFill } from "react-icons/bs";


const buttonStyles = {
    size: "md",
    fontSize: "17px",
    variant: "outline",
    color: "white"
}

function PlayerUI() {
    const {
        currentPlayer,
        talonClosed,
        setTalonClosed,
        endRound,
        drawStack,
        setEndRound,
        playerHand,
        gameInitialized,
        marriages,
        setMarriages,
        setIsPlayerSwitchingTrumpCard} = useGameStore();

    //marriage possible is an array containing the suits strings
    const [marriagePossible, setMarriagePossible] = useState([]);
    const [enabledMarriageButtons, setEnabledMarriageButtons] = useState([])
    
    const [switchPossible, setSwitchPossible] = useState(false)
    const [closeTalonPossible, setCloseTalonPossible] = useState(false)

    const handleTalonClick = () => {
        setCloseTalonPossible(false)
        setTalonClosed("player") 
    }

    const handleEndRoundClick = () => {
        setEndRound("player")
    }

    const handleMarriageClick = (marriageSuit) => {
        setMarriages("player", {suit: marriageSuit, points: "+40"})
    }

    const handleSwitchClick = () => {
        setSwitchPossible(false)
        setIsPlayerSwitchingTrumpCard("player")
    }

    //this is checking if there is a possible marriage on the hand of the player
    useEffect(() => {
        if (gameInitialized) {
            setMarriagePossible([])
            if (currentPlayer === "player")
            {
                
            if (drawStack.length > 0) {
            playerHand.map((card) => {
            if (card.rank === 3) {
                const queenSuit = card.suit;
                playerHand.map((card2) => {
                    if (card2.rank === 4 && card2.suit === card.suit) {
                        if (marriagePossible && marriagePossible.includes(queenSuit)) {
                            return;
                        } else {
                            setMarriagePossible(prevState => prevState ? [...prevState, queenSuit] : [queenSuit]);
                        }
                    }
                });
            }
        });
        }
                }
            
    }
    }, [currentPlayer]);
    
    useEffect(() => {
        const newEnabledButtons = [];
        marriagePossible.forEach((marriage) => {
            if (marriages.player.some(mar => mar.suit === marriage)) {
            return null
            }
            else { newEnabledButtons.push(marriage) }})
        setEnabledMarriageButtons(newEnabledButtons)
    }, [marriagePossible, marriages])
    


    //BUTTONS
    useEffect(() => {
        setCloseTalonPossible(false)
        if (currentPlayer === "player") {
            if (!talonClosed||(drawStack.length>0)) {
                setCloseTalonPossible(true)
            }
            const foundNine = playerHand.find(card => card.rank === 0)
        if (foundNine) {
            if (drawStack[0]?.suit === foundNine.suit) {
                setSwitchPossible(true)
            }
        }
        }
        else{setSwitchPossible(false)}
        } 
        , [currentPlayer])
    
    useEffect(() => {
        if(endRound)
        {
            setCloseTalonPossible(false);
            setEnabledMarriageButtons([]);
            setSwitchPossible(false)
        }
        
    },[endRound])


    return (
        <>
        <div style={{ position: "absolute", top: "76%", left: "50%", transform: "translateX(-50%)",  zIndex: 20}}>
            <ButtonGroup>
                  
                    <Button {...buttonStyles}
                    isDisabled={!closeTalonPossible}
                    onClick={() => {handleTalonClick() }}
                >Close Talon</Button>

                    <Button {...buttonStyles} 
                        isDisabled={endRound||!(currentPlayer==="player")||!gameInitialized}
                onClick={()=>{handleEndRoundClick()}}
                >End Game</Button>
                
                    <Button {...buttonStyles} 
                        isDisabled={!switchPossible}
                onClick={()=>{handleSwitchClick()}}
                >Switch Trump Card</Button>

                    <ButtonGroup {...buttonStyles} 
                        onClick={() => { }}
                        isAttached>
                        <IconButton isDisabled={!enabledMarriageButtons.includes("diamonds")} onClick={()=>{handleMarriageClick("diamonds")}} icon={<BsFillSuitDiamondFill/>} fontSize={"25px"} color={"red"}/>
                        <IconButton isDisabled={!enabledMarriageButtons.includes("spades")} onClick={()=>{handleMarriageClick("spades")}} icon={<BsFillSuitSpadeFill/>} fontSize={"25px"} color={"black"}/>
                        <IconButton isDisabled={!enabledMarriageButtons.includes("hearts")} onClick={()=>{handleMarriageClick("hearts")}} icon={<BsFillSuitHeartFill/>} fontSize={"25px"} color={"red"}/>
                        <IconButton isDisabled={!enabledMarriageButtons.includes("clubs")} onClick={()=>{handleMarriageClick("clubs")}} icon={<BsFillSuitClubFill/>} fontSize={"25px"} color={"black"}/>
                    </ButtonGroup>
            </ButtonGroup>    
           
    
            </div>           
        </>
        
    );
}

export default PlayerUI;