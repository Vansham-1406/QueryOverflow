import React, { useState } from "react";
import "../assets/css/signup.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="signUp position-relative">
      <div className="position-absolute signUpBg d-flex justify-content-center align-items-center">
        <div className="mainSignUp position-relative d-flex flex-column">
          <img
            src={require("../assets/image/signupTopLeft.png")}
            className="img-fluid topLeft position-absolute"
            alt="signup Top Left"
          />
          <div className="d-flex flex-column align-items-center">
            <img
              src={require("../assets/image/logo.png")}
              className="img-fluid mt-5"
              width={"100"}
              alt="Query Overflow"
            />
            <div className="d-flex pt-3 queryHeader">
              <p className="fs-3 mb-1">Query</p>
              <p className="fs-3 ms-2 fw-bold mb-1">Overflow</p>
            </div>
            <img
              src={require("../assets/image/login.png")}
              className="img-fluid queryImg"
              alt="Login Icon"
            />
          </div>
          <div className="d-flex justify-content-start align-items-start ms-sm-5">
            <input
              type={"text"}
              name="name"
              className="mt-4 ms-sm-4 ms-4 signupInp3 ps-2"
              placeholder="Enter mobile number*"
            />
          </div>
          <div className="d-flex justify-content-start align-items-start ms-sm-5 position-relative password">
            <input
              type={showPassword ? "text" : "password"}
              name="name"
              className="mt-3 ms-sm-4 ms-4 signupInp3 ps-2"
              placeholder="Password*"
            />
            <div onClick={()=>{
                setShowPassword(!showPassword)
            }}>
                {showPassword ? 
                (
                <i className="fa fa-eye-slash position-absolute"></i>
                ) : (
                <i className="fa fa-eye position-absolute"></i>
                )}
            </div>
          </div>
          <div className="d-flex justify-content-end me-sm-5 mt-2 forgot_text">
            <p className="me-4">Forgot Password?</p>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-4 mb-5 flex-column">
            <button className="queryButton text-light border-0">Sign Up</button>
            <p className="registeredUser mt-3 mb-0 pb-0">
              Not a user?{" "}
              <span
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </span>
            </p>
          </div>
          <img
            src={require("../assets/image/signupBottomRight.png")}
            className="img-fluid bottomRight position-absolute"
            alt="signup Bottom Right"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
