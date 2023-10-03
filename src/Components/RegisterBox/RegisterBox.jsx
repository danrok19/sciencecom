import React from 'react';
import './registerBox.css';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

const RegisterBox = ({onSwitchToLogin}) => {
    return (
        <div className="section">
            <div className="register-wrapper">
                <h2>Załóż nowe konto</h2>
                <form className="form-section">
                    <div className="personal-wrapper">
                        <div className="input-wrapper-login">
                            <label for="name">Imię</label>
                            <input type="text" name="name" id="name" required />
                        </div>
                        <div className="input-wrapper-login">
                            <label for="surname">Nazwisko</label>
                            <input type="text" name="surname" id="surname" required />
                        </div>
                    </div>
                    <div className="input-wrapper-login">
                        <label for="email">Email</label>
                        <input type="text" name="email" id="email" required placeholder="email@poczta.com" />
                    </div>
                    <div className="input-wrapper-login">
                        <label for="password">Hasło</label>
                        <input type="password" name="password" id="password" required placeholder="********" />
                    </div>
                    <div className="input-wrapper-login">
                        <label for="password">Powtórz hasło</label>
                        <input type="password" name="password" id="password" required placeholder="********" />
                    </div>
                    <div className="btn-wrapper">
                        <Button secondary style={{ display: 'flex', margin: 'auto', marginTop: '2rem', width: 'fit-content' }}>Zarejestruj się</Button>
                    </div>
                    <div className="link-wrapper">
                        Masz już konto? <span className="link" onClick={onSwitchToLogin}>Zaloguj się na swoje konto</span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterBox
