import React, { useRef } from 'react';
import './eventCard.css';
import img from '../../Assets/pi.jpg';
import { BsFillCalendarDateFill, BsFillClockFill } from 'react-icons/bs';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { BiDownArrow } from 'react-icons/bi';

const EventCard = ({ name, shortDescribtion, date, clock, place }) => {


    const divElement = useRef(); //wrapping the whole div which is our dropNavbar -> using ref={devElement}

    const deleteElement = useRef();
    const onMouseEnter = () => {
        deleteElement.current.classList.replace('seeMore', 'more')
    }
    
    const onMouseLeave = () => {
        deleteElement.current.classList.replace('more', 'seeMore')
    }
    return (
        <div className='card' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <img src={img} alt='pic' />
            <h3>{name}</h3>
            <p>{shortDescribtion}</p>
            <div className='dateInfo'>
                <div className='leftInfo'>
                    <BsFillCalendarDateFill /> <span>{date}</span>
                </div>
                <div className='rightInfo'>
                    <BsFillClockFill /><span>{clock}</span>
                </div>
            </div>

            <div className="local">
                <FaMapMarkerAlt /> <span>{place}</span>
            </div>

            <div className="seeMore" ref={deleteElement}>
                <span>Zobacz szczegóły</span>
                <BiDownArrow />
            </div>
        </div>
    )
}

export default EventCard
