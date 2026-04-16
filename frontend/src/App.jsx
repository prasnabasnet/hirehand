import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<div>HireHand Home</div>} />
      </Routes>
    </>
  )
}

export default App
//ccccc