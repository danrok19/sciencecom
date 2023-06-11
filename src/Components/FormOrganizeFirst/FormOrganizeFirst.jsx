import React, { useState, useEffect } from 'react';
import './formOrganizeFirst.css';
import Button from '../Button/Button';
import { TfiLocationPin } from 'react-icons/tfi';
import { HiOutlineSignal } from 'react-icons/hi2';
import { FaCalendarAlt } from 'react-icons/fa';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

const FormOrganizeFirst = () => {

    const [pickOnline, setPickOnline] = useState(false);
    const [day, setDay] = useState('');
    const [isCheckedClock, setIsCheckedClock] = useState(false);
    const [isCheckedEndDate, setIsCheckedEndDate] = useState(false);

    useEffect(() => {
        const currentDate = new Date();
        if (currentDate.getMonth() + 1 <= 11) {
            setDay(currentDate.getDate() + '.0' + (currentDate.getMonth() + 1) % 12 + '.' + currentDate.getFullYear()); // Months are zero-indexed, so we add 1
        }
        else {
            setDay(currentDate.getDate() + '.' + (currentDate.getMonth() + 1) % 12 + '.' + currentDate.getFullYear());
        }
    }, []);

    const changeToOnline = () => {
        setPickOnline(true);
    }

    const changeToOffline = () => {
        setPickOnline(false);
    }

    const handleCheckboxClock = (event) => {
        setIsCheckedClock(event.target.checked);
    }

    const handleCheckboxEndDate = (event) => {
        setIsCheckedEndDate(event.target.checked);
    }

    return (
        <div>
            <div className='firstSection'>
                <div className='headLine'>
                    <h1>Informacje tytułowe</h1>
                    <hr class="line"></hr>
                </div>
                <div className='inputs'>
                    <div className='inputSection'>
                        <label>Tytuł festiwalu</label>
                        <input type="text" placeholder='Prosty i treściwy tytuł' />
                    </div>
                    <div className='inputSection'>
                        <label>Organizatorzy</label>
                        <input type="text" placeholder='Kto organizuje ten festiwal' />
                    </div>
                </div>
            </div>
            <div className='secondSection'>
                <div className='headLine'>
                    <h1>Lokalizacja</h1>
                    <hr class="line"></hr>
                </div>
                <div className="buttons">
                    <Button secondary onClick={changeToOffline}>Miejsce <TfiLocationPin /></Button>
                    <Button secondary onClick={changeToOnline}>Online <HiOutlineSignal /></Button>
                </div>
                <div className='inputs'>
                    {pickOnline ?
                        <div className='inputSection'>
                            <label>Informacje o lokalizacji wydarzeń</label>
                            <input type="text" placeholder='Podaj lokalizacje' />
                        </div>
                        :
                        <>
                            <div className='inputSection'>
                                <label>Adres festiwalu</label>
                                <input type="text" placeholder='Podaj adres wydarzenia' />
                            </div>
                            <div className='inputSection'>
                                <label>Dodatkowe informacje</label>
                                <input type="text" placeholder='Podaj dodatkowe informacje o lokalizacji' />
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className='thirdSection'>
                <div className='headLine'>
                    <h1>Data i czas</h1>
                    <hr class="line"></hr>
                </div>
                <div className="inputs">
                    <div className='inputSection'>
                        <label>Początek festiwalu</label>
                        <input type="text" placeholder={day} />
                        <FaCalendarAlt className='icons' />
                    </div>
                    {isCheckedClock ?
                        <div className='inputSection'>
                            <label>Godzina rozpoczęcia</label>
                            <input type="text" placeholder='12.00' />
                        </div>
                        :
                        <></>}

                    <>
                        <label style={{ paddingTop: '15px', paddingRight: '55px', display: 'inline-block', whiteSpace: 'nowrap' }}>
                            <input
                                type="checkbox"
                                checked={isCheckedClock}
                                onChange={handleCheckboxClock}
                            />
                            Pokaż godzinę
                        </label></>
                </div>
                <div className="inputs">
                    {isCheckedEndDate ?
                        <>
                            <div className='inputSection'>
                                <label>Koniec festiwalu</label>
                                <input type="text" placeholder={day} />
                                <FaCalendarAlt className='icons' />
                            </div>
                            {isCheckedClock ?
                                <div className='inputSection'>
                                    <label>Godzina zakończenia</label>
                                    <input type="text" placeholder='12.00' />
                                </div>
                                :
                                <></>
                            }
                        </>
                        :
                        <></>}
                    <>
                        <label style={{ paddingTop: '15px', display: 'inline-block', whiteSpace: 'nowrap'}}>
                            <input
                                type="checkbox"
                                checked={isCheckedEndDate}
                                onChange={handleCheckboxEndDate}
                            />
                            Pokaż datę zakończenia
                        </label>
                    </>
                </div>
            </div>
            <Button primary className='submit'>Dalej <BsFillArrowRightCircleFill /></Button>
        </div>
    )
}

export default FormOrganizeFirst
