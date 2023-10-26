import React, { useEffect, useState } from "react";
import "../../assets/css/sidemenu.css";
import AllQuestions from "./AllQuestions";
import TopTags from "./TopTags";
import { useParams, useLocation } from "react-router-dom";
import TagQuestions from "../tags/TagQuestions";
import Query from "../query/Query";
import SingleQuery from "../query/singleQuery";

const MainMenu = () => {
  const [pathN, setPathN] = useState(false);
  const [pathQID, setPathQID] = useState(false);
  const q = useParams().tagname;
  const qID = useParams().questionID;
  useEffect(() => {
    if (q) {
      setPathN(true);
    }

    if(qID)
    {
      setPathQID(true);
    }
    // eslint-disable-next-line
  }, [q, pathN]);
  return (
    <div className="mainmenu d-flex pt-4 flex-wrap flex-lg-row flex-column">
      {pathN && <TagQuestions />}
      {useLocation().pathname === "/" && <AllQuestions />}
      {useLocation().pathname === "/askquery" && <Query/>}
      {pathQID && <SingleQuery/>}
      <TopTags />
    </div>
  );
};

export default MainMenu;
