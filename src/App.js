import { useState } from 'react';

import Pump from './components/Pump';
import SpeedPanel from './components/SpeedPanel';
import './App.css';
import ControlButtons from './components/ControlButtons';
import SpeedButtons from './components/SpeedButtons';

function App() {
  const [tempValue, setTempValue] = useState(0);
  const [speedValue, setSpeedValue] = useState(0);
  const [showTempValue, setShowTempValue] = useState(false);
  const [isClockwise, setIsClockwise] = useState(true);

  const handleIncreaseSpeed = speed => {
    setShowTempValue(true);
    if (tempValue + speed > 450) {
      setTempValue(450);
    } else {
      setTempValue(prev => prev + speed);
    };
  };

  const handleDecreaseSpeed = speed => {
    setShowTempValue(true);
    if (tempValue === 0)
      setShowTempValue(true);
    if (tempValue - speed < 0) {
      setTempValue(0);
    } else {
      setTempValue(prev => prev - speed);
    };
  };

  const handleSet = () => {
    setShowTempValue(false);
    setSpeedValue(tempValue);
  };

  const handleStop = () => {
    setSpeedValue(0);
    setTempValue(0);
    setShowTempValue(false);
  };

  const handleToggle = () => setIsClockwise(!isClockwise);

  return (
    <div className='App'>
      <section className='main-container'>
        <div className='pump-animation'>
          <Pump speed={speedValue} isClockwise={isClockwise} />
        </div>
        <div className='control-panel'>
          <SpeedButtons
            handleIncreaseSpeed={handleIncreaseSpeed}
            speedType='increase' />
          <SpeedPanel
            speed={showTempValue ? tempValue : speedValue}
            isTemp={showTempValue}
          />
          <SpeedButtons
            handleDecreaseSpeed={handleDecreaseSpeed}
            speedType='decrease' />
        </div>
      </section>
      <ControlButtons
        speedValue={speedValue}
        tempValue={tempValue}
        showTempValue={showTempValue}
        handleStop={handleStop}
        handleSet={handleSet}
        isClockwise={isClockwise}
        handleToggle={handleToggle} />
    </div>
  );
};

export default App;
