import React from 'react'
import MenuBar from '../home/MenuBar'
import SideMenu from '../home/SideMenu'
import UserPage from './UserPage'

const SingleUserPage = () => {
  return (
    <div>
        <MenuBar/>
        <div className='d-flex'>
            <SideMenu/>
            <UserPage/>
        </div>
    </div>
  )
}

export default SingleUserPage