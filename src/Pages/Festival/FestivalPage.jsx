import React, { useRef, useState, useEffect, useContext } from 'react';
import './festival.css';
import EventPostcard from '../../Components/EventPostcard/EventPostcard';
import Button from '../../Components/Button/Button';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { AuthContext } from '../../Context/auth-context';
import { useNavigate, useParams } from 'react-router-dom';
import { useHttpClient } from '../../Hooks/http-hook';
import DeleteModal from '../../Components/DeleteModal/DeleteModal';
import PostCardsList from '../../Components/PostCardsList/PostCardsList';
import { LuFilter } from 'react-icons/lu';
import FilterModal from '../../Components/FilterModal/FilterModal';
import Loading from '../../Components/Loading/Loading';
import { IoMdPerson } from "react-icons/io";


const FestivalPage = () => {

    const [optionalTitleWrapper, setOptionalTitleWrapper] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const imageRef = useRef();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [data, setData] = useState();
    const { festivalId } = useParams();


    const onDetailsShow = () => {
        setShowDetails(!showDetails);
    }

    useEffect(() => {
        const fetchFestivals = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/festivals/${festivalId}`);
                setData(responseData.festival);
            } catch (err) { }
        };
        fetchFestivals();
    }
        , [sendRequest, festivalId]);

    useEffect(() => {
        if (showDetails) {
            if (imageRef.current) {
                imageRef.current.classList.add('getDetails');
            }
        } else {
            if (imageRef.current) {
                imageRef.current.classList.remove('getDetails');
            }
        }
    }, [showDetails]);



    const title = <h2>Usuwanie festiwalu</h2>;
    const contentModal = <div>
        <div>Czy na pewno chesz usunąć festiwal. Po zatwierdzeniu wybrany festiwal nie będzie już dostępny.</div>
    </div>;

    const onDelete = (e) => {
        e.preventDefault();
        setShowDeleteModal(true);
    }
    const onClose = () => {
        setShowDeleteModal(false);
    }
    const onSubmitDelete = async e => {
        if (data.events.length === 0) {
            e.preventDefault();
            await sendRequest(
                `http://localhost:5000/api/festivals/${data.id}`,
                'DELETE',
                null,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
            navigate('/');
        }
        else {
            console.log('Festiwal ma jeszcze podłączone wydarzenia.')
        }
    }

    const onSubmitEdit = e => {
        e.preventDefault();
        navigate(`/festivalUpdate/${data.id}`)
    }

    const onSubmitAdd = e => {
        e.preventDefault();
        navigate('/organizeEvent')
    }
    const navToProfile = e => {
        e.preventDefault();
        navigate(`/user/${data.creator}`);
    }
    return (
        <>{isLoading && <div>
            <Loading />
            </div>}
        <div className="dark">
            {showDeleteModal && <DeleteModal onClose={onClose} title={title} content={contentModal} onSubmit={onSubmitDelete} />}
            <div className="festival-info">
                <div className="image-wrapper">
                    <div className="blured-image">
                        <img src={`http://localhost:5000/${data?.image}`} alt="ImageTitle" />
                    </div>
                    <div className="correct-image" ref={imageRef}>
                        <img src={`http://localhost:5000/${data?.image}`} alt="ImageTitle" className="image-image" />
                        {optionalTitleWrapper ?
                            <div className="black-title-wrapper">
                                <div className="title">
                                    <span className="organization-name">{data?.organization}</span>
                                    <span>{data?.title}</span>
                                </div>
                            </div>
                            :
                            <div className="black-title-wrapper">
                                <div className="title">
                                    <span className="organization-name">{data?.organization}</span>
                                    <span style={{display: 'flex', gap: '.5rem', alignItems: 'center'}}>{data?.title}<IoMdPerson className="profile-icon" onClick={navToProfile} /></span>
                                </div>
                            </div>
                        }

                    </div>
                    <div className="details-wrapper">
                        <p className="festival-name"><FiChevronRight style={{ color: '#950740' }} />{data?.title}<FiChevronLeft style={{ color: '#950740' }} /></p>
                        <div className="date-wrapper">
                            <p className="festival-start-date"><span style={{ fontSize: '15px', maxHeight: '2.8rem', lineHeight: '1.4rem' }}>Początek imprezy: </span><span>{data?.startDate}</span></p>
                            <p className="festival-end-date"><span style={{ fontSize: '15px' }}>Koniec festiwalu: </span><span>{data?.endDate}</span></p>
                        </div>
                        <div className="describtion-wrapper">
                            {data?.description}
                        </div>
                        <p className="festival-event-amount">Ilość wydarzeń: {data?.events.length}</p>
                        <p className="festival-organization">Zaprasza {data?.organization}</p>
                    </div>
                    <Button className="details-button secondary" onClick={onDetailsShow}>
                        {!showDetails ?
                            'Pokaż Szczegóły'
                            :
                            'Ukryj szczegóły'}
                    </Button>
                </div>
                <div className="event-wrapper">
                    <PostCardsList festivalId={festivalId} />
                </div>
                {auth && auth.userId === data?.creator && <div className="creator-panel">
                    <Button primary onClick={onSubmitAdd}>Dodaj wydarzenie</Button>
                    <Button edition onClick={onSubmitEdit}>Formularz edycji</Button>
                    <Button secondary onClick={onDelete}>Usuń imprezę</Button>
                </div>}
            </div>
        </div></>
    )


}

export default FestivalPage