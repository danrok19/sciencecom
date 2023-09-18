import React from 'react';
import './eventPage.css';
import Button from '../../Components/Button/Button';

const EventPage = () => {

    const sections = [
        { label: 'Opis' },
        { label: 'Daty' },
        { label: 'Lokalizacja' }
    ];


    const availableSections = sections.map((section) => {
        return <div key={section.label} className='nav'>{section.label}</div>
    })

    return (
        <div className="event-section">
            <div className="image-section">
                <img className="blured-img" src='https://picsum.photos/1920/700' alt="Zdjęcie" />
                <div className="image-wrapper">
                    <img src='https://picsum.photos/1920/700' alt="Zdjęcie" />

                    <div className="info-wrapper">
                        <p className="organization-name">Nazwa Organizatora</p>
                        <p className="event-name">Nazwa Wydarzenia</p>
                    </div>
                </div>
            </div>
            <div className="navigation-section">
                <div className="section-wrapper">
                    {availableSections}
                </div>
            </div>
            <div className="content-section">
                <div className="join-section">
                    <Button primary className="btn">Dołącz</Button>
                </div>
                <div className="description-section">
                    hfuisadhsadsa
                </div>
            </div>
        </div>
    )
}

export default EventPage;