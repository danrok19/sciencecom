import { useState } from 'react';
import ReactDom from 'react-dom';
import './filterModal.css';
import Button from '../Button/Button';

const FilterModal = ({ onClose, onDateChange, onFieldChange, onAgeChange, onReset, chosenDate, chosenField, chosenAge, onSubmit }) => {


  return ReactDom.createPortal(
    <div>
      <div className="grey-background" onClick={onClose} />
      <div className="actual-modal-filter">
        <form className="filters-wrapper" onSubmit={onSubmit}>
          <div className="filters-section">
            <div className="column">
              <h4>Kiedy</h4>
              <div className="radio">
                <input
                  type="radio"
                  name="chosenDate"
                  value="Anytime"
                  id="anytime"
                  checked={chosenDate === "Anytime"}
                  onChange={onDateChange}
                />
                <label htmlFor="anytime">Kiedykolwiek</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  name="chosenDate"
                  value="Today"
                  id="today"
                  checked={chosenDate === "Today"}
                  onChange={onDateChange}
                />
                <label htmlFor="today">Dzisiaj</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  name="chosenDate"
                  value="ThisWeek"
                  id="thisweek"
                  checked={chosenDate === "ThisWeek"}
                  onChange={onDateChange}
                />
                <label htmlFor="thisweek">Ten tydzień</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  name="chosenDate"
                  value="ThisMonth"
                  id="thismonth"
                  checked={chosenDate === "ThisMonth"}
                  onChange={onDateChange}
                />
                <label htmlFor="thismonth">Ten miesiąc</label>
              </div>
            </div>
            <div className="column">
              <h4>Dziedzina</h4>
              <div className="radio">
                <input
                  type="radio"
                  name="chosenField"
                  value="Matematyka"
                  id="math"
                  checked={chosenField === "Matematyka"}
                  onChange={onFieldChange}
                />
                <label htmlFor="math">Matematyka</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  name="chosenField"
                  value="Informatyka"
                  id="it"
                  checked={chosenField === "Informatyka"}
                  onChange={onFieldChange}
                />
                <label htmlFor="it">Informatyka</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  name="chosenField"
                  value="Fizyka"
                  id="phisics"
                  checked={chosenField === "Fizyka"}
                  onChange={onFieldChange}
                />
                <label htmlFor="phisics">Fizyka</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  name="chosenField"
                  value="Filologia"
                  id="philology"
                  checked={chosenField === "Filologia"}
                  onChange={onFieldChange}
                />
                <label htmlFor="philology">Filologia</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  name="chosenField"
                  value="Biologia"
                  id="biology"
                  checked={chosenField === "Biologia"}
                  onChange={onFieldChange}
                />
                <label htmlFor="biology">Biologia</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  name="chosenField"
                  value="Chemia"
                  id="chemistry"
                  checked={chosenField === "Chemia"}
                  onChange={onFieldChange}
                />
                <label htmlFor="chemistry">Chemia</label>
              </div>
            </div>
            <div className="column">
              <h4>Wiek</h4>
              <div className="radio">
                <input
                  type="radio"
                  name="chosenAge"
                  value="Infant"
                  id="infant"
                  checked={chosenAge === "Infant"}
                  onChange={onAgeChange}
                />
                <label htmlFor="infant">{`<9 lat`}</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  name="chosenAge"
                  value="Youth"
                  id="youth"
                  checked={chosenAge === "Youth"}
                  onChange={onAgeChange}
                />
                <label htmlFor="youth">od 9 do 13 lat</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  name="chosenAge"
                  value="Teenager"
                  id="teenager"
                  checked={chosenAge === "Teenager"}
                  onChange={onAgeChange}
                />
                <label htmlFor="teenager">od 14 do 18 lat</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  name="chosenAge"
                  value="Adult"
                  id="adult"
                  checked={chosenAge === "Adult"}
                  onChange={onAgeChange}
                />
                <label htmlFor="adult">{`>18 lat`}</label>
              </div>
            </div>
          </div>
          <div className="btn-section">
            <Button primary type="submit" value="Submit">Filtruj</Button>
            <Button secondary style={{ width: 'fit-content' }} onClick={onReset}>Zresetuj filtry</Button>
          </div>
        </form>
      </div>
    </div>, document.querySelector('.modal-container')
  )
}

export default FilterModal
