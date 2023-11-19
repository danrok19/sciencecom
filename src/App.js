import React from 'react'
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
import { useAuth } from './Hooks/auth-hook';
import UpdateEventPage from './Pages/UpdateEventPage/UpdateEventPage';
import UserPage from './Pages/UserPage/UserPage';

const App = () => {

  const { token, login, logout, userId, userEmail} = useAuth();

  let routes;
  if (token) {
    routes = (
      <>
        <Route path="/" element={<Home />} />
        <Route path="/festival/:festivalId" element={<FestivalPage />} />
        <Route path="/events/:eventId" element={<EventPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/organizeFestival" element={<OrganizePage />} />
        <Route path="/organizeEvent" element={<OrganizeEventPage />} />
        <Route path="/organizeEvent/:festivalId" element={<OrganizeEventPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/eventUpdate/:eventId" element={<UpdateEventPage />} />
        <Route path="/festivalUpdate/:festivalId" element={<UpdateFestivalPage />} />
        <Route path="/user/:profileId" element={<UserPage />} />
      </>
    )
  } else {
    routes = (
      <>
        <Route path="/" element={<Home />} />
        <Route path="/festival/:festivalId" element={<FestivalPage />} />
        <Route path="/events/:eventId" element={<EventPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/user/:profileId" element={<UserPage />} />
      </>
    )
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, userId: userId, email: userEmail, login: login, logout: logout }}>
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
