import { Button, Flex, ButtonGroup, IconButton, HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useGameStore from './gameStore';
import { BsFillSuitSpadeFill, BsFillSuitClubFill, BsFillSuitHeartFill, BsFillSuitDiamondFill, BsArrowRepeat } from "react-icons/bs";
import { FaRegFlag, } from "react-icons/fa";
import {AiOutlineCloseCircle} from "react-icons/ai"


const buttonStyles = {
    size: "sm",
    fontSize: ["10px", "14px", "16px"],
    fontFamily: "bodyFont",
    variant: "outline",
    color: "white",
    bg: "#2e2c62",
    _hover: {bg: "#4e5296"}
}

const marriageButtonStyles = {
    size: "sm",
    variant: "outline",
    color: "white",
}

function PlayerUI() {
    const {
        gameCount,
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
        let points = 20
        if (drawStack[0]) {
            if (marriageSuit === drawStack[0].suit) {
                
                points = 40
            }
        }
        setMarriages("player", {suit: marriageSuit, points: points})
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
            <HStack
                position={"absolute"}
            top={"75%"}
            left={"50%"}
        transform={"translateX(-50%)"} >
            <ButtonGroup
                isAttached
            top={"65%"}>
<Button
                    {...buttonStyles}
                    leftIcon={<AiOutlineCloseCircle fontSize={20}/>}
        isDisabled={!closeTalonPossible}
        onClick={() => { handleTalonClick() }}
      >
        Close Talon
      </Button>

                
                
                <Button
                    {...buttonStyles}
                     leftIcon={<BsArrowRepeat fontSize={20}/>}
        isDisabled={!switchPossible}
        onClick={() => { handleSwitchClick() }}
      >
        Trump Card
                </Button>
                
                
       
  
            
          
   
                <Button
                    {...buttonStyles}
                    leftIcon={<FaRegFlag fontSize={16} />}
        isDisabled={endRound || !(currentPlayer === "player") || !gameInitialized}
        onClick={() => { handleEndRoundClick() }}
      >
        End Game
                </Button>

      
                
            </ButtonGroup>

                    <ButtonGroup
                {...marriageButtonStyles}>
        <IconButton
          isDisabled={!enabledMarriageButtons.includes("diamonds")}
          onClick={() => { handleMarriageClick("diamonds") }}
          icon={<BsFillSuitDiamondFill />}
          fontSize="25px"
          color="red"
        />
        <IconButton
          isDisabled={!enabledMarriageButtons.includes("spades")}
          onClick={() => { handleMarriageClick("spades") }}
          icon={<BsFillSuitSpadeFill />}
          fontSize="25px"
          color="black"
        />
        <IconButton
          isDisabled={!enabledMarriageButtons.includes("hearts")}
          onClick={() => { handleMarriageClick("hearts") }}
          icon={<BsFillSuitHeartFill />}
          fontSize="25px"
          color="red"
        />
        <IconButton
          isDisabled={!enabledMarriageButtons.includes("clubs")}
          onClick={() => { handleMarriageClick("clubs") }}
          icon={<BsFillSuitClubFill />}
          fontSize="25px"
          color="black"
                    />
      </ButtonGroup>
                </HStack>
);
}

export default PlayerUI;