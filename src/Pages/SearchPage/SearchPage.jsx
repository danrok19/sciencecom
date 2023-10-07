import { useState } from 'react';
import SearchNavbar from '../../Components/SearchNavbar/SearchNavbar';
import FilterModal from '../../Components/FilterModal/FilterModal';
import EventCard from '../../Components/EventCard/EventCard';
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


    const data = [
      { name: 'Dzień liczby pi', describtion: 'Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.', date: 'Czw, Marzec 14', clock: '12:00', place: 'Bia, Politechnika Białostocka', tags: [{ name: 'matematyka', id: 1 }, { name: 'fizyka', id: 2 }], key: '0' },
      { name: 'Dzień liczby pi', describtion: 'Świętuj dzień pi razem z nami!Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.', date: 'Czw, Marzec 14', clock: '12:00', place: 'Bia, Politechnika Białostocka', tags: [{ name: 'matematyka', id: 1 }, { name: 'fizyka', id: 2 }], key: '1' },
      { name: 'Dzień liczby pi', describtion: 'Świętuj dzień pi razem z nami!Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.', date: 'Czw, Marzec 14', clock: '12:00', place: 'Bia, Politechnika Białostocka', tags: [{ name: 'matematyka', id: 1 }, { name: 'fizyka', id: 2 }], key: '2' },
      { name: 'Dzień liczby pi', describtion: 'Świętuj dzień pi razem z nami!Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.', date: 'Czw, Marzec 14', clock: '12:00', place: 'Bia, Politechnika Białostocka', tags: [{ name: 'matematyka', id: 1 }, { name: 'fizyka', id: 2 }], key: '3' },
      { name: 'Dzień liczby pi', describtion: 'Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.', date: 'Czw, Marzec 14', clock: '12:00', place: 'Bia, Politechnika Białostocka', tags: [{ name: 'matematyka', id: 1 }, { name: 'fizyka', id: 2 }], key: '4' },
      { name: 'Dzień liczby pi', describtion: 'Świętuj dzień pi razem z nami!Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.', date: 'Czw, Marzec 14', clock: '12:00', place: 'Bia, Politechnika Białostocka', tags: [{ name: 'matematyka', id: 1 }, { name: 'fizyka', id: 2 }], key: '5' },
      { name: 'Dzień liczby pi', describtion: 'Świętuj dzień pi razem z nami!Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.Świętuj dzień pi razem z nami! To będzie niezapomniane wydarzenie.', date: 'Czw, Marzec 14', clock: '12:00', place: 'Bia, Politechnika Białostocka', tags: [{ name: 'matematyka', id: 1 }, { name: 'fizyka', id: 2 }], key: '6' },
  ]

  return (
    <div>
        <SearchNavbar onFilter={onFilter}/>
        {showModal && <FilterModal onClose={onClose} onDateChange={onDateChange} onFieldChange={onFieldChange} onAgeChange={onAgeChange} onReset={onReset} chosenDate={chosenDate} chosenField={chosenField} chosenAge={chosenAge} onSubmit={onSubmit}/>}
        <EventsList data={data}/>

    </div>
  )
}

export default SearchPage
