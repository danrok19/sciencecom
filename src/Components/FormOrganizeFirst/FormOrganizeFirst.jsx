import React, { useContext } from 'react';
import './formOrganizeFirst.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import 'react-datepicker/dist/react-datepicker.css';
import { VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH } from '../../Util/validators';
import useForm from '../../Hooks/form-hook';
import { useHttpClient } from '../../Hooks/http-hook';
import { AuthContext } from '../../Context/auth-context';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../ImageUpload/ImageUpload';


const FormOrganizeFirst = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const navigate = useNavigate();

    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        organization: {
            value: '',
            isValid: false
        },
        startDate: {
            value: '',
            isValid: false
        },
        endDate: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        image: {
            value: null,
            isValid: false
        }

    }, false)

    const festivalSubmitHandler = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', formState.inputs.title.value);
        formData.append('organization', formState.inputs.organization.value);
        formData.append('startDate', formState.inputs.startDate.value);
        formData.append('endDate', formState.inputs.endDate.value);
        formData.append('description', formState.inputs.description.value);
        formData.append('image', formState.inputs.image.value);
        await sendRequest(
            'http://localhost:5000/api/festivals',
            'POST',
            formData,
            {
                Authorization: 'Bearer ' + auth.token
            }
        );
        navigate('/organizeEvent');
    }



    return (
        <form className="form-template" onSubmit={festivalSubmitHandler}>
            <div>
                <div className="data-section">
                    <h1>Informacje tytułowe</h1>
                    <hr className="line" />
                    <Input
                        id="title"
                        label="Tytuł imprezy"
                        type="input"
                        valueType="text"
                        onInput={inputHandler}
                        minDate={new Date().toISOString().split('T')[0]}
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(30)]} errorText="Wprowadź tytuł festiwalu! Maksymalnie 30 znaków." />
                    <Input
                        id="organization"
                        label="Organizatorzy"
                        type="input"
                        valueType="text"
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(30)]}
                        errorText="Wprowadź organizatorów festiwalu! Maksymalnie 30 znaków." />
                </div>
                <h1>Data i czas</h1>
                <hr className="line" />
                <div className="date-inputs">
                    <div className="date-picker">
                        <Input
                            id="startDate"
                            type="date"
                            label="Poczętek imprezy"
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE()]} />
                    </div>
                    <div className="date-picker">
                        <Input
                            id="endDate"
                            type="date"
                            label="Koniec imprezy"
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE()]} />
                    </div>
                </div>
                <div className="description-section">
                    <h1>Informacje szczegółowe</h1>
                    <hr className="line" />
                    <Input
                        id="description"
                        label="Opis imprezy"
                        type="textarea"
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Wprowadź krótki opis imprezy!" />
                    <div className="image-section">
                        <label style={{fontWeight:'600', fontSize: '18px'}}>Zdjęcie</label>
                        <ImageUpload onInput={inputHandler} id="image" amount={1} />
                    </div>
                </div>
                <div className="button-section">
                    <Button secondary className="button-next" type="submit" disabled={!formState.isValid}>Dalej</Button>
                </div>

            </div>
        </form>
    )
}

export default FormOrganizeFirst
