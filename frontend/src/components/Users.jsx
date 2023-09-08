import React from 'react'
import MenuBar from './home/MenuBar'
import SideMenu from './home/SideMenu'
import OtherUser from './users/OtherUser'

const Users = () => {
  return (
    <div>
        <MenuBar/>
        <div>
            <SideMenu/>
            <OtherUser/>
        </div>
    </div>
  )
}

export default Users