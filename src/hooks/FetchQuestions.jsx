import { useEffect, useState, useContext } from "react"
import { useDispatch } from "react-redux";
import { getServerData } from "../helper/helper";
import {ThemeContext} from "../api/Context"
import { useSelector } from "react-redux";

/** redux actions */
import * as Action from '../redux/question_reducer'
const api = "https://thecurvequizbackend.vercel.app"

/** fetch question hook to fetch api data and set value to store */
export const useFetchQestion = () => {
    const {start} = useContext(ThemeContext)
    const dispatch = useDispatch();   
    const [getData, setGetData] = useState({ isLoading : false, apiData : [], serverError: null});
    const { questions : { queue ,answers}, result : { result, userId}}  = useSelector(state => state)

    useEffect(() => {
        setGetData(prev => ({...prev, isLoading : true}));

        /** async function fetch backend data */
        (async () => {
            try {
                let course = userId.course === "Frontend Development"? "frontend": userId.course === "Backend Development"? "backend": "product";
                
                const [{ questions, answers }] = await getServerData(`${api}/api/${course}`, (data) => data)
                
                if(questions.length > 0){
                    setGetData(prev => ({...prev, isLoading : false}));
                    setGetData(prev => ({...prev, apiData : questions}));

                    /** dispatch an action */
                    dispatch(Action.startExamAction({ question : questions, answers }))
                    start()
                } else{
                    throw new Error("No Question Available");
                }
            } catch (error) {
                setGetData(prev => ({...prev, isLoading : false}));
                setGetData(prev => ({...prev, serverError : error}));
            }
        })();
    }, [dispatch]);

    return [getData, setGetData];
}


/** MoveAction Dispatch function */
export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction()); /** increase trace by 1 */
    } catch (error) {
        console.log(error)
    }
}

/** PrevAction Dispatch function */
export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction()); /** decrease trace by 1 */
    } catch (error) {
        console.log(error)
    }
}