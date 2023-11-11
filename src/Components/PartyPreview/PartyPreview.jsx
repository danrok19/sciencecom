import React, { useContext } from 'react';
import Button from '../Button/Button';
import './partyPreview.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/auth-context';
import { useHttpClient } from '../../Hooks/http-hook';

const PartyPreview = ({ id, title, image, startDate, startTime, setChosenPartyDelete, onShow }) => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const navigate = useNavigate();
    const onPreview = e => {
        e.preventDefault();
        navigate(`/events/${id}`);
    }

    const onEdition = e => {
        e.preventDefault();
        navigate(`/eventUpdate/${id}`);
    }

    const onDeleteClick = e => {
        setChosenPartyDelete({ id: id, title: title });
        onShow();
    }

    return (
        <div className='preview-wrapper'>
            <div className="image-preview-wrapper">
                <img src={`http://localhost:5000/${image}`} alt='Zdjecie' className='image-preview-section' />
            </div>
            <div className="title-section">
                <span className="title-label">{title}</span>
                <span>{startDate}</span>
            </div>
            <span>{startTime}</span>
            <div className='edition-section'>
                <Button primary onClick={onPreview}>Podejrzyj stronę imprezy</Button>
                <Button edition onClick={onEdition}>Edytuj dane imprezy</Button>
                <Button>Zgłoszenia</Button>
                <Button secondary onClick={onDeleteClick}>Usuń</Button>
            </div>
        </div>
    )
}

export default PartyPreview
