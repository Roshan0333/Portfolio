import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import {Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Footer from './components/footer';

function App() {

  return (
    <>
     <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
     </Routes>
     <Footer/>
    </>
  )
}

export default App
