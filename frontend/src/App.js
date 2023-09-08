import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import PageNotFound from './components/PageNotFound'
import Signup from './components/Signup'
import Login from './components/Login'
import Users from './components/Users'
import Tags from './components/Tags'
import SingleTagPage from './components/SingleTagPage'
import SingleUserPage from './components/users/SingleUserPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/users' element={<Users/>}></Route>
      <Route path='/tags' element={<Tags/>}></Route>
      <Route path="/tags/:tagname" element={<SingleTagPage/>}></Route>
      <Route path='/users/:id' element={<SingleUserPage/>}></Route>
      <Route path='*' element={<PageNotFound/>}></Route>
    </Routes>
  )
}

export default App