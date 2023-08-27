import React from 'react'
import "../../assets/css/sidemenu.css";
import AllQuestions from './AllQuestions';
import TopTags from './TopTags';
const MainMenu = () => {
  return (
    <div className='mainmenu d-flex pt-4 flex-wrap flex-lg-row flex-column'>
        <AllQuestions/>
        <TopTags/>
    </div>
  )
}

export default MainMenu