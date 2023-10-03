import React from 'react';
import './loginBox.css';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

const LoginBox = ({onSwitchToRegister}) => {
    return (
        <div className="section">
            <div className="login-wrapper">
                <h2>Zaloguj się na swoje konto</h2>
                <form className="form-section">
                    <div className="input-wrapper-login">
                        <label for="email">Email</label>
                        <input type="text" name="email" id="email" required placeholder="email@poczta.com"/>
                    </div>
                    <div className="input-wrapper-login">
                        <div className="upper-label">
                            <label for="password">Hasło</label>
                            <span><Link to="" className="link">Nie pamiętasz hasła</Link></span>
                        </div>
                        <input type="password" name="password" id="password" required placeholder="********"/>
                    </div>
                    <div className="btn-wrapper">
                        <Button secondary style={{display: 'flex', margin: 'auto', marginTop: '2rem'}}>Zaloguj</Button>
                    </div>
                    <div className="link-wrapper">
                        Nie masz jeszcze konta? <span className="link" onClick={onSwitchToRegister}>Załóż konto</span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginBox
