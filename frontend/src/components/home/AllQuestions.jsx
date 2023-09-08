import React from 'react'
import "../../assets/css/sidemenu.css";
import '../../assets/css/allQuestions.css'
import SingleQuestion from './SingleQuestion';
import {useNavigate} from 'react-router-dom'
const AllQuestions = () => {
  const navigate = useNavigate();
  return (
    <div className='allQuestions'>
        <div className='d-flex justify-content-between ps-lg-4 pe-ls-5 ps-2 pe-2'>
            <h3 className='pt-1'>All Questions</h3>
            <button className='query ps-3 pe-3' onClick={()=>{
              navigate("/askquery")
            }}>Ask Query</button>
        </div>
        <div className='ms-lg-4 ms-2 pt-4 total_question'>
            <p>100 questions</p>
        </div>
        <div>
            <SingleQuestion/>  
            <SingleQuestion/>  
            <SingleQuestion/>  
            <SingleQuestion/>  
            <SingleQuestion/>  
            <SingleQuestion/>  
            <SingleQuestion/>  
        </div>
        <div className="bottom_line"></div>
    </div>
  )
}

export default AllQuestions