import React from 'react';
import Main from '../../Components/Main/Main';
import FestivalPack from '../../Components/FestivalPack/FestivalPack';

const Home = () => {

  const data = [
    {name: 'Dzień liczby pi', shortDescribtion:'Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.', date:'Czw, Marzec 14',  clock:'12:00', place:'Bia, Politechnika Białostocka', key:'0'},
    {name: 'Dzień liczby pi', shortDescribtion:'Świętuj dzień pi razem z nami!', date:'Czw, Marzec 14',  clock:'12:00', place:'Bia, Politechnika Białostocka', key:'1'},
    {name: 'Dzień liczby pi', shortDescribtion:'Świętuj dzień pi razem z nami!', date:'Czw, Marzec 14',  clock:'12:00', place:'Bia, Politechnika Białostocka', key:'2'},
    {name: 'Dzień liczby pi', shortDescribtion:'Świętuj dzień pi razem z nami!', date:'Czw, Marzec 14',  clock:'12:00', place:'Bia, Politechnika Białostocka', key:'3'}
  ]


  return (
    <div style={{backgroundColor: '#1A1A1D'}}>
      <Main />
      <FestivalPack className="row" name='Festiwal Matematyka Życiem' style={{display: 'flex', alignItems: 'center', marginTop: '5rem'}} data={data}/>
      <FestivalPack className="row" name='Festiwal Matematyka Życiem' style={{display: 'flex', alignItems: 'center', marginTop: '8rem'}} data={data}/>
    </div>
  )
}

export default Home
