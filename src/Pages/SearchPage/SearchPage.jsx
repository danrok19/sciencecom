import { useState } from 'react';
import SearchNavbar from '../../Components/SearchNavbar/SearchNavbar';
import FilterModal from '../../Components/FilterModal/FilterModal';
import EventsList from '../../Components/EventsList/EventsList';
import { useHttpClient } from '../../Hooks/http-hook';
import Loading from '../../Components/Loading/Loading';

const SearchPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [chosenDate, setChosenDate] = useState("");
    const [chosenField, setChosenField] = useState("");
    const [chosenAge, setChosenAge] = useState("");
    const [chosenIsOnline, setChosenIsOnline] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [data, setData] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();


    const onRequest = async  e =>{
      e.preventDefault();
      try{
        const responseData = await sendRequest(`http://localhost:5000/api/events/eventsearch?title=${title}&address=${address}&date=${chosenDate}&fieldTag=${chosenField}&ageTag=${chosenAge}&isOnline=${chosenIsOnline}`);
        setData(responseData.events);
        console.log('response: ', responseData.events )
      }catch(err){
        console.log(err)
        setData([]);
      }
    }
    const onFilter = (e) =>{
        e.preventDefault();
        setShowModal(true);
    }
    const onClose = () =>{
      setShowModal(false);
      if(!submitted){
        setChosenDate("");
        setChosenField("");
        setChosenAge("");
      }
    }
  
  
    const onDateChange = e => {
      setChosenDate(e.target.value);
    }
  
    const onFieldChange = e =>{
      setChosenField(e.target.value);
    }
  
    const onAgeChange = e =>{
      setChosenAge(e.target.value);
    }

    const onIsOnline = e =>{
      setChosenIsOnline(e.target.value);
    }
  
    const onReset = async e =>{
      e.preventDefault();
      setChosenDate("");
      setChosenField("");
      setChosenAge("");
      setChosenIsOnline("");
      try{
        const responseData = await sendRequest(`http://localhost:5000/api/events/eventsearch?title=${title}&address=&date=&fieldTag=&ageTag=&isOnline=`);
        setData(responseData.events);
        console.log('response: ', responseData.events )
      }catch(err){
        console.log(err)
        setData([]);
      }
      setShowModal(false)
    }
    const onSubmit = e =>{
      e.preventDefault();
      setSubmitted(true);
      setShowModal(false);
      onRequest(e)
    }

  return (
    <div>
        <SearchNavbar onFilter={onFilter} setTitle={setTitle} setAddress={setAddress} onRequest={onRequest}/>
        {showModal && <FilterModal onClose={onClose} onDateChange={onDateChange} onFieldChange={onFieldChange} onAgeChange={onAgeChange} onReset={onReset} chosenDate={chosenDate} chosenField={chosenField} chosenAge={chosenAge} onSubmit={onSubmit} chosenIsOnline={chosenIsOnline} onIsOnline={onIsOnline}/>}
        {isLoading && <div>
            <Loading />
            </div>}
        <EventsList newData={data}/>

    </div>
  )
}

export default SearchPage
