import { useState } from 'react';
import SearchNavbar from '../../Components/SearchNavbar/SearchNavbar';
import FilterModal from '../../Components/FilterModal/FilterModal';
import EventsList from '../../Components/EventsList/EventsList';

const SearchPage = () => {
    const [showModal, setShowModal] = useState(false);

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

    const [chosenDate, setChosenDate] = useState("");
    const [chosenField, setChosenField] = useState("");
    const [chosenAge, setChosenAge] = useState("");
    const [submitted, setSubmitted] = useState(false);
  
  
    const onDateChange = e => {
      setChosenDate(e.target.value);
    }
  
    const onFieldChange = e =>{
      setChosenField(e.target.value);
    }
  
    const onAgeChange = e =>{
      setChosenAge(e.target.value);
    }
  
    const onReset = e =>{
      e.preventDefault();
      setChosenDate("");
      setChosenField("");
      setChosenAge("");
    }
    const onSubmit = e =>{
      e.preventDefault();
      setSubmitted(true);
      //dalej ida staty do axiosa
      setShowModal(false);
    }

  return (
    <div>
        <SearchNavbar onFilter={onFilter}/>
        {showModal && <FilterModal onClose={onClose} onDateChange={onDateChange} onFieldChange={onFieldChange} onAgeChange={onAgeChange} onReset={onReset} chosenDate={chosenDate} chosenField={chosenField} chosenAge={chosenAge} onSubmit={onSubmit}/>}
        <EventsList/>

    </div>
  )
}

export default SearchPage
