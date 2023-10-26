import React, { useEffect, useState } from "react";
import "../assets/css/signup.css";
import { useNavigate } from "react-router-dom";
import { useSendOtp, useCreateUser } from "../redux/features/user/userActions";
import jwtdecode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useSelector} from 'react-redux'

const Signup = () => {
  const navigate = useNavigate();
  const user = useSelector((state)=>state.user);
  const [showPassword, setShowPassword] = useState(false);
  const { createUser } = useCreateUser();

  const { sendOtp } = useSendOtp();
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [sentOtp, setSentOtp] = useState(false);
  const [userOtp, setUserOtp] = useState("");

  const [createInput, setcreateInput] = useState({
    name: "",
    mobilenumber: "",
    password: "",
  });

  const handleSubmit = () => {
    if (createInput.name === "") {
      toast.error("Enter a valid name", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (createInput.password === "") {
      toast.error("Enter a valid password", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (!verifyOtp) {
      toast.error("Verify the mobile number !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (verifyOtp) {
      createUser(createInput);
    }
  };

  useEffect(() => {
    try {
      if (
        localStorage.getItem("token") &&
        jwtdecode(localStorage.getItem("token")).exp * 1000 < Date.now()
      ) {
        localStorage.removeItem("token");
      }

      if (
        localStorage.getItem("token") &&
        jwtdecode(localStorage.getItem("token")).exp * 1000 > Date.now()
      ) {
        navigate("/");
      }
    } catch (error) {
      localStorage.removeItem("token");
    }
  }, [navigate]);

  useEffect(() => {
    if(user?.otp)
    {
      setSentOtp(true);
    }
  }, [user])
  

  const sendOtpHandle = async () => {
    await sendOtp(createInput.mobilenumber)
  };

  const verifySentOtpHandle = () => {
    // eslint-disable-next-line
    if (userOtp == user.otp) {
      toast.success("Mobile Number Verified !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setVerifyOtp(true);
    }
  };

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
            <p className="m-0 pt-1 queryPara">
              Let’s get you signed up and straight to the queries
            </p>
          </div>
          <div className="d-flex justify-content-start align-items-start ms-sm-5">
            <input
              type={"text"}
              name="name"
              className="mt-5 ms-sm-4 ms-4 signupInp1 ps-2"
              placeholder="Enter your name*"
              onChange={(e) => {
                setcreateInput({
                  ...createInput,
                  name: e.target.value,
                });
              }}
            />
          </div>
          <div className="d-flex justify-content-start align-items-center ms-sm-5 mt-3">
            <input
              type={"text"}
              name="name"
              className="ms-sm-4 ms-4 signupInp2 ps-2"
              placeholder="Number without country code*"
              onChange={(e) => {
                setcreateInput({
                  ...createInput,
                  mobilenumber: e.target.value,
                });
              }}
              disabled={verifyOtp || sentOtp ? true : false}
            />
            {!sentOtp && (
              <button
                className="ms-sm-4 ms-1 veriButton text-light border-0 rounded-3"
                onClick={sendOtpHandle}
              >
                Send Code
              </button>
            )}
          </div>
          <div className="d-flex justify-content-start align-items-center ms-sm-5 mt-3">
            <input
              type={"text"}
              name="name"
              className=" ms-sm-4 ms-4 signupInp1 ps-2"
              placeholder="Enter code*"
              onChange={(e) => {
                setUserOtp(e.target.value);
              }}
              disabled={verifyOtp ? true : false}
            />
            {sentOtp && !verifyOtp && (
              <button
                className="ms-sm-4 ms-1 veriButton text-light border-0 rounded-3"
                onClick={verifySentOtpHandle}
              >
                Verify Code
              </button>
            )}
            {verifyOtp && (
              <div
                className="ps-3"
                style={{ fontSize: "12px", color: "green" }}
              >
                Verified!
              </div>
            )}
          </div>
          <div className="d-flex justify-content-start align-items-start ms-sm-5 position-relative password1">
            <input
              type={showPassword ? "text" : "password"}
              name="name"
              className="mt-3 ms-sm-4 ms-4 signupInp1 ps-2"
              placeholder="Password*"
              onChange={(e) => {
                setcreateInput({
                  ...createInput,
                  password: e.target.value,
                });
              }}
            />
            <div
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <i className="fa fa-eye-slash position-absolute"></i>
              ) : (
                <i className="fa fa-eye position-absolute"></i>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-4 mb-5 flex-column">
            <button
              className="queryButton text-light border-0"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
            <p className="registeredUser mt-3 mb-0 pb-0">
              Already a user?{" "}
              <span
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
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
      <ToastContainer />
    </div>
  );
};

export default Signup;
