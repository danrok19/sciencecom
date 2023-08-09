import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdSchool } from 'react-icons/md';
import './navbar.css';

const Navbar = () => {


    //wszystkie linki, które mają znaleźć się w navbarze
    const links = [
        { label: 'Znajdź wydarzenie', path: '/searchEvents' },
        { label: 'Zorganizuj event', path: 'organizeEvent' },
        { label: 'Zaloguj się', path: '/login' }
    ]

    const availableLinks = links.map((link) => {
        return <Link key={link.label} className='link' to={link.path}>{link.label}</Link>
    })
    return (
        <div className='navDiv'>
            <div className='header'>
                <MdSchool className='icon' />
                <Link className='link' to='/'>scienceCom</Link>
            </div>
            <div className='bigScreen'>
                <ul className='links'>
                    {availableLinks}
                </ul>
            </div>
            <div className='hamburger'>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

export default Navbar;
