import React, { useState, useEffect } from 'react';
import Main from '../../Components/Main/Main';
import FestivalPack from '../../Components/FestivalPack/FestivalPack';
import { useHttpClient } from '../../Hooks/http-hook';
import Loading from '../../Components/Loading/Loading';
import Button from '../../Components/Button/Button';

const Home = () => {

  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [data, setData] = useState();
  const [dataSearch, setDataSearch] = useState();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [firstFestival, setFirstFestival] = useState(0);
  const [endFestival, setEndFestival] = useState(10);

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
  
    const content = dataSearch?.map((festival, index) => {
      if(new Date(festival.endDate) > new Date() && index >= firstFestival && index < endFestival){
        return(
          <FestivalPack key={festival.id} eventIds={festival.events} className="row" name={festival.title} id={festival.id}style={{display: 'flex', alignItems: 'center', marginTop: '5rem'}}/>
        )
      }
    });

    const nextTen = e =>{
      e.preventDefault();
      if(firstFestival >= 10){
        setFirstFestival(firstFestival - 10);
      }
    }
    const prevTen = e =>{
      e.preventDefault();
      if(endFestival < dataSearch.length ){
        setEndFestival(firstFestival + 10);
      }
    }

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
    <div style={{backgroundColor: '#1A1A1D', minHeight: '100vh'}}>
      <Main onSearch={onSearch} setTitle={setTitle} setDate={setDate}/>
      {isLoading && <div>
            <Loading />
            </div>}
      {content}
      <div style={{display: 'flex', width: '50%', justifyContent: 'space-around', margin: 'auto', paddingBottom: '2rem'}}>
        <Button secondary onClick={prevTen}>Poprzednie</Button>
        <Button accept onClick={nextTen}>Następne</Button>
      </div>
    </div>
  )
}

export default Home
