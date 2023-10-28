import React, { useState, useEffect } from "react";
import "../../assets/css/allQuestions.css";
import "../../assets/css/query.css";
import { useSelector } from "react-redux";
import { useGetAllTag } from "../../redux/features/tags/tagsAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";
import { useCreateQuestion } from "../../redux/features/question/questionAction";
import {useNavigate} from 'react-router-dom'


const Query = () => {
  const loading = useSelector((state) => state.question?.loading);
  const navigate = useNavigate();
  const tag = useSelector((state) => state.tags.tags);
  const [tagList, setTagList] = useState([]);
  const { getAllTag } = useGetAllTag();
  const [valueSave, setValueSave] = useState(false);
  useEffect(() => {
    getAllTag();
    setTagList(tag);
    // eslint-disable-next-line
  }, [tag]);

  useEffect(() => {
    try {
      if(!localStorage.getItem("token"))
      {
        navigate("/");
      }
      if (
        localStorage.getItem("token") &&
        jwtDecode(localStorage.getItem("token")).exp * 1000 < Date.now()
      ) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate]);

  const [tagName1, setTagName1] = useState("");
  const [tags, setTags] = useState([]);

  const removeTag = (removedTag) => {
    const findTag = tagList.find((tag) => tag.TagName === removedTag);
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
    const newTagId = inputQuestion.tags.filter((tage) => tage !== findTag._id);
    setInputQuestion({ ...inputQuestion, tags: newTagId });
  };

  const { createQuestion } = useCreateQuestion();

  // Input
  const [inputQuestion, setInputQuestion] = useState({
    body: "",
    title: "",
    userId: "",
    chatGptOpt: true,
    tags: [],
    image: "",
  });

  // Only for searching
  const addTag = (e) => {
    if (e.target.value === "") {
      setValueSave(false);
      setTagName1("");
    }
    if (e.target.value) {
      setTagName1(e.target.value);
      const save = tag.filter((item) =>
        item.TagName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setTagList(save);
      setValueSave(true);
    } else {
      getAllTag();
    }
  };

  // Image
  const handleUploadSubmit = (e) => {
    try {
      const file = new FileReader();
      file.readAsDataURL(e.target.files[0]);
      file.onloadend = () => {
        setInputQuestion({ ...inputQuestion, image: file.result });
      };
      file.onerror = () => {
        alert("error in image upload");
      };
    } catch (error) {
      toast.warning(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    try {
      if (
        localStorage.getItem("token") &&
        jwtDecode(localStorage.getItem("token")).exp * 1000 < Date.now()
      ) {
        localStorage.removeItem("token");
      } else {
        setInputQuestion({
          ...inputQuestion,
          userId: jwtDecode(localStorage.getItem("token")).id,
        });
      }
    } catch (error) {
      localStorage.removeItem("token");
    }
    // eslint-disable-next-line
  }, [inputQuestion?.userId]);

  const handleSubmit = () => {
    if (inputQuestion?.body === "") {
      toast.warning("Please enter content in body", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (inputQuestion?.title === "") {
      toast.warning("Please enter content in title", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (inputQuestion?.tags?.length === 0) {
      toast.warning("Please add atleast one tag", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    else
    {
      createQuestion(inputQuestion);
    }
  };

  return (
    <div className="allQuestions">
      <div className="d-flex justify-content-between ps-lg-4 pe-ls-5 ps-2 pe-2">
        <h3 className="pt-1">Ask a Question</h3>
      </div>
      <div className="ps-lg-4 pe-ls-5 ps-2 pe-2 pt-4">
        <p className="m-0 queryTitle">
          Be specific and imagine you are asking question to another person
        </p>
        <div className="input-group mb-3 mt-1">
          <span className="input-group-text queryTitle">Title*</span>
          <input
            type="text"
            className="form-control queryInput1"
            placeholder="Title should be understand, short and crisp"
            onChange={(e) => {
              setInputQuestion({ ...inputQuestion, title: e.target.value });
            }}
          />
        </div>
      </div>

      <div className="ps-lg-4 pe-ls-5 ps-2 pe-2 pt-4">
        <p className="m-0 queryTitle">
          Include all the neccessary information which would be neccessary for
          someone to answer
        </p>
        <div className="input-group mb-3 mt-1">
          <span className="input-group-text queryTitle">Body*</span>
          <textarea
            className="form-control queryInput2"
            onChange={(e) => {
              setInputQuestion({ ...inputQuestion, body: e.target.value });
            }}
          ></textarea>
        </div>
      </div>

      <div className="ps-lg-4 pe-ls-5 ps-2 pe-2 pt-4">
        <p className="m-0 queryTitle">
          Include all the neccessary code which would be neccessary for someone
          to answer
        </p>
        <div className="input-group mb-3 mt-1">
          <span className="input-group-text queryTitle">Code</span>
          <textarea
            className="form-control queryInput2"
            onChange={(e) => {
              setInputQuestion({ ...inputQuestion, code: e.target.value });
            }}
          ></textarea>
        </div>
      </div>

      <div className="ps-lg-4 pe-ls-5 ps-2 pe-2 pt-4">
        <p className="m-0 queryTitle">
          Do you want to opt for Chat Gpt answer?
        </p>
      </div>
      <div className="ps-lg-4 pe-ls-5 ps-2 pe-2 pt-1 d-flex">
        <input
          type="radio"
          name="chatgpt"
          value={"true"}
          checked
          onChange={(e) => {
            setInputQuestion({ ...inputQuestion, chatGptOpt: e.target.value });
          }}
        />
        <p className="m-0 p-0 radio_gpt ms-1">Yes</p>
      </div>
      <div className="ps-lg-4 pe-ls-5 ps-2 pe-2 pt-1 d-flex">
        <input
          type="radio"
          name="chatgpt"
          value={"false"}
          onChange={(e) => {
            setInputQuestion({ ...inputQuestion, chatGptOpt: e.target.value });
          }}
        />
        <p className="m-0 p-0 ms-1 radio_gpt">No</p>
      </div>

      <div className="ps-lg-4 pe-ls-5 ps-2 pe-2 pt-4">
        <p className="m-0 queryTitle">
          Choose the Tags according to topic of question
        </p>
        <div className="tag-container">
          {tags.map((tag, index) => {
            return (
              <div key={index} className="tag">
                {tag}{" "}
                <span
                  onClick={() => {
                    removeTag(tag);
                  }}
                >
                  <i className="fa-regular fa-circle-xmark"></i>
                </span>
              </div>
            );
          })}

          <input
            onChange={addTag}
            placeholder="Enter Tag name's"
            value={tagName1}
          />
        </div>
        {valueSave && (
          <div className="div_text p-2 d-flex flex-wrap">
            {tagList.map((tg) => (
              <div
                className="tag_list pt-1 pb-1 ps-2 pe-2 m-2"
                onClick={() => {
                  if (inputQuestion?.tags?.length < 5) {
                    setTags([...tags, tg.TagName]);
                    setInputQuestion({
                      ...inputQuestion,
                      tags: [...inputQuestion.tags, tg._id],
                    });
                    setTagName1("");
                    setValueSave(false);
                  } else {
                    toast.warning("Cannot add more than 5 tags", {
                      position: toast.POSITION.TOP_RIGHT,
                    });
                  }
                }}
              >
                {tg.TagName}
              </div>
            ))}
          </div>
        )}
        <ToastContainer />
      </div>

      <div className="ps-lg-4 pe-ls-5 ps-2 pe-2 pt-4">
        <p className="m-0 queryTitle">Upload the photo of code or error</p>
        <div className="input-group mb-3">
          <label className="input-group-text queryTitle">Upload</label>
          <input
            type="file"
            className="form-control"
            onChange={handleUploadSubmit}
          />
        </div>
      </div>

      <div className="ps-lg-4 pe-ls-5 ps-2 pe-2 pt-4">
        <button
          className="queryButton1 ps-3 pe-3 pt-3 pb-3 mb-4"
          onClick={handleSubmit}
        >
          {loading ? "loading..." : "Post your Question"}
        </button>
      </div>
    </div>
  );
};

export default Query;
