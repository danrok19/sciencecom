import React, { useRef } from 'react';
import './eventCard.css';
import img from '../../Assets/pi.jpg';
import { BsFillCalendarDateFill, BsFillClockFill } from 'react-icons/bs';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { BiDownArrow } from 'react-icons/bi';
import Button from '../Button/Button';

const EventCard = ({ name, shortDescribtion, date, clock, place }) => {

    return (
        <div className="card">
            <div className="card-image">
                <img src={img} class="card-img-top" alt='zdjecie'/>
            </div>
            <div className="card-body">
                <h4>{name}</h4>
                <p className="card-text">{shortDescribtion}</p>
                <Button className="visit-button" style={{fontSize: '1rem', justifyContent: 'center'}}>Zobacz Event</Button>
            </div>
        </div>
    )
}

export default EventCard
