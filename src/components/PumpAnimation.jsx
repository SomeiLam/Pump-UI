import { useState, useEffect } from 'react';
import { clockwisePump } from '../assets/clockwisePump';
import { counterclockwisePump } from '../assets/counterclockwisePump';
import { SPEED } from "../utils/constants";

const PumpAnimation = ({ speed, isClockwise }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let spin = SPEED.STATIC;
    switch (true) {
      case (speed > 350):
        spin = SPEED.LEVEL_FIVE;
        break;
      case (speed > 250):
        spin = SPEED.LEVEL_FOUR;
        break;
      case (speed > 150):
        spin = SPEED.LEVEL_THREE;
        break;
      case (speed > 50):
        spin = SPEED.LEVEL_TWO;
        break;
      case (speed > 0):
        spin = SPEED.LEVEL_ONE;
        break;
      default:
        spin = SPEED.STATIC;
        break;
    };
    if (speed > 0) {
      const interval = setInterval(() => {
        setCount(prevCount => (prevCount + 1) % 24);
      }, spin);
  
      return () => {
        clearInterval(interval);
      };
    };
  }, [speed]);

  return (
    <img 
      src={isClockwise ? clockwisePump[count] : counterclockwisePump[count]} 
      className="pump" alt="pump" />
  );
};

export default PumpAnimation;
