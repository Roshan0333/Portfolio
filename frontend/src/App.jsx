import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import {Routes, Route } from "react-router-dom";
import Home from './pages/home';

function App() {

  return (
    <>
     <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
     </Routes>
    </>
  )
}

export default App
