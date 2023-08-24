import React from 'react';
import './festival.css';
import EventPostcard from '../../Components/EventPostcard/EventPostcard';


const FestivalPage = () => {


    const data = [
        {name: 'Dzień liczby pi', describtion:'Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.', date:'Czw, Marzec 14',  clock:'12:00', place:'Bia, Politechnika Białostocka', key:'0'},
        {name: 'Dzień liczby pi', describtion:'Świętuj dzień pi razem z nami!', date:'Czw, Marzec 14',  clock:'12:00', place:'Bia, Politechnika Białostocka', key:'1'},
        {name: 'Dzień liczby pi', describtion:'Świętuj dzień pi razem z nami!', date:'Czw, Marzec 14',  clock:'12:00', place:'Bia, Politechnika Białostocka', key:'2'},
        {name: 'Dzień liczby pi', describtion:'Świętuj dzień pi razem z nami!', date:'Czw, Marzec 14',  clock:'12:00', place:'Bia, Politechnika Białostocka', key:'3'}
      ]

      const content = data.map((event) =>{
        return(
          <EventPostcard name={event.name} key={event.key} describtion={event.shortDescribtion} date={event.date} clock={event.clock} place={event.place}/>
        )
      })
    return (
        <div className="dark">
            <div className="festival-info">
                <div className="title">
                    Festival Title
                </div>
                <div>
                    {content}
                </div>
            </div>
        </div>
    )


}

export default FestivalPage