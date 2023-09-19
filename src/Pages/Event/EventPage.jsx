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

    const description = 'Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.';

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
                    <div className="btn-section">
                        <Button primary className="btn">Weź udział</Button>
                    </div>
                </div>
                <div className="description-section">
                    <h2>Opis wydarzenia</h2>
                    <div className="description">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventPage;