import React from 'react'
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import OrganizePage from './Pages/OrganizePage/OrganizePage';
import './App.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <OrganizePage />
    </div>
  )
}

export default App;
