import React, { useState, useEffect } from "react";
import "../assets/css/signup.css";
import { useNavigate } from "react-router-dom";
import { useSendOtp,useLoginUser,useUpdatePassword } from "../redux/features/user/userActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtdecode from "jwt-decode";
import Modal from "react-modal";
import {useSelector} from 'react-redux'

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useLoginUser();
  const user = useSelector((state)=>state.user);
  const [loginDetails, setLoginDetails] = useState({
    mobilenumber: "",
    password: "",
  });
  const {updatePassword} = useUpdatePassword();

  const [modalInput, setModalInput] = useState({
    mobilenumber : "",
    otp : "",
    password : ""
  })

  const { sendOtp } = useSendOtp();
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [sentOtp, setSentOtp] = useState(false);

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

  const handleSubmit = () => {
    if (loginDetails.mobilenumber === "") {
      toast.warning("Enter mobile number", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (loginDetails.password === "") {
      toast.warning("Enter password", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      login(loginDetails);
    }
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const sendOtpHandle = async () => {
    await sendOtp(modalInput.mobilenumber)
  };

  const verifySentOtpHandle = () => {
    // eslint-disable-next-line
    if (modalInput.otp == user.otp) {
      toast.success("Mobile Number Verified !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setVerifyOtp(true);
    }
  };

  const hanldeUpdatePassword = () => {
    if(!verifyOtp)
    {
      toast.warning("Verify the mobile number !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    else if(modalInput.password === "")
    {
      toast.error("Password is empty!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    if (verifyOtp) {
      updatePassword(modalInput);
      closeModal();
      setModalInput({})
    }
  }

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
              onChange={(e) => {
                setLoginDetails({
                  ...loginDetails,
                  mobilenumber: e.target.value,
                });
              }}
            />
          </div>

          <div className="d-flex justify-content-start align-items-start ms-sm-5 position-relative password">
            <input
              type={showPassword ? "text" : "password"}
              name="name"
              className="mt-3 ms-sm-4 ms-4 signupInp3 ps-2"
              placeholder="Password*"
              onChange={(e) => {
                setLoginDetails({ ...loginDetails, password: e.target.value });
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
          <div className="d-flex justify-content-end me-sm-5 mt-2 forgot_text">
            <p className="me-4" onClick={openModal}>
              Forgot Password?
            </p>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-4 mb-5 flex-column">
            <button
              className="queryButton text-light border-0"
              onClick={handleSubmit}
            >
              Login
            </button>
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
        <ToastContainer />
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="d-flex justify-content-between">
            <h2
              ref={(_subtitle) => (subtitle = _subtitle)}
              className="text-dark h6"
            >
              Forgot Password?
            </h2>
            <p onClick={closeModal} className="circle_x">
              <i class="fa-solid fa-circle-xmark"></i>
            </p>
          </div>
          <div className="d-flex justify-content-start align-items-center mt-1">
            <input
              type={"text"}
              name="name"
              className="signupInp2 ps-2"
              placeholder="Number without country code*"
              onChange={(e)=>{
                setModalInput({...modalInput,mobilenumber : e.target.value})
              }}
              disabled={verifyOtp || sentOtp ? true : false}
            />
            {!sentOtp && 
              <button className="ms-sm-4 ms-1 veriButton text-light border-0 rounded-3"
              onClick={sendOtpHandle}
              >
                Send Code
              </button>
            }
          </div>
          <div className="d-flex justify-content-start align-items-center mt-3">
            <input
              type={"text"}
              name="name"
              className=" signupInp1 ps-2"
              placeholder="Enter code*"
              onChange={(e)=>{
                setModalInput({...modalInput,otp : e.target.value});
              }}
              disabled={verifyOtp ? true : false}
            />
            {
              sentOtp && !verifyOtp &&
              <button className="ms-sm-4 ms-1 veriButton text-light border-0 rounded-3"
              onClick={verifySentOtpHandle}
              >
                Verify Code
              </button>
            }
            {verifyOtp &&
              <div
                className="ps-3"
                style={{ fontSize: "12px", color: "green" }}
              >
                Verified!
              </div>
            }
          </div>
          <div className="d-flex justify-content-start align-items-start position-relative password2">
            <input
              type={showPassword ? "text" : "password"}
              name="name"
              className="mt-3 signupInp3 ps-2"
              placeholder="Password*"
              onChange={(e) => {
                setModalInput({...modalInput,password : e.target.value})
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
          <div className="d-flex justify-content-center">
            <button className="queryButton text-light border-0 mt-3"
            onClick={hanldeUpdatePassword}
            >
              Update Password?
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Login;
