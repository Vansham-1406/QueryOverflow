import React, { useEffect } from "react";
import "../../assets/css/sidemenu.css";
import "../../assets/css/allQuestions.css";
import SingleQuestion from "./SingleQuestion";
import { useNavigate } from "react-router-dom";
import { useGetAllQuestion } from "../../redux/features/question/questionAction";
import { useSelector } from "react-redux";

const AllQuestions = () => {
  const navigate = useNavigate();
  const { getAllFunction } = useGetAllQuestion();

  const { AllQuestion, loading } = useSelector((state) => state.question);

  useEffect(() => {
    getAllFunction();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="allQuestions">
      <div className="d-flex justify-content-between ps-lg-4 pe-ls-5 ps-2 pe-2">
        <h3 className="pt-1">All Questions</h3>
        <button
          className="query ps-3 pe-3"
          onClick={() => {
            navigate("/askquery");
          }}
        >
          Ask Query
        </button>
      </div>
      <div className="ms-lg-4 ms-2 pt-4 total_question"> 
        <p>{AllQuestion?.length} questions</p>
      </div>
      <div className={loading? "d-flex align-items-center justify-content-center mb-2" : ""}>
        {loading? (
          <div class="loader"></div>
        ) : (
          AllQuestion.map((singlequestion) => (
            <SingleQuestion
              singlequestion={singlequestion}
              key={singlequestion._id}
            />
          ))
        )}
      </div>
      <div className="bottom_line"></div>
    </div>
  );
};

export default AllQuestions;
