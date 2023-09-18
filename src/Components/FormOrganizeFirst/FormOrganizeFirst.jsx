import React, { useState, useEffect } from 'react';
import './formOrganizeFirst.css';
import Button from '../Button/Button';
import { TfiLocationPin } from 'react-icons/tfi';
import { HiOutlineSignal } from 'react-icons/hi2';
import { FaCalendarAlt } from 'react-icons/fa';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const FormOrganizeFirst = () => {

    const [isOnline, setIsOnline] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const [selectedImage, setSelectedImage] = useState(null);

    const setNotOnline = () => {
        setIsOnline(false);

    }

    const setOnline = () => {
        setIsOnline(true);

    }



    return (
        <form className="form-template">
            <div>
                <div className="data-section">
                    <h1>Informacje tytułowe</h1>
                    <hr class="line" />
                    <div class="input-template">
                        <label for="title">Tytuł festiwalu </label>
                        <input type="text" name="title" id="title" required />
                    </div>
                    <div class="input-template">
                        <label for="organizer">Organizatorzy </label>
                        <input type="text" name="organizer" id="organizer" required />
                    </div>
                </div>
                <h1>Lokalizacja</h1>
                <hr class="line" />
                <div className="buttons">
                    <Button secondary onClick={setNotOnline}>Miejsce</Button>
                    <Button secondary onClick={setOnline}>Online</Button>
                </div>
                {isOnline ?
                    <div className="online">
                        <div class="input-template">
                            <label for="information">Informacje na temat miejsca spotkania</label>
                            <input type="text" name="information" id="information" required />
                        </div>
                    </div>
                    :
                    <div className="not-online">
                        <div class="input-template">
                            <label for="address">Adres festiwalu </label>
                            <input type="text" name="address" id="address" required />
                        </div>
                        <div class="input-template">
                            <label for="additionalInformation">Dodatkowe informacje </label>
                            <input type="text" name="additionalInformation" id="additionalInformation" required />
                        </div>
                    </div>}
                <h1>Data i czas</h1>
                <hr class="line" />
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
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            isClearable
                            placeholderText="Wybierz nową datę!"
                        />
                    </div>
                </div>
                <div className="description-section">
                    <h1>Informacje szczegółowe</h1>
                    <hr class="line" />
                    <div className="textarea-section">
                        <label>Opis festiwalu</label>
                        <textarea />
                    </div>
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
                    <Button secondary className="button-next">Dalej</Button>
                </div>

            </div>
        </form>
    )
}

export default FormOrganizeFirst
