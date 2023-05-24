import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Heading,
    Text,
    ModalCloseButton,
  } from '@chakra-ui/react'

const modalHeaderStyle = {
    textAlign:"left",
    fontSize: "40",
    mb: "4"
}

const modalTextStyle = {
    fontSize: "15",
    mb: "8"
}

function RulesetBody(props) {
    return (
        <ModalBody>
             
                <Heading {...modalHeaderStyle}>Goal</Heading>
            <Text {...modalTextStyle}>The goal of the game is to be the first player to reach 66 points by winning tricks in each round.</Text>
            
            
            <Heading {...modalHeaderStyle}>Players</Heading>
            <Text {...modalTextStyle}>The game is played with two players.</Text>
            <Heading {...modalHeaderStyle}>Deck</Heading>
            <Text {...modalTextStyle}>The game is played with a 24-card deck consisting of the Ace, King, Queen, Jack, Ten, and Nine cards of each suit. In total, there are 6 cards of each suit.</Text>
            <Heading {...modalHeaderStyle}>Deal</Heading>
            <Text {...modalTextStyle}>The dealer shuffles the deck and deals six cards to each player. The remaining cards are placed face down on the table to form a draw pile. The top card of the draw pile is then turned face up to start the discard pile.</Text>
            <Heading {...modalHeaderStyle}>Gameplay</Heading>
            <Text {...modalTextStyle}>The non-dealer plays the first card of the game, and the dealer must follow suit if possible. The winner of each trick leads the next trick.</Text>
            <Text {...modalTextStyle}>If a player is unable to follow suit, they can play any card. The highest card of the led suit wins the trick, unless a trump card is played. Trump cards are determined as follows:</Text>
            <Text {...modalTextStyle}>The suit of the face-up card on the discard pile becomes the trump suit for that round.
            If a player does not have a card of the led suit, they can play any trump card. If multiple trump cards are played, the highest trump card wins the trick.</Text>
            <Text {...modalTextStyle}>The winner of each trick draws a card from the draw pile and adds it to their hand. The loser of the trick leads the next trick.</Text>
            <Heading {...modalHeaderStyle}>Scoring</Heading>
            <Text {...modalTextStyle}>At the end of each round, the player who won the last trick scores 10 points. In addition, players can score points for the following:

            Winning a trick with a King: 4 points
            Winning a trick with a Ten: 10 points
            Winning all six tricks in a round: 20 points
            Reaching 66 points: game over
            If a player reaches 66 points, the game ends immediately and that player is the winner. If both players reach 66 points in the same round, the player with the higher score wins.</Text>
          </ModalBody>

    );
}

export default RulesetBody;