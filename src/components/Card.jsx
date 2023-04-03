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
        maxWidth: "18vw",
        maxHeight: "18vh"
      }}
    />
  );
};

export default Card;
