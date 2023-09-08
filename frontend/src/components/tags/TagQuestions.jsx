import React from "react";
import "../../assets/css/allQuestions.css";
import SingleQuestion from "../home/SingleQuestion";

const TagQuestions = () => {
  return (
    <div>
      <div className="allQuestions">
        <div className="d-flex justify-content-between ps-lg-4 pe-ls-5 ps-2 pe-2">
          <h3 className="pt-1">Questions Tagged [Javascript]</h3>
          <button className="query ps-3 pe-3">Ask Query</button>
        </div>
        <div className="ps-lg-4 pe-ls-5 ps-2 pe-2 pt-4">
          <p className="mb-0" style={{fontSize:"13px"}}>
            For questions about programming in ECMAScript (JavaScript/JS) and
            its different dialects/implementations (except for ActionScript).
            Note that JavaScript is NOT Java. Include all tags that are relevant
            to your question: e.g., [node.js], [jQuery], [JSON], [ReactJS],
            [angular], [ember.js], [vue.js], [typescript], [svelte], etc.
          </p>
        </div>
        <div className="ms-lg-4 ms-2 pt-4 total_question">
          <p>100 questions</p>
        </div>
        <div>
          <SingleQuestion />
          <SingleQuestion />
          <SingleQuestion />
          <SingleQuestion />
          <SingleQuestion />
          <SingleQuestion />
          <SingleQuestion />
        </div>
        <div className="bottom_line"></div>
      </div>
    </div>
  );
};

export default TagQuestions;
