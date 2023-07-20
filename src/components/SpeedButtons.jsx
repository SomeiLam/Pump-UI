import React from 'react'

const SpeedButtons = ({
  handleIncreaseSpeed,
  handleDecreaseSpeed,
  speedType,
  pumpType,
}) => {
  const handleChangeSpeed = speed => {
    if (speedType === 'increase') {
      handleIncreaseSpeed(pumpType, speed);
    } else {
      handleDecreaseSpeed(pumpType, speed);
    };
  };

  return (
    <div className='btn-group'>
      <button
        className={`${speedType === 'increase' ? 'increase' :
      'decrease'} btn`}
        onClick={() => handleChangeSpeed(1)}>
        {speedType === 'increase' ? '+1' : '-1'}
      </button>
      <button
        className={`${speedType === 'increase' ? 'increase' :
        'decrease'} btn`}
        onClick={() => handleChangeSpeed(10)}>
        {speedType === 'increase' ? '+10' : '-10'}
      </button>
      <button
        className={`${speedType === 'increase' ? 'increase' :
        'decrease'} btn`}
        onClick={() => handleChangeSpeed(100)}>
        {speedType === 'increase' ? '+100' : '-100'}
      </button>
    </div>
  );
};

export default SpeedButtons;
