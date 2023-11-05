import React, {useEffect, useState} from 'react';
import { useHttpClient } from '../../Hooks/http-hook';
import EventPostcard from '../EventPostcard/EventPostcard';

const PostCardsList = ({festivalId}) => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [data, setData] = useState();
    useEffect(() =>{
        const fetchEvents = async () =>{
          try{
            const responseData = await sendRequest(`http://localhost:5000/api/events/festival/${festivalId}`);
            setData(responseData.events);
            console.log('responseData.events', responseData.events)
          }catch(err){}
        };
        fetchEvents();
        }
      , [sendRequest, festivalId]);

      const content = data?.map((event) => {
        return (
            <EventPostcard id={event.id} name={event.title} key={event.key} describtion={event.description} date={event.startDate} clock={event.startTime} images={event.images} tags={[event.fieldTag, event.ageTag]} />
        )
    });
  return (
    <>
      {content}
    </>
  )
}

export default PostCardsList
