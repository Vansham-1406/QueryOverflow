import React from 'react'
import "../../assets/css/sidemenu.css";
import SingleUser from './SingleUser';

const OtherUser = () => {
  return (
    <div className='mainmenu d-flex pt-3 ps-3 flex-wrap flex-column'>
        <div>
            <h3 className='fw-normal'>Users</h3>
        </div>
        <div className='mt-2 OtherTagP'>
            <p className='mb-0'>Discover, Connect, and Share: Your Personalized User Profile - Where Knowledge Meets Community</p>
            <p className='mb-0'>Your hub for questions, answers, and insights – your user page at QueryOverflow.</p>
        </div>
        <div className='position-relative'>
            <i className='fa fa-search position-absolute iconTag'></i>
            <input type="text" className='mt-4 othertagInput ps-4' placeholder='Search for Users...'/>
        </div>
        <div className='d-flex flex-wrap mt-4'>
            <SingleUser/>
            <SingleUser/>
            <SingleUser/>
            <SingleUser/>
            <SingleUser/>
            <SingleUser/>
            <SingleUser/>
            <SingleUser/>
            <SingleUser/>
            <SingleUser/>
            <SingleUser/>
            <SingleUser/>
            <SingleUser/>
            <SingleUser/>
            <SingleUser/>
            <SingleUser/>
        </div>
    </div>
  )
}

export default OtherUser