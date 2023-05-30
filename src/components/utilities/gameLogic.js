export const compareTrick = (cards, drawStack) => {

  // Determine which card was played first and which was played second
  const card1 = cards.player.isFirst ? cards.player : cards.opp;
  const card2 = !cards.player.isFirst ? cards.player : cards.opp;
  // set trump
  const trump = drawStack?drawStack[0]?.suit:null;

  //if 1 and 2 have different suits 
  if(card1.suit!=card2.suit){
    //...and 2 is not trump
    if(card2.suit!=trump){return card1}
    //...if 2 is trump
    if(card2.suit===trump){return card2}
};

  //if 1 and 2 have same suits
  if(card1.suit===card2.suit){
    //1 has a higher rank
    if(card1.rank>card2.rank){return card1}
    //2 has a higher rank
    else{return card2}
    
  }
}



export const isPlayerMoveLegal = (playerCard, playedCard, playerHand, trumpCard) => {

  const suit1 = playedCard.suit
  const rank1 = playedCard.rank
  const suit2 = playerCard.suit
  const rank2 = playerCard.rank

  

    // Check if player has suit AND didnt play it
  if ((playerHand.some(card => card.suit === suit1)) && !(suit2 === suit1)) {
    console.log("didnt play suit")
    return false;
  }

  // Check if player has a higher ranked card with same suit AND didnt play it
  if ((playerHand.some(card => (card.suit===suit1)&&(card.rank > rank1))) && !(rank2 > rank1)) {
    console.log("didnt play higher rank")
    return false
  }

  //check if there is a trump card in players hand AND didnt play it AND player doesnt have played cards suit
  if (trumpCard) {
    const suitTrump = trumpCard.suit
    const rankTrump = trumpCard.rank
    if ((playerHand.some(card => (card.suit === suitTrump)))
      && !(suit2 === suitTrump)
      && !(playerHand.some(card=>(card.suit===suit1)))){
      console.log("didnt play trump")
      return false
    }
  }
  return true;

}

const cardArray = [
  //clubs
  {rank: 11, suit: "clubs", id:"1"}, //Ace
  {rank: 10, suit: "clubs", id:"2"}, //Ten
  {rank: 4, suit: "clubs", id:"3"},  //King
  {rank: 3, suit: "clubs", id:"4"},  //Queen
  {rank: 2, suit: "clubs", id:"5"},  //Jack
  {rank: 0, suit: "clubs", id:"6"},  //Nine
   //spades
   {rank: 11, suit: "spades", id:"7"},
   {rank: 10, suit: "spades", id:"8"},
   {rank: 4, suit: "spades", id:"9"},
   {rank: 3, suit: "spades", id:"10"},
   {rank: 2, suit: "spades", id:"11"},
   {rank: 0, suit: "spades", id:"12"},
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
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  return shuffle(cardArray);
}

export const getOpponentsCard = (oppHand, playedCards, drawStack, tricks, isGameSecondPhase) => {
  //getOpponentsMove returns an object of the card that the opponent wants to play,
  //plus an object of an announcement
  console.log(isGameSecondPhase)
  //first check if opp has reached 66 points, because he will end the game then.
  



  const randomIndex = (array) => Math.floor(Math.random() * array.length);
  //playing lead or not?
  //not lead
  if (playedCards.player != null) {
    if (!isGameSecondPhase){
    const winnerCards = [];
    oppHand.forEach(card => {
      const oppCard = {...card, isFirst: false};
      //here we reuse the function from the game, to check the outcomes for each card 
      if (compareTrick({ player: playedCards.player, opp: oppCard }, drawStack) === oppCard) {
        //if game is first phase, just push all the winner cards to the array
        if(!isGameSecondPhase){
          winnerCards.push(card);
        }
        //if game is in second phase, check if a winner card is legal first, and then push it to the array
        else {
          //isPlayerMoveLegal = (playerCard, playedCard, playerHand, trumpCard)
          if (isPlayerMoveLegal(card, oppCard, oppHand, drawStack[0])) {
            winnerCards.push(card)
          }
          else {
            return null
          }
        }
        
      }
      
    });
    if(winnerCards.length>0)
    { const randomwinnercard = winnerCards[randomIndex(winnerCards)];
      return randomwinnercard}
    else
    { return oppHand[randomIndex(oppHand)] }
    }
  }

  //lead, just play a random card for now
  else{
    return oppHand[randomIndex(oppHand)];}  
}

export const calculateRoundPoints = (playerPoints, oppPoints, closingPlayer) => {
  let winner = null;
  let points = 0;
  let schneider = false;
  let schwarz = false;

  if (closingPlayer === "player") {
    if (playerPoints >= 66) {
      if (oppPoints >= 33) {
        winner = "player";
        points = 1;
      } else if (oppPoints < 33) {
        winner = "player";
        points = 2;
        schneider = true;
      } else {
        winner = "player";
        points = 3;
        schwarz = true;
      }
    } else if (playerPoints < 66 && playerPoints > oppPoints) {
      points = 2;
      winner = "opp";
    } else if (playerPoints < 66 && playerPoints <= oppPoints && oppPoints >= 66) {
      winner = "opp";
      points = 2;
    } else if (playerPoints < 66 && playerPoints <= oppPoints && oppPoints < 66) {
      winner = "opp";
      points = 3;
    } else if (playerPoints < 66 && playerPoints < oppPoints && talonClosed) {
      winner = "opp";
      points = 2;
    }
  } else if (closingPlayer === "opp") {
    if (oppPoints >= 66) {
      if (playerPoints >= 33) {
        winner = "opp";
        points = 1;
      } else if (playerPoints < 33) {
        winner = "opp";
        points = 2;
        schneider = true;
      } else {
        winner = "opp";
        points = 3;
        schwarz = true;
      }
    } else if (oppPoints < 66 && oppPoints > playerPoints) {
      winner = "player";
      points = 2;
    } else if (oppPoints < 66 && oppPoints <= playerPoints && playerPoints >= 66) {
      winner = "player";
      points = 2;
    } else if (oppPoints < 66 && oppPoints <= playerPoints && playerPoints < 66) {
      winner = "player";
      points = 3;
    } else if (oppPoints < 66 && oppPoints < playerPoints && talonClosed) {
      winner = "player";
      points = 2;
    }
  }

  return { winner, points, schneider, schwarz };
};
