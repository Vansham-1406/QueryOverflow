import React from "react";
import MenuBar from "./home/MenuBar";
import SideMenu from "./home/SideMenu";
import MainMenu from "./home/MainMenu";
const SingleTagPage = () => {
  return (
    <div>
      <div>
        <MenuBar />
        <div className="d-flex">
          <SideMenu />
          <MainMenu />
        </div>
      </div>
    </div>
  );
};

export default SingleTagPage;
