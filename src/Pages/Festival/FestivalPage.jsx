import React, { useRef, useState, useEffect } from 'react';
import './festival.css';
import EventPostcard from '../../Components/EventPostcard/EventPostcard';
import Button from '../../Components/Button/Button';


const FestivalPage = () => {

    const [optionalTitleWrapper, setOptionalTitleWrapper] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const imageRef = useRef();

    const onDetailsShow = () =>{
        setShowDetails(!showDetails);
    }

    useEffect(() => {
        if (showDetails) {
          // Make sure imageRef.current is not undefined before accessing its classList
          if (imageRef.current) {
            imageRef.current.classList.add('getDetails');
          }
        } else {
          // Make sure imageRef.current is not undefined before accessing its classList
          if (imageRef.current) {
            imageRef.current.classList.remove('getDetails');
          }
        }
      }, [showDetails]);

    const data = [
        { name: 'Dzień liczby pi', describtion: 'Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.', date: 'Czw, Marzec 14', clock: '12:00', place: 'Bia, Politechnika Białostocka', tags: [{ name: 'matematyka', id: 1 }, { name: 'fizyka', id: 2 }], key: '0' },
        { name: 'Dzień liczby pi', describtion: 'Świętuj dzień pi razem z nami!Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.', date: 'Czw, Marzec 14', clock: '12:00', place: 'Bia, Politechnika Białostocka', tags: [{ name: 'matematyka', id: 1 }, { name: 'fizyka', id: 2 }], key: '1' },
        { name: 'Dzień liczby pi', describtion: 'Świętuj dzień pi razem z nami!Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.', date: 'Czw, Marzec 14', clock: '12:00', place: 'Bia, Politechnika Białostocka', tags: [{ name: 'matematyka', id: 1 }, { name: 'fizyka', id: 2 }], key: '2' },
        { name: 'Dzień liczby pi', describtion: 'Świętuj dzień pi razem z nami!Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.', date: 'Czw, Marzec 14', clock: '12:00', place: 'Bia, Politechnika Białostocka', tags: [{ name: 'matematyka', id: 1 }, { name: 'fizyka', id: 2 }], key: '3' }
    ]
    const festivalInfo = { id: 1, name: 'Nazwa Festiwalu', organization: 'Nazwa Organizarota', startDate: '14-03-2023', endDate: '15-03-2023', eventAmount: 4, image: 'https://picsum.photos/1920/700', describtion: 'Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz!'}

    const content = data.map((event) => {
        return (
            <EventPostcard name={event.name} key={event.key} describtion={event.describtion} date={event.date} clock={event.clock} place={event.place} tags={event.tags} />
        )
    })
    return (
        <div className="dark">
            <div className="festival-info">
                <div className="image-wrapper">
                    <div className="blured-image">
                        <img src="https://picsum.photos/1920/700" alt="ImageTitle" />
                    </div>
                    <div className="correct-image" ref={imageRef}>
                        <img src="https://picsum.photos/1920/700" alt="ImageTitle"/>
                        {optionalTitleWrapper ?
                            <div className="black-title-wrapper">
                                <div className="title">
                                    <span className="organization-name">Organization's name</span>
                                    <span>Festival's Title</span>
                                </div>
                            </div>
                            :
                            <div className="black-title-wrapper">
                                <div className="title">
                                    <span className="organization-name">Organization's name</span>
                                    <span>Festival's Title</span>
                                </div>
                            </div>
                        }

                    </div>
                    <div className="details-wrapper">
                        <p>{festivalInfo.name}</p>
                        <p>{festivalInfo.organization}</p>
                        <p>Początek festiwalu: {festivalInfo.startDate}</p>
                        <p>Koniec festiwalu: {festivalInfo.endDate}</p>
                        <p>Ilość wydarzeń: {festivalInfo.eventAmount}</p>
                    </div>
                    <Button className="details-button" onClick={onDetailsShow}>Pokaż Szczegóły</Button>
                </div>
                <div>
                    {content}
                </div>
            </div>
        </div>
    )


}

export default FestivalPage