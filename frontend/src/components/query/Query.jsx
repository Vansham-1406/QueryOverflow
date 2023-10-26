import React, { useState } from "react";
import "../../assets/css/allQuestions.css";
import "../../assets/css/query.css";


const Query = () => {
  const [inputQuestion, setInputQuestion] = useState({
    body: "What is friend function?",
    title: "friend function",
    userId: "65296e608de4814ab1cd4764",
    chatGptOpt: true,
    tags: ["652946c80b894ae8a542a5e0"],
    image: "",
  });

  const handleUploadSubmit = (e) => {
    const file = new FileReader();
    file.readAsDataURL(e.target.files[0]);
    file.onloadend = () => {
      setInputQuestion({ ...inputQuestion, image: file.result });
    };
    file.onerror = () => {
      alert("error in image upload");
    };
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
        <div class="input-group mb-3 mt-1">
          <span class="input-group-text queryTitle">Title*</span>
          <input
            type="text"
            class="form-control queryInput1"
            placeholder="Title should be of less than 20 words"
          />
        </div>
      </div>

      <div className="ps-lg-4 pe-ls-5 ps-2 pe-2 pt-4">
        <p className="m-0 queryTitle">
          Include all the neccessary information which would be neccessary for
          someone to answer
        </p>
        <div class="input-group mb-3 mt-1">
          <span class="input-group-text queryTitle">Body*</span>
          <textarea class="form-control queryInput2"></textarea>
        </div>
      </div>

      <div className="ps-lg-4 pe-ls-5 ps-2 pe-2 pt-4">
        <p className="m-0 queryTitle">
          Include all the neccessary code which would be neccessary for someone
          to answer
        </p>
        <div class="input-group mb-3 mt-1">
          <span class="input-group-text queryTitle">Code</span>
          <textarea class="form-control queryInput2"></textarea>
        </div>
      </div>

      <div className="ps-lg-4 pe-ls-5 ps-2 pe-2 pt-4">
        <p className="m-0 queryTitle">
          Do you want to opt for Chat Gpt answer?
        </p>
      </div>
      <div className="ps-lg-4 pe-ls-5 ps-2 pe-2 pt-1 d-flex">
        <input type="radio" name="chatgpt" value={"true"} />
        <p className="m-0 p-0 radio_gpt ms-1">Yes</p>
      </div>
      <div className="ps-lg-4 pe-ls-5 ps-2 pe-2 pt-1 d-flex">
        <input type="radio" name="chatgpt" value={"false"} />
        <p className="m-0 p-0 ms-1 radio_gpt">No</p>
      </div>

      <div className="ps-lg-4 pe-ls-5 ps-2 pe-2 pt-4">
        <p className="m-0 queryTitle">
          Tags:
        </p>
        <input type="text" onChange={()=>{}}/>
      </div>

      <div className="ps-lg-4 pe-ls-5 ps-2 pe-2 pt-4">
        <p className="m-0 queryTitle">Upload the photo of code or error</p>
        <div class="input-group mb-3">
          <label class="input-group-text queryTitle">Upload</label>
          <input
            type="file"
            class="form-control"
            onChange={handleUploadSubmit}
          />
        </div>
      </div>

      <div className="ps-lg-4 pe-ls-5 ps-2 pe-2 pt-4">
        <button
          className="queryButton1 ps-3 pe-3 pt-3 pb-3"
        >
          Post your Question
        </button>
      </div>
    </div>
  );
};

export default Query;
