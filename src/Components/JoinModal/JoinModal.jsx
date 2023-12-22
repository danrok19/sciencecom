import ReactDom from 'react-dom';
import './joinModal.css';
import { useState, useContext } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import Button from '../Button/Button';
import useForm from '../../Hooks/form-hook';
import Input from '../Input/Input';
import { VALIDATOR_REQUIRE } from '../../Util/validators';
import { useHttpClient } from '../../Hooks/http-hook';
import { AuthContext } from '../../Context/auth-context';
import { useNavigate } from 'react-router-dom';

const JoinModal = ({ eventId, title, onClose, startDate, startTime, address, limit }) => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [reservationType, setReservationType] = useState("Pojedynczy");
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [formState, inputHandler] = useForm(
        {
            personalData: {
                value: '',
                isValid: false
            },
            extraData: {
                value: '',
                isValid: true
            },
            quantity: {
                value: 1,
                isValid: true
            },
            schoolData: {
                value: '',
                isValid: true
            }

        }, false)


    const onOptionChange = e => {
        setReservationType(e.target.value);
    }


    const renderType = () => {
        if (reservationType === "Pojedynczy") {
            formState.inputs.schoolData.value = '';
            return 'Pojedyncza osoba'
        }
        else if (reservationType === "Grupowy") {
            formState.inputs.schoolData.value = '';
            return 'Grupa'
        }
        else if (reservationType === "Szkolny") {
            return 'Wycieczka szkolna'
        }
        else {
            return '';
        }
    };

    const joinSubmitHandler = async e => {
        
        if(reservationType !== "Szkolny"){
            if(formState.inputs.extraData.value !== ''){
                await sendRequest(
                    'http://localhost:5000/api/tickets',
                    'POST',
                    JSON.stringify({
                        personal: formState.inputs.personalData.value,
                        type: reservationType,
                        description: formState.inputs.extraData.value,
                        quantity: formState.inputs.quantity.value,
                        event: eventId,
                    }),
                    { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token }
                );
            }
            else{
                await sendRequest(
                    'http://localhost:5000/api/tickets',
                    'POST',
                    JSON.stringify({
                        personal: formState.inputs.personalData.value,
                        type: reservationType,
                        quantity: formState.inputs.quantity.value,
                        event: eventId,
                    }),
                    { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token }
                );
            }
        }else{
            if(formState.inputs.extraData.value !== ''){
                await sendRequest(
                    'http://localhost:5000/api/tickets',
                    'POST',
                    JSON.stringify({
                        personal: formState.inputs.personalData.value,
                        type: reservationType,
                        description: formState.inputs.extraData.value,
                        quantity: formState.inputs.quantity.value,
                        school: formState.inputs.schoolData.value,
                        event: eventId,
                    }),
                    { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token }
            )
            }
            else{
                await sendRequest(
                    'http://localhost:5000/api/tickets',
                    'POST',
                    JSON.stringify({
                        personal: formState.inputs.personalData.value,
                        type: reservationType,
                        quantity: formState.inputs.quantity.value,
                        school: formState.inputs.schoolData.value,
                        event: eventId,
                    }),
                    { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token }
            )
            }
        }


        navigate(`/events/${eventId}`);
    }

    return ReactDom.createPortal(
        <form onSubmit={joinSubmitHandler}>
            <div className="grey-background" />
            <div className="actual-modal">
                <div className="title-wrapper">
                    <h2>{title}</h2>
                </div>
                <hr class="line" />
                <div className="date-section">
                    <h3>Data</h3>
                    <div className="date-wrapper">
                        <h4>{startDate}</h4>
                        <span>{startTime}</span>
                    </div>
                </div>
                <hr class="line" />
                <div className="local-section">
                    <div className='local-top-wrapper'>
                        <h3>Miejsce</h3>
                        <div className="local-wrapper">
                            <h4>{address}</h4>
                        </div>
                    </div>
                </div>
                <hr class="line" />
                <div className="form-wrapper">
                    <div className="radio-wrapper">
                        <div className="radio">
                            <input
                                type="radio"
                                name="reservationType"
                                value="Pojedynczy"
                                id="single"
                                checked={reservationType === "Pojedynczy"}
                                onChange={onOptionChange}
                            />
                            <label htmlFor="single">Rezerwacja na pojedynczą osobę</label>
                        </div>

                        <div className="radio">
                            <input
                                type="radio"
                                name="reservationType"
                                value="Grupowy"
                                id="group"
                                checked={reservationType === "Grupowy"}
                                onChange={onOptionChange}
                            />
                            <label htmlFor="group">Rezerwacja grupowa</label>
                        </div>

                        <div className="radio">
                            <input
                                type="radio"
                                name="reservationType"
                                value="Szkolny"
                                id="schooltrip"
                                checked={reservationType === "Szkolny"}
                                onChange={onOptionChange}
                            />
                            <label htmlFor="schooltrip">Wycieczka szkolna</label>
                        </div>
                    </div>

                    <div>
                        {reservationType === "Pojedynczy" &&
                            <div className="input-section">
                                <Input
                                    id="personalData"
                                    label="Imię i nazwisko"
                                    type="input"
                                    valueType="text"
                                    onInput={inputHandler}
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorText="Wprowadź swoje imię i nazwisko"
                                />
                                <Input
                                    id="extraData"
                                    label="Informacje dodatkowe dla organizatorów"
                                    type="textarea"
                                    onInput={inputHandler}
                                    validators={[VALIDATOR_REQUIRE()]}
                                    initialValid={formState.inputs.extraData.isValid}
                                    initialValue={formState.inputs.extraData.value}
                                />
                            </div>
                        }

                        {reservationType === "Grupowy" &&
                            <div className="input-section">
                                <div className="row-wrapper">
                                    <Input
                                        id="personalData"
                                        label="Imię i nazwisko osoby prowadzącej"
                                        type="input"
                                        valueType="text"
                                        onInput={inputHandler}
                                        validators={[VALIDATOR_REQUIRE()]}
                                        errorText="Wprowadź swoje imię i nazwisko"
                                    />
                                    <div className="input-wrapper" style={{ position: 'relative' }}>

                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Input
                                                id="quantity"
                                                label="Ilość osób"
                                                type="range"
                                                onInput={inputHandler}
                                                validators={[VALIDATOR_REQUIRE()]}
                                                minValue={1}
                                                maxValue={limit}
                                                initialValid={formState.inputs.quantity.isValid}
                                                initialValue={formState.inputs.quantity.value}
                                            />
                                            <span>{formState.inputs.quantity.value}</span>
                                            <FaExclamationCircle className="explanation" />
                                            <div className="explanation-info">
                                                <span>Podaj liczbę wszystkich osób w grupie</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Input
                                    id="extraData"
                                    label="Informacje dodatkowe dla organizatorów"
                                    type="textarea"
                                    onInput={inputHandler}
                                    validators={[VALIDATOR_REQUIRE()]}
                                    initialValid={formState.inputs.extraData.isValid}
                                    initialValue={formState.inputs.extraData.value}
                                />
                            </div>
                        }

                        {reservationType === "Szkolny" &&
                            <div className="input-section">
                                <div className="row-wrapper-school">
                                    <Input
                                        id="personalData"
                                        label="Imię i nazwisko opiekuna wycieczki"
                                        type="input"
                                        valueType="text"
                                        onInput={inputHandler}
                                        validators={[VALIDATOR_REQUIRE()]}
                                        errorText="Wprowadź swoje imię i nazwisko"
                                    />
                                    <Input
                                        id="schoolData"
                                        label="Nazwa szkoły"
                                        type="input"
                                        valueType="text"
                                        onInput={inputHandler}
                                        validators={[VALIDATOR_REQUIRE()]}
                                        initialValid={reservationType ==="SchoolTrip" ? false : true}
                                        initialValue={reservationType ==="SchoolTrip" ? '' : formState.inputs.schoolData.value}
                                        errorText="Wprowadź nazwe szkoły"
                                    />
                                </div>
                                <div className="input-wrapper" style={{ position: 'relative', width: '30%' }}>

                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Input
                                            id="quantity"
                                            label="Ilość osób"
                                            type="range"
                                            onInput={inputHandler}
                                            validators={[VALIDATOR_REQUIRE()]}
                                            minValue={1}
                                            maxValue={limit}
                                            initialValid={formState.inputs.quantity.isValid}
                                            initialValue={formState.inputs.quantity.value}
                                        />
                                        <span>{formState.inputs.quantity.value}</span>
                                        <FaExclamationCircle className="explanation" style={{ marginTop: '.3rem', marginLeft: '.3rem' }} />
                                        <div className="explanation-info">
                                            <span>Podaj liczbę wszystkich osób w grupie</span>
                                        </div>
                                    </div>
                                </div>
                                <Input
                                    id="extraData"
                                    label="Informacje dodatkowe dla organizatorów"
                                    type="textarea"
                                    onInput={inputHandler}
                                    validators={[VALIDATOR_REQUIRE()]}
                                    initialValid={formState.inputs.extraData.isValid}
                                    initialValue={formState.inputs.extraData.value}
                                />
                            </div>
                        }
                    </div>
                </div>
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
                    {reservationType === "Szkolny" &&
                        <>
                            <div className="summary-info">
                                <div className="info-section">
                                    <div className="info-wrapper">
                                        <h5>Szkoła</h5>
                                        <h4>{formState.inputs.schoolData.value}</h4>
                                    </div>
                                    <hr class="line" />
                                </div>
                            </div>
                            <div className="summary-info">
                                <div className="info-section">
                                    <div className="info-wrapper">
                                        <h5>Opiekun wycieczki</h5>
                                        <h4>{formState.inputs.personalData.value}</h4>
                                    </div>
                                    <hr class="line" />
                                </div>
                            </div>
                            <div className="summary-info">
                                <div className="info-section">
                                    <div className="info-wrapper">
                                        <h5>Liczebność wycieczki</h5>
                                        <h4>{formState.inputs.quantity.value}</h4>
                                    </div>
                                    <hr class="line" />
                                </div>
                            </div>
                        </>
                    }
                    {reservationType === "Pojedynczy" &&
                        <>
                            <div className="summary-info">
                                <div className="info-section">
                                    <div className="info-wrapper">
                                        <h5>Imię i nazwisko</h5>
                                        <h4>{formState.inputs.personalData.value}</h4>
                                    </div>
                                    <hr class="line" />
                                </div>
                            </div>
                        </>}
                    {reservationType === "Grupowy" &&
                        <>
                            <div className="summary-info">
                                <div className="info-section">
                                    <div className="info-wrapper">
                                        <h5>Osoba prowadząca</h5>
                                        <h4>{formState.inputs.personalData.value}</h4>
                                    </div>
                                    <hr class="line" />
                                </div>
                            </div>
                            <div className="summary-info">
                                <div className="info-section">
                                    <div className="info-wrapper">
                                        <h5>Liczebność wycieczki</h5>
                                        <h4>{formState.inputs.quantity.value}</h4>
                                    </div>
                                    <hr class="line" />
                                </div>
                            </div>
                        </>
                    }

                </div>

                <div className="button-section">
                    <span onClick={onClose} className='btn-sec'>Anuluj</span>
                    <Button primary type='submit' disabled={!formState.isValid}>Zarezerwuj udział</Button>
                </div>
            </div>
        </form>,
        document.querySelector('.modal-container')
    );
}

export default JoinModal;
