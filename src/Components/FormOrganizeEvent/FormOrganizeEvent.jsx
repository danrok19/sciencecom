import { useState } from 'react';
import './formOrganizeEvent.css';
import Button from '../Button/Button';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { ImCross } from 'react-icons/im';


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
                        <TimePicker onChange={setClockValue} value={clockValue} />
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
                    <Button secondary className="button-next">Dalej</Button>
                </div>
            </div>
        </form>


    )
}

export default FormOrganizeEvent
