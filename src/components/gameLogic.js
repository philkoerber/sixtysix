export const compareTrick = (cards, trump, leadSuit) => {
  // Determine which card was played first and which was played second
  const card1 = cards.player.isFirst ? cards.player : cards.opp;
  const card2 = !cards.player.isFirst ? cards.player : cards.opp;

  // Check if the suit of the cards match
  if (card1.suit === card2.suit) {
    // If both cards are trump, compare their ranks
    if (card1.suit === trump) {
      if (card1.rank > card2.rank) {
        return card1;
      } else {
        return card2;
      }
    } else {
      // If neither card is trump, compare their ranks
      if (card1.rank > card2.rank) {
        return card1;
      } else {
        return card2;
      }
    }
  } else {
    // If the suits don't match, and the second card is a trump, the second card wins
    if (card2.suit === trump) {
      return card2;
    } else {
      // If the lead suit is not defined, the first played card wins
      if (!leadSuit) {
        return card1;
      } else {
        // If the lead suit is defined and the first card matches it, the first card wins
        if (card1.suit === leadSuit) {
          return card1;
        } else {
          // If the lead suit is defined and the second card matches it, the second card wins
          if (card2.suit === leadSuit) {
            return card2;
          } else {
            // If neither card matches the lead suit, the first card wins
            return card1;
          }
        }
      }
    }
  }
};

const cardArray = [
  //spades
  {rank: 11, suit: "spades", id:"1"},
  {rank: 10, suit: "spades", id:"2"},
  {rank: 4, suit: "spades", id:"3"},
  {rank: 3, suit: "spades", id:"4"},
  {rank: 2, suit: "spades", id:"5"},
  {rank: 0, suit: "spades", id:"6"},
   //clubs
   {rank: 11, suit: "clubs", id:"7"},
   {rank: 10, suit: "clubs", id:"8"},
   {rank: 4, suit: "clubs", id:"9"},
   {rank: 3, suit: "clubs", id:"10"},
   {rank: 2, suit: "clubs", id:"11"},
   {rank: 0, suit: "clubs", id:"12"},
     //hearts
  {rank: 11, suit: "hearts", id:"13"},
  {rank: 10, suit: "hearts", id:"14"},
  {rank: 4, suit: "hearts", id:"15"},
  {rank: 3, suit: "hearts", id:"16"},
  {rank: 2, suit: "hearts", id:"17"},
  {rank: 0, suit: "hearts", id:"18"},
    //diamonds
    {rank: 11, suit: "diamonds", id:"19"},
    {rank: 10, suit: "diamonds", id:"20"},
    {rank: 4, suit: "diamonds", id:"21"},
    {rank: 3, suit: "diamonds", id:"22"},
    {rank: 2, suit: "diamonds", id:"23"},
    {rank: 0, suit: "diamonds", id:"24"},
]

export const getShuffledDeck = () => {
  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  return shuffle(cardArray);
}