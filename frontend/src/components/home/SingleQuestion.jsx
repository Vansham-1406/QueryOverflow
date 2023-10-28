import React from "react";
import { useNavigate } from "react-router-dom";

const SingleQuestion = ({ singlequestion }) => {
  const navigate = useNavigate();
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

  const timeDiff = getTimeDiff(singlequestion?.createdAt);

  function truncateTextToWords(text, wordCount) {
    const words = text?.split(" ");
    const truncatedText = words?.slice(0, wordCount)?.join(" ");
    return truncatedText;
  }

  return (
    <div className="d-flex flex-column">
      <div className="singleQuestion ms-lg-2 ms-0 ps-lg-1 mb-1 ps-3 pt-sm-0 pt-1">
        <div className="d-flex flex-wrap">
          <div
            className="d-flex flex-sm-column flex-row text-center mt-1 singleQuestionPara"
            style={{ flex: "15%" }}
          >
            <p className="m-0 fs-4 d-none d-sm-block mt-1">
              {singlequestion?.upvote?.length -
                singlequestion?.downvote?.length}
            </p>
            <p className="m-0 d-none d-sm-block">votes</p>
            <p className="m-0 fs-4 d-none d-sm-block">
              {singlequestion?.answers?.length}
            </p>
            <p className="m-0 d-none d-sm-block">answers</p>
            <p className="m-0 mt-1 d-none d-sm-block">
              {singlequestion?.view?.length} views
            </p>
            <p className="m-0 d-block d-sm-none">
              <b>
                {singlequestion?.upvote?.length -
                  singlequestion?.downvote?.length}
              </b>
            </p>
            <p className="m-0 d-block d-sm-none ms-1">votes</p>
            <p className="m-0 d-block d-sm-none ms-2">
              <b>{singlequestion?.answers?.length}</b>
            </p>
            <p className="m-0 d-block d-sm-none ms-1">answers</p>
            <p className="m-0 d-block d-sm-none ms-2">
              <b>{singlequestion?.view?.length}</b> views
            </p>
          </div>
          <div style={{ flex: "85%" }}>
            <div className="d-flex flex-column mt-2 questionHeader me-5">
              <h3
                className="mt-1 mb-0"
                onClick={() => {
                  navigate(`/query/${singlequestion?._id}`);
                }}
              >
                {singlequestion?.title}
              </h3>
              <p className="mb-0">
                {truncateTextToWords(singlequestion?.body, 20)}
              </p>
              <div className="d-flex mt-2">
                {singlequestion?.tags?.map((tag) => (
                  <div
                    className="tagHeader ps-3 pe-3 me-2 ms-2 tag_hoverr"
                    key={tag?._id}
                    onClick={() => {
                      navigate(`/tags/${tag?._id}`);
                    }}
                  >
                    {tag?.TagName}
                  </div>
                ))}
              </div>
              <div>
                <div className="d-flex justify-content-sm-end justify-content-start mt-3 mt-sm-0">
                  <div className="tag_hoverr d-flex" onClick={()=>{
                    navigate(`/users/${singlequestion?.userId?._id}`)
                  }}>
                    <div>
                      <img
                        src={singlequestion?.userId?.avatarImage}
                        alt={singlequestion?.userId?.name}
                        height={"40"}
                        width="40"
                      />
                    </div>
                    <div className="d-flex flex-column justify-content-center ms-2">
                      <p className="mb-0 userTime">asked {timeDiff}</p>
                      <p className="mb-0 userName">
                        {singlequestion?.userId?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleQuestion;
