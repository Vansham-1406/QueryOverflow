import React from 'react'
import "../../assets/css/sidemenu.css";
import "../../assets/css/OtherTag.css";
import SingleTag from './SingleTag';

const OtherTag = () => {
  return (
    <div className='mainmenu d-flex pt-3 ps-3 flex-wrap flex-column'>
        <div>
            <h3 className='fw-normal'>Tags</h3>
        </div>
        <div className='mt-2 OtherTagP'>
            <p className='mb-0'>A tag is a keyword or label that categorizes your question with other, similar questions.</p>
            <p className='mb-0'>Using the right tags makes it easier for others to find and answer your question.</p>
        </div>
        <div className='position-relative'>
            <i className='fa fa-search position-absolute iconTag'></i>
            <input type="text" className='mt-4 othertagInput ps-4' placeholder='Search for Tags...'/>
        </div>
        <div className='d-flex flex-wrap mt-4'>
            <SingleTag/>
            <SingleTag/>
            <SingleTag/>
            <SingleTag/>
            <SingleTag/>
            <SingleTag/>
            <SingleTag/>
            <SingleTag/>
            <SingleTag/>
            <SingleTag/>
        </div>
    </div>
  )
}

export default OtherTag