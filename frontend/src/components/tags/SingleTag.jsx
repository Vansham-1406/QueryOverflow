import React from "react";
import "../../assets/css/OtherTag.css";
import {useNavigate} from 'react-router-dom'
const SingleTag = () => {
  const navigate = useNavigate();
  return (
    <div className="singleTag m-lg-2 mt-3 me-3 ps-2 pe-2 pt-2 pb-2 d-flex flex-column">
      <div className="singleTagBox" onClick={()=>{
        navigate("/tags/javascript")
      }}>
        <p className="ps-2 pe-2 pt-1 pb-1 mb-0">Javascript</p>
      </div>
      <div className="singleText mt-2">
        <p className="mb-0">
          For questions about programming in ECMAScript (JavaScript/JS) and its
          different dialects/implementations (except for ActionScript). Note
          that...
        </p>
      </div>
      <div className="singleQuestionTag mt-2">
        <b>100</b> questions
      </div>
    </div>
  );
};

export default SingleTag;
