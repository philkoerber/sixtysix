import twoclubs from "../pics/2_of_clubs.png";
import threeclubs from "../pics/3_of_clubs.png";
import fourclubs from "../pics/4_of_clubs.png";
import fiveclubs from "../pics/5_of_clubs.png";
import sixclubs from "../pics/6_of_clubs.png";
import sevenclubs from "../pics/7_of_clubs.png";
import eightclubs from "../pics/8_of_clubs.png";
import nineclubs from "../pics/9_of_clubs.png";
import tenclubs from "../pics/10_of_clubs.png";
import jackclubs from "../pics/jack_of_clubs.png";
import queenclubs from "../pics/queen_of_clubs.png";
import kingclubs from "../pics/king_of_clubs.png";
import aceclubs from "../pics/ace_of_clubs.png";

import twospades from "../pics/2_of_spades.png";
import threespades from "../pics/3_of_spades.png";
import fourspades from "../pics/4_of_spades.png";
import fivespades from "../pics/5_of_spades.png";
import sixspades from "../pics/6_of_spades.png";
import sevenspades from "../pics/7_of_spades.png";
import eightspades from "../pics/8_of_spades.png";
import ninespades from "../pics/9_of_spades.png";
import tenspades from "../pics/10_of_spades.png";
import jackspades from "../pics/jack_of_spades.png";
import queenspades from "../pics/queen_of_spades.png";
import kingspades from "../pics/king_of_spades.png";
import acespades from "../pics/ace_of_spades.png";

import twohearts from "../pics/2_of_hearts.png";
import threehearts from "../pics/3_of_hearts.png";
import fourhearts from "../pics/4_of_hearts.png";
import fivehearts from "../pics/5_of_hearts.png";
import sixhearts from "../pics/6_of_hearts.png";
import sevenhearts from "../pics/7_of_hearts.png";
import eighthearts from "../pics/8_of_hearts.png";
import ninehearts from "../pics/9_of_hearts.png";
import tenhearts from "../pics/10_of_hearts.png";
import jackhearts from "../pics/jack_of_hearts.png";
import queenhearts from "../pics/queen_of_hearts.png";
import kinghearts from "../pics/king_of_hearts.png";
import acehearts from "../pics/ace_of_hearts.png";

import twodiamonds from "../pics/2_of_diamonds.png";
import threediamonds from "../pics/3_of_diamonds.png";
import fourdiamonds from "../pics/4_of_diamonds.png";
import fivediamonds from "../pics/5_of_diamonds.png";
import sixdiamonds from "../pics/6_of_diamonds.png";
import sevendiamonds from "../pics/7_of_diamonds.png";
import eightdiamonds from "../pics/8_of_diamonds.png";
import ninediamonds from "../pics/9_of_diamonds.png";
import tendiamonds from "../pics/10_of_diamonds.png";
import jackdiamonds from "../pics/jack_of_diamonds.png";
import queendiamonds from "../pics/queen_of_diamonds.png";
import kingdiamonds from "../pics/king_of_diamonds.png";
import acediamonds from "../pics/ace_of_diamonds.png";

import back from "../pics/back.png";

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
