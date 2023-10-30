import React from 'react';
import './festivalPack.css';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import EventCard from '../EventCard/EventCard';

const FestivalPack = ({ name, data, ...rest }) => {

    const content = data.map((event) =>{
        return(
          <EventCard name={event.name} className="col-md-3 event-card" key={event.key} description={event.describtion} date={event.date} clock={event.clock} place={event.place}/>
        )
      })
    return (
        <div className='pack'>
            <div className='topHeader' style={rest.style}>
                <h1>{name}</h1>
                <h4><Link to='festival' className='link-to-more'>Zobacz wszystkie wydarzenia <IoIosArrowForward /></Link></h4>
            </div>
            <div className='cards'>
                {content}
            </div>
        </div>
    )
}

export default FestivalPack
