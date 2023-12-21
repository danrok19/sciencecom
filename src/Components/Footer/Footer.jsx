import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdSchool } from 'react-icons/md';
import { FaGithubSquare, FaFacebookSquare } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
    const openFacebook = () => {
        const facebookUrl = 'https://www.facebook.com';
        window.open(facebookUrl, '_blank');
    };

    const openGithub = () =>{
        const githubUrl = 'https://github.com/danrok19';
        window.open(githubUrl, '_blank');
    }

    return (
        <div className="footer-section">
            <div className='logo-section'>
                <MdSchool className='icon' />
                <Link className='link' to='/'>scienceCom</Link>
            </div>
            <div className="middle-section">
                <Link className='link' to='/'>Strona główna</Link>
                <Link className='link' to='/'>O nas</Link>
                <Link className='link' to='/'>Kontakt</Link>
            </div>
            <div className="media-section" onClick={openGithub}>
                <div className="media">
                    <FaGithubSquare />
                    <span>Github</span>
                </div>
                <div className="media" onClick={openFacebook}>
                    <FaFacebookSquare />
                    <span>Facebook</span>
                </div>
            </div>

        </div>
    )
}

export default Footer;