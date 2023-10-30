import React, { useContext } from 'react';
import './registerBox.css';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { useHttpClient } from '../../Hooks/http-hook';
import { AuthContext } from '../../Context/auth-context';
import useForm from '../../Hooks/form-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MIN } from '../../Util/validators';
import Input from '../Input/Input';

const RegisterBox = ({ onSwitchToLogin }) => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const navigate = useNavigate()



    const [formState, inputHandler] = useForm({
        name: {
            value: '',
            isValid: false
        },
        surname: {
            value: '',
            isValid: false
        },
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);


    const authSubmitHandler = async event => {
        event.preventDefault();

        try{
            await sendRequest(
                'http://localhost:5000/api/users/signup',
                'POST',
                JSON.stringify({
                    name: formState.inputs.name.value,
                    surname: formState.inputs.surname.value,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            auth.login();
            navigate('/');
        }catch(err){}
    };

    return (
        <div className="section">
            <div className="register-wrapper">
                <h2>Załóż nowe konto</h2>
                <form className="form-section" onSubmit={authSubmitHandler}>
                    <div className="personal-wrapper">
                        <Input
                            id="name"
                            label="Imię"
                            type="input"
                            valueType="text"
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Podaj swoje imię."
                        />
                        <Input
                            id="surname"
                            label="Nazwisko"
                            type="input"
                            valueType="text"
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Podaj swoje nazwisko."
                        />
                    </div>
                    <Input
                        id="email"
                        label="Email"
                        type="input"
                        valueType="email"
                        onInput={inputHandler}
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Podaj email."
                    />
                    <Input
                        id="password"
                        label="Hasło"
                        type="input"
                        valueType="password"
                        onInput={inputHandler}
                        validators={[VALIDATOR_MIN(6)]}
                        errorText="Podaj hasło. Musi składać się conajmniej z 6 znaków."
                    />
                    <div className="btn-wrapper">
                        <Button secondary style={{ display: 'flex', margin: 'auto', marginTop: '2rem', width: 'fit-content' }} type="submit">Zarejestruj się</Button>
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
