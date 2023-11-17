import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../Hooks/http-hook';
import EventPostcard from '../EventPostcard/EventPostcard';
import FilterModal from '../FilterModal/FilterModal';
import Button from '../Button/Button';
import { LuFilter } from 'react-icons/lu';
import './postCardsList.css';

const PostCardsList = ({ festivalId }) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [data, setData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [titleSearch, setTitleSearch] = useState("");
  const [address, setAddress] = useState("");
  const [chosenDate, setChosenDate] = useState("");
  const [chosenField, setChosenField] = useState("");
  const [chosenAge, setChosenAge] = useState("");
  const [chosenIsOnline, setChosenIsOnline] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dataSearch, setDataSearch] = useState();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/events/festival/${festivalId}`);
        setData(responseData.events);
        setDataSearch(responseData.events);
      } catch (err) { }
    };
    fetchEvents();
  }
    , [sendRequest, festivalId]);

  const content = dataSearch?.map((event) => {
    return (
      <EventPostcard id={event.id} name={event.title} key={event.key} describtion={event.description} date={event.startDate} clock={event.startTime} images={event.images} fieldTags={event.fieldTag} ageTags={event.ageTag} />
    )
  });


  const onFilter = (e) => {
    e.preventDefault();
    setShowModal(true);
  }
  const onClose = () => {
    setShowModal(false);
    if (!submitted) {
      setChosenDate("");
      setChosenField("");
      setChosenAge("");
    }
  }


  const onDateChange = e => {
    setChosenDate(e.target.value);
  }

  const onFieldChange = e => {
    setChosenField(e.target.value);
  }

  const onAgeChange = e => {
    setChosenAge(e.target.value);
  }

  const onReset = async e => {
    e.preventDefault();
    setChosenDate("");
    setChosenField("");
    setChosenAge("");
  }

  const onChangeTitle = e => {
    setTitleSearch(e.target.value);
  }
  const onChangeAddress = e => {
    setAddress(e.target.value);
  }

  const onSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setShowModal(false);
  }
  useEffect(() => {
    if (titleSearch === "" && address === "" && chosenDate === "" && chosenField === "" && chosenAge === "" && chosenIsOnline === "") {
      setDataSearch(data);
    }
    else{
      onRequest();
      if(!dataSearch){
        dataSearch(data);
      }

    }
  }, [titleSearch, address, chosenDate, chosenField, chosenAge, chosenIsOnline, data])

  const onRequest = () => {
    let events = dataSearch;
    if (titleSearch && titleSearch !== "") {
      events = events.filter(function (event) {
        return event.title.toLowerCase().includes(titleSearch.toLowerCase());
      });
    }
    if (chosenField && chosenField !== "") {
      events = events.filter(function (event) {
        return event.fieldTag.includes(chosenField);
      });
    }
    if (chosenAge && chosenAge !== "") {
      events = events.filter(function (event) {
        return event.ageTag === chosenAge;
      });
    }
    if (chosenIsOnline && chosenIsOnline !== "") {
      events = events.filter((event) => event.isOnline === chosenIsOnline);
    }
    if (address && address !== "") {
      events = events.filter(function (event) {
        return event.address.toLowerCase().includes(address.toLowerCase());
      });
    }
    if (chosenDate && chosenDate !== "") {
      const dateNumber = Number(chosenDate);
      var currentDate = new Date();
      if (chosenDate === "1") {
        currentDate.setDate(currentDate.getDate() + 1);
      }
      if (chosenDate === "7") {
        currentDate.setDate(currentDate.getDate() + 7);
      }
      if (chosenDate === "31") {
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
      events = events.filter(function (event) {
        return new Date(event.startDate) <= currentDate;
      });
    }
    setDataSearch(events);
  }


  return (
    <>
      {showModal && <FilterModal onClose={onClose} onDateChange={onDateChange} onFieldChange={onFieldChange} onAgeChange={onAgeChange} onReset={onReset} chosenDate={chosenDate} chosenField={chosenField} chosenAge={chosenAge} onSubmit={onSubmit} />}
      <div className='nav-wrapper-fest'>
        <div className="left-wrapper">
          <form className="form-event-wrapper">
            <input onChange={onChangeTitle} className="input-section" type="text" name="searchEventByName" id="searchEventByName" placeholder="Wyszukaj wydarzenie" style={{ borderRadius: '.5rem', border: 'solid 2px rgb(182, 182, 182)', padding: '4px' }} />
            <input onChange={onChangeAddress} className="input-section" type="text" name="searchEventByLoc" id="searchEventByLoc" placeholder="Białystok" style={{ borderRadius: '.5rem', border: 'solid 2px rgb(182, 182, 182)', padding: '4px' }} />
          </form>
        </div>
        <div className="right-wrapper">
          <Button primary onClick={onFilter}>Ustaw filtry <LuFilter /></Button>
        </div>
      </div>
      {content}
    </>
  )
}

export default PostCardsList
