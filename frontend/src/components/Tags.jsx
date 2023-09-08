import React from 'react'
import MenuBar from './home/MenuBar'
import SideMenu from './home/SideMenu'
import OtherTag from './tags/OtherTag'

const Tags = () => {
  return (
    <div>
        <MenuBar/>
        <div className='d-flex'>
            <SideMenu/>
            <OtherTag/>
        </div>
    </div>
  )
}

export default Tags