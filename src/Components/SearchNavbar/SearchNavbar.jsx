import React from 'react';
import './searchNavbar.css';
import Button from '../Button/Button';
import { LuFilter } from 'react-icons/lu';

const SearchNavbar = ({onFilter}) => {
    return (
        <div className='nav-wrapper'>
            <div className="left-wrapper">
                <form classsName="form-event-wrapper">
                    <input className="input-section" type="text" name="searchEventByName" id="searchEventByName" placeholder="Wyszukaj wydarzenie" style={{borderRadius: '.5rem', border: 'solid 2px rgb(182, 182, 182)', padding: '4px'}}/>
                    <input className="input-section" type="text" name="searchEventByLoc" id="searchEventByLoc" placeholder="Białystok" style={{borderRadius: '.5rem', border: 'solid 2px rgb(182, 182, 182)', padding: '4px'}}/>
                    <Button primary>Szukaj</Button>
                </form>

            </div>
            <div className="right-wrapper">
                <Button primary onClick={onFilter}>Ustaw filtry <LuFilter /></Button>
            </div>
        </div>
    )
}

export default SearchNavbar
