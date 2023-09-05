import React, { useRef, useState, useEffect } from 'react';
import './festival.css';
import EventPostcard from '../../Components/EventPostcard/EventPostcard';
import Button from '../../Components/Button/Button';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';


const FestivalPage = () => {

    const [optionalTitleWrapper, setOptionalTitleWrapper] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const imageRef = useRef();

    const onDetailsShow = () => {
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
    const festivalInfo = { id: 1, name: 'Nazwa Festiwalu', organization: 'Nazwa Organizarota', startDate: '14-03-2023', endDate: '15-03-2023', eventAmount: 4, image: 'https://picsum.photos/1920/700', describtion: 'Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz!Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam.Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam.' }

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
                        <img src="https://picsum.photos/1920/700" alt="ImageTitle" className="image-image" />
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
                        <p className="festival-name"><FiChevronRight style={{ color: '#950740' }} />{festivalInfo.name}<FiChevronLeft style={{ color: '#950740' }} /></p>
                        <div className="date-wrapper">
                            <p className="festival-start-date"><span style={{ fontSize: '15px', maxHeight: '2.8rem', lineHeight: '1.4rem' }}>Początek imprezy: </span><span>{festivalInfo.startDate}</span></p>
                            <p className="festival-end-date"><span style={{ fontSize: '15px' }}>Koniec festiwalu: </span><span>{festivalInfo.endDate}</span></p>
                        </div>
                        <div className="describtion-wrapper">
                            {festivalInfo.describtion}
                        </div>
                        <p className="festival-event-amount">Ilość wydarzeń: {festivalInfo.eventAmount}</p>
                        <p className="festival-organization">Zaprasza {festivalInfo.organization}</p>
                    </div>
                    <Button className="details-button secondary" onClick={onDetailsShow}>
                        {!showDetails ?
                            'Pokaż Szczegóły'
                            :
                            'Ukryj szczegóły'}
                    </Button>
                </div>
                <div className="event-wrapper">
                    {content}
                </div>
            </div>
        </div>
    )


}

export default FestivalPage