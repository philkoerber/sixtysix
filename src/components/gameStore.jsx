import { create } from 'zustand';
import { getShuffledDeck } from './gameLogic';




const useGameStore = create((set)=>({
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
      };
    }),

    gameInitialized: false,

    setGameInitialized: (b) => set(()=>({gameInitialized:b})),


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
      playedCards:{player: null, opp: null},
                                      
                            }))
}))

export default useGameStore;