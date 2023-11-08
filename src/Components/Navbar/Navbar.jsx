import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MdSchool } from 'react-icons/md';
import './navbar.css';
import { AuthContext } from '../../Context/auth-context';

const Navbar = () => {

    const [isOpenNavbar, setIsOpenNavbar] = useState(false);
    const auth = useContext(AuthContext);
    //wszystkie linki, które mają znaleźć się w navbarze
    const links = [
        { label: 'Znajdź wydarzenie', path: '/search', needAuth: 'no'},
        { label: 'Zorganizuj festiwal', path: 'organizeFestival', needAuth: 'yes' },
        { label: 'Zaloguj się', path: '/login', needAuth: 'notAuth'},
        { label: 'Profil', path: `/profile/${auth.userId}`, needAuth: 'yes' },
        { label: 'Wyloguj się', path: '/', needAuth: 'yes', onAction: auth.logout },
    ];

    const availableLinks = links.map((link) => {
        if(link.needAuth === 'yes'){
            return (auth.isLoggedIn &&
                <Link key={link.label} className='link' to={link.path} onClick={link?.onAction}>{link.label}</Link>)
        }
        else if (link.needAuth === 'no'){
            return (
                <Link key={link.label} className='link' to={link.path}>{link.label}</Link>)
        }
        else if (link.needAuth === 'notAuth'){
            return (!auth.isLoggedIn &&
                <Link key={link.label} className='link' to={link.path}>{link.label}</Link>)
        }
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
