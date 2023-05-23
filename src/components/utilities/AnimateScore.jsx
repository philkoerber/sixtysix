import React, { useEffect, useState } from 'react';
import {motion} from "framer-motion"

function AnimateScore({ children }) {

    const [score, setScore] = useState(0)


    useEffect(() => {
  const incrementScore = () => {
    if (score < children) {
      setScore((prevScore) => prevScore + 1);
    }
        };
        
        const maxDelay = 350/children * 15;
        const interval = maxDelay / 80;

  for (let i = score; i <= children-1; i++) {
      setTimeout(incrementScore,
          Math.min(
              ((Math.pow((i / children), 3)) * children * interval)+1
              , maxDelay)
          * (i - score));
  }
}, [children]);
    

    return (
            <div>
                <motion.div
                    key={score}
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{duration: score/200}}>
            {score}
            </motion.div>
            </div>
            
    );
}

export default AnimateScore;