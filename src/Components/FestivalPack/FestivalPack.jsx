import React, { useEffect, useState } from 'react';
import './festivalPack.css';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import EventCard from '../EventCard/EventCard';
import { useHttpClient } from '../../Hooks/http-hook';

const FestivalPack = ({ name, id, eventIds, ...rest }) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [data, setData] = useState();

    useEffect(() =>{
        const fetchEvents = async () =>{
          try{
            const responseData = await sendRequest(`http://localhost:5000/api/events/festival/${id}`);
            setData(responseData.events);
          }catch(err){}
        };
        fetchEvents();
      }, [sendRequest])
      
        const content = data?.map((event, index) =>{
          if(index < 4){
            return(
              <EventCard id={event.id} name={event.title} key={event.id} description={event.description} fieldTag={event.fieldTag} images={event.images} startDate={event.startDate}/>
            )
          }
        });

    return (
        <div className='pack'>
            <div className='topHeader' style={rest.style}>
                <h1>{name}</h1>
                <h4><Link to={`/festival/${id}`} className='link-to-more'>Zobacz wszystkie wydarzenia <IoIosArrowForward /></Link></h4>
            </div>
            <div className='cards'>
                {content}
            </div>
        </div>
    )
}

export default FestivalPack
