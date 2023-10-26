import React, { useEffect } from "react";
import "../../assets/css/sidemenu.css";
import "../../assets/css/topTags.css";
import { useSelector } from "react-redux";
import { useGetTopTags } from "../../redux/features/tags/tagsAction";
import { useNavigate } from "react-router-dom";

const TopTags = () => {
  const navigate = useNavigate();
  const { getAllTopTag } = useGetTopTags();
  const topTag = useSelector((state) => state?.tags?.topTag);

  useEffect(() => {
    getAllTopTag();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="topTags ms-lg-2 ms-0 mt-lg-0 mt-4 ms-2 me-2 mb-lg-0 mb-5">
      <div className="topTagsBox">
        <div className="pt-2 ps-3 pb-3">
          <h2 className="fs-5 fw-bold mb-1">Top Tags</h2>
          <div className="d-flex flex-wrap">
            {topTag?.map((tag) => (
              <div
                className="d-flex mb-0 mt-3 singleTopBox hover_tag"
                key={tag?._id}
                onClick={() => {
                  navigate(`/tags/${tag?._id}`);
                }}
              >
                <div className="boxSingleTag d-flex">
                  <p className="ps-2 pe-2 pt-1 mb-0 pb-1">{tag?.TagName}</p>
                </div>
                <p className="mb-0 ms-2 num">x {tag?.question?.length}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopTags;
