import React from 'react';
import './ticketPreview.css';
import { BsTicketPerforatedFill } from 'react-icons/bs';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const TicketPreview = ({ ticket }) => {

    const navigate = useNavigate();

    const onEventRedirtect = e =>{
        e.preventDefault();
        navigate(`/events/${ticket.event}`);
    }

    return (
        <div className="ticket-wrapper">
            <div className="opacity-background" />
            <BsTicketPerforatedFill className="ticket-icon" />
            <span className="ticket-id">{ticket.id}</span>
            <div className="ticket-details">
                <div style={{display: 'flex', flexDirection: 'column'}}>Godność:<span className="personal"> {ticket.personal}</span></div>
                <div style={{gap: '1rem', display: 'flex', whiteSpace: 'nowrap'}}>
                    <span style={{}}>Ilość: <span className="personal">{ticket.quantity}</span></span>
                    <span>Rodzaj: <span className="personal">{ticket.type}</span></span>
                </div>
                
            </div>
            <Button primary className="center-button" onClick={onEventRedirtect}>Impreza</Button>
        </div>
    )
}

export default TicketPreview
