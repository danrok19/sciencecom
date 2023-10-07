import React from 'react';
import EventCard from '../EventCard/EventCard';
import './eventsList.css';

const EventsList = ({data}) => {

  
    const content = data.map((event) =>{
      return(
        <EventCard name={event.name}  key={event.key} describtion={event.describtion} date={event.date} clock={event.clock} place={event.place}/>
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
