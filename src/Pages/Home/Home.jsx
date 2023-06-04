import React from 'react'
import Main from '../../Components/Main/Main'
import FestivalPack from '../../Components/FestivalPack/FestivalPack'
import EventCard from '../../Components/EventCard/EventCard'

const Home = () => {

  const data = [
    {name: 'Dzień liczby pi', shortDescribtion:'Świętuj dzień pi razem z nami!', date:'Czw, Marzec 14',  clock:'12:00', place:'Bia, Politechnika Białostocka', key:'0'},
    {name: 'Dzień liczby pi', shortDescribtion:'Świętuj dzień pi razem z nami!', date:'Czw, Marzec 14',  clock:'12:00', place:'Bia, Politechnika Białostocka', key:'1'},
    {name: 'Dzień liczby pi', shortDescribtion:'Świętuj dzień pi razem z nami!', date:'Czw, Marzec 14',  clock:'12:00', place:'Bia, Politechnika Białostocka', key:'2'},
    {name: 'Dzień liczby pi', shortDescribtion:'Świętuj dzień pi razem z nami!', date:'Czw, Marzec 14',  clock:'12:00', place:'Bia, Politechnika Białostocka', key:'3'}
  ]

  const content = data.map((event) =>{
    return(
      <React.Fragment key={event.key}><EventCard name={event.name} shortDescribtion={event.shortDescribtion} date={event.date} clock={event.clock} place={event.place}/></React.Fragment>
    )
  })
  return (
    <div>
      <Main />
      <FestivalPack name='Festiwal Matematyka Życiem' style={{display: 'flex', alignItems: 'center', marginTop: '5rem'}}>
        {content}
      </FestivalPack>

      <FestivalPack name='Festiwal Matematyka Życiem' style={{display: 'flex', alignItems: 'center', marginTop: '8rem'}}>
        {content}
      </FestivalPack>
    </div>
  )
}

export default Home
