import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useHttpClient } from '../../Hooks/http-hook';
import './userPage.css';
import { IoMdPerson } from "react-icons/io";
import Button from '../../Components/Button/Button';
import SmallEventCard from '../../Components/SmallEventCard/SmallEventCard';
import { FaRegCopy } from "react-icons/fa";

const UserPage = () => {
    const [userData, setUserData] = useState();
    const navigate = useNavigate();
    const { profileId } = useParams();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [showEvents, setShowEvents] = useState();
    const [showFestivals, setShowFestivals] = useState();
    const [eventsData, setEventsData] = useState();
    const [festivalsData, setFestivalsData] = useState();
    const emailRef = useRef(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/users/${profileId}`);
                setUserData(responseData);
            } catch (err) { }
        };
        fetchUser();
    }, [sendRequest, profileId]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/events/creator/${profileId}`);
                setEventsData(responseData.events);
            } catch (err) { }
        };
        fetchEvents();
    }, [sendRequest, profileId]);

    useEffect(() => {
        const fetchFestivals = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/festivals/creator/${profileId}`);
                setFestivalsData(responseData.festivals);
            } catch (err) { }
        };
        fetchFestivals();
    }, [sendRequest, profileId]);

    const eventsList = eventsData?.map((event) => {
        return (
            <SmallEventCard title={event.title} images={event.images} id={event.id} event={true}/>
        )
    })

    const festivalsList = festivalsData?.map((festival) => {
        return (
            <SmallEventCard title={festival.title} images={festival.image} id={festival.id} festival={true}/>
        )
    })

    const onEvents = e => {
        e.preventDefault();
        setShowFestivals(false);
        setShowEvents(!showEvents);
    }

    const onFestivals = e => {
        e.preventDefault();
        setShowEvents(false);
        setShowFestivals(!showFestivals);
    }

    const copyToClipboard = () => {
        // Select the text in the input element
        emailRef.current.select();
    
        // Execute the "copy" command
        document.execCommand('copy');
    
        // Deselect the text
        window.getSelection().removeAllRanges();
      };
    return (
        <div className="user-page">
            <div className="profile-section">
                <div className="icon-wrapper">
                    <IoMdPerson className="icon-self" />
                </div>
                <div className="user-info">
                    <div className="personal">
                        <span className="span-self">{userData?.name} {userData?.surname}</span>
                            <div style={{display: 'flex', flexDirection: 'row', gap: '0'}}>
                                <input readOnly className="span-self-email" ref={emailRef} value={userData?.email}/>
                                <FaRegCopy className="copy-icon"onClick={copyToClipboard}/>
                            </div>
                        <div className="experience">
                            <Button primary onClick={onEvents}>Własne wydarzenia</Button>
                            <Button primary onClick={onFestivals}>Własne pakiety imprez</Button>
                        </div>
                        <div>
                            {showEvents && <span>Liczba wydarzeń: {eventsData.length}</span>}
                            {showFestivals && <span>Liczba pakietów: {festivalsData.length}</span>}
                            {showEvents ? <>{eventsList}</> : <></>}
                            {showFestivals ? <>{festivalsList}</> : <></>}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UserPage
