import React from 'react'
import MenuBar from './home/MenuBar'
import SideMenu from './home/SideMenu'

const Tags = () => {
  return (
    <div>
        <MenuBar/>
        <div className='d-flex'>
            <SideMenu/>
        </div>
    </div>
  )
}

export default Tags