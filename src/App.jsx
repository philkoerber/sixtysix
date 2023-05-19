import Game from './Game';
import Welcome from './Welcome';
import useGameStore from './components/gameStore';
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const {gameStarted} = useGameStore();

  return (
    <div className='app'>
      <AnimatePresence wait>
        {gameStarted ? (
          <motion.div
            key="game"
            initial={{ opacity: 0, y: "0" }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Game />
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            initial={{ opacity: 0}}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0}}
          >
            <Welcome />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
