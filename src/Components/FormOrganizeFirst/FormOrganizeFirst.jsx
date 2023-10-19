import React, { useState, useEffect, useCallback, useReducer } from 'react';
import './formOrganizeFirst.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { TfiLocationPin } from 'react-icons/tfi';
import { HiOutlineSignal } from 'react-icons/hi2';
import { FaCalendarAlt } from 'react-icons/fa';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH } from '../../Util/validators';

const formReducer = (state, action) =>{
    switch(action.type){
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs){
                if (inputId === action.inputId){
                    formIsValid = formIsValid && action.isValid;
                }
                else{
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                input: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
            }
        default: 
            return state;
    }
}

const FormOrganizeFirst = () => {

    const [isOnline, setIsOnline] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title:{
                value: '',
                isValid: false
            },
            organizer:{
                value: '',
                isValid: false
            }
        },
        isValid: false
    });

    const [selectedImage, setSelectedImage] = useState(null);

    const setNotOnline = e => {
        e.preventDefault()
        setIsOnline(false);

    }

    const setOnline = e => {
        e.preventDefault()
        setIsOnline(true);

    }

    const inputHandler = useCallback((id, value, isValid) =>{
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id
        })
    }, []);


    return (
        <form className="form-template">
            <div>
                <div className="data-section">
                    <h1>Informacje tytułowe</h1>
                    <hr className="line" />
                    <Input id="title" label="Tytuł festiwalu" type="input" valueType="text" onInput={inputHandler} validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(30)]} errorText="Wprowadź tytuł festiwalu! Maksymalnie 30 znaków."/>
                    <Input id="organizer" label="Organizatorzy" type="input" valueType="text" onInput={inputHandler} validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(30)]} errorText="Wprowadź organizatorów festiwalu! Maksymalnie 30 znaków."/>
                </div>
                <h1>Lokalizacja</h1>
                <hr className="line" />
                <div className="buttons">
                    <Button secondary onClick={setNotOnline}>Miejsce</Button>
                    <Button secondary onClick={setOnline}>Online</Button>
                </div>
                {isOnline ?
                    <div className="online">
                        <Input id="information" label="Informacje na temat miejsca spotkania" type="input" valueType="text" onInput={inputHandler}/>
                    </div>
                    :
                    <div className="not-online">
                        <Input id="address" label="Adres festiwalu" type="input" valueType="text" onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]}/>
                        <Input id="additionalInformation" label="Dodatkowe informacje" type="input" valueType="text" onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]}/>
                    </div>}
                <h1>Data i czas</h1>
                <hr className="line" />
                <div className="date-inputs">
                    <div className="date-picker">
                        <label>Początek imprezy</label>
                        <DatePicker
                            showIcon
                            dateFormat="dd/MM/yyyy"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            isClearable
                            placeholderText="Wybierz nową datę!"
                        />
                    </div>
                    <div className="date-picker">
                        <label>Koniec imprezy</label>
                        <DatePicker
                            showIcon
                            dateFormat="dd/MM/yyyy"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            isClearable
                            placeholderText="Wybierz nową datę!"
                        />
                    </div>
                </div>
                <div className="description-section">
                    <h1>Informacje szczegółowe</h1>
                    <hr className="line" />
                    <Input id="extraInformation" label="Opis festiwalu" type="textarea" onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} errorText="Wprowadź krótki opis festiwalu!"/>
                    <div className="image-section">
                        <label>Zdjęcie do prezentacji festiwalu</label>
                        {selectedImage && (
                            <div>
                                <img
                                    alt="not found"
                                    width={"100%"}
                                    src={URL.createObjectURL(selectedImage)}
                                />
                                <br />
                                <Button secondary onClick={() => setSelectedImage(null)} style={{marginTop: '1rem'}}>Usuń</Button>
                            </div>
                        )}
                        <br />
                        <br />
                        <input
                            type="file"
                            name="myImage"
                            onChange={(event) => {
                                console.log(event.target.files[0]);
                                setSelectedImage(event.target.files[0]);
                            }}
                        />
                    </div>
                </div>
                <div className="button-section">
                    <Button secondary className="button-next" type="submit" disabled={!formState.isValid}>Dalej</Button>
                </div>

            </div>
        </form>
    )
}

export default FormOrganizeFirst
