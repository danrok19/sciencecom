import React, { useState, useEffect } from 'react';
import Main from '../../Components/Main/Main';
import FestivalPack from '../../Components/FestivalPack/FestivalPack';
import { useHttpClient } from '../../Hooks/http-hook';

const Home = () => {

  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [data, setData] = useState();
  useEffect(() =>{
    const fetchFestivals = async () =>{
      try{
        const responseData = await sendRequest('http://localhost:5000/api/festivals');
        setData(responseData.festivals);
      }catch(err){}
    };
    fetchFestivals();
    }
  , [sendRequest])
  
    const content = data?.map((festival) =>{
      return(
        <FestivalPack key={festival.id} eventIds={festival.events} className="row" name={festival.title} id={festival.id}style={{display: 'flex', alignItems: 'center', marginTop: '5rem'}}/>
      )
    });


  return (
    <div style={{backgroundColor: '#1A1A1D'}}>
      <Main />
      {isLoading && <span>Ładowanie...</span>}
      {content}
    </div>
  )
}

export default Home
