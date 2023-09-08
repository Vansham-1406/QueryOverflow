import React from "react";
import "../../assets/css/home.css";
import { useDispatch, useSelector } from "react-redux";
import { setMenu, setSearch } from "../../redux/features/basic/basicSlice";
import { useNavigate } from "react-router-dom";
const MenuBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const basic = useSelector((state) => state.basic);
  const { menu, search } = basic;
  return (
    <div className="menu">
      <div className="menubar_top"></div>
      <div className="container-lg">
        {search ? (
          <div className="row">
            <div className="col-11 position-relative menu_field d-lg-none d-block mb-2">
              <div className="d-lg-none d-block">
                <i className="fa fa-search position-absolute search"></i>
                <input
                  type={"text"}
                  className="w-100 menu_input"
                  name="search"
                  placeholder="Search for Questions..."
                />
              </div>
            </div>
            <div className="col-1 d-flex justify-content-center mt-1 align-items-center">
              <div
                onClick={() => {
                  dispatch(setSearch(false));
                }}
              >
                <i className="fa fa-xmark cross fs-4"></i>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-3 d-flex align-items-center justify-content-lg-center col-md-6 ps-lg-0 ps-3 col-4">
              <div
                className="d-lg-none d-block"
                onClick={() => {
                  dispatch(setMenu(!menu));
                }}
              >
                {menu ? (
                  <i className="fa fa-xmark fs-4 mt-2 me-sm-4 me-2"></i>
                ) : (
                  <i className="fa fa-bars fs-4 mt-2 me-sm-4 me-2"></i>
                )}
              </div>
              <div
                className="d-flex qo"
                onClick={() => {
                  navigate("/");
                }}
              >
                <img
                  src={require("../../assets/image/logo.png")}
                  className="img-fluid menu_logo mt-1"
                  alt="Query Overflow"
                />
                <div className="d-sm-flex pt-2 d-none mt-2">
                  <p className="ps-3 fs-5 mb-1">Query</p>
                  <p className="fs-5 ms-1 fw-bold mb-1">Overflow</p>
                </div>
              </div>
              <div className="d-lg-block d-none">
                <div className="menu_small_bar ms-4"></div>
              </div>
            </div>
            <div className="col-lg-6 position-relative menu_field col-md-0 d-lg-block d-none">
              <div className="d-lg-block d-none">
                <i className="fa fa-search position-absolute"></i>
                <input
                  type={"text"}
                  className="w-100 menu_input"
                  name="search"
                  placeholder="Search for Questions..."
                />
              </div>
            </div>
            <div className="p-0 col-lg-3 d-flex justify-content-lg-center justify-content-end align-items-center mt-1 col-md-6 col-8">
              <div
                className="d-lg-none d-block"
                onClick={() => {
                  dispatch(setSearch(true));
                }}
              >
                <i className="fa fa-search fs-5 pt-1 pe-4"></i>
              </div>
              <div>
                <button
                  className="menubar_btn1 me-2"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </button>
                <button
                  className="menubar_btn2 ms-2 me-lg-0 me-3"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="menubar_bottom"></div>
    </div>
  );
};

export default MenuBar;
