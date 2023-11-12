import React, { useEffect, useContext } from 'react';
import './ticketElement.css';
import Button from '../Button/Button';
import {ImCross } from 'react-icons/im';
import { BsTicketPerforatedFill, BsQuestionLg } from 'react-icons/bs';
import { useHttpClient } from '../../Hooks/http-hook';
import { AuthContext } from '../../Context/auth-context';
import { FaCheck } from 'react-icons/fa';



const TicketElement = ({ ticket }) => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);

    const onReject = async e =>{
        e.preventDefault();
        
        await sendRequest(
            `http://localhost:5000/api/tickets/${ticket.id}`,
            'PATCH',
            JSON.stringify({
                rejected: true
            }),
            { 'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token }
        );
    }

    const onAccept = async e =>{
        e.preventDefault();
        
        await sendRequest(
            `http://localhost:5000/api/tickets/${ticket.id}`,
            'PATCH',
            JSON.stringify({
                acceptation: true
            }),
            { 'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token }
        );
    }

    let content;
    if(!ticket.rejected && ticket.acceptation){
        content = <><span className="green"><FaCheck/></span>Zaakceptowane</>      
    }
    else if(!ticket.rejected && !ticket.acceptation){
        content = <><span className="dunno"><BsQuestionLg/></span>Brak akceptacji</>
        
    }
    else if(ticket.rejected){
        content = <><span className="red"><ImCross/></span>Odrzucony</>
    }

    console.log((ticket.rejected || ticket.acceptation))

    return (
        <div className="ticket-element">
            <p><BsTicketPerforatedFill />{ticket.id}</p>
            <div className="personal">
                <span className="smaller-font">Imię i nazwisko: </span>
                <span>{ticket.personal}</span>
                <div>
                    <span className="smaller-font">Rodzaj: </span>
                    <span>{ticket.type}</span>
                </div>
                <div>
                    <span className="smaller-font">Ilość: </span>
                    <span>{ticket.quantity}</span>
                </div>
                <div>
                    <span className="smaller-font">Opis: </span>{ticket.description}
                </div>
            </div>
            <div style={{display: 'flex', margin: '.5rem auto'}}>
                {content}
            </div>
            {(!ticket.rejected && !ticket.acceptation) ? <div className="button-section">
                <Button secondary onClick={onReject}>Odrzuć</Button>
                <Button accept onClick={onAccept}>Zaakceptuj</Button>
            </div>
            :<></>}
        </div>
    )
}

export default TicketElement
