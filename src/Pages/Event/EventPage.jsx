import { useState } from 'react';
import './eventPage.css';
import Button from '../../Components/Button/Button';
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Tag from '../../Components/Tag/Tag';

const EventPage = () => {

    const [currentImage, setCurrentImage] = useState(0);
    const [isOnline, setIsOnline] = useState(false);

    const sections = [
        { label: 'Opis' },
        { label: 'Daty' },
        { label: 'Lokalizacja' }
    ];

    const tags = [
        {id: 0, name: 'Matematyka'},
        {id: 1, name: 'Wielomiany'},
        {id: 2, name: 'Wagary'},
        {id: 3, name: '15-17 lat'}
    ]

    const images = [{ id: 0, src: "https://picsum.photos/1920/700" }, { id: 1, src: "https://picsum.photos/1220/800" }, { id: 2, src: "https://picsum.photos/720/1000" }, { id: 3, src: "https://picsum.photos/1120/700" }]

    const goToPreviousImage = () => {
        const isFirst = currentImage === 0;
        const wantedIndex = isFirst ? images.length - 1 : currentImage - 1;
        setCurrentImage(wantedIndex)
    }

    const goToNextImage = () => {
        const isLast = currentImage === images.length - 1;
        const wantedIndex = isLast ? 0 : currentImage + 1;
        setCurrentImage(wantedIndex);
    }


    const availableSections = sections.map((section) => {
        return <div key={section.label} className='nav'>{section.label}</div>
    })

    const pinnedTags = tags.map((tag) =>{
        return <Tag key={tag.id}>{tag.name}</Tag>
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
                <div className="image-section-content">
                    <div className="image-arrow-left" onClick={goToPreviousImage}>
                        <BsFillArrowLeftSquareFill />
                    </div>
                    <div className="image-wrapper">
                        <img src={images[currentImage].src} alt="Zdjęcie" />
                    </div>
                    <div className="image-arrow-right" onClick={goToNextImage}>
                        <BsFillArrowRightSquareFill />
                    </div>
                </div>
                <div className="date-section">
                    <h2>Data i czas organizowanego wydarzenia</h2>
                    <div className="data-wrapper">
                        <div className='date-wrapper'>
                            <img src='https://cdn.wallpapersafari.com/58/22/6QVpTf.jpg' alt='Background' />
                            <div className="data">
                                24.12.2023
                            </div>
                        </div>
                        <div className='clock-wrapper'>
                            <div className="data">
                                12:30
                            </div>
                            <img src='https://img.utdstc.com/screen/f61/42e/f6142e71f0c9b9752ffa99f20d7a00eeb73873cb581c44143c75d7c81a31aee0:600' alt='Background' />
                        </div>

                    </div>
                </div>
                <div className="localization-section">
                    <h2>Lokalizacja wydarzenia</h2>
                    {isOnline ?
                        <div className="online-wrapper">
                            <span>
                                Kanał na MS Teams.
                            </span>

                        </div>
                        :
                        <div className="not-online-wrapper">
                            <span className="info"><FaMapMarkerAlt />
                            Ulica miejsca wydarzenia, nr budynku, Miasto, Kraj | Politechnika Białostocka, WI, Aula 12B </span>
                            
                        </div>
                    }
                </div>
                <div className="tags-section">
                    <h2>Dziedziny i przedział wiekowy</h2>
                    <div className="tags-wrapper">
                        {pinnedTags}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventPage;