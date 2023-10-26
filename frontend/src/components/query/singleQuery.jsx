import React, { useState, useEffect } from "react";
import "../../assets/css/singleQuestion.css";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleQuestion } from "../../redux/features/question/questionAction";
import { useSelector } from "react-redux";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateAnswer } from "../../redux/features/answer/answerAction";
import jwtDecode from "jwt-decode";

const SingleQuery = () => {
  const { createAnswer } = useCreateAnswer();
  const questionID = useParams().questionID;
  const navigate = useNavigate();
  const { getSingleQuestion } = useGetSingleQuestion();
  const question = useSelector((state) => state.question.singlequestion);
  useEffect(() => {
    getSingleQuestion(questionID);
    // eslint-disable-next-line
  }, [questionID]);

  const [askQuery, setAskQuery] = useState({
    body: "",
    code: "",
    image: "",
    questionId: "",
    userId: "",
  });

  const [tabbar, setTabbar] = useState("body");
  const removeBackticks = (code) => {
    return code.replace(/```/g, "");
  };

  const handleUploadSubmit = (e) => {
    const file = new FileReader();
    file.readAsDataURL(e.target.files[0]);
    file.onloadend = () => {
      setAskQuery({ ...askQuery, image: file.result });
    };
    file.onerror = () => {
      alert("error in image upload");
    };
  };

  const handlePostAnswer = () => {
    if (!localStorage.getItem("token")) {
      toast.error("User is not logged in", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    const id = jwtDecode(localStorage?.getItem("token")).id;
    setAskQuery({ ...askQuery, questionId: questionID });
    setAskQuery({ ...askQuery, userId: id });
    createAnswer(askQuery);
  };

  function getTimeDiff(createdAt) {
    const now = new Date();

    const diffMs = now.getTime() - createdAt;

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(
      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    if (diffDays > 0) {
      return `${diffDays} days ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hours ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minutes ago`;
    } else {
      return `${diffSeconds} seconds ago`;
    }
  }

  return (
    <div className="allQuestions">
      <div className="d-flex justify-content-between ps-lg-4 pe-ls-5 ps-2 pe-2 flex-column flex-sm-row">
        <div className="d-flex flex-column">
          <h3 className="pt-1 questionHeader">{question?.title}</h3>
          <div className="d-flex justify-content-between ask_view">
            <p className="m-0 p-0">
              Asked <b>{getTimeDiff(question?.createdAt)}</b>
            </p>
            <p className="m-0 p-0 ms-4">
              Viewed <b> {question?.view?.length} times</b>
            </p>
          </div>
        </div>
        <div>
          <button className="query ps-3 pe-3">Ask Query</button>
        </div>
      </div>
      <div className="ps-lg-4 pe-ls-5 ps-2 pe-2 pt-4 d-flex">
        <div className="d-flex flex-column pe-sm-4 pe-3 align-items-center">
          <div className="hover_arrow">
            <i class="fa-solid fa-circle-arrow-up fs-4"></i>
          </div>
          <div className="mt-2 mb-2">
            <p className="m-0 p-0 fs-5">
              {question?.upvote?.length - question?.downvote?.length}
            </p>
          </div>
          <div className="hover_arrow">
            <i class="fa-solid fa-circle-arrow-down fs-4"></i>
          </div>
          <div className="mt-3 hover_arrow pb-4">
            <i className="fa-regular fa-bookmark fs-5"></i>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-between">
          <p className="text-justify m-0 p-0">{question?.body}</p>
          {question?.code && (
            <div className="code-bg mt-3 p-2">
              <pre> question?.code</pre>
            </div>
          )}
          {question?.image && (
            <div className="mt-3">
              <img
                src={question?.image}
                alt="CODE ERROR"
                className="img-fluid"
              />
            </div>
          )}
          <div className="d-flex mt-4 justify-content-between">
            <div className="pb-4 d-flex">
              {question?.tags?.map((tag) => (
                <div className="tagHeader ps-3 pe-3 me-2 ms-2 pt-1">
                  <p className="ps-2 pe-2 pt-1 mb-0 pb-1">{tag?.TagName}</p>
                </div>
              ))}
            </div>
            <div className="user_box d-flex flex-column p-2">
              <p className="m-0 p-0 asked_text1">
                asked{" "}
                {moment(question?.createdAt / 1).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
              </p>

              <div className="d-flex pt-1 align-items-center">
                <img
                  src={question?.userId?.avatarImage}
                  height={30}
                  alt="avatar"
                />
                <p className="m-0 p-0 user_name ps-2">
                  {question?.userId?.name}
                </p>
              </div>
            </div>
          </div>
          {question?.chatGptOpt && (
            <div className="code-bg mt-3 p-2">
              <div className="d-flex ms-3 pt-1">
                <img
                  src={require("../../../src/assets/image/chatgpt.png")}
                  width={30}
                  height={30}
                  className="img-fluid"
                  alt="ChatGpt Logo"
                />
                <p className="m-0 p-0 ms-2 pt-2 chatgpt_text">
                  Chat GPT Answer
                </p>
              </div>
              <pre className="ms-3 mt-3">
                {removeBackticks(question?.chatGptAnswer)}
              </pre>
            </div>
          )}
        </div>
      </div>
      <div className="bottom_line mt-4"></div>
      <div className="d-flex flex-column ms-4 mt-4">
        <p className="m-0 p-0 h5">{question?.answers?.length} Answer</p>
        {question?.answers?.length > 0 ? (
          question?.answers?.map((answer) => (
            <div className="ps-lg-4 pe-ls-5 ps-2 pe-2 pt-4 d-flex">
              <div className="d-flex flex-column pe-sm-4 pe-3 align-items-center">
                <div className="hover_arrow">
                <i class="fa-solid fa-circle-arrow-up fs-4"></i>
                </div>
                <div className="mt-2 mb-2">
                  <p className="m-0 p-0 fs-5">
                    {answer?.upvote?.length - answer?.downvote?.length}
                  </p>
                </div>
                <div className="hover_arrow">
                <i class="fa-solid fa-circle-arrow-down fs-4"></i>
                </div>
                <div className="mt-3 hover_arrow pb-4">
                  <i class="fa-regular fa-bookmark fs-5"></i>
                </div>
              </div>
              <div className="d-flex flex-column justify-content-between w-100">
                <p className="text-justify m-0 p-0">{answer?.body}</p>
                {answer?.code && (
                  <div className="code-bg mt-3 p-2">
                    <pre>{answer?.code}</pre>
                  </div>
                )}
                {answer?.image && (
                  <div className="mt-3">
                    <img
                      src={answer?.image}
                      alt="CODE ERROR"
                      className="img-fluid"
                    />
                  </div>
                )}
                <div className="d-flex mt-4">
                  <div className="user_box d-flex flex-column p-2">
                    <p className="m-0 p-0 asked_text1">
                      answered on{" "}
                      {moment(answer?.createdAt / 1).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </p>
                    <div className="d-flex pt-1 align-items-center">
                      <img
                        src={answer?.userId?.avatarImage}
                        height={30}
                        alt="avatar"
                      />
                      <p className="m-0 p-0 user_name ps-2">
                        {answer?.userId?.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bottom_line mt-4 w-100"></div>
              </div>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
      <div className="d-flex flex-column ms-4 mb-5 mt-3 me-2">
        <p className="m-0 p-0 h5">Your Answer</p>
        <div className="d-flex mt-3 tabbar_main pt-2 pb-2 ps-2">
          <p
            className="m-0 p-0 tabbar_info d-flex justify-content-center align-items-center pe-3"
            onClick={() => {
              setTabbar("body");
            }}
          >
            Body
            <i class="fa-regular fa-keyboard ms-1"></i>
          </p>
          <p
            className="m-0 p-0 tabbar_info d-flex justify-content-center align-items-center pe-3"
            onClick={() => {
              setTabbar("code");
            }}
          >
            Code
            <i class="fa-solid fa-code ms-1"></i>
          </p>
          <p
            className="m-0 p-0 tabbar_info d-flex justify-content-center align-items-center"
            onClick={() => {
              setTabbar("image");
            }}
          >
            Image
            <i class="fa-regular fa-image ms-1"></i>
          </p>
        </div>
        <div>
          <div>
            {tabbar === "body" && (
              <textarea
                placeholder="Enter body"
                className="tabbar_textarea p-2"
                value={askQuery.body}
                onChange={(e) => {
                  setAskQuery({ ...askQuery, body: e.target.value });
                }}
              ></textarea>
            )}
          </div>
          <div>
            {tabbar === "code" && (
              <textarea
                placeholder="Enter Code"
                className="tabbar_textarea p-2"
                value={askQuery.code}
                onChange={(e) => {
                  setAskQuery({ ...askQuery, code: e.target.value });
                }}
              ></textarea>
            )}
          </div>
          <div>
            {tabbar === "image" && (
              <input
                type="file"
                className="tabber_image"
                onChange={handleUploadSubmit}
              />
            )}
          </div>
        </div>
        <div className="mt-3 d-flex justify-content-center">
          <button
            className="button_answer ps-3 pe-3 pt-2 pb-2"
            onClick={handlePostAnswer}
          >
            Post your answer
          </button>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-4 flex-row flex-sm-column">
          <p className="m-0 p-0 pb-2">
            Not the answer you're looking for? Browse other questions tagged{" "}
          </p>
          <div className="d-flex pb-2">
            {question?.tags?.map((tag) => (
              <div className="boxSingleTag1 d-flex align-items-center">
                <p className="ps-2 pe-2 pt-1 mb-0 pb-1">{tag?.TagName}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="m-0 p-0 justify-content-center d-flex">
          or{" "}
          <div
            className="ask_query ms-1"
            onClick={() => {
              navigate("/askquery");
            }}
          >
            ask your own question
          </div>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SingleQuery;
