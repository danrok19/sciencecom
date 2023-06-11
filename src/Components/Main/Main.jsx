import React from 'react'
import img from '../../Assets/Bez tytułu.png';
import './main.css';
import Button from '../Button/Button';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

const Main = () => {
    return (
        <div className='mainDiv' style={{borderBottom: '5px solid transparent'}}>
            <div className='overlay' />
            <img src={img} alt='pic' />
            <div className='blured'/>
            <div className='infoContent'>
                <span>Znajdź coś dla siebie</span>
                <div className='inputs'>
                    <input className='classic' type="text" placeholder='Wpisz jakie wydarzenia Cię interesują'/>
                    <input className='local'  type="text" placeholder='Lokalizacja'/>
                    <Button primary style={{marginLeft: '5px'}}>Szukaj <BsFillArrowRightCircleFill /></Button>
                </div>
            </div>

        </div>
    )
}

export default Main
