import React, { useState, useCallback } from 'react';
import './formOrganizeFirst.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { TfiLocationPin } from 'react-icons/tfi';
import { HiOutlineSignal } from 'react-icons/hi2';
import { FaCalendarAlt } from 'react-icons/fa';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH, VALIDATOR_FILE } from '../../Util/validators';
import useForm from '../../Hooks/form-hook';


const FormOrganizeFirst = () => {


    const [formState, inputHandler] = useForm({
        title:{
            value: '',
            isValid: false
        },
        organizer:{
            value: '',
            isValid: false
        },
        startDate:{
            value: '',
            isValid: false
        },
        endDate:{
            value: '',
            isValid: false
        },
        extraInformation:{
            value: '',
            isValid: false
        }

    }, false)


    const [selectedImage, setSelectedImage] = useState(null);


    const festivalSubmitHandler = e =>{
        e.preventDefault()
        console.log(formState.inputs)
    }

    return (
        <form className="form-template" onSubmit={festivalSubmitHandler}>
            <div>
                <div className="data-section">
                    <h1>Informacje tytułowe</h1>
                    <hr className="line" />
                    <Input 
                    id="title" 
                    label="Tytuł festiwalu" 
                    type="input" 
                    valueType="text" 
                    onInput={inputHandler} 
                    minDate = {new Date().toISOString().split('T')[0]}
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(30)]} errorText="Wprowadź tytuł festiwalu! Maksymalnie 30 znaków."/>
                    <Input id="organizer" label="Organizatorzy" type="input" valueType="text" onInput={inputHandler} validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(30)]} errorText="Wprowadź organizatorów festiwalu! Maksymalnie 30 znaków."/>
                </div>

                <h1>Data i czas</h1>
                <hr className="line" />
                <div className="date-inputs">
                    <div className="date-picker">
                        <Input id="startDate" type="date" label="Poczętek festiwalu" onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]}/>
                    </div>
                    <div className="date-picker">
                        <Input id="endDate" type="date" label="Koniec festiwalu" onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]}/>
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
