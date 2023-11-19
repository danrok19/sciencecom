import { useState, useRef, useEffect, useContext } from 'react';
import './eventPage.css';
import Button from '../../Components/Button/Button';
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Tag from '../../Components/Tag/Tag';
import JoinModal from '../../Components/JoinModal/JoinModal';
import { useHttpClient } from '../../Hooks/http-hook';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/auth-context';
import DeleteModal from '../../Components/DeleteModal/DeleteModal';
import { useNavigate } from 'react-router-dom';
import { BsPeopleFill } from "react-icons/bs";
import Loading from '../../Components/Loading/Loading';
import { IoMdPerson } from "react-icons/io";

const EventPage = () => {

    const [currentImage, setCurrentImage] = useState(0);
    const [isOnline, setIsOnline] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [data, setData] = useState();
    const { eventId } = useParams();
    const [tags, setTags] = useState();
    const auth = useContext(AuthContext);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() =>{
      const fetchEvents = async () =>{
        try{
          const responseData = await sendRequest(`http://localhost:5000/api/events/${eventId}`);
          setData(responseData.event);
          let arrayTag = [];
          for(let tag of responseData.event.fieldTag){
            arrayTag.push({name: tag});
          }
          arrayTag.push({name: responseData.event.ageTag});
          setTags(arrayTag);
        }catch(err){}
      };
      fetchEvents();
    }, [sendRequest, eventId]);


    const opisRef = useRef(null);
    const datyRef = useRef(null);
    const lokalizacjaRef = useRef(null);
    const imgRef = useRef(null);

    const scrollToSection = (label) => {
        if(label === sections[0].label){
            opisRef.current?.scrollIntoView({ behavior: 'smooth' });
            opisRef.current.style.background = '#27272b';
            opisRef.current.style.transform = 'scale(1.05)';
            datyRef.current.style.transform = 'scale(1)';
            datyRef.current.style.background = 'transparent';
            lokalizacjaRef.current.style.transform = 'scale(1)';
            lokalizacjaRef.current.style.background = 'transparent';
        }
        else if(label === sections[1].label){
            datyRef.current?.scrollIntoView({ behavior: 'smooth' });
            datyRef.current.style.background = '#27272b';
            datyRef.current.style.transform = 'scale(1.05)';
            opisRef.current.style.transform = 'scale(1)';
            opisRef.current.style.background = 'transparent';
            lokalizacjaRef.current.style.transform = 'scale(1)';
            lokalizacjaRef.current.style.background = 'transparent';
        }
        else if(label === sections[2].label){
            lokalizacjaRef.current?.scrollIntoView({ behavior: 'smooth' });
            lokalizacjaRef.current.style.background = '#27272b';
            lokalizacjaRef.current.style.transform = 'scale(1.05)';
            opisRef.current.style.transform = 'scale(1)';
            opisRef.current.style.background = 'transparent';
            datyRef.current.style.transform = 'scale(1)';
            datyRef.current.style.background = 'transparent';
        }
        
    };


    const sections = [
        { label: 'Opis' },
        { label: 'Daty' },
        { label: 'Lokalizacja' }
    ];

    const goToPreviousImage = () => {
        const isFirst = currentImage === 0;
        const wantedIndex = isFirst ? data.images.length - 1 : currentImage - 1;
        setCurrentImage(wantedIndex)
    }

    const goToNextImage = () => {
        const isLast = currentImage === data.images.length - 1;
        const wantedIndex = isLast ? 0 : currentImage + 1;
        setCurrentImage(wantedIndex);
    }

    const handleShowModal = () =>{
        setShowModal(true);
        imgRef.current?.scrollIntoView({ behavior: 'smooth'});
    }
    const handleCloseModal = () =>{
        setShowModal(false);
    }


    const availableSections = sections.map((section) => {
        return <div key={section.label} className='nav' onClick={() => scrollToSection(section.label)}>{section.label}</div>
    })

    const pinnedTags = tags?.map((tag) =>{
        return <Tag key={tag.name}>{tag.name}</Tag>
    })

    const title = <h2>Usuwanie wydarzenia</h2>;
    const content = <div>
        <div>Czy na pewno chesz usunąć wydarzenie. Po zatwierdzeniu wybrane wydarzenie nie będzie już dostępne.</div>
    </div>;

    const onDelete = (e) =>{
        e.preventDefault();
        setShowDeleteModal(true);
    }
    const onClose = () =>{
        setShowDeleteModal(false);
    }
    const onSubmitDelete = async e =>{
        e.preventDefault();
        await sendRequest(
            `http://localhost:5000/api/events/${data.id}`,
            'DELETE',
            null,
            { 'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token  }
        );
        navigate('/');
    }

    const onSubmitEdit = e =>{
        e.preventDefault();
        navigate(`/eventUpdate/${data.id}`);
    }

    const onFestClick = e =>{
        e.preventDefault()
        navigate(`/festival/${data.festival}`);
    }

    const navToProfile = e =>{
        e.preventDefault();
        navigate(`/user/${data.creator}`);
    }

    return (
        <>
        {isLoading && <div>
            <Loading />
            </div>}
        {showDeleteModal && <DeleteModal onClose={onClose} title={title} content={content} onSubmit={onSubmitDelete}/>}
        {data && <div className="event-section" ref={imgRef}>
            {showModal && <JoinModal eventId={eventId} onClose={handleCloseModal} startDate={data.startDate} startTime={data.startTime} address={data.address} limit={data.limit}/>}
            <div className="image-section">
                <img className="blured-img" src={`http://localhost:5000/${data.images[0]}`} alt="Zdjęcie" />
                <div className="image-wrapper">
                    <img src={`http://localhost:5000/${data.images[0]}`} alt="Zdjęcie" />

                    <div className="info-wrapper">
                        <p className="organization-name">{data.title}</p>
                        <p className="event-name">{data.organization} <IoMdPerson className="profile-icon" onClick={navToProfile}/></p>
                    </div>
                </div>
            </div>
            <div className="navigation-section">
                <div className="section-wrapper">
                    {availableSections}
                    {data.festival && <Button primary onClick={onFestClick} style={{width: 'fit-content'}}>Przejdź do imprezy</Button>}
                </div>
            </div>
            <div className="content-section">
                <div className="join-section">
                    <div className="btn-section">
                        <Button primary className="btn" onClick={handleShowModal} disabled={!auth.isLoggedIn}>Weź udział</Button>
                    </div>
                </div>

                <div ref={opisRef} className="description-section">
                    <h2>Opis wydarzenia</h2>
                    <div className="description">
                        {data.description}
                    </div>
                </div>
                {data.images && <div className="image-section-content">
                    <div className="image-arrow-left" onClick={goToPreviousImage}>
                        <BsFillArrowLeftSquareFill />
                    </div>
                    <div className="image-wrapper">
                        <img src={`http://localhost:5000/${data.images[currentImage]}`} alt="Zdjęcie" />
                    </div>
                    <div className="image-arrow-right" onClick={goToNextImage}>
                        <BsFillArrowRightSquareFill />
                    </div>
                </div>}
                <div ref={datyRef} className="date-section">
                    <h2>Data i czas organizowanego wydarzenia</h2>
                    <div className="data-wrapper">
                        <div className='date-wrapper'>
                            <img src='https://cdn.wallpapersafari.com/58/22/6QVpTf.jpg' alt='Background' />
                            <div className="data">
                            {data.startDate}
                            </div>
                        </div>
                        <div className='clock-wrapper'>
                            <div className="data">
                            {data.startTime}
                            </div>
                            <img src='https://img.utdstc.com/screen/f61/42e/f6142e71f0c9b9752ffa99f20d7a00eeb73873cb581c44143c75d7c81a31aee0:600' alt='Background' />
                        </div>

                    </div>
                </div>
                <div className="localization-section" ref={lokalizacjaRef}>
                    <h2>Lokalizacja wydarzenia</h2>
                    {isOnline ?
                        <div className="online-wrapper">
                            <span>
                                {data.address}
                            </span>

                        </div>
                        :
                        <div className="not-online-wrapper">
                            <span className="info"><FaMapMarkerAlt />{data.address}</span>
                            
                        </div>
                    }
                </div>
                <div className="limit-section">
                    <h2>Liczba miejsc do rezerwacji</h2>
                    <div className="limit-wrapper">
                        <BsPeopleFill /> <span>{data.limit}</span>
                    </div> 
                </div>
                <div className="tags-section">
                    <h2>Dziedziny i przedział wiekowy</h2>
                    <div className="tags-wrapper">
                        {pinnedTags}
                    </div>
                </div>
                
                {auth && auth.userId === data.creator && <div className="creator-panel">
                        <Button primary>Przegląd zgłoszeń</Button>
                        <Button edition onClick={onSubmitEdit}>Formularz edycji</Button>
                        <Button secondary onClick={onDelete}>Usuń wydarzenie</Button>
                    </div>}
            </div>
        </div>}
        </>
    )
}

export default EventPage;