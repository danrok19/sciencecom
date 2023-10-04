import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdSchool } from 'react-icons/md';
import './navbar.css';

const Navbar = () => {

    const [isOpenNavbar, setIsOpenNavbar] = useState(false);
    //wszystkie linki, które mają znaleźć się w navbarze
    const links = [
        { label: 'Znajdź wydarzenie', path: '/search' },
        { label: 'Zorganizuj festiwal', path: 'organizeFestival' },
        { label: 'Zaloguj się', path: '/login' }
    ]


    const availableLinks = links.map((link) => {
        return <Link key={link.label} className='link' to={link.path}>{link.label}</Link>
    })

    const showNavbar = () =>{
        setIsOpenNavbar(!isOpenNavbar);
    }

    return (
        <div className='navDiv'>
            <div className='header'>
                <MdSchool className='icon' />
                <Link className='homeTitle' to='/'>scienceCom</Link>
            </div>
            <div className='bigScreen'>
                <ul className='links'>
                    {availableLinks}
                </ul>
            </div>
            <div className='hamburger' onClick={showNavbar}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={isOpenNavbar ? 'navbar active' : 'navbar'}>
                <ul className='links'>
                    {availableLinks}
                </ul>
            </div>
        </div>
    )
}

export default Navbar;
