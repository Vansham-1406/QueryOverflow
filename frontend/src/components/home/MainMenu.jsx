import React,{useEffect,useState} from 'react'
import "../../assets/css/sidemenu.css";
import AllQuestions from './AllQuestions';
import TopTags from './TopTags';
import {useParams} from 'react-router-dom'
import TagQuestions from '../tags/TagQuestions';

const MainMenu = () => {
  const [pathN, setPathN] = useState(false)
  const q = useParams().tagname
  useEffect(() => {
    if(q)
    {
      setPathN(true)
    }
  }, [q,pathN])
  return (
    <div className='mainmenu d-flex pt-4 flex-wrap flex-lg-row flex-column'>
      {
        pathN && <TagQuestions/>
      }
        {
          !pathN && <AllQuestions/>
        }
        <TopTags/>
    </div>
  )
}

export default MainMenu