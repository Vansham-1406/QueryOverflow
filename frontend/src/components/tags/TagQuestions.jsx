import React, { useEffect } from "react";
import "../../assets/css/allQuestions.css";
import SingleQuestion from "../home/SingleQuestion";
import { useParams } from "react-router-dom";
import { useGetSingleTag } from "../../redux/features/tags/tagsAction";
import { useSelector } from "react-redux";

const TagQuestions = () => {
  const { getSingleTag } = useGetSingleTag();
  const singleTag = useSelector((state) => state.tags.singleTag);
  const tagname = useParams().tagname;
  useEffect(() => {
    getSingleTag(tagname);
    // eslint-disable-next-line
  }, [tagname]);

  return (
    <div>
      <div className="allQuestions">
        <div className="d-flex justify-content-between ps-lg-4 pe-ls-5 ps-2 pe-2">
          <h3 className="pt-1">Questions Tagged [{singleTag?.TagName}]</h3>
          <button className="query ps-3 pe-3">Ask Query</button>
        </div>
        <div className="ps-lg-4 pe-ls-5 ps-2 pe-2 pt-4">
          <p className="mb-0" style={{ fontSize: "13px" }}>
            {singleTag?.body}
          </p>
        </div>
        <div className="ms-lg-4 ms-2 pt-4 total_question">
          <p>{singleTag?.question?.length} questions</p>
        </div>
        <div>
          {singleTag.question?.length > 0 ? (
            singleTag.question?.map((singlequestion) => (
              <SingleQuestion singlequestion={singlequestion} />
            ))
          ) : (
            <div className="text-center mb-2">No Questions Tagged</div>
          )}
        </div>
        <div className="bottom_line"></div>
      </div>
    </div>
  );
};

export default TagQuestions;
