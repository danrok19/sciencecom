import React, { useContext, useEffect,useState } from 'react';
import Button from '../Button/Button';
import './partyPreview.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/auth-context';
import { useHttpClient } from '../../Hooks/http-hook';
import { MdEditSquare, MdFormatListBulletedAdd} from 'react-icons/md';
import { ImCross } from 'react-icons/im'
import TicketsModal from '../TicketsModal/TicketsModal';
import DeleteModal from '../DeleteModal/DeleteModal';

const PartyPreview = ({ id, title, image, startDate, startTime, setChosenPartyDelete, onShow, onShowTicketsList, setTicketsDataModal }) => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [ticketsData, setTicketsData] = useState();
    const [ticketsAllData, setTicketsAllData] = useState();



    useEffect(() =>{
        const fetchTickets = async () =>{
          try{
            const responseData = await sendRequest(`http://localhost:5000/api/tickets/event/unChecked/${id}`);
            setTicketsData(responseData.tickets);
          }catch(err){}
        };
        fetchTickets();
        }
      ,[sendRequest, id]);

      useEffect(() =>{
        const fetchTickets = async () =>{
          try{
            const responseData = await sendRequest(`http://localhost:5000/api/tickets/event/${id}`);
            setTicketsAllData(responseData.tickets);
          }catch(err){}
        };
        fetchTickets();
        }
      ,[sendRequest, id]);

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

    const onTicketsModal = e =>{
        setTicketsDataModal(ticketsAllData);
        onShowTicketsList();
    }



    return (
        <div className='preview-wrapper'>
          <div className="image-preview-wrapper">
                <img src={`http://localhost:5000/${image}`} alt='Zdjecie' className='image-preview-section' />
            </div>
            <div className="title-section">
                <span className="title-label">{title}</span>
                <span className="date-label">{startDate}</span>
            </div>
            <span>{startTime}</span>
            <div className='edition-section'>
                <Button primary onClick={onPreview}>Podgląd</Button>
                <Button edition onClick={onEdition} style={{width: '5rem'}}><MdEditSquare /></Button>
                <Button accept style={{position: 'relative'}} onClick={onTicketsModal}><MdFormatListBulletedAdd/><span className="tickets-number">{ticketsData?.length}</span></Button>
                <Button secondary onClick={onDeleteClick}><ImCross/></Button>
            </div>
        </div>
    )
}

export default PartyPreview
