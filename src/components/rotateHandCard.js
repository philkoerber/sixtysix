const rotateHandCard = (length, index) => {
  if (length === 0) {
    return 0;
  } else {
    const totalSpread = length * 5;
    const spreadPerCard = totalSpread / (length - 1);
    let rotation = -totalSpread / 2 + index * spreadPerCard;
    if (isNaN(rotation)) {
      rotation = 0;
    }
    return rotation;
  }
};

export default rotateHandCard;
