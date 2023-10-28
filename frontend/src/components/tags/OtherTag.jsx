import React, { useEffect, useState } from "react";
import "../../assets/css/sidemenu.css";
import "../../assets/css/OtherTag.css";
import SingleTag from "./SingleTag";
import { useSelector } from "react-redux";
import { useGetAllTag } from "../../redux/features/tags/tagsAction";
import jwtdecode from 'jwt-decode'

const OtherTag = () => {
  const tag = useSelector((state) => state.tags.tags);
  const [tagList, setTagList] = useState([]);
  const { getAllTag } = useGetAllTag();
  useEffect(() => {
    getAllTag();
    setTagList(tag);
    // eslint-disable-next-line
  }, [tag]);

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
  }, []);

  const handleTagSearch = (e) => {
    if (e.target.value === "") {
      setTagList(tag);
    }
    if (e.target.value) {
      const save = tag.filter((item) =>
        item.TagName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setTagList(save);
    } else {
      getAllTag();
    }
  };

  console.log("tag", tag);
  return (
    <div className="mainmenu d-flex pt-3 ps-3 flex-wrap flex-column">
      <div>
        <h3 className="fw-normal">Tags</h3>
      </div>
      <div className="mt-2 OtherTagP">
        <p className="mb-0">
          A tag is a keyword or label that categorizes your question with other,
          similar questions.
        </p>
        <p className="mb-0">
          Using the right tags makes it easier for others to find and answer
          your question.
        </p>
      </div>
      <div className="position-relative">
        <i className="fa fa-search position-absolute iconTag"></i>
        <input
          type="text"
          className="mt-4 othertagInput ps-4"
          placeholder="Search for Tags..."
          onChange={handleTagSearch}
        />
      </div>
      <div className="d-flex flex-wrap mt-4">
        {tagList.map((singleTag) => (
          <SingleTag singleTag={singleTag} key={singleTag?.TagName} />
        ))}
      </div>
    </div>
  );
};

export default OtherTag;
