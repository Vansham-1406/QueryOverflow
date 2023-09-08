import React from "react";
import "../../assets/css/sidemenu.css";
import "../../assets/css/userPage.css";

const UserPage = () => {
  return (
    <div className="mainmenu d-flex pt-4 flex-wrap flex-lg-row flex-column">
      <div>
        <img
          src={require("../../assets/image/avatarL.png")}
          alt="Id number"
          height={"200"}
        />
      </div>
      <div className="d-flex userDetails ps-2 flex-column mb-5 pt-3 pt-lg-0">
        <div className="d-flex justify-content-between border_user pb-1 me-2">
          <div className="d-flex flex-column">
            <h4 className="mb-1 header_color">Vansham</h4>
            <p className="m-0">member for 22 days</p>
          </div>
          <div className="d-flex">
            <div className="d-flex flex-column">
              <h4 className="text-center mb-1">11</h4>
              <p className="m-0 header_color">Answers</p>
            </div>
            <div className="d-flex flex-column ps-3">
              <h4 className="text-center mb-1">11</h4>
              <p className="m-0 header_color">Questions</p>
            </div>
          </div>
        </div>
        <div className="mt-3 border_user me-2">
            <h5 className="header_color">Questions Asked</h5>
        </div>
        <div className="d-flex justify-content-between pt-3 border_user me-2 flex-column flex-sm-row align-items-center para_user">
            <div className="d-flex align-items-center">
                <p className="number_votes p-2 fw-bold">0</p>
                <p className="ms-2 ">Is it only me or NodeJS jobs are way less than what Youtubers are saying?</p>
            </div>
            <div>
                <p>29 minutes ago</p>
            </div>
        </div>
        <div className="d-flex justify-content-between pt-3 border_user me-2 flex-column flex-sm-row align-items-center para_user">
            <div className="d-flex align-items-center">
                <p className="number_votes p-2 fw-bold">0</p>
                <p className="ms-2 ">Is it only me or NodeJS jobs are way less than what Youtubers are saying?</p>
            </div>
            <div>
                <p>29 minutes ago</p>
            </div>
        </div>
        <div className="d-flex justify-content-between pt-3 border_user me-2 flex-column flex-sm-row align-items-center para_user">
            <div className="d-flex align-items-center">
                <p className="number_votes p-2 fw-bold">0</p>
                <p className="ms-2 ">Is it only me or NodeJS jobs are way less than what Youtubers are saying?</p>
            </div>
            <div>
                <p>29 minutes ago</p>
            </div>
        </div>
        <div className="d-flex justify-content-between pt-3 border_user me-2 flex-column flex-sm-row align-items-center para_user">
            <div className="d-flex align-items-center">
                <p className="number_votes p-2 fw-bold">0</p>
                <p className="ms-2 ">Is it only me or NodeJS jobs are way less than what Youtubers are saying?</p>
            </div>
            <div>
                <p>29 minutes ago</p>
            </div>
        </div>

        <div className="mt-3 border_user me-2">
            <h5 className="header_color">Answered Questions</h5>
        </div>
        <div className="d-flex justify-content-between pt-3 border_user me-2 flex-column flex-sm-row align-items-center para_user">
            <div className="d-flex align-items-center">
                <p className="number_votes p-2 fw-bold">0</p>
                <p className="ms-2 ">Is it only me or NodeJS jobs are way less than what Youtubers are saying?</p>
            </div>
            <div>
                <p>29 minutes ago</p>
            </div>
        </div>
        <div className="d-flex justify-content-between pt-3 border_user me-2 flex-column flex-sm-row align-items-center para_user">
            <div className="d-flex align-items-center">
                <p className="number_votes p-2 fw-bold">0</p>
                <p className="ms-2 ">Is it only me or NodeJS jobs are way less than what Youtubers are saying?</p>
            </div>
            <div>
                <p>29 minutes ago</p>
            </div>
        </div>
        <div className="d-flex justify-content-between pt-3 border_user me-2 flex-column flex-sm-row align-items-center para_user">
            <div className="d-flex align-items-center">
                <p className="number_votes p-2 fw-bold">0</p>
                <p className="ms-2 ">Is it only me or NodeJS jobs are way less than what Youtubers are saying?</p>
            </div>
            <div>
                <p>29 minutes ago</p>
            </div>
        </div>
        <div className="d-flex justify-content-between pt-3 border_user me-2 flex-column flex-sm-row align-items-center para_user">
            <div className="d-flex align-items-center">
                <p className="number_votes p-2 fw-bold">0</p>
                <p className="ms-2 ">Is it only me or NodeJS jobs are way less than what Youtubers are saying?</p>
            </div>
            <div>
                <p>29 minutes ago</p>
            </div>
        </div>
        <div className="d-flex justify-content-between pt-3 border_user me-2 flex-column flex-sm-row align-items-center para_user">
            <div className="d-flex align-items-center">
                <p className="number_votes p-2 fw-bold">0</p>
                <p className="ms-2 ">Is it only me or NodeJS jobs are way less than what Youtubers are saying?</p>
            </div>
            <div>
                <p>29 minutes ago</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
