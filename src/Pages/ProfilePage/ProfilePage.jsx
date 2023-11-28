import { useState, useEffect, useContext } from 'react'
import ProfileNavbar from '../../Components/ProfileNavbar/ProfileNavbar';
import { useHttpClient } from '../../Hooks/http-hook';
import { AuthContext } from '../../Context/auth-context';
import PartyPreview from '../../Components/PartyPreview/PartyPreview';
import DeleteModal from '../../Components/DeleteModal/DeleteModal';
import { useNavigate } from 'react-router-dom';
import { HiOutlineTicket } from 'react-icons/hi';
import TicketPreview from '../../Components/TicketPreview/TicketPreview';
import TicketsModal from '../../Components/TicketsModal/TicketsModal';
import FestivalPreview from '../../Components/FestivalPreview/FestivalPreview';
import Button from '../../Components/Button/Button';

const ProfilePage = () => {
  const [profileContent, setProfileContent] = useState("Management");
  const { isLoading, sendRequest } = useHttpClient();
  const [dataUser, setDataUser] = useState();
  const [dataFestivals, setDataFestivals] = useState();
  const [dataEvents, setDataEvents] = useState();
  const [dataTickets, setDataTickets] = useState();
  const auth = useContext(AuthContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [chosenPartyDelete, setChosenPartyDelete] = useState();
  const [showDeleteFestivalModal, setShowDeleteFestivalModal] = useState(false);
  const [chosenFestivalDelete, setChosenFestivalDelete] = useState();
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketsData, setTicketsData] = useState();
  const navigate = useNavigate();

  const onChange = (option) => {
    setProfileContent(option);
  }
  const onClose = () => {
    setShowDeleteModal(false);
  }
  const onCloseF = () => {
    setShowDeleteFestivalModal(false);
  }
  const onShow = () => {
    setShowDeleteModal(true);

  }
  const onShowF = () => {
    setShowDeleteFestivalModal(true);

  }
  const onShowTicketsList = () => {
    setShowTicketModal(true);
  }
  const onCloseTicketsList = () => {
    setShowTicketModal(false);
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/users/${auth.userId}`);
        setDataUser(responseData);
      } catch (err) { }
    };
    fetchUser();
  }, [sendRequest, auth.userId]);

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/festivals/creator/${auth.userId}`);
        setDataFestivals(responseData.festivals);
      } catch (err) { }
    };
    fetchFestivals();
  }, [sendRequest, auth.userId]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/events/creator/${auth.userId}`);
        setDataEvents(responseData.events);
      } catch (err) { }
    };
    fetchEvents();
  }, [sendRequest, auth.userId]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/tickets/creator/${auth.userId}`);
        setDataTickets(responseData.tickets);
      } catch (err) { }
    };
    fetchTickets();
  }, [sendRequest, auth.userId]);

  const onSubmitDelete = async e => {
    e.preventDefault();
    await sendRequest(
      `http://localhost:5000/api/events/${chosenPartyDelete.id}`,
      'DELETE',
      null,
      {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token
      }
    );
    navigate('/');
  }

  const onSubmitFestivalDelete = async e =>{
    e.preventDefault();
    await sendRequest(
      `http://localhost:5000/api/festivals/${chosenFestivalDelete.id}`,
      'DELETE',
      null,
      {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token
      }
    );
    navigate('/');
  }

  const onProfileShow = e => {
    e.preventDefault();
    navigate(`/user/${auth.userId}`)
  }

  console.log(auth.token);
  const title = <h2>Usuwanie wydarzenia</h2>;
  const contentModal = <div>
    <div>Czy na pewno chcesz usunąć wydarzenie: "{chosenPartyDelete?.title}"? Po zatwierdzeniu wybrane wydarzenie nie będzie już dostępne.</div>
  </div>;

const titleFestival = <h2>Usuwanie wydarzenia</h2>;
const contentFestivalModal = <div>
  <div>Czy na pewno chcesz usunąć ten pakiet imprez: "{chosenFestivalDelete?.title}"? Po zatwierdzeniu wybrany pakiet imprez nie będzie już dostępny.</div>
</div>;

  let content;

  switch (profileContent) {
    case "Management":
      content = <div style={{ display: 'flex', flexDirection: 'column', marginTop: '5rem', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '30px' }}>Cześć {dataUser?.name + ' ' + dataUser?.surname}</span>
        <Button accept onClick={onProfileShow}>Przejdź do profilu</Button>
      </div>
      break
    case "Organize":
      content = <div>
        <h2>Twoje imprezy</h2>
        {dataFestivals?.map((festival) => {
          return (
            <div>
              <FestivalPreview festival={festival} setChosenFestivalDelete={setChosenFestivalDelete} onShowF={onShowF} />
            </div>
          )
        })}
        {dataEvents?.map((event) => {
          return (
            <PartyPreview id={event.id} title={event.title} image={event.images[0]} startDate={event.startDate} startTime={event.startTime} setChosenPartyDelete={setChosenPartyDelete} onShow={onShow} onShowTicketsList={onShowTicketsList} setTicketsDataModal={setTicketsData} />
          )
        })}
      </div>
      break
    case "Participate":
      content = <div>
        <h2>Twoje rezerwacje udziału</h2>
        {dataTickets?.map((ticket) => {
          return (
            <TicketPreview ticket={ticket} />
          )
        })}
      </div>
      break
    default:
      content = <></>
  }
  return (
    <div style={{ minHeight: '91.1vh', background: '#1A1A1D', color: 'white', paddingBottom: '2rem' }}>
      <ProfileNavbar onChange={onChange} />
      {showDeleteModal && <DeleteModal onClose={onClose} title={title} content={contentModal} onSubmit={onSubmitDelete} />}
      {showDeleteFestivalModal && <DeleteModal onClose={onCloseF} title={titleFestival} content={contentFestivalModal} onSubmit={onSubmitFestivalDelete} />}
      {showTicketModal && <TicketsModal onCloseTicketsList={onCloseTicketsList} ticketsData={ticketsData} />}
      {content}
    </div>
  )
}

export default ProfilePage
