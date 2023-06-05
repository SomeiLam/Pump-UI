import React from 'react'

const SpeedButtons = ({
  handleIncreaseSpeed,
  handleDecreaseSpeed,
  speedType,
}) => {
  const handleChangeSpeed = speed => {
    if (speedType === 'increase') {
      handleIncreaseSpeed(speed);
    } else {
      handleDecreaseSpeed(speed);
    };
  };

  return (
    <div className='btn-group'>
      <button
        className='increase btn'
        onClick={() => handleChangeSpeed(1)}>
        {speedType === 'increase' ? '+1' : '-1'}
      </button>
      <button
        className='increase btn'
        onClick={() => handleChangeSpeed(10)}>
        {speedType === 'increase' ? '+10' : '-10'}
      </button>
      <button
        className='increase btn'
        onClick={() => handleChangeSpeed(100)}>
        {speedType === 'increase' ? '+100' : '-100'}
      </button>
    </div>
  );
};

export default SpeedButtons;
