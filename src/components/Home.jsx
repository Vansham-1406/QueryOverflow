import React from 'react'
import MainMenu from './home/MainMenu'
import MenuBar from './home/MenuBar'
import SideMenu from './home/SideMenu'

const Home = () => {
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

export default Home