import React from 'react'
import img from '../../Assets/Bez tytułu.png';
import './main.css';
import Button from '../Button/Button';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';


const Main = ({onSearch, setTitle, setDate}) => {

    const onChange = e =>{
        setTitle(e.target.value);
    }
    const onDateChange = e =>{
        setDate(e.target.value);
        console.log(e.target.value)
    }
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
                            <input type="text" className="form-control" placeholder='Wpisz jakie wydarzenia Cię interesują' onChange={onChange}/>
                        </div>
                        <div className="col-md-4">
                            <input type="date" className="form-control" onChange={onDateChange}/>
                        </div>
                        <div className="col-md-4">
                            <Button primary style={{justifyContent: 'space-between'}} onClick={onSearch}>Szukaj <BsFillArrowRightCircleFill /></Button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Main
