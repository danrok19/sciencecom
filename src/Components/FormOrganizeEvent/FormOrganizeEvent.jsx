import { useState, useReducer, useCallback } from 'react';
import './formOrganizeEvent.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { ImCross } from 'react-icons/im';
import { VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH } from '../../Util/validators';


const formReducer = (state, action) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        let formIsValid = true;
        for (const inputId in state.inputs) {
          if (inputId === action.inputId) {
            formIsValid = formIsValid && action.isValid;
          } else {
            formIsValid = formIsValid && state.inputs[inputId].isValid;
          }
        }
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputId]: { value: action.value, isValid: action.isValid }
          },
          isValid: formIsValid
        };
      default:
        return state;
    }
  };

const FormOrganizeEvent = () => {

    const [isOnline, setIsOnline] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [clockValue, setClockValue] = useState('10:00');

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            eventTitle:{
                value: '',
                isValid: false
            },
            eventOrganizer:{
                value: '',
                isValid: false
            },
            eventPlaceInformation:{
                value: '',
                isValid: false
            },
            startDate:{
                value: '',
                isValid: false
            },
            startTime:{
                value: '',
                isValid: false
            },
            eventExtraInformation:{
                value: '',
                isValid: false
            }

        },
        isValid: false
    });

    const inputHandler = useCallback((id, value, isValid) =>{
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id
        })
    }, []);

    const [selectedImages, setSelectedImages] = useState([]);

    const setNotOnline = e => {
        e.preventDefault()
        setIsOnline(false);
    }

    const setOnline = e => {
        e.preventDefault()
        setIsOnline(true);

    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImages([...selectedImages, imageUrl]);
        }
    };

    // Function to delete an image by index
    const deleteImage = (index) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };


    const eventSubmitHandler = e =>{
        e.preventDefault()
        console.log(formState.inputs)
    }

    return (
        <form className="form-template-event" onSubmit={eventSubmitHandler}>
            <div>
                <div className="data-section">
                    <h1>Informacje tytułowe</h1>
                    <hr className="line" />
                    <Input id="eventTitle" label="Tytuł wydarznia" type="input" valueType="text" onInput={inputHandler} validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(30)]} errorText="Wprowadź tytuł wydarzenia! Maksymalnie 30 znaków."/>
                    <Input id="eventOrganizer" label="Organizatorzy" type="input" valueType="text"  onInput={inputHandler} validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(30)]} errorText="Wprowadź organizatorów wydarzenia! Maksymalnie 30 znaków."/>
                </div>
                <h1>Lokalizacja</h1>
                <hr className="line" />
                <div className="buttons">
                    <Button secondary onClick={setNotOnline}>Miejsce</Button>
                    <Button secondary onClick={setOnline}>Online</Button>
                </div>
                {isOnline ?
                    <div className="online">
                        <Input id="eventPlaceInformation" label="Informacje na temat miejsca spotkania" type="input" valueType="text"  onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText="Wprowadź miejsce wydarzenia!"/>
                    </div>
                    :
                    <div className="not-online">
                        <Input id="eventPlaceInformation" label="Adres wydarzenia" type="input" valueType="text"  onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText="Wprowadź miejsce wydarzenia!"/>
                    </div>}

                <h1>Data i czas</h1>
                <hr className="line" />
                <div className="date-inputs">
                    <Input id="startDate" type="date" label="Poczętek festiwalu" onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText="Wybierz datę rozpoczęcia wydarzenia!"/>
                    <Input id="startTime" type="time" label="Godzina rozpoczęcia" onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText="Wybierz godzinę rozpoczęcia wydarzenia!"/>
                </div>
                <div className="description-section">
                    <h1>Informacje szczegółowe</h1>
                    <hr className="line" />
                    <Input id="eventExtraInformation" label="Opis festiwalu" type="textarea"  onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText="Wprowadź krótki opis wydarzenia!"/>

                    <div className="image-section">
                        <label>Zdjęcie do prezentacji wydarzenia</label>

                        {selectedImages && (
                            <div>
                                <input type="file" accept="image/*" onChange={handleImageUpload} />
                                <div className="image-list">
                                    {selectedImages.map((imageUrl, index) => (
                                        <div className="img-wrapper">
                                            <img key={index} src={imageUrl} alt={`Image ${index}`} className="img-element" />
                                            <ImCross className="cross-element" onClick={() => deleteImage(index)} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
                <div className="button-section">
                    <Button secondary className="button-next" disabled={!formState.isValid}>Dalej</Button>
                </div>
            </div>
        </form>


    )
}

export default FormOrganizeEvent
