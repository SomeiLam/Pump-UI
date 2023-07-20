import React from 'react';

import clockwiseIcon from '../assets/clockwiseIcon.svg';
import counterClockwiseIcon from '../assets/counterclockwiseIcon.svg';
import activeClockwiseIcon from '../assets/activeClockwiseIcon.svg';
import activeCounterclockwiseIcon from '../assets/activeCounterClockwiseIcon.svg';

const ControlButtons = ({ 
  pumpType,
  speedValue,
  tempValue,
  showTempValue,
  handleStop,
  handleSet,
  isClockwise,
  handleToggle
}) => {

  const handleChangeDirection = () => {
    handleToggle(pumpType)
  };

  return (
    <section className='reset-btn'>
        {speedValue === 0 || speedValue === '0' ?
          <button className='disabled stop btn' disabled>
            STOP
          </button> :
          <button 
            className='stop btn' 
            onClick={() => handleStop(pumpType)}>
            STOP
          </button>}
        {showTempValue && tempValue !== speedValue ?
          <button 
            className='set btn' 
            onClick={() => handleSet(pumpType)}>
            {speedValue === 0 || speedValue === '0' 
            ? 'START' : 'SET'}
          </button> :
          <button className='disabled set btn' disabled>
            {speedValue === 0 || speedValue === '0'
            ? 'START' : 'SET'}
          </button>}
        <div className='direction-switch'>
          <img
            src={isClockwise ? counterClockwiseIcon : activeCounterclockwiseIcon}
            alt='counterclockwise icon' />
          <input
            checked={isClockwise}
            onChange={handleChangeDirection}
            className='react-switch-checkbox'
            id={pumpType}
            type='checkbox'
          />
          <label
            style={{ background: isClockwise }}
            className='react-switch-label'
            htmlFor={pumpType}
          >
            <span className='react-switch-button' />
          </label>
          <img src={isClockwise ? activeClockwiseIcon : clockwiseIcon} alt='clockwise icon' />
        </div>
      </section>
  )
}

export default ControlButtons
