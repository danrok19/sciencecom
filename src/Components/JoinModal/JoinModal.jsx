import ReactDom from 'react-dom';
import './joinModal.css';
import { useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import Button from '../Button/Button';

const JoinModal = () => {


    const [reservationType, setReservationType] = useState("Single");
    const [groupQuantity, setGroupQuantity] = useState(0);
    const [schoolName, setSchoolName] = useState('');
    const [nameSurname, setNameSurname] = useState('');

    const onOptionChange = e => {
        setReservationType(e.target.value);
    }

    const onQuantityChange = e => {
        setGroupQuantity(e.target.value)
    }

    const onSchoolChange = e => {
        setSchoolName(e.target.value)
    }
    const onNameChange = e => {
        setNameSurname(e.target.value)
    }

    const renderType = () => {
        if (reservationType === "Single") {
            return 'Pojedyńcza osoba'
        }
        else if (reservationType === "Group") {
            return 'Grupa'
        }
        else if (reservationType === "SchoolTrip") {
            return 'Wycieczka szkolna'
        }
        else {
            return '';
        }
    }

    return ReactDom.createPortal(
        <div>
            <div className="grey-background" />
            <div className="actual-modal">
                <div className="title-wrapper">
                    <h2>Nazwa wydarzenia</h2>
                </div>
                <hr class="line" />
                <div className="date-section">
                    <h3>Data</h3>
                    <div className="date-wrapper">
                        <h4>Piątek, 24.07.2024</h4>
                        <span>12:00</span>
                    </div>
                </div>
                <hr class="line" />
                <div className="local-section">
                    <div className='local-top-wrapper'>
                        <h3>Miejsce</h3>
                        <div className="local-wrapper">
                            <h4>Wiejska 00A, Białystok</h4>
                        </div>
                    </div>
                    <div className="local-bottom-wrapper">
                        Politechnika Białostocka, WI, Aula 12B
                    </div>
                </div>
                <hr class="line" />
                <form className="form-wrapper">
                    <div className="radio-wrapper">
                        <div className="radio">
                            <input
                                type="radio"
                                name="reservationType"
                                value="Single"
                                id="single"
                                checked={reservationType === "Single"}
                                onChange={onOptionChange}
                            />
                            <label htmlFor="single">Rezerwacja na pojedyńczą osobę</label>
                        </div>

                        <div className="radio">
                            <input
                                type="radio"
                                name="reservationType"
                                value="Group"
                                id="group"
                                checked={reservationType === "Group"}
                                onChange={onOptionChange}
                            />
                            <label htmlFor="group">Rezerwacja grupowa</label>
                        </div>

                        <div className="radio">
                            <input
                                type="radio"
                                name="reservationType"
                                value="SchoolTrip"
                                id="schooltrip"
                                checked={reservationType === "SchoolTrip"}
                                onChange={onOptionChange}
                            />
                            <label htmlFor="schooltrip">Wycieczka szkolna</label>
                        </div>
                    </div>

                    <div>
                        {reservationType === "Single" &&
                            <div className="input-section">
                                <div className="input-wrapper">
                                    <label for="nameSurname">Imię i nazwisko</label>
                                    <input type="text" id="nameSurname" name="nameSurname" value={nameSurname} onChange={onNameChange} />
                                </div>
                                <div className="input-wrapper">
                                    <label for="additional-info">Dodatkowe informacje dla organizatorów</label>
                                    <textarea id="nameSurname" name="nameSurname" />
                                </div>
                            </div>
                        }

                        {reservationType === "Group" &&
                            <div className="input-section">
                                <div className="row-wrapper">
                                    <div className="input-wrapper">
                                        <label for="nameSurname">Osoba prowadząca</label>
                                        <input type="text" id="nameSurname" name="nameSurname" placeholder="Imię i nazwiosko" />
                                    </div>
                                    <div className="input-wrapper" style={{ position: 'relative' }}>
                                        <label>Liczebość grupy <FaExclamationCircle className="explanation" />
                                            <div className="explanation-info">
                                                <span>Podaj liczbę wszystkich osób w grupie</span>
                                            </div></label>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <input type="range" id="quantity" name="quantity" min="0" max="10" value={groupQuantity} onChange={onQuantityChange} />
                                            <span>{groupQuantity}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-wrapper">
                                    <label for="additional-info">Dodatkowe informacje dla organizatorów</label>
                                    <textarea id="nameSurname" name="nameSurname" />
                                </div>
                            </div>
                        }

                        {reservationType === "SchoolTrip" &&
                            <div className="input-section">
                                <div className="row-wrapper-school">
                                    <div className="input-wrapper">
                                        <label for="nameSurname">Opiekun wycieczki</label>
                                        <input type="text" id="nameSurname" name="nameSurname" placeholder="Imię i nazwisko" value={nameSurname} onChange={onNameChange} />
                                    </div>
                                    <div className="input-wrapper">
                                        <label for="schoolName">Nazwa szkoły</label>
                                        <input type="text" id="nameSurname" name="nameSurname" className="school-input" value={schoolName} onChange={onSchoolChange} />
                                    </div>
                                </div>
                                <div className="input-wrapper" style={{ position: 'relative', marginTop: '1rem' }}>
                                    <label>Liczebość grupy <FaExclamationCircle className="explanation" />
                                        <div className="explanation-info">
                                            <span>Podaj liczbę wszystkich osób w grupie</span>
                                        </div></label>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <input type="range" id="quantity" name="quantity" min="0" max="30" value={groupQuantity} onChange={onQuantityChange} />
                                        <span>{groupQuantity}</span>
                                    </div>
                                </div>
                                <div className="input-wrapper">
                                    <label for="additional-info">Dodatkowe informacje dla organizatorów</label>
                                    <textarea id="nameSurname" name="nameSurname" />
                                </div>
                            </div>
                        }
                    </div>
                </form>
                <hr class="line" />
                <div className="summary-section">
                    <h3>Podsumowanie rezerwacji</h3>
                    <div className="summary-info">
                        <div className="info-section">
                            <div className="info-wrapper">
                                <h5>Typ rezerwacji</h5>
                                <h4>{renderType()}</h4>
                            </div>
                            <hr class="line" />
                        </div>
                    </div>
                    {reservationType === "SchoolTrip" &&
                        <>
                            <div className="summary-info">
                                <div className="info-section">
                                    <div className="info-wrapper">
                                        <h5>Szkoła</h5>
                                        <h4>{schoolName}</h4>
                                    </div>
                                    <hr class="line" />
                                </div>
                            </div>
                            <div className="summary-info">
                                <div className="info-section">
                                    <div className="info-wrapper">
                                        <h5>Opiekun wycieczki</h5>
                                        <h4>{nameSurname}</h4>
                                    </div>
                                    <hr class="line" />
                                </div>
                            </div>
                            <div className="summary-info">
                                <div className="info-section">
                                    <div className="info-wrapper">
                                        <h5>Liczebność wycieczki</h5>
                                        <h4>{groupQuantity}</h4>
                                    </div>
                                    <hr class="line" />
                                </div>
                            </div>
                        </>
                    }
                    {reservationType === "Single" &&
                        <>
                            <div className="summary-info">
                                <div className="info-section">
                                    <div className="info-wrapper">
                                        <h5>Imię i nazwisko</h5>
                                        <h4>{nameSurname}</h4>
                                    </div>
                                    <hr class="line" />
                                </div>
                            </div>
                        </>}
                    {reservationType === "Group" &&
                        <>
                        <div className="summary-info">
                                <div className="info-section">
                                    <div className="info-wrapper">
                                        <h5>Osoba prowadząca</h5>
                                        <h4>{nameSurname}</h4>
                                    </div>
                                    <hr class="line" />
                                </div>
                            </div>
                            <div className="summary-info">
                                <div className="info-section">
                                    <div className="info-wrapper">
                                        <h5>Liczebność wycieczki</h5>
                                        <h4>{groupQuantity}</h4>
                                    </div>
                                    <hr class="line" />
                                </div>
                            </div>
                        </>
                    }

                </div>

                <div className="button-section">
                    <Button secondary >Anuluj</Button>
                    <Button primary style={{width: 'fit-content'}}>Zarezerwuj udział</Button>
                </div>
            </div>
        </div>,
        document.querySelector('.modal-container')
    );
}

export default JoinModal;
