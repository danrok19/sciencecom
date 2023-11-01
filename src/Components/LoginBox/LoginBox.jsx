import React, { useContext } from 'react';
import './loginBox.css';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { useHttpClient } from '../../Hooks/http-hook';
import useForm from '../../Hooks/form-hook';
import Input from '../Input/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from '../../Util/validators';
import { AuthContext } from '../../Context/auth-context';

const LoginBox = ({ onSwitchToRegister }) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const navigate = useNavigate()



    const [formState, inputHandler] = useForm({
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
            const responseData = await sendRequest(
                'http://localhost:5000/api/users/login',
                'POST',
                JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            );

            auth.login(responseData.user.id);
            navigate('/');
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div className="section">
            <div className="login-wrapper">
                <h2>Zaloguj się na swoje konto</h2>
                <form className="form-section" onSubmit={authSubmitHandler}>
                    <Input
                        id="email"
                        label="Email"
                        type="input"
                        valueType="email"
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                        errorText="Podaj email konta."
                    />
                    <Input
                        id="password"
                        label="Hasło"
                        type="input"
                        valueType="password"
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Podaj hasło do swojego konta."
                    />
                    <div className="btn-wrapper">
                        <Button secondary style={{ display: 'flex', margin: 'auto', marginTop: '2rem' }} type="submit">Zaloguj</Button>
                    </div>
                    <div className="link-wrapper">
                        Nie masz jeszcze konta? <span className="link" onClick={onSwitchToRegister}>Załóż konto</span>
                    </div>
                </form>
                <div>
                    {error}
                </div>
            </div>
        </div>
    )
}

export default LoginBox
