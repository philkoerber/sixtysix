import { create } from 'zustand';
import { getShuffledDeck } from './utilities/gameLogic';

// const testTricks = [
//     {
//         "player": {
//             "rank": 11,
//             "suit": "hearts",
//             "id": "13",
//             "isFirst": true
//         },
//         "opp": {
//             "rank": 4,
//             "suit": "hearts",
//             "id": "15",
//             "isFirst": false
//         },
//         "winner": "player"
//     },
//     {
//         "player": {
//             "rank": 11,
//             "suit": "spades",
//             "id": "1",
//             "isFirst": true
//         },
//         "opp": {
//             "rank": 10,
//             "suit": "hearts",
//             "id": "14",
//             "isFirst": false
//         },
//         "winner": "opp"
//     },
//     {
//         "player": {
//             "rank": 2,
//             "suit": "hearts",
//             "id": "17",
//             "isFirst": false
//         },
//         "opp": {
//             "rank": 4,
//             "suit": "diamonds",
//             "id": "21",
//             "isFirst": true
//         },
//         "winner": "player"
//     },
//     {
//         "player": {
//             "rank": 2,
//             "suit": "clubs",
//             "id": "11",
//             "isFirst": true
//         },
//         "opp": {
//             "rank": 3,
//             "suit": "clubs",
//             "id": "10",
//             "isFirst": false
//         },
//         "winner": "opp"
//     },
//     {
//         "player": {
//             "rank": 0,
//             "suit": "diamonds",
//             "id": "24",
//             "isFirst": false
//         },
//         "opp": {
//             "rank": 10,
//             "suit": "diamonds",
//             "id": "20",
//             "isFirst": true
//         },
//         "winner": "opp"
//     },
//     {
//         "player": {
//             "rank": 3,
//             "suit": "diamonds",
//             "id": "22",
//             "isFirst": false
//         },
//         "opp": {
//             "rank": 2,
//             "suit": "diamonds",
//             "id": "23",
//             "isFirst": true
//         },
//         "winner": "player"
//     }
// ]

const testTricks = []


const useGameStore = create((set)=>({
    gameStarted: true,
    setGameStarted: (boolean) => set(()=>({gameStarted: boolean})),

    gameInitialized: false,
    setGameInitialized: (b) => set(()=>({gameInitialized:b})),

    //GAME MECHANICS

    playerHand: [],
    setPlayerHand: (newPlayerHand) => set(()=>({playerHand:newPlayerHand})),

    oppPlayerHand: [],
    setOppPlayerHand: (newOppPlayerHand) => set(()=>({oppPlayerHand:newOppPlayerHand})),

    drawStack: [],
    setDrawStack: (newDrawStack) => set(()=>({drawStack:newDrawStack})),

    currentPlayer: null,
    setCurrentPlayer: (newCurrentPlayer) => set(()=>({currentPlayer: newCurrentPlayer})),
    tricks: [],
    
    initializeDeck: () =>
    set((state) => {
      const deck = getShuffledDeck();
      return {
        drawStack: deck,
        talonClosed: false
      };
    }),

    playerDrawsCard: (targetPlayer) =>
    set((state) => {
      const newHand = state[targetPlayer === "player" ? "playerHand" : "oppPlayerHand"].slice();
      if (state.drawStack.length > 0) {
        newHand.push(state.drawStack[state.drawStack.length - 1]);
      }
      return {
        [targetPlayer === "player" ? "playerHand" : "oppPlayerHand"]: newHand,
        drawStack: state.drawStack.slice(0, state.drawStack.length - 1),
      };
    }),

    playedCards: { player: null, opp: null },

    setPlayedCards: (card, player) =>
    
    set((state) => {
    //to keep track which card was played first...
    const isFirst = (state.playedCards.player===null)&&(state.playedCards.opp===null)?true:false
    
    return {
      playedCards: {
        ...state.playedCards,
        [player]: {
          rank: card.rank,
          suit: card.suit,
          id: card.id,
          isFirst: isFirst

        }
      }
    }
  }),

    endTrick: (winner)=>set((state)=>({
      tricks: [...state.tricks, {...state.playedCards, winner}],
      playedCards: { player: null, opp: null },
    })),
    
  isPlayerSwitchingTrumpCard: false,

  setIsPlayerSwitchingTrumpCard: (player, switchedCard) => set((state) => {
    const newDrawStack = [...state.drawStack];
    if(switchedCard)
    {newDrawStack[0] = switchedCard;}
    return {
      isPlayerSwitchingTrumpCard: player,
      drawStack: newDrawStack
    }
  }),
  
  drawTrumpCard: (player, switchedCard) => set((state) => {
    if(player==="player")
      return {
        playerHand: [...state.playerHand, state.drawStack[0]],
      }
    else {
      return {
      }
    }
  }),

      //GAME STATES

    playerPoints: {player: 0, opp: 0},
    setPlayerPoints: (player, gainedPoints) => set((state) => ({
      playerPoints: {
        ...state.playerPoints,
        [player]: state.playerPoints[player] + gainedPoints
      }
    })),

    // talon closed or not, false if it is not closed, contains player string from the player who closed it
    talonClosed: false,
    setTalonClosed: (player)=>set(()=>({talonClosed: player})),

    marriages: {player: [], opp:[]},
    setMarriages: (player, marriage) => set((state) => ({
      marriages: {
          ...state.marriages,
          [player]: [...state.marriages[player], marriage]
      }
    })),
    
  endRound: false,
  setEndRound: (player) => set(() => ({ endRound: player })),
  
  //End Game

  resetGame: () => set(() => ({
    gameInitialized: false,
    playerHand: [],
    oppPlayerHand: [],
    drawStack: [],
    playedCards: [],
    currentPlayer: null,
    playedCards: [],
    talonClosed: false,
    marriages: { player: [], opp: [] },
    endRound: false
  }))
    
}))

export default useGameStore;