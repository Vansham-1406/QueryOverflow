import React, { useEffect } from "react";
import "../../assets/css/sidemenu.css";
import "../../assets/css/userPage.css";
import { useParams } from "react-router-dom";
import { useSingleUserDetails } from "../../redux/features/user/userActions";
import { useSelector } from "react-redux";
const UserPage = () => {
  const id = useParams().id;
  const { singleUserDetails } = useSingleUserDetails();
  const user = useSelector((state) => state.user.SingleUserDetails);
  useEffect(() => {
    singleUserDetails(id);
    // eslint-disable-next-line
  }, []);

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
      return `${diffDays} days`;
    } else if (diffHours > 0) {
      return `${diffHours} hours`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minutes`;
    } else {
      return `${diffSeconds} seconds`;
    }
  }

  const timeDiff = getTimeDiff(user?.createdAt);

  return (
    <div className="mainmenu d-flex pt-4 flex-wrap flex-lg-row flex-column">
      <div>
        <img src={user?.avatarImage} alt={user?.name} height={"200"} />
      </div>
      <div className="d-flex userDetails ps-2 flex-column mb-5 pt-3 pt-lg-0">
        <div className="d-flex justify-content-between border_user pb-1 me-2">
          <div className="d-flex flex-column">
            <h4 className="mb-1 header_color">{user?.name}</h4>
            <p className="m-0">member for {timeDiff}</p>
          </div>
          <div className="d-flex">
            <div className="d-flex flex-column">
              <h4 className="text-center mb-1">{user.answer?.length}</h4>
              <p className="m-0 header_color">Answers</p>
            </div>
            <div className="d-flex flex-column ps-3">
              <h4 className="text-center mb-1">{user.question?.length}</h4>
              <p className="m-0 header_color">Questions</p>
            </div>
          </div>
        </div>
        <div className="mt-3 border_user me-2">
          <h5 className="header_color">Questions Asked</h5>
        </div>
        {user?.question?.length > 0 ? (
          user.question.map((singlequestion) => (
            <div className="d-flex justify-content-between pt-3 border_user me-2 flex-column flex-sm-row align-items-center para_user">
              <div className="d-flex align-items-center">
                <p className="number_votes p-2 fw-bold">
                  {singlequestion?.upvote?.length -
                    singlequestion?.downvote?.length}
                </p>
                <p className="ms-2 ">{singlequestion?.title}</p>
              </div>
              <div>
                <p>{getTimeDiff(singlequestion?.createdAt)} ago</p>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p className="mt-2">No Questions asked</p>
          </div>
        )}

        <div className="mt-3 border_user me-2">
          <h5 className="header_color">Answered Questions</h5>
        </div>
        {user?.answer?.length > 0 ? (
          user.answer.map((singleanswer) => (
            <div className="d-flex justify-content-between pt-3 border_user me-2 flex-column flex-sm-row align-items-center para_user">
              <div className="d-flex align-items-center">
                <p className="number_votes p-2 fw-bold">
                  {singleanswer?.upvote?.length -
                    singleanswer?.downvote?.length}
                </p>
                <p className="ms-2 ">{singleanswer?.body}</p>
              </div>
              <div>
                <p>{getTimeDiff(singleanswer?.createdAt)} ago</p>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p className="mt-2">No Answers answered</p>
          </div>
        )}

        <div className="mt-3 border_user me-2">
          <h5 className="header_color">Bookmarked Questions</h5>
        </div>
        {user?.bookmarkedQuestion?.length > 0 ? (
          user.bookmarkedQuestion.map((singlebookmarkedQuestion) => (
            <div className="d-flex justify-content-between pt-3 border_user me-2 flex-column flex-sm-row align-items-center para_user">
              <div className="d-flex align-items-center">
                <p className="number_votes p-2 fw-bold">
                  {singlebookmarkedQuestion?.upvote?.length -
                    singlebookmarkedQuestion?.downvote?.length}
                </p>
                <p className="ms-2 ">{singlebookmarkedQuestion?.title}</p>
              </div>
              <div>
                <p>{getTimeDiff(singlebookmarkedQuestion?.createdAt)} ago</p>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p className="mt-2">No Saved Questions</p>
          </div>
        )}

        <div className="mt-3 border_user me-2">
          <h5 className="header_color">Bookmarked Answers</h5>
        </div>
        {user?.bookmarkedAnswer?.length > 0 ? (
          user.bookmarkedAnswer.map((singlebookmarkedAnswer) => (
            <div className="d-flex justify-content-between pt-3 border_user me-2 flex-column flex-sm-row align-items-center para_user">
              <div className="d-flex align-items-center">
                <p className="number_votes p-2 fw-bold">
                  {singlebookmarkedAnswer?.upvote?.length -
                    singlebookmarkedAnswer?.downvote?.length}
                </p>
                <p className="ms-2 ">{singlebookmarkedAnswer?.body}</p>
              </div>
              <div>
                <p>{getTimeDiff(singlebookmarkedAnswer?.createdAt)} ago</p>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p className="mt-2">No Saved Answers</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
