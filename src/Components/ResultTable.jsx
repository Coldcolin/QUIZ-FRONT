import React, { useEffect, useState } from 'react'
import { getServerData } from '../helper/helper'

export default function ResultTable() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);

    const getResults =async()=>{
        try{
            setLoading(true)
        getServerData(`https://curve-quiz.onrender.com/api/result`, (res) => {
            setLoading(false)
            setData(res)
        })
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getResults()
    },[])

  return (
    <div className="result-table">
        <table>
            <thead className='table-header'>
                <tr className='table-row'>
                    <td>Name</td>
                    <td>Attempts</td>
                    <td>Earned Points</td>
                    <td>Result</td>
                </tr>
            </thead>
            {
                loading? <tbody><tr><td>Loading Data...</td></tr></tbody>:
                <tbody>
                {/* { !data ?? <tr><td>No Data Found </td></tr>} */}
                {
                    data?.map((v, i) => (
                        <tr className='table-body' key={i}>
                            <td>{v?.username || ''}</td>
                            <td>{v?.attempts || 0}</td>
                            <td>{v?.points || 0}</td>
                            <td>{v?.achieved || ""}</td>
                        </tr>
                    ))
                }
                
            </tbody>
            }
        </table>
    </div>
  )
}