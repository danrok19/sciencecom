import React from 'react';
import './eventPage.css';

const EventPage = () => {

    return (
        <div className="event-section">
            <div className="image-section">
                <img className="blured-img" src='https://picsum.photos/1920/700' alt="Zdjęcie" />
                <div className="image-wrapper">
                    <img src='https://picsum.photos/1920/700' alt="Zdjęcie" />

                    <div className="info-wrapper">
                        <p>Nazwa Organizatora</p>
                        <p>Nazwa Wydarzenia</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventPage;