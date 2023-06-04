import React from 'react';
import './festivalPack.css';
import { IoIosArrowForward } from 'react-icons/io';

const FestivalPack = ({ children, name, ...rest }) => {
    return (
        <div className='pack'>
            <div className='topHeader' style={rest.style}>
                <h1>{name}</h1>
                <h4>Zobacz wszystkie wydarzenia <IoIosArrowForward /></h4>
            </div>
            <div className='cards'>
                {children}
            </div>
        </div>
    )
}

export default FestivalPack
