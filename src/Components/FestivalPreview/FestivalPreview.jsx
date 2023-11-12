import React from 'react';
import './festivalPreview.css';
import Button from '../Button/Button';
import { MdEditSquare } from 'react-icons/md';
import { ImCross } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

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
      <div className="image-festival-wrapper">
        <img src={`http://localhost:5000/${festival?.image}`}/>
      </div>
      <div className="title-section">
        {festival.title}
      </div>
      <div className='edition-section'>
                <Button primary onClick={onPreview}>Podgląd</Button>
                <Button edition onClick={onEdition} style={{width: '5rem'}}><MdEditSquare /></Button>
                <Button secondary onClick={onDeleteClick}><ImCross/></Button>
            </div>
    </div>
  )
}

export default FestivalPreview
