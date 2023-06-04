import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdSchool } from 'react-icons/md';
import './navbar.css';

const Navbar = () => {

    const [actual, setActual] = useState(false);

    //wszystkie linki, które mają znaleźć się w navbarze
    const links = [
        { label: 'Znajdź wydarzenie', path: '/searchEvents' },
        { label: 'Zorganizuj event', path: '/organizeEvent' },
        { label: 'Zaloguj się', path: '/login' }
    ]

    const availableLinks = links.map((link) => {
        return <span key={link.label} className='link'>{link.label}</span>
    })
    return (
        <div className='navDiv'>
            <div className='header'>
                <MdSchool className='icon' />
                <span>sciencecom</span>
            </div>
            <div className={actual ? 'invisible' : 'bigScreen'}>
                <ul className='links'>
                    {availableLinks}
                </ul>
            </div>
            <div className={actual ? 'smallScreenScreen' : 'invisible'}>
                <ul>
                    {availableLinks}
                </ul>
            </div>
        </div>
    )
}

export default Navbar;
