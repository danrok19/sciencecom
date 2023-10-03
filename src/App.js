import React from 'react'
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import OrganizePage from './Pages/OrganizePage/OrganizePage';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FestivalPage from './Pages/Festival/FestivalPage';
import EventPage from './Pages/Event/EventPage';
import OrganizeEventPage from './Pages/OrganizeEventPage/OrganizeEventPage';
import Login from './Pages/Login/Login';


const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/organizeFestival" element={<OrganizePage />} />
          <Route path="/festival" element={<FestivalPage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/organizeEvent" element={<OrganizeEventPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
    </Router>
    </>
  )
}

export default App;
