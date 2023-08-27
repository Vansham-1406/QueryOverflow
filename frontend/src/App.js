import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import PageNotFound from './components/PageNotFound'
import Signup from './components/Signup'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='*' element={<PageNotFound/>}></Route>
    </Routes>
  )
}

export default App