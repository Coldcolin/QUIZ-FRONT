import React, { useContext, useEffect } from 'react'
import '../Styles/Result.css';
import { Link } from 'react-router-dom'
import { ThemeContext } from '../api/Context';

// import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';

/** import actions  */
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { usePublishResult } from '../hooks/setResult';


export default function Result() {
    const {time, stop, reset} = useContext(ThemeContext)
    const dispatch = useDispatch()
    const { questions : { queue ,answers}, result : { result, userId}}  = useSelector(state => state)

    const totalPoints = queue.length * 10; 
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 10)
    const flag = flagResult(totalPoints, earnPoints)


    /** store user result */
    

    function onRestart(){
        dispatch(resetAllAction());
        dispatch(resetResultAction());
        reset();
    }

    useEffect(()=>{
        stop();
    }, [])

    useEffect(()=>{
        const sendData = setTimeout(() => {
            usePublishResult({ 
                result, 
                username : userId,
                attempts,
                points: earnPoints,
                achieved : flag ? "Passed" : "Failed" 
            });
            return () => clearTimeout(sendData)
        }, 2000)
    }, [])

  return (
    <div className='result-container'>
        <h1 className='title text-light'>The Curve Entrance Quiz</h1>

        <div className='result flex-center'>
            <div className='flex'>
                <span>Username : </span>
                <span className='bold'>{userId || ""}</span>
            </div>
            <div className='flex'>
                <span>Total Quiz Points : </span>
                <span className='bold'>{totalPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Questions : </span>
                <span className='bold'>{ queue.length || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Attempts : </span>
                <span className='bold'>{attempts || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Earn Points : </span>
                <span className='bold'>{earnPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>Time Used : </span>
                <span className='bold'>{(time/1000) || 0}s</span>
            </div>
            <div className='flex'>
                <span>Quiz Result</span>
                <span style={{ color : `${flag ? "#2aff95" : "#ff2a66" }` }} className='bold'>{flag ? "Passed" : "Failed"}</span>
            </div>
        </div>

        <div className="start">
            <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
        </div>

        <div className="container">
            {/* result table */}
            {/* <ResultTable></ResultTable> */}
        </div>
    </div>
  )
}