import React from 'react'
import MenuBar from './home/MenuBar'
import SideMenu from './home/SideMenu'
import MainMenu from './home/MainMenu'


const AskQuery = () => {
  return (
    <div>
        <MenuBar/>
        <div className='d-flex'>
            <SideMenu/>
            <MainMenu/>
        </div>
    </div>
  )
}

export default AskQuery