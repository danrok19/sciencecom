import React from 'react';
import './smallEventCard.css';
import { useNavigate } from 'react-router-dom';
import { FaLayerGroup } from 'react-icons/fa';

const SmallEventCard = ({title, images, id, event, festival}) => {

    const navigate = useNavigate();

    const onAction = e =>{
        e.preventDefault();
        if(event){
            navigate(`/events/${id}`);
        }
        else if(festival){
            navigate(`/festival/${id}`);
        }

    }


  return (
    <div className="small-card" onClick={onAction}>
       {festival && <FaLayerGroup className="fest-icon"/>}
      <div className="image-circle-wrapper">
        {event && <img src={`http://localhost:5000/${images[0]}`} alt="Zdjęcie wydarzenia" className="img-self"/>}
        {festival && <img src={`http://localhost:5000/${images}`} alt="Zdjęcie wydarzenia" className="img-self"/>}
      </div>
      <div className="title-wrapper">
        <span className="title-self">{title}</span>
      </div>
    </div>
  )
}

export default SmallEventCard;
