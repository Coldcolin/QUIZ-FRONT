import {createBrowserRouter, RouterProvider} from "react-router-dom"
import "../Styles/App.css"
import Real from "./Real"
import Quiz from "./Quiz"
import Result from "./Result"
import { CheckUserExist } from '../helper/helper';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Real/>
  },
  {
    path: '/quiz',
    element:  <CheckUserExist><Quiz /></CheckUserExist>
  },
  {
    path: '/result',
    element: <CheckUserExist><Result /></CheckUserExist>
  },
])

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App