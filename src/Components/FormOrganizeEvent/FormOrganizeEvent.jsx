import { useState } from 'react';
import './formOrganizeEvent.css';
import Button from '../Button/Button';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';


const FormOrganizeEvent = () => {

    const [isOnline, setIsOnline] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [clockValue, setClockValue] = useState('10:00');

    const [selectedImages, setSelectedImages] = useState([]);

    const setNotOnline = () => {
        setIsOnline(false);
    }

    const setOnline = () => {
        setIsOnline(true);

    }
    return (
        <form className="form-template-event">
            <div>
                <div className="data-section">
                    <h1>Informacje tytułowe</h1>
                    <hr class="line" />
                    <div class="input-template">
                        <label for="title">Tytuł wydarznia</label>
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
                        <label>Godzina rozpoczęcia</label>
                        <TimePicker onChange={setClockValue} value={clockValue}/>
                    </div>
                </div>


                <div className="button-section">
                    <Button secondary className="button-next">Dalej</Button>
                </div>
            </div>
        </form>


    )
}

export default FormOrganizeEvent
