import React, { useEffect, useState, useContext } from 'react'
import Questions from './Questions'
import { useDispatch, useSelector } from 'react-redux'
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestions.jsx';
import { PushAnswer } from '../hooks/setResult.js';
import { Navigate } from 'react-router-dom';
import Watch from './Watch';
import { ThemeContext } from '../api/Context';

const Quiz = () => {
  const {time} = useContext(ThemeContext)
    const [check, setChecked] = useState(undefined)
    const { queue, trace } = useSelector(state => state.questions);
    const result = useSelector(state => state.result.result);
    const dispatch = useDispatch()

    useEffect(() => {
        // console.log(state)
    })
    function onNext(){
        // console.log('On next click')

        if(trace < queue.length){
            /** increase the trace value by one using MoveNextAction */
            dispatch(MoveNextQuestion());

            /** insert a new result in the array.  */
            if(result.length <= trace){
                dispatch(PushAnswer(check));
            }
        }
        setChecked(undefined)
    }

    function onPrev(){
        console.log('On onPrev click')
        if(trace > 0){
            /** decrease the trace value by one using MovePrevQuestion */
            dispatch(MovePrevQuestion());
        }
    }

    function onChecked(check){
        // console.log(check)
        setChecked(check)
    }

    if((result.length && result.length >= queue.length) || time === 60000){
        return <Navigate to={'/result'} replace={true}></Navigate>
    }

  return (
    <div className='container'>
        <h1 className='title text-light'>The Curve Entrance Quiz</h1>
        <Watch/>
        {/* display questions */}
        <Questions onChecked={onChecked} />

        <div className='grid'>
        { trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>}
            <button className='btn next' onClick={onNext}>Next</button>
        </div>
    </div>
  )
}

export default Quiz