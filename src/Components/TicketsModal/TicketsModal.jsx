import { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import Button from '../Button/Button';
import './ticketsModal.css'
import TicketElement from '../TicketElement/TicketElement';


const TicketsModal = ({ onCloseTicketsList, ticketsData, setCheckedTickets, checkedTickets }) => {


    return ReactDom.createPortal(
      <div>
        <div className="grey-background" onClick={onCloseTicketsList} />
        <div className="tickets-modal">
            <div style={{overflowY: 'scroll', maxHeight: '40rem', marginBottom: '2rem', borderBottom: 'solid black'}}>
                {ticketsData?.map((ticket)=>{
                return(
                    <TicketElement ticket={ticket} onCloseTicketsList={onCloseTicketsList} setCheckedTickets={setCheckedTickets} checkedTickets={checkedTickets}/>
                )
                })}
            </div>
          <Button onClick={onCloseTicketsList} edition>Zamknij</Button>
        </div>
      </div>, document.querySelector('.modal-container')
    )
  }
  
  export default TicketsModal