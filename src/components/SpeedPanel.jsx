import React from 'react'
import { Display } from "react-7-segment-display";

const SpeedPanel = ({ speed, isTemp }) => {
  return (
    <div className='display-panel'>
      <Display 
        value={parseInt(speed)} 
        count={3} 
        height={180}
        color={isTemp ? 'red' : 'green'}
        skew
      />
      <p>ml/min</p>
    </div>
  )
}

export default SpeedPanel
