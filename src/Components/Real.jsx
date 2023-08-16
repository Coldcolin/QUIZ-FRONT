import React, { useRef, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserId } from '../redux/result_reducer'
import '../Styles/Main.css'
import logo from "../assets/curve2.b90648ddd7482f82d25a (1).png"
import { ThemeContext } from '../api/Context'

const Real = () => {
  const {start} = useContext(ThemeContext)
    
    const inputRef = useRef(null)
    const dispatch = useDispatch()


    function startQuiz(){
        if(inputRef.current?.value){
            dispatch(setUserId(inputRef.current?.value))
        }
        // start()
    }
  return (
    <div className='container'>
        <div className="logo">
            <img src={logo} alt="Logo" className="logo-img"/>
        </div>
        <h1 className='title text-light'>The Curve Entrance Quiz</h1>

        <ol>
            <li>You will be asked 10 questions one after another.</li>
            <li>10 points is awarded for the correct answer.</li>
            <li>Each question has three options. You can choose only one option.</li>
            <li>You can review and change answers before the quiz finishes.</li>
            <li>The result will be declared at the end of the quiz. You have 15 mins to finish.</li>
        </ol>

        <form id="form">
            <input ref={inputRef} className="userid" type="text" placeholder='Username*' />
        </form>

        <div className='start'>
            <Link className='btn' to={'quiz'} onClick={startQuiz}>Start Quiz</Link>
        </div>
    </div>
  )
}

export default Real