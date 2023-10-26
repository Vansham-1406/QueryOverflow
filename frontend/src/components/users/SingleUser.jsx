import React from "react";
import "../../assets/css/singleUser.css";
import { useNavigate } from "react-router-dom";

const SingleUser = ({ singleuser }) => {
  const navigate = useNavigate();

  function getTimeDiff(createdAt) {
    const now = new Date();

    const diffMs = now.getTime() - createdAt;

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(
      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    if (diffDays > 0) {
      return `${diffDays} days ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hours ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minutes ago`;
    } else {
      return `${diffSeconds} seconds ago`;
    }
  }

  const timeDiff = getTimeDiff(singleuser.createdAt);

  return (
    <div className="d-flex flex-wrap Single mt-4 align-items-start">
      <div>
        <img src={singleuser.avatarImage} alt={singleuser.name} height={40} />
      </div>
      <div
        className="d-flex flex-column ms-2 singleUser justify-content-center mt-1"
        onClick={() => {
          navigate(`/users/${singleuser._id}`);
        }}
      >
        <p className="mb-0 p-0 m-0">
          <b>{singleuser?.name}</b>
        </p>
        <p className="m-0 p-0">Created {`${timeDiff}`}</p>
      </div>
    </div>
  );
};

export default SingleUser;
