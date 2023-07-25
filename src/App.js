import { useState, useEffect } from 'react';

import PumpAnimation from './components/PumpAnimation';
import SpeedPanel from './components/SpeedPanel';
import './App.css';
import ControlButtons from './components/ControlButtons';
import SpeedButtons from './components/SpeedButtons';
import { PUMP_TYPE } from './utils/constants';
import active from './assets/active.svg';
import inactive from './assets/inactive.svg';

const getSpeed = str => {
  const splited = str.split(':');
  const speed = splited[splited.length - 1];
  return speed;
};

const getTimeStamp = str => {
  const splited = str.split(':');
  const time = splited[splited.length - 2];
  return time;
};

const Pump = ({
  pumpType,
  speedValue,
  isClockwise,
  handleIncreaseSpeed,
  showTempValue,
  tempValue,
  handleDecreaseSpeed,
  handleStop,
  handleSet,
  handleToggle,
  isConnected
}) => {
  return (
    <section className={`pump-container ${pumpType === PUMP_TYPE.WATER_PUMP ? 'water' : 'oil'
      }`}>
      {!isConnected && <div className={`pump-disconnected
      ${pumpType === PUMP_TYPE.WATER_PUMP ? 'water-d' : 'oil-d'}`}>
        <h1>{pumpType === PUMP_TYPE.WATER_PUMP ?
          'Water ' : 'Oil '}Pump is Disconnected</h1>
      </div>}
      <section className='pump-control'>
        <div className='pump-animation'>
          <h1>{pumpType === PUMP_TYPE.WATER_PUMP ?
            'water' : 'oil'}</h1>
          <PumpAnimation
            speed={speedValue}
            isClockwise={isClockwise} />
        </div>
        <div className='control-panel'>
          <SpeedButtons
            handleIncreaseSpeed={handleIncreaseSpeed}
            speedType='increase'
            pumpType={pumpType} />
          <SpeedPanel
            speed={showTempValue ? tempValue : speedValue}
            isTemp={showTempValue}
          />
          <SpeedButtons
            handleDecreaseSpeed={handleDecreaseSpeed}
            speedType='decrease'
            pumpType={pumpType} />
        </div>
        <ControlButtons
          pumpType={pumpType}
          speedValue={speedValue}
          tempValue={tempValue}
          showTempValue={showTempValue}
          handleStop={handleStop}
          handleSet={handleSet}
          isClockwise={isClockwise}
          handleToggle={handleToggle} />
      </section>
    </section>
  );
};

