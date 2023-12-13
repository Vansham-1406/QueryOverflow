import React, { useEffect } from "react";
import "../../assets/css/sidemenu.css";
import "../../assets/css/allQuestions.css";
import SingleQuestion from "./SingleQuestion";
import { useNavigate } from "react-router-dom";
import { useGetAllQuestion } from "../../redux/features/question/questionAction";
import { useSelector } from "react-redux";
import jwtdecode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllQuestions = () => {
  const navigate = useNavigate();
  const { getAllFunction } = useGetAllQuestion();
  const { loading } = useSelector((state) => state.question);
  const questionSearch = useSelector((state) => state.basic.questionSearch);

  useEffect(() => {
    getAllFunction();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    try {
      if (
        localStorage.getItem("token") &&
        jwtdecode(localStorage.getItem("token")).exp * 1000 < Date.now()
      ) {
        localStorage.removeItem("token");
      }
    } catch (error) {
      localStorage.removeItem("token");
    }
    // eslint-disable-next-line
  }, [localStorage.getItem("token")]);

  return (
    <div className="allQuestions">
      <div className="d-flex justify-content-between ps-lg-4 pe-ls-5 ps-2 pe-2">
        <h3 className="pt-1">All Questions</h3>
        <button
          className="query ps-3 pe-3"
          onClick={() => {
            if (localStorage.getItem("token")) {
              navigate("/askquery");
            } else {
              toast.warning("Please login or signup to ask queries", {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          }}
        >
          Ask Query
        </button>
      </div>
      <div className="ms-lg-4 ms-2 pt-4 total_question">
        <p>{questionSearch?.length} questions</p>
      </div>
      <div
        className={
          loading ? "d-flex align-items-center justify-content-center mb-2" : ""
        }
      >
        {loading ? (
          <div className="loader"></div>
        ) : Array.isArray(questionSearch) ? (
          questionSearch.map((singlequestion) => (
            <SingleQuestion
              singlequestion={singlequestion}
              key={singlequestion._id}
            />
          ))
        ) : (
          <p>No questions found</p>
        )}
      </div>
      <div className="bottom_line"></div>
      <ToastContainer />
    </div>
  );
};

export default AllQuestions;
