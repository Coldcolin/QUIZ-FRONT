import React, { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../api/Context';

const Watch = () => {
    const {time} = useContext(ThemeContext)
  return (
    <div className="stopwatch">
      <div className="numbers">
        <span>Time used:</span>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        {/* <span>{("0" + ((time / 10) % 100)).slice(-2)}</span> */}
      </div>
      {/* <div className="buttons">
        <button onClick={() => setRunning(true)}>Start</button>
        <button onClick={() => setRunning(false)}>Stop</button>
        <button onClick={() => setTime(0)}>Reset</button>       
      </div> */}
    </div>
  )
}

export default Watch