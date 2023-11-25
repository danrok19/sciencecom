import React, { useEffect, useState } from 'react';
import EventCard from '../EventCard/EventCard';
import './eventsList.css';
import { useHttpClient } from '../../Hooks/http-hook';

const EventsList = ({newData}) => {


  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [data, setData] = useState();
  useEffect(() =>{
    const fetchEvents = async () =>{
      try{
        const responseData = await sendRequest('http://localhost:5000/api/events');
        setData(responseData.events);
      }catch(err){}
    };
    if(!newData){fetchEvents()}
  }, [sendRequest])
  
    const content = data?.map((event) =>{
      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 1)
      if(new Date(event.startDate) > currentDate){
        return(
          <EventCard id={event.id} name={event.title} key={event.id} description={event.description} fieldTag={event.fieldTag} images={event.images} startDate={event.startDate}/>
        )
      }
    });
    useEffect(()=>{
      if(newData){
        setData(newData);
      }
    }, [newData])
  return (
    <div className="events-section">
        <div className="events-wrapper">
            {content}
        </div>
    </div>
  )
}

export default EventsList
