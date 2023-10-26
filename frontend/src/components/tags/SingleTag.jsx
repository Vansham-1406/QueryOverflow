import React from "react";
import "../../assets/css/OtherTag.css";
import { useNavigate } from "react-router-dom";
const SingleTag = ({ singleTag }) => {
  const navigate = useNavigate();
  
  function truncateTextToWords(text, wordCount) {
    const words = text.split(' ');
    const truncatedText = words.slice(0, wordCount).join(' ');
    return truncatedText;
  }
  
  return (
    <div className="singleTag m-lg-2 mt-3 me-3 ps-2 pe-2 pt-2 pb-2 d-flex flex-column">
      <div
        className="singleTagBox"
        onClick={() => {
          navigate(`/tags/${singleTag?._id}`);
        }}
      >
        <p className="ps-2 pe-2 pt-1 pb-1 mb-0">{singleTag?.TagName}</p>
      </div>
      <div className="singleText mt-2">
        <p className="mb-0">
          {truncateTextToWords(singleTag?.body, 15)}...
        </p>
      </div>
      <div className="singleQuestionTag mt-2">
        <b>{singleTag?.question?.length}</b> questions
      </div>
    </div>
  );
};

export default SingleTag;
