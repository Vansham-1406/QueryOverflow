import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { useDispatch, useSelector } from "react-redux";
import { setMenu, setSearch } from "../../redux/features/basic/basicSlice";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useSingleImageUser } from "../../redux/features/user/userActions";
import { setEmptySingleUser } from "../../redux/features/user/userSlice";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateTag } from "../../redux/features/tags/tagsAction";
import Modal from "react-modal";
import { setQuestionSearch } from "../../redux/features/basic/basicSlice";
import { useLocation } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const MenuBar = () => {
  const { singleImage } = useSingleImageUser();
  const { createTag } = useCreateTag();
  const user = useSelector((state) => state.user.SingleUser);
  const AllQuestion = useSelector((state) => state.question.AllQuestion);
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [tagName, setTagName] = useState("");
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    try {
      if (
        localStorage.getItem("token") &&
        jwtDecode(localStorage.getItem("token")).exp * 1000 > Date.now()
      ) {
        const id = jwtDecode(localStorage.getItem("token")).id;
        singleImage(id);
      } else {
        localStorage.removeItem("token");
        dispatch(setEmptySingleUser());
      }
    } catch (error) {
      localStorage.removeItem("token");
    }
    // eslint-disable-next-line
  }, []);

  const dispatch = useDispatch();
  const pathname = useLocation().pathname;
  console.log('pathname', pathname)
  useEffect(() => {
    dispatch(setQuestionSearch(AllQuestion));
    // eslint-disable-next-line
  }, [AllQuestion]);

  const navigate = useNavigate();
  const basic = useSelector((state) => state.basic);
  const { menu, search } = basic;
  const handleTopTag = () => {
    if (!localStorage.getItem("token")) {
      toast.error("You are not logged in", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    createTag(tagName).then(() => closeModal());
  };

  const handleSearchInput = (e) => {
    if (e.target.value === "") {
      dispatch(setQuestionSearch(AllQuestion));
    }
    if (e.target.value) {
      const searchQues = AllQuestion.filter((ques) =>
        ques.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      dispatch(setQuestionSearch(searchQues));
    }
  };

  console.log(useSelector((state) => state.basic.questionSearch));
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
                  onChange={handleSearchInput}
                  disabled={pathname === "/" ? false : true}
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
                  onChange={handleSearchInput}
                  disabled={pathname === "/" ? false : true}
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
              {user?.name ? (
                <div className="d-flex">
                  <img
                    src={user.avatarImage}
                    height={"30"}
                    alt={user.name}
                    className="mt-1 img_hover"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={user.name}
                    onClick={() => {
                      navigate(`/users/${user._id}`);
                    }}
                  />
                  <Tooltip id="my-tooltip" />
                  <button
                    className="menubar_btn1 me-2 ms-3"
                    onClick={() => {
                      localStorage.removeItem("token");
                      dispatch(setEmptySingleUser());
                    }}
                  >
                    Logout
                  </button>
                  <button className="add_tag ms-2" onClick={openModal}>
                    Add Tag
                  </button>
                  <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    <div className="d-flex justify-content-between">
                      <h2
                        ref={(_subtitle) => (subtitle = _subtitle)}
                        className="h6 text-dark"
                      >
                        Add Tag
                      </h2>
                      <button onClick={closeModal} className="circle_x ms-5">
                        <i className="fa-solid fa-circle-xmark"></i>
                      </button>
                    </div>
                    <div className="mt-4 mb-3">
                      <input
                        type="text"
                        placeholder="Enter technology name"
                        className="input_add_tag ps-2 pe-2"
                        onChange={(e) => {
                          setTagName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      <button
                        className="menubar_btn1 me-2"
                        onClick={handleTopTag}
                      >
                        Add Tag
                      </button>
                    </div>
                  </Modal>
                </div>
              ) : (
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
              )}
            </div>
          </div>
        )}
      </div>
      <div className="menubar_bottom"></div>
    </div>
  );
};

export default MenuBar;
