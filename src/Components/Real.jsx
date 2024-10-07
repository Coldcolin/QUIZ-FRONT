import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserId } from '../redux/result_reducer'
import '../Styles/Main.css'
import logo from "../assets/curve2.b90648ddd7482f82d25a (1).png"
// import { ThemeContext } from '../api/Context'

const Real = () => {
//   const {start} = useContext(ThemeContext)

  const [userInfo, setUserInfo]= useState()
    
    // const inputRef = useRef(null)
    const dispatch = useDispatch()


    function startQuiz(){
        if((userInfo.name !== "") && (userInfo.course !== "")){
            dispatch(setUserId(userInfo))
        }
        // start()
    }
  return (
    <div className='container'>
        <div className="logo">
            <img src={logo} alt="Logo" className="logo-img"/>
        </div>
        <h1 className='title text-light'>The Curve Entrance Quiz</h1>

        <ol style={{ listStyleType: 'disc' }}>
            <li>You will be asked 10 questions one after another.</li>
            <li>10 points is awarded for the correct answer.</li>
            <li>Each question has three options. You can choose only one option.</li>
            <li>You can review and change answers before the quiz finishes.</li>
            <li>The result will be declared at the end of the quiz. You have 10 mins to finish.</li>
            <li>Make sure to only click submit when you are done with the quiz</li>
        </ol>

        <div id="form">
            <input onChange={(e)=> setUserInfo((prev)=>{return{...prev, name: e.target.value}})} className="userid" type="text" placeholder='Full Name' />
            <select className='select-course' required={true} onChange={(e)=> setUserInfo((prev)=>{return{...prev, course: e.target.value}})}>
                <option>--select course--</option>
                <option>Frontend Development</option>
                <option>Backend Development</option>
                <option>Product Design</option>
            </select>
        </div>

        <div className='start'>
            <Link className='btn' to={'quiz'} onClick={startQuiz}>Start Quiz</Link>
        </div>
    </div>
  )
}

export default Real