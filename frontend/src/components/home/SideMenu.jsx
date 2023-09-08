import React,{useEffect,useState} from "react";
import "../../assets/css/sidemenu.css";
import {useSelector} from 'react-redux'
import {useNavigate,useLocation, useParams} from 'react-router-dom'
const SideMenu = () => {
  const basic = useSelector((state)=>state.basic)
  const {menu} = basic
  const navigate = useNavigate();
  const [pathN, setPathN] = useState(false)
  const [pathM, setPathM] = useState(false)
  const q = useParams().tagname
  const id = useParams().id
  useEffect(() => {
    if(q)
    {
      setPathN(true)
    }

    if(id)
    {
      setPathM(true)
    }
  }, [q,pathN,id,pathM])
  
  return (
    <div className={menu ? "sidemenu1" : "sidemenu"}>
      <div className="d-flex justify-content-end pt-5 flex-column align-items-end">
        <div className="box d-flex align-items-center position-relative" onClick={()=>{
          navigate("/")
        }}>
            <div className={useLocation().pathname === "/" || pathN ? "box1": ""}></div>
          <i className="fa fa-globe pe-1 ps-4"></i>
          <h6 className="pt-2 ps-2">Questions</h6>
        </div>
        <div className="box d-flex align-items-center mt-5 position-relative" onClick={()=>{
          navigate("/tags")
        }}>
        <div className={useLocation().pathname === "/tags" ? "box1": ""}></div>
          <i className="fa fa-tags me-1 ms-4 fs-5"></i>
          <h6 className="mt-2 ms-2">Tags</h6>
        </div>
        <div className="box d-flex align-items-center mt-5 ps-4 position-relative" onClick={()=>{
          navigate("/users")
        }}>
          <div className={useLocation().pathname === "/users" || pathM ? "box1": ""}></div>
          <svg
            width="23"
            height="23"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 19.125V21.375H2.25V19.125C2.25 19.125 2.25 14.625 10.125 14.625C18 14.625 18 19.125 18 19.125ZM14.0625 8.4375C14.0625 7.65873 13.8316 6.89746 13.3989 6.24994C12.9663 5.60242 12.3513 5.09774 11.6318 4.79972C10.9123 4.5017 10.1206 4.42373 9.35683 4.57566C8.59303 4.72759 7.89144 5.1026 7.34077 5.65327C6.7901 6.20393 6.41509 6.90553 6.26316 7.66933C6.11123 8.43313 6.1892 9.22483 6.48722 9.94431C6.78524 10.6638 7.28992 11.2788 7.93744 11.7114C8.58496 12.1441 9.34624 12.375 10.125 12.375C11.1693 12.375 12.1708 11.9602 12.9092 11.2217C13.6477 10.4833 14.0625 9.48179 14.0625 8.4375ZM17.9325 14.625C18.6241 15.1602 19.19 15.8405 19.5904 16.6179C19.9908 17.3954 20.2159 18.2512 20.25 19.125V21.375H24.75V19.125C24.75 19.125 24.75 15.0412 17.9325 14.625ZM16.875 4.5C16.1006 4.49569 15.3433 4.7272 14.7037 5.16375C15.3871 6.11858 15.7546 7.26332 15.7546 8.4375C15.7546 9.61168 15.3871 10.7564 14.7037 11.7112C15.3433 12.1478 16.1006 12.3793 16.875 12.375C17.9193 12.375 18.9208 11.9602 19.6592 11.2217C20.3977 10.4833 20.8125 9.48179 20.8125 8.4375C20.8125 7.39321 20.3977 6.39169 19.6592 5.65327C18.9208 4.91484 17.9193 4.5 16.875 4.5Z"
              fill="#111111"
            />
          </svg>

          <h6 className="mt-2 ms-2">Users</h6>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
