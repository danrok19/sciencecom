import React from 'react';
import './eventCard.css';
import img from '../../Assets/pi.jpg';
import Button from '../Button/Button';
import Tag from '../Tag/Tag';
import { Link } from 'react-router-dom';

const EventCard = ({id, name, description, fieldTag }) => {

    return (
        <div className="card">
            <div className="card-image">
                <img src={img} className="card-img-top" alt='zdjecie'/>
            </div>
            <Tag style={{position: 'absolute',top: '.3rem', right: '.5rem'}}>{fieldTag}</Tag>
            <div className="card-body">
                <h4>{name}</h4>
                <p className="card-text">{description}</p>
                <Button secondary className="visit-button" style={{fontSize: '1rem', justifyContent: 'center', width: 'fit-content'}}>
                    <Link to={`/events/${id}`} style={{textDecoration: 'none', color: 'white'}}> Zobacz wydarzenie</Link>
                </Button>
            </div>
        </div>
    )
}

export default EventCard
