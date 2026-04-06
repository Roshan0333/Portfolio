import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import {Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Footer from './components/footer';
import { Education } from './pages/education';
import { Experience } from './pages/experience';

function App() {

  return (
    <>
     <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/education" element={<Education/>}/>
      <Route path="/experience" element={<Experience/>}/>
     </Routes>
     <Footer/>
    </>
  )
}

export default App
