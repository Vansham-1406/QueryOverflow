import React, { useState, useEffect } from "react";
import "../../assets/css/singleQuestion.css";
import { useParams, useNavigate } from "react-router-dom";
import {
  useBookMark,
  useCreateDownVote,
  useCreateUpVote,
  useGetSingleQuestion,
  useIfDownVote,
  useIfUpVote,
  useIsBookmark,
} from "../../redux/features/question/questionAction";
import { useSelector } from "react-redux";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useBookMarkAnswer,
  useCreateAnswer,
} from "../../redux/features/answer/answerAction";
import jwtDecode from "jwt-decode";

const SingleQuery = () => {
  const { createAnswer } = useCreateAnswer();
  const { createUpVote } = useCreateUpVote();
  const { createdownVote } = useCreateDownVote();
  const { ifDownVote } = useIfDownVote();
  const { ifUpVote } = useIfUpVote();
  const questionId = useParams().questionID;
  const navigate = useNavigate();
  const { getSingleQuestion } = useGetSingleQuestion();
  const question = useSelector((state) => state.question.singlequestion);
  const isUpvoted = useSelector((state) => state.question.isUpvoted);
  const isDownvoted = useSelector((state) => state.question.isDownvoted);
  const user = useSelector((state) => state.user.SingleUser);
  const question1 = useSelector((state) => state.question);
  const { isBookMark } = useIsBookmark();
  const { bookmark } = useBookMark();
  const { bookmark1 } = useBookMarkAnswer();

  useEffect(() => {
    getSingleQuestion(questionId);
    // eslint-disable-next-line
  }, []);

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

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const userId = jwtDecode(token).id;
        ifDownVote(questionId, userId);
        ifUpVote(questionId, userId);
        isBookMark(questionId, userId);
      }
    } catch (error) {}
    // eslint-disable-next-line
  }, [questionId]);

  const handlePostAnswer = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User is not logged in", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    const userId = jwtDecode(token).id;

    if (askQuery.body === "") {
      toast.warning("Enter text in body to submit answer", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    console.log("questionId", questionId);
    console.log("userId", userId);
    if (userId && questionId) {
      setAskQuery((prevAskQuery) => ({
        ...prevAskQuery,
        questionId,
        userId,
      }));
    
      if(askQuery?.questionId && askQuery?.userId)
      {
        createAnswer(askQuery).then(() => {
          console.log('askQuery', askQuery); // This will log the updated state
          setAskQuery({ ...askQuery, body: "" });
        }).catch((err) => {
          console.log('err', err);
        });
      }
    }
    
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

  const hanldeUpVote = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User is not logged in", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const userId = jwtDecode(token).id;
    createUpVote(questionId, userId);
  };

  const handleDownVote = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User is not logged in", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const userId = jwtDecode(token).id;
    createdownVote(questionId, userId);
  };

  const handleBookMark = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User is not logged in", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const userId = jwtDecode(token).id;
    bookmark(questionId, userId);
  };

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
      </div>
      <div className="ps-lg-4 pe-ls-5 ps-2 pe-2 pt-4 d-flex">
        <div className="d-flex flex-column pe-sm-4 pe-3 align-items-center">
          {/* upvote */}
          <div className="hover_arrow" onClick={hanldeUpVote}>
            {question1?.isupvote ? (
              <i
                class="fa-solid fa-circle-arrow-up fs-3"
                style={{ color: "#ffd700" }}
              ></i>
            ) : (
              <i class="fa-solid fa-circle-arrow-up fs-3"></i>
            )}
          </div>
          <div className="mt-2 mb-2">
            <p className="m-0 p-0 fs-5">
              {isUpvoted || isDownvoted
                ? question?.upvote?.length - question?.downvote?.length
                : question?.upvote?.length - question?.downvote?.length}
            </p>
          </div>
          {/* downvote */}
          <div className="hover_arrow" onClick={handleDownVote}>
            {question1?.isdownvote ? (
              <i
                class="fa-solid fa-circle-arrow-down fs-3"
                style={{ color: "red" }}
              ></i>
            ) : (
              <i class="fa-solid fa-circle-arrow-down fs-3"></i>
            )}
          </div>
          {/* bookmark question */}
          <div className="mt-3 hover_arrow pb-4" onClick={handleBookMark}>
            {question1?.isbookmark ? (
              <i
                className="fa-regular fa-bookmark fs-5"
                style={{ color: "gold" }}
              ></i>
            ) : (
              <i className="fa-regular fa-bookmark fs-5"></i>
            )}
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
                <div
                  className="tagHeader ps-3 pe-3 me-2 ms-2 pt-1 hover_arrow"
                  onClick={() => {
                    navigate(`/tags/${tag?._id}`);
                  }}
                >
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

              <div
                className="d-flex pt-1 align-items-center hover_arrow"
                onClick={() => {
                  navigate(`/users/${question?.userId?._id}`);
                }}
              >
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
          question?.answers?.map((answer) => {
            const isAnswerBookmarked =
              user.bookmarkedAnswer &&
              user.bookmarkedAnswer.some(
                (bookmark) => bookmark._id === answer._id
              );
            return (
              <div className="ps-lg-4 pe-ls-5 ps-2 pe-2 pt-4 d-flex">
                <div className="d-flex flex-column pe-sm-4 pe-3 align-items-center">
                  {/* BookMark Answer */}
                  <div
                    className="mt-3 hover_arrow pb-4"
                    onClick={() => {
                      const token = localStorage.getItem("token");
                      if (token) {
                        const userId = jwtDecode(token).id;
                        bookmark1(answer?._id, userId);
                      } else {
                        toast.error("User is not logged in", {
                          position: toast.POSITION.TOP_RIGHT,
                        });
                      }
                    }}
                  >
                    {isAnswerBookmarked ? (
                      <i
                        class="fa-regular fa-bookmark fs-5"
                        style={{ color: "gold" }}
                      ></i>
                    ) : (
                      <i class="fa-regular fa-bookmark fs-5"></i>
                    )}
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
                      <div
                        className="d-flex pt-1 align-items-center hover_arrow"
                        onClick={() => {
                          navigate(`/users/${answer?.userId?._id}`);
                        }}
                      >
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
            );
          })
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
              <div
                className="boxSingleTag1 d-flex align-items-center hover_arrow"
                onClick={() => {
                  navigate(`/tags/${tag?._id}`);
                }}
              >
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
