import React, { useEffect,useState } from "react";
import "../../assets/css/sidemenu.css";
import SingleUser from "./SingleUser";
import { useSelector } from "react-redux";
import { useGetAllUser } from "../../redux/features/user/userActions";
import jwtdecode from 'jwt-decode'

const OtherUser = () => {
  const { getAllUser } = useGetAllUser();
  const user = useSelector((state) => state.user.users);
  const loading = useSelector((state) => state.user.loadingUser);
  const [userList, setUserList] = useState([])

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

  useEffect(() => {
    getAllUser();
    setUserList(user);
    // eslint-disable-next-line
  }, [user]);


  const handleUserSearch = (e) => {
    if(e.target.value === "")
    {
      setUserList(user);
    }
    if(e.target.value)
    {
      const save = user.filter((item)=>item.name.toLowerCase().includes(e.target.value.toLowerCase()));
      setUserList(save);
    }
    else
    {
      getAllUser();
    }
  }

  return (
    <div className="mainmenu d-flex pt-3 ps-3 flex-wrap flex-column">
      <div>
        <h3 className="fw-normal">Users</h3>
      </div>
      <div className="mt-2 OtherTagP">
        <p className="mb-0">
          Discover, Connect, and Share: Your Personalized User Profile - Where
          Knowledge Meets Community
        </p>
        <p className="mb-0">
          Your hub for questions, answers, and insights – your user page at
          QueryOverflow.
        </p>
      </div>
      <div className="position-relative">
        <i className="fa fa-search position-absolute iconTag"></i>
        <input
          type="text"
          className="mt-4 othertagInput ps-4"
          placeholder="Search for Users..."
          onChange={handleUserSearch}
        />
      </div>
      <div
        className={
          loading
            ? "d-flex align-items-center justify-content-center mb-2"
            : "d-flex flex-wrap mt-4"
        }
      >
        {loading? (
          <div class="loader"></div>
        ) : (
          userList.map((singleuser) => (
            <SingleUser singleuser={singleuser} key={singleuser._id} />
          ))
        )}
      </div>
    </div>
  );
};

export default OtherUser;
