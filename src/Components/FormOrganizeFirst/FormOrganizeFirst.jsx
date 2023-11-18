import React, { useContext, useState, useEffect } from 'react';
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
    const [usersData, setUsersData] = useState();
    const [chosenAuthorized, setChosenAuthorized] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest('http://localhost:5000/api/users');
                const woCreator = responseData.users?.filter((user) => user.id !== auth.userId);
                setUsersData(woCreator)
            } catch (err) { }
        };
        fetchUsers();
    }, [sendRequest, auth])

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
        if(chosenAuthorized.length > 0){
            for (let authorized of chosenAuthorized) {
                formData.append('authorized', authorized);
            }
        }
        formData.append('authorized', auth.userId);
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

    const changeDropList = e =>{
        e.preventDefault();
        const selectedOptionsArray = Array.from(e.target.selectedOptions, (option) => option.value);
        setChosenAuthorized(selectedOptionsArray);
    }
    const renderList = usersData?.map((user)=>{
        return(
            <option key={user.id} value={user.id}>[ {user.email}, {user.name} {user.surname} ]</option>
        )
    })

    const renderAuthorizeds = chosenAuthorized?.map((authorized, index)=>{
        return(
            <div key={authorized}>Dodano {index+1} z listy</div>
        )
    })

    const onResetAuthorizeds = e =>{
        e.preventDefault();
        setChosenAuthorized([]);
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
                    <label style={{fontWeight: '600', fontSize: '18px', display: 'flex', width: '75%', margin: 'auto'}}>Współorganizatorzy</label>
                    <select style={{display: 'flex', margin: 'auto', width: '75%', maxWidth: '400px'}}
                        onChange={changeDropList}
                        multiple
                        >
                        {renderList}
                    </select>
                    <span className="reset-button" onClick={onResetAuthorizeds}>RESET</span>
                    <div className="chosen-fields">
                        {renderAuthorizeds}
                    </div>
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
