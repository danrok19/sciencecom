import React, { useState, useEffect } from 'react';
import Main from '../../Components/Main/Main';
import FestivalPack from '../../Components/FestivalPack/FestivalPack';
import { useHttpClient } from '../../Hooks/http-hook';

const Home = () => {

  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [data, setData] = useState();
  const [dataSearch, setDataSearch] = useState();
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  useEffect(() =>{
    const fetchFestivals = async () =>{
      try{
        const responseData = await sendRequest('http://localhost:5000/api/festivals');
        setData(responseData.festivals);
        setDataSearch(responseData.festivals)
      }catch(err){}
    };
    fetchFestivals();
    }
  , [sendRequest])
  
    const content = dataSearch?.map((festival) =>{
      return(
        <FestivalPack key={festival.id} eventIds={festival.events} className="row" name={festival.title} id={festival.id}style={{display: 'flex', alignItems: 'center', marginTop: '5rem'}}/>
      )
    });


    const onSearch = async e =>{
      e.preventDefault();
      try{
        const responseData = await sendRequest(`http://localhost:5000/api/festivals/festivalsearch?title=${title}&date=${date}`);
        setDataSearch(responseData.festivals);
        if(!dataSearch){
          setDataSearch(data);
        }

      }catch(err){
        console.log(err)
        setDataSearch(data);
      }
    }

  return (
    <div style={{backgroundColor: '#1A1A1D', minHeight: '88vh'}}>
      <Main onSearch={onSearch} setTitle={setTitle} setDate={setDate}/>
      {isLoading && <span>Ładowanie...</span>}
      {content}
    </div>
  )
}

export default Home
