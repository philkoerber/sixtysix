import { motion } from "framer-motion";
import getCardPng from "./getCardPng";

const Card = ({ card }) => {
  if (!card) {
    return null;
  }

  const imageSource = getCardPng(card);

  return (
    <motion.img
      src={imageSource}
      alt=""
      style={{
        borderRadius: 4,
        //base cardSize on screen size
        maxHeight: "16vh"
      }}
    />
  );
};

export default Card;
