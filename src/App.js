import React from 'react'
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import OrganizePage from './Pages/OrganizePage/OrganizePage';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/organizeEvent" element={<OrganizePage />} />
        </Routes>
    </Router>
    </>
  )
}

export default App;
