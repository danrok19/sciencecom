import React from 'react';
import './festivalPreview.css';
import Button from '../Button/Button';
import { MdEditSquare } from 'react-icons/md';
import { ImCross } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { FaLayerGroup } from "react-icons/fa";

const FestivalPreview = ({festival}) => {

    const navigate = useNavigate();
    const onPreview = e => {
        e.preventDefault();
        navigate(`/festival/${festival.id}`);
    }

    const onEdition = e => {
        e.preventDefault();
        navigate(`/festivalUpdate/${festival.id}`);
    }
    const onDeleteClick = e =>{
        
    }
  return (
    <div className="festival-wrapper">
      <FaLayerGroup className="fest-icon"/>
      <div className="image-festival-wrapper">
        <img className=".image-preview-section" src={`http://localhost:5000/${festival?.image}`} alt='Zdjecie'/>
      </div>
      <div className="title-section-fest">
        <span className="title-label">{festival.title}</span>
      </div>
      <div className='edition-section'>
                <Button primary onClick={onPreview} style={{ display: 'flex', margin: 'auto'}}>Podgląd</Button>
                <Button edition onClick={onEdition} style={{width: '5rem', display: 'flex', margin: 'auto'}}><MdEditSquare /></Button>
                <Button secondary onClick={onDeleteClick} style={{width: '5rem', display: 'flex', margin: 'auto'}}><ImCross/></Button>
            </div>
    </div>
  )
}

export default FestivalPreview
