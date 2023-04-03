import twoclubs from "./cardpngs/2_of_clubs.png";
import threeclubs from "./cardpngs/3_of_clubs.png";
import fourclubs from "./cardpngs/4_of_clubs.png";
import fiveclubs from "./cardpngs/5_of_clubs.png";
import sixclubs from "./cardpngs/6_of_clubs.png";
import sevenclubs from "./cardpngs/7_of_clubs.png";
import eightclubs from "./cardpngs/8_of_clubs.png";
import nineclubs from "./cardpngs/9_of_clubs.png";
import tenclubs from "./cardpngs/10_of_clubs.png";
import jackclubs from "./cardpngs/jack_of_clubs.png";
import queenclubs from "./cardpngs/queen_of_clubs.png";
import kingclubs from "./cardpngs/king_of_clubs.png";
import aceclubs from "./cardpngs/ace_of_clubs.png";

import twospades from "./cardpngs/2_of_spades.png";
import threespades from "./cardpngs/3_of_spades.png";
import fourspades from "./cardpngs/4_of_spades.png";
import fivespades from "./cardpngs/5_of_spades.png";
import sixspades from "./cardpngs/6_of_spades.png";
import sevenspades from "./cardpngs/7_of_spades.png";
import eightspades from "./cardpngs/8_of_spades.png";
import ninespades from "./cardpngs/9_of_spades.png";
import tenspades from "./cardpngs/10_of_spades.png";
import jackspades from "./cardpngs/jack_of_spades.png";
import queenspades from "./cardpngs/queen_of_spades.png";
import kingspades from "./cardpngs/king_of_spades.png";
import acespades from "./cardpngs/ace_of_spades.png";

import twohearts from "./cardpngs/2_of_hearts.png";
import threehearts from "./cardpngs/3_of_hearts.png";
import fourhearts from "./cardpngs/4_of_hearts.png";
import fivehearts from "./cardpngs/5_of_hearts.png";
import sixhearts from "./cardpngs/6_of_hearts.png";
import sevenhearts from "./cardpngs/7_of_hearts.png";
import eighthearts from "./cardpngs/8_of_hearts.png";
import ninehearts from "./cardpngs/9_of_hearts.png";
import tenhearts from "./cardpngs/10_of_hearts.png";
import jackhearts from "./cardpngs/jack_of_hearts.png";
import queenhearts from "./cardpngs/queen_of_hearts.png";
import kinghearts from "./cardpngs/king_of_hearts.png";
import acehearts from "./cardpngs/ace_of_hearts.png";

import twodiamonds from "./cardpngs/2_of_diamonds.png";
import threediamonds from "./cardpngs/3_of_diamonds.png";
import fourdiamonds from "./cardpngs/4_of_diamonds.png";
import fivediamonds from "./cardpngs/5_of_diamonds.png";
import sixdiamonds from "./cardpngs/6_of_diamonds.png";
import sevendiamonds from "./cardpngs/7_of_diamonds.png";
import eightdiamonds from "./cardpngs/8_of_diamonds.png";
import ninediamonds from "./cardpngs/9_of_diamonds.png";
import tendiamonds from "./cardpngs/10_of_diamonds.png";
import jackdiamonds from "./cardpngs/jack_of_diamonds.png";
import queendiamonds from "./cardpngs/queen_of_diamonds.png";
import kingdiamonds from "./cardpngs/king_of_diamonds.png";
import acediamonds from "./cardpngs/ace_of_diamonds.png";

import back from "./cardpngs/back.png";

const getCardPng = (card) => {
  if(card){
    const id = card.id;
    // back_____________________________
    if (card.suit === "back") {
      return back;
    }
    // clubs_______________________________________________
    if(id==="1"){return aceclubs}
    if(id==="2"){return tenclubs}
    if(id==="3"){return kingclubs}
    if(id==="4"){return queenclubs}
    if(id==="5"){return jackclubs}
    if(id==="6"){return nineclubs}
    
    // spades____________________________________
    if(id==="7"){return acespades}
    if(id==="8"){return tenspades}
    if(id==="9"){return kingspades}
    if(id==="10"){return queenspades}
    if(id==="11"){return jackspades}
    if(id==="12"){return ninespades}
    
    // hearts_______________________________________________
    if(id==="13"){return acehearts}
    if(id==="14"){return tenhearts}
    if(id==="15"){return kinghearts}
    if(id==="16"){return queenhearts}
    if(id==="17"){return jackhearts}
    if(id==="18"){return ninehearts}
    
    // diamonds_______________________________________________
  
    if(id==="19"){return acediamonds}
    if(id==="20"){return tendiamonds}
    if(id==="21"){return kingdiamonds}
    if(id==="22"){return queendiamonds}
    if(id==="23"){return jackdiamonds}
    if(id==="24"){return ninediamonds}
    
    
  }
  
};
export default getCardPng;
