import React from 'react'
import img from '../../Assets/Bez tytułu.png';
import './main.css';
import Button from '../Button/Button';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';


const Main = () => {
    return (
        <div className='mainDiv' style={{ borderBottom: '5px solid transparent' }}>
            <img src={img} alt='pic' />
            <div className='blured' />
            <div className='infoContent'>
                <span>Znajdź coś dla siebie</span>
                <div className="container">
                    <form>
                    <div className="row">
                        <div className="yomama col-md-4">
                            <input type="text" className="form-control" placeholder='Wpisz jakie wydarzenia Cię interesują' />
                        </div>
                        <div className="col-md-4">
                            <input type="text" className="form-control" placeholder='Lokalizacja' />
                        </div>
                        <div className="col-md-4">
                            <Button primary style={{justifyContent: 'space-between'}}>Szukaj <BsFillArrowRightCircleFill /></Button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Main
