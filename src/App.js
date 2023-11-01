import React, { useState, useCallback } from 'react'
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import OrganizePage from './Pages/OrganizePage/OrganizePage';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FestivalPage from './Pages/Festival/FestivalPage';
import EventPage from './Pages/Event/EventPage';
import OrganizeEventPage from './Pages/OrganizeEventPage/OrganizeEventPage';
import Login from './Pages/Login/Login';
import SearchPage from './Pages/SearchPage/SearchPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import UpdateFestivalPage from './Pages/UpdateFestivalPage/UpdateFestivalPage';
import { AuthContext } from './Context/auth-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <>
        <Route path="/" element={<Home />} />
        <Route path="/festival" element={<FestivalPage />} />
        <Route path="/events/:eventId" element={<EventPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/organizeFestival" element={<OrganizePage />} />
        <Route path="/organizeEvent" element={<OrganizeEventPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/festival/:festivalId" element={<UpdateFestivalPage />} />
      </>
    )
  } else {
    routes = (
      <>
        <Route path="/" element={<Home />} />
        <Route path="/festival" element={<FestivalPage />} />
        <Route path="/events/:eventId" element={<EventPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchPage />} />
      </>
    )
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout }}>
      <Router>
        <Navbar />
        <Routes>
          {routes}
        </Routes>
        <Footer />
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
