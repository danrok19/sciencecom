import React from 'react';
import './festivalPack.css';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

const FestivalPack = ({ children, name, ...rest }) => {
    return (
        <div className='pack'>
            <div className='topHeader' style={rest.style}>
                <h1>{name}</h1>
                <h4><Link to='festival' className='link'>Zobacz wszystkie wydarzenia <IoIosArrowForward /></Link></h4>
            </div>
            <div className='cards'>
                {children}
            </div>
        </div>
    )
}

export default FestivalPack
