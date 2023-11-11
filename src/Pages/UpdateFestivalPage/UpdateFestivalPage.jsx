import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../../Components/Input/Input'
import Button from '../../Components/Button/Button'
import { VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH } from '../../Util/validators';
import useForm from '../../Hooks/form-hook';
import { useHttpClient } from '../../Hooks/http-hook';
import { AuthContext } from '../../Context/auth-context';




const UpdateFestivalPage = () => {
    const desiredId = useParams().festivalId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedFestival, setLoadedFestival] = useState();
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const [formState, inputHandler, setFormData] = useForm({
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
        }
    },
        false
    );

    useEffect(() => {
        const fetchFestival = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/festivals/${desiredId}`);
                setLoadedFestival(responseData.festival);
                setFormData({
                    title: {
                        value: responseData.festival.title,
                        isValid: true
                    },
                    organization: {
                        value: responseData.festival.organization,
                        isValid: true
                    },
                    startDate: {
                        value: responseData.festival.startDate,
                        isValid: true
                    },
                    endDate: {
                        value: responseData.festival.endDate,
                        isValid: true
                    },
                    description: {
                        value: responseData.festival.description,
                        isValid: true
                    }
                }, true)
            } catch (err) { }
        };
        fetchFestival();

    }, [sendRequest, desiredId, setFormData])


    const festivalUpdateSubmitHandler = async e => {
        e.preventDefault();
        await sendRequest(
            `http://localhost:5000/api/festivals/${desiredId}`,
            'PATCH',
            JSON.stringify({
                title: formState.inputs.title.value,
                organization: formState.inputs.organization.value,
                startDate: formState.inputs.startDate.value,
                endDate: formState.inputs.endDate.value,
                description: formState.inputs.description.value,
            }),
            { 'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token }
        );
        navigate(`/festival/${desiredId}`);
    }

    if (!loadedFestival) {
        return (
            <div>
                <h2>Nie istnieje taki festiwal!</h2>
            </div>
        )
    }
    if (isLoading) {
        return (
            <div>
                <h2>Ładowanie zawartości...</h2>
            </div>
        )
    }

    return (
        <div style={{background: '#950740', paddingTop: '2em', paddingBottom: '3rem', minHeight: '91vh'}}>
            <form className="form-template" onSubmit={festivalUpdateSubmitHandler}>
                <div>
                    <div className="data-section">
                        <h1>Informacje tytułowe</h1>
                        <hr className="line" />
                        <Input
                            id="title"
                            label="Tytuł festiwalu"
                            type="input"
                            valueType="text"
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(30)]}
                            errorText="Wprowadź tytuł festiwalu! Maksymalnie 30 znaków."
                            initialValue={formState.inputs.title.value}
                            initialValid={formState.inputs.title.isValid}
                        />
                        <Input
                            id="organization"
                            label="Organizatorzy"
                            type="input"
                            valueType="text"
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(30)]}
                            errorText="Wprowadź organizatorów festiwalu! Maksymalnie 30 znaków."
                            initialValue={formState.inputs.organization.value}
                            initialValid={formState.inputs.organization.isValid}
                        />
                    </div>

                    <h1>Data i czas</h1>
                    <hr className="line" />
                    <div className="date-inputs">
                        <div className="date-picker">
                            <Input
                                id="startDate"
                                type="date"
                                label="Poczętek festiwalu"
                                onInput={inputHandler}
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Wybierz datę rozpoczęcia festiwalu!"
                                initialValue={formState.inputs.startDate.value}
                                initialValid={formState.inputs.startDate.isValid}
                            />
                        </div>
                        <div className="date-picker">
                            <Input
                                id="endDate"
                                type="date"
                                label="Koniec festiwalu"
                                onInput={inputHandler}
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Wybierz datę zakończenia festiwalu!"
                                initialValue={formState.inputs.endDate.value}
                                initialValid={formState.inputs.endDate.isValid}
                            />
                        </div>
                    </div>
                    <div className="description-section">
                        <h1>Informacje szczegółowe</h1>
                        <hr className="line" />
                        <Input
                            id="description"
                            label="Opis festiwalu"
                            type="textarea"
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Wprowadź krótki opis festiwalu!"
                            initialValue={formState.inputs.description.value}
                            initialValid={formState.inputs.description.isValid}
                        />

                    </div>
                    <div className="button-section">
                        <Button secondary className="button-next" type="submit" disabled={!formState.isValid}>Dalej</Button>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default UpdateFestivalPage
