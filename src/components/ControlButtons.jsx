import React from 'react';

import clockwiseIcon from '../assets/clockwiseIcon.svg';
import counterClockwiseIcon from '../assets/counterclockwiseIcon.svg';
import activeClockwiseIcon from '../assets/activeClockwiseIcon.svg';
import activeCounterclockwiseIcon from '../assets/activeCounterClockwiseIcon.svg';

const ControlButtons = ({ 
  speedValue,
  tempValue,
  showTempValue,
  handleStop,
  handleSet,
  isClockwise,
  handleToggle
}) => {
  return (
    <section className='reset-btn'>
        {speedValue === 0 ?
          <button className='disabled stop btn' disabled>
            STOP
          </button> :
          <button className='stop btn' onClick={handleStop}>
            STOP
          </button>}
        {showTempValue && tempValue !== speedValue ?
          <button className='set btn' onClick={handleSet}>
            SET
          </button> :
          <button className='disabled set btn' disabled>
            SET
          </button>}
        <div className='direction-switch'>
          <img
            src={isClockwise ? counterClockwiseIcon : activeCounterclockwiseIcon}
            alt='counterclockwise icon' />
          <input
            checked={isClockwise}
            onChange={handleToggle}
            className='react-switch-checkbox'
            id='react-switch-new'
            type='checkbox'
          />
          <label
            style={{ background: isClockwise }}
            className='react-switch-label'
            htmlFor='react-switch-new'
          >
            <span className='react-switch-button' />
          </label>
          <img src={isClockwise ? activeClockwiseIcon : clockwiseIcon} alt='clockwise icon' />
        </div>
      </section>
  )
}

export default ControlButtons
