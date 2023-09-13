import React from 'react'
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import OrganizePage from './Pages/OrganizePage/OrganizePage';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FestivalPage from './Pages/Festival/FestivalPage';


const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/organizeEvent" element={<OrganizePage />} />
          <Route path="/festival" element={<FestivalPage />} />
        </Routes>
        <Footer />
    </Router>
    </>
  )
}

export default App;
