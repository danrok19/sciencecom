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
                  value=""
                  id="anytime"
                  checked={chosenDate === ""}
                  onChange={onDateChange}
                />
                <label htmlFor="anytime">Kiedykolwiek</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  name="chosenDate"
                  value="1"
                  id="today"
                  checked={chosenDate === "1"}
                  onChange={onDateChange}
                />
                <label htmlFor="today">Do 24h</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  name="chosenDate"
                  value="7"
                  id="thisweek"
                  checked={chosenDate === "7"}
                  onChange={onDateChange}
                />
                <label htmlFor="thisweek">Do tygodnia</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  name="chosenDate"
                  value="31"
                  id="thismonth"
                  checked={chosenDate === "31"}
                  onChange={onDateChange}
                />
                <label htmlFor="thismonth">Do miesiąca</label>
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
                  value="poniżej 9 lat"
                  id="infant"
                  checked={chosenAge === "poniżej 9 lat"}
                  onChange={onAgeChange}
                />
                <label htmlFor="infant">{`<9 lat`}</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  name="chosenAge"
                  value="od 9 do 13 lat"
                  id="youth"
                  checked={chosenAge === "od 9 do 13 lat"}
                  onChange={onAgeChange}
                />
                <label htmlFor="youth">od 9 do 13 lat</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  name="chosenAge"
                  value="od 11 do 15 lat"
                  id="teenager"
                  checked={chosenAge === "od 11 do 15 lat"}
                  onChange={onAgeChange}
                />
                <label htmlFor="teenager">od 11 do 15 lat</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  name="chosenAge"
                  value="od 13 do 17 lat"
                  id="teen"
                  checked={chosenAge === "od 13 do 17 lat"}
                  onChange={onAgeChange}
                />
                <label htmlFor="teen">{"od 13 do 17 lat"}</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  name="chosenAge"
                  value="od 15 do 18 lat"
                  id="oldteen"
                  checked={chosenAge === "od 15 do 18 lat"}
                  onChange={onAgeChange}
                />
                <label htmlFor="oldteen">{"od 15 do 18 lat"}</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  name="chosenAge"
                  value="powyżej 18 lat"
                  id="adult"
                  checked={chosenAge === "powyżej 18 lat"}
                  onChange={onAgeChange}
                />
                <label htmlFor="adult">{"powyżej 18 lat"}</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  name="chosenAge"
                  value="dla wszystkich"
                  id="everybody"
                  checked={chosenAge === "dla wszystkich"}
                  onChange={onAgeChange}
                />
                <label htmlFor="everybody">{"dla wszystkich"}</label>
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
