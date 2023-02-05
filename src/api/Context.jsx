import { createContext, useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
export const ThemeContext = createContext();

export const ThemeProvider=({children})=>{
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const start =()=>{
        setRunning(true)
    }
    const stop =()=>{
        setRunning(false)
    }
    const reset =()=>{
        setTime(0)
    }
    useEffect(() => {
        let interval;
        if (running) {
          interval = setInterval(() => {
            setTime((prevTime) => prevTime + 10);
          }, 10);
        } else if (!running) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [running]);
    
        return (
            <ThemeContext.Provider value={{time, start, stop, reset}}>
                {children}
            </ThemeContext.Provider>
        )
}