import React from "react";
import "../../assets/css/singleUser.css";
import {useNavigate} from 'react-router-dom'
const SingleUser = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-wrap Single mt-4">
      <div>
        <img src={require("../../assets/image/logo1.png")} alt="Logo 1" />
      </div>
      <div className="d-flex flex-column ms-2 singleUser justify-content-center mt-1" onClick={()=>{
        navigate("/users/1234567")
      }}>
        <p className="mb-0">
          <b>Vansham</b>
        </p>
        <p>Created 2 days ago</p>
      </div>
    </div>
  );
};

export default SingleUser;
