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

const preloadedCardImages = {};

const cardImages = {
  "1": aceclubs,
  "2": tenclubs,
  "3": kingclubs,
  "4": queenclubs,
  "5": jackclubs,
  "6": nineclubs,
  "7": acespades,
  "8": tenspades,
  "9": kingspades,
  "10": queenspades,
  "11": jackspades,
  "12": ninespades,
  "13": acehearts,
  "14": tenhearts,
  "15": kinghearts,
  "16": queenhearts,
  "17": jackhearts,
  "18": ninehearts,
  "19": acediamonds,
  "20": tendiamonds,
  "21": kingdiamonds,
  "22": queendiamonds,
  "23": jackdiamonds,
  "24": ninediamonds,
  "25": back,
};

function preloadCardImages() {
  for (const key in cardImages) {
    const image = new Image();
    image.src = cardImages[key];
    preloadedCardImages[key] = image;
  }
}


const getCardPng = (card) => {
  let id = "";
  if (card) {
    if (card.suit === "back") {
          id = "25"
    }
    else {
          id = card.id;

    }
    


    // Preload the card image if not already preloaded
    if (!preloadedCardImages[id]) {
      const image = new Image();
      image.src = cardImages[id];
      preloadedCardImages[id] = image;
    }

    // Return the card image URL
    return cardImages[id];
  }

  // Return the default card back image URL
  return cardImages.back;
};

preloadCardImages();

export default getCardPng;
