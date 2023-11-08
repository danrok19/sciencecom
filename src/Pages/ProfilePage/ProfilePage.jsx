import { useState, useEffect, useContext } from 'react'
import ProfileNavbar from '../../Components/ProfileNavbar/ProfileNavbar';
import { useHttpClient } from '../../Hooks/http-hook';
import { AuthContext } from '../../Context/auth-context';
import PartyPreview from '../../Components/PartyPreview/PartyPreview';
import DeleteModal from '../../Components/DeleteModal/DeleteModal';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [profileContent, setProfileContent] = useState("Management");
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [dataUser, setDataUser] = useState();
    const [dataFestivals, setDataFestivals] = useState();
    const [dataEvents, setDataEvents] = useState();
    const auth = useContext(AuthContext);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [chosenPartyDelete, setChosenPartyDelete] = useState();
    const navigate = useNavigate();

    const onChange = (option) =>{
        setProfileContent(option);
    }
    const onClose = () =>{
        setShowDeleteModal(false);
    }
    const onShow = () =>{
        setShowDeleteModal(true);
    }

    useEffect(() =>{
        const fetchUser = async () =>{
          try{
            const responseData = await sendRequest(`http://localhost:5000/api/users/${auth.userId}`);
            setDataUser(responseData);
          }catch(err){}
        };
        fetchUser();
      }, [sendRequest, auth.userId]);

      useEffect(() =>{
        const fetchFestivals = async () =>{
          try{
            const responseData = await sendRequest(`http://localhost:5000/api/festivals/creator/${auth.userId}`);
            setDataFestivals(responseData.festivals);
          }catch(err){}
        };
        fetchFestivals();
      }, [sendRequest, auth.userId]);

      useEffect(() =>{
        const fetchEvents = async () =>{
          try{
            const responseData = await sendRequest(`http://localhost:5000/api/events/creator/${auth.userId}`);
            setDataEvents(responseData.events);
          }catch(err){}
        };
        fetchEvents();
      }, [sendRequest, auth.userId]);

      const onSubmitDelete = async e =>{
        e.preventDefault();
        await sendRequest(
            `http://localhost:5000/api/events/${chosenPartyDelete.id}`,
            'DELETE',
            null,
            { 'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token  }
        );
        navigate('/');
    }

    const title = <h2>Usuwanie wydarzenia</h2>;
    const contentModal = <div>
        <div>Czy na pewno chesz usunąć wydarzenie: "{chosenPartyDelete?.title}". Po zatwierdzeniu wybrane wydarzenie nie będzie już dostępne.</div>
    </div>;

console.log( "siema",chosenPartyDelete);
    let content;

    switch (profileContent){
        case "Management":
            content = <>Cześć {dataUser?.name + ' ' + dataUser?.surname}</>
            break
        case "Organize":
            content = <div>
                <h2>Twoje imprezy</h2>
                {dataFestivals.map((festival)=>{
                    return(
                        <div>
                            {festival.title}
                            </div>
                    )
                })}
                {dataEvents.map((event)=>{
                    return(
                        <PartyPreview id={event.id} title={event.title} image={event.images[0]} startDate={event.startDate} startTime={event.startTime} setChosenPartyDelete={setChosenPartyDelete} onShow={onShow}/>
                    )
                })}
            </div>
            break
        case "Participate":
            content = <>Participate</>
            break
        default:
            content = <></>
    }
  return (
    <div style={{minHeight: '91.1vh', background: '#1A1A1D', color: 'white'}}>
        <ProfileNavbar onChange={onChange}/>
        {showDeleteModal && <DeleteModal onClose={onClose} title={title} content={contentModal} onSubmit={onSubmitDelete}/>}
        {content}
    </div>
  )
}

export default ProfilePage
