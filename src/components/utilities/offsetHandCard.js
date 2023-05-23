const offsetHandCard = (length, index) => {
    if (length === 1) {
      return null;
    } else {
        const offset = Math.sin(Math.PI/(length-1)*index)
      return  offset * -2.9;
    }
  };
  
  export default offsetHandCard;