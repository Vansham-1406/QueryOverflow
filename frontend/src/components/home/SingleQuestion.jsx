import React from "react";

const SingleQuestion = () => {
  return (
    <div className="d-flex flex-column">
      <div className="singleQuestion ms-lg-2 ms-0 ps-lg-1 mb-1 ps-3 pt-sm-0 pt-1">
        <div className="d-flex flex-wrap">
          <div
            className="d-flex flex-sm-column flex-row text-center mt-1 singleQuestionPara"
            style={{ flex: "15%" }}
          >
            <p className="m-0 fs-4 d-none d-sm-block">0</p>
            <p className="m-0 d-none d-sm-block">votes</p>
            <p className="m-0 fs-4 d-none d-sm-block">1</p>
            <p className="m-0 d-none d-sm-block">answers</p>
            <p className="m-0 mt-1 d-none d-sm-block">2 views</p>
            <p className="m-0 d-block d-sm-none">
              <b>0</b>
            </p>
            <p className="m-0 d-block d-sm-none ms-1">votes</p>
            <p className="m-0 d-block d-sm-none ms-2">
              <b>1</b>
            </p>
            <p className="m-0 d-block d-sm-none ms-1">answers</p>
            <p className="m-0 d-block d-sm-none ms-2">
              <b>2</b> views
            </p>
          </div>
          <div style={{ flex: "85%" }}>
            <div className="d-flex flex-column mt-2 questionHeader pe-5">
              <h3 className="mt-1 mb-0">
                What’s the best state management library for react?
              </h3>
              <p className="mb-0">
                idk,same as title. Best state management library for react?
              </p>
              <div className="d-flex mt-2">
                <div className="tagHeader ps-3 pe-3 pt-2 pb-2 me-2 ms-2">
                  Redux
                </div>
                <div className="tagHeader ps-3 pe-3 pt-2 pb-2 me-2 ms-2">
                  React
                </div>
                <div className="tagHeader ps-3 pe-3 pt-2 pb-2 me-2 ms-2">
                  State
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-sm-end justify-content-start mt-3 mt-sm-0">
                  <div>
                    <img
                      src={require("../../assets/image/logo1.png")}
                      alt="avatar"
                      height={"40"}
                      width="40"
                    />
                  </div>
                  <div className="d-flex flex-column justify-content-center ms-2">
                    <p className="mb-0 userTime">asked 27 minutes ago</p>
                    <p className="mb-0 userName">aman</p>
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