const App = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [waterTimeStamp, setWaterTimeStamp] = useState('');
  const [oilTimeStamp, setOilTimeStamp] = useState('');
  const [isWaterConnected, setIsWaterConnected] = useState(false);
  const [isOilConnected, setIsOilConnected] = useState(false);
  const [waterTemp, setWaterTemp] = useState(0);
  const [waterSpeed, setWaterSpeed] = useState(0);
  const [showWaterTemp, setShowWaterTemp] = useState(false);
  const [isWaterClockwise, setIsWaterClockwise] = useState(true);
  const [oilTemp, setOilTemp] = useState(0);
  const [oilSpeed, setOilSpeed] = useState(0);
  const [showOilTemp, setShowOilTemp] = useState(false);
  const [isOilClockwise, setIsOilClockwise] = useState(true);

  const changeSpeed = (pumpType, speed, direction) => {
    let request = pumpType;
    if (speed) {
      request += ':' + direction + ':' + speed + ':0';
    } else {
      request += ':0:0:0';
    };
    socket.send(request);
  };

  const handleIncreaseSpeed = (pumpType, speed) => {
    if (pumpType === PUMP_TYPE.WATER_PUMP) {
      setShowWaterTemp(true);
      if (waterTemp + speed > 450) {
        setWaterTemp(450);
      } else {
        setWaterTemp(prev => prev + speed);
      };
    } else {
      setShowOilTemp(true);
      if (oilTemp + speed > 450) {
        setOilTemp(450);
      } else {
        setOilTemp(prev => prev + speed);
      };
    };
  };

  const handleDecreaseSpeed = (pumpType, speed) => {
    if (pumpType === PUMP_TYPE.WATER_PUMP) {
      setShowWaterTemp(true);
      if (waterTemp === 0)
        setShowWaterTemp(true);
      if (waterTemp - speed < 0) {
        setWaterTemp(0);
      } else {
        setWaterTemp(prev => prev - speed);
      };
    } else {
      setShowOilTemp(true);
      if (oilTemp === 0)
        setShowOilTemp(true);
      if (oilTemp - speed < 0) {
        setOilTemp(0);
      } else {
        setOilTemp(prev => prev - speed);
      };
    };
  };

  const handleSet = (pumpType) => {
    if (pumpType === PUMP_TYPE.WATER_PUMP) {
      setShowWaterTemp(false);
      setWaterSpeed(waterTemp);
      const direction = isWaterClockwise ? '1' : '2';
      changeSpeed(pumpType, waterTemp, direction);
    } else {
      setShowOilTemp(false);
      setOilSpeed(oilTemp);
      const direction = isOilClockwise ? '1' : '2';
      changeSpeed(pumpType, oilTemp, direction);
    };
  };

  const handleStop = (pumpType) => {
    if (pumpType === PUMP_TYPE.WATER_PUMP) {
      setWaterSpeed(0);
      setWaterTemp(0);
      setShowWaterTemp(false);
    } else {
      setOilSpeed(0);
      setOilTemp(0);
      setShowOilTemp(false);
    };
    changeSpeed(pumpType, 0);
  };

  const handleToggle = (pumpType) => {
    if (pumpType === PUMP_TYPE.WATER_PUMP) {
      const direction = isWaterClockwise ? '1' : '2';
      changeSpeed(pumpType, waterSpeed, direction);
      setIsWaterClockwise(!isWaterClockwise);
    } else if (pumpType === PUMP_TYPE.OIL_PUMP) {
      const direction = isOilClockwise ? '1' : '2';
      changeSpeed(pumpType, waterSpeed, direction);
      setIsOilClockwise(!isOilClockwise);
    };
  };

  const reconnect = () => {
    setIsReconnecting(true);
    setTimeout(() => {
      setIsReconnecting(false);
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    const pumpSocket = new WebSocket('ws://192.168.10.1:9001');
    setSocket(pumpSocket);
    console.log(pumpSocket)
    pumpSocket.onopen = () => {
      console.log('Pump Socket connected!');
      setIsConnected(true);
    };

    pumpSocket.onmessage = e => {
      console.log('receiving data: ', e.data)
      const speed = getSpeed(e.data);
      if (e.data.slice(0, 10) === PUMP_TYPE.WATER_PUMP) {
        setWaterSpeed(speed);
        setWaterTimeStamp(getTimeStamp(e.data));
        if (!isWaterConnected) {
          setIsWaterConnected(true);
        };
      } else if (e.data.slice(0, 8) === PUMP_TYPE.OIL_PUMP) {
        setOilSpeed(speed);
        setOilTimeStamp(getTimeStamp(e.data));
        if (!isOilConnected) {
          setIsOilConnected(true);
        };
      };
    };

    pumpSocket.onclose = e => {
      console.log('Pump Socket disconnected:', e.reason);
      setIsConnected(false);
      setTimeout(() => {
        const reconnectSocket = new WebSocket('ws://192.168.10.1:9001');
        setSocket(reconnectSocket);
      }, 500);
    };

    return () => {
      if (socket) {
        socket.close();
      };
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='App'>
      <Pump
        pumpType={PUMP_TYPE.WATER_PUMP}
        speedValue={waterSpeed}
        isClockwise={isWaterClockwise}
        handleIncreaseSpeed={handleIncreaseSpeed}
        showTempValue={showWaterTemp}
        tempValue={waterTemp}
        handleDecreaseSpeed={handleDecreaseSpeed}
        handleStop={handleStop}
        handleSet={handleSet}
        handleToggle={handleToggle}
        isConnected={!isConnected || isWaterConnected} />
      <Pump
        pumpType={PUMP_TYPE.OIL_PUMP}
        speedValue={oilSpeed}
        isClockwise={isOilClockwise}
        handleIncreaseSpeed={handleIncreaseSpeed}
        showTempValue={showOilTemp}
        tempValue={oilTemp}
        handleDecreaseSpeed={handleDecreaseSpeed}
        handleStop={handleStop}
        handleSet={handleSet}
        handleToggle={handleToggle}
        isConnected={!isConnected || isOilConnected} />
      {
        !isConnected && <div className='disconnected'>
          <h2>Connection Lost</h2>
          <button
            className={`reconnect ${isReconnecting ? 'reconnecting' : ''}`}
            onClick={reconnect}
            disabled={isReconnecting}>
            {isReconnecting ? 'Reconnecting...' : 'Reconnect'}
          </button>
        </div>
      }
    </div>
  );
};

export default App;
