import React, { useEffect, useState } from 'react';
import EventCard from '../EventCard/EventCard';
import './eventsList.css';
import { useHttpClient } from '../../Hooks/http-hook';

const EventsList = () => {


  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [data, setData] = useState();
  useEffect(() =>{
    const fetchEvents = async () =>{
      try{
        const responseData = await sendRequest('http://localhost:5000/api/events');
        setData(responseData.events);
      }catch(err){}
    };
    fetchEvents();
  }, [sendRequest])
  
    const content = data?.map((event) =>{
      return(
        <EventCard id={event.id} name={event.title} key={event.id} description={event.description} fieldTag={event.fieldTag} images={event.images}/>
      )
    });

  return (
    <div className="events-section">
        <div className="events-wrapper">
            {content}
        </div>
    </div>
  )
}

export default EventsList
