import React, { useEffect, useState } from 'react';
import './ticketPreview.css';
import { BsQuestionLg, BsFillTicketFill } from 'react-icons/bs';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { useHttpClient } from '../../Hooks/http-hook';

const TicketPreview = ({ ticket }) => {

    const navigate = useNavigate();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [ eventData, setEventData] = useState();

    const onEventRedirtect = e =>{
        e.preventDefault();
        navigate(`/events/${ticket.event}`);
    }
    useEffect(() =>{
        const fetchEvent = async () =>{
          try{
            const responseData = await sendRequest(`http://localhost:5000/api/events/${ticket.event}`);
            setEventData(responseData.event);
          }catch(err){}
        };
        fetchEvent();
      }, [sendRequest, ticket]);

    let content;
    if(!ticket.rejected && ticket.acceptation){
        content = <div style={{display: 'flex'}}><span className="green"><FaCheck/></span>Zaakceptowane</div>      
    }
    else if(!ticket.rejected && !ticket.acceptation){
        content = <div style={{display: 'flex'}}><span className="dunno"><BsQuestionLg/></span>Brak akceptacji</div>
        
    }
    else if(ticket.rejected){
        content = <div style={{display: 'flex'}}><span className="red"><ImCross/></span>Odrzucony</div>
    }

    return (
        <div className="ticket-wrapper">
            {!eventData && <ImCross className="removed-icon"/>}
            <div className="opacity-background" />
            <BsFillTicketFill className="ticket-icon" />
            <span className="ticket-id">{ticket.id}</span>
            <div className="ticket-details">
                <div style={{display: 'flex', flexDirection: 'column'}}>Godność:<span className="personal"> {ticket.personal}</span></div>
                <div style={{gap: '1rem', display: 'flex', whiteSpace: 'nowrap'}}>
                    <span>Ilość: <span className="personal">{ticket.quantity}</span></span>
                    <span>Rodzaj: <span className="personal">{ticket.type}</span></span>
                </div>
                {content}
            </div>
            {eventData && <Button primary className="center-button" onClick={onEventRedirtect}>{eventData?.title}</Button>}
        </div>
    )
}

export default TicketPreview
