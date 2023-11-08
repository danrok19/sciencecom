import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../../Components/Input/Input'
import Button from '../../Components/Button/Button'
import { VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH } from '../../Util/validators';
import useForm from '../../Hooks/form-hook';
import { useHttpClient } from '../../Hooks/http-hook';
import { AuthContext } from '../../Context/auth-context';


const UpdateEventPage = () => {
    const desiredId = useParams().eventId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedEvent, setLoadedEvent] = useState();
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const fieldValues = [{ title: "Matematyka" }, { title: "Informatyka" }, { title: "Fizyka" }, { title: "Filologia" }, { title: "Biologia" }, { title: "Chemia" }];
    const ageValues = [{ title: "poniżej 9 lat" }, { title: "od 9 do 13 lat" }, { title: "od 11 do 15 lat" }, { title: "od 13 do 17 lat" }, { title: "od 15 do 18 lat" }, { title: "powyżej 18 lat" }];


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
        const fetchEvent = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/events/${desiredId}`);
                setLoadedEvent(responseData.event);
                setFormData({
                    title: {
                        value: responseData.event.title,
                        isValid: true
                    },
                    organization: {
                        value: responseData.event.organization,
                        isValid: true
                    },
                    startDate: {
                        value: responseData.event.startDate,
                        isValid: true
                    },
                    startTime: {
                        value: responseData.event.startTime,
                        isValid: true
                    },
                    description: {
                        value: responseData.event.description,
                        isValid: true
                    },
                    fieldTag: {
                        value: responseData.event.fieldTag,
                        isValid: true
                    },
                    ageTag: {
                        value: responseData.event.ageTag,
                        isValid: true
                    },
                    limit: {
                        value: responseData.event.limit,
                        isValid: true
                    },
                }, true)
            } catch (err) { }
        };
        fetchEvent();

    }, [sendRequest, desiredId, setFormData]);

    const eventUpdateSubmitHandler = async e => {
        e.preventDefault();
        
        await sendRequest(
            `http://localhost:5000/api/events/${desiredId}`,
            'PATCH',
            JSON.stringify({
                title: formState.inputs.title.value,
                organization: formState.inputs.organization.value,
                startDate: formState.inputs.startDate.value,
                startTime: formState.inputs.startTime.value,
                description: formState.inputs.description.value,
                fieldTag: formState.inputs.fieldTag.value,
                ageTag: formState.inputs.ageTag.value,
                limit: formState.inputs.limit.value,
            }),
            { 'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token }
        );
        navigate(`/event/${desiredId}`);
    }

    if (!loadedEvent) {
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
        <div>
            <form className="form-template" onSubmit={eventUpdateSubmitHandler}>
                <div>
                    <div className="data-section">
                        <h1>Informacje tytułowe</h1>
                        <hr className="line" />
                        <Input
                            id="title"
                            label="Tytuł wydarzenia"
                            type="input"
                            valueType="text"
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(30)]}
                            errorText="Wprowadź tytuł wydarzenia! Maksymalnie 30 znaków."
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
                            errorText="Wprowadź organizatorów wydarzenia! Maksymalnie 30 znaków."
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
                                label="Początek wydarzenia"
                                onInput={() => { }}
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Wybierz datę rozpoczęcia wydarzenia!"
                                initialValue={formState.inputs.startDate.value}
                                initialValid={formState.inputs.startDate.isValid}
                            />
                        </div>
                        <div className="date-picker">
                            <Input
                                id="startTime"
                                type="time"
                                label="Godzina wydarzenia"
                                onInput={() => { }}
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Wybierz godzinę rozpoczęcia wydarzenia!"
                                initialValue={formState.inputs.startTime.value}
                                initialValid={formState.inputs.startTime.isValid}
                            />
                        </div>
                    </div>
                    <div className="description-section">
                        <h1>Informacje szczegółowe</h1>
                        <hr className="line" />
                        <Input
                            id="description"
                            label="Opis wydarzenia"
                            type="textarea"
                            onInput={() => { }}
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Wprowadź krótki opis wydarzenia!"
                            initialValue={formState.inputs.description.value}
                            initialValid={formState.inputs.description.isValid}
                        />
                        <Input
                            id="fieldTag"
                            label="Dziedzina"
                            type="dropdown"
                            onInput={inputHandler}
                            validators={[VALIDATOR_MINLENGTH(4)]}
                            errorText="Wybierz dziedzinę dla wydarzenia!"
                            dropList={fieldValues}
                            initialValue={formState.inputs.fieldTag.value}
                            initialValid={formState.inputs.fieldTag.isValid}
                        />
                        <Input
                            id="ageTag"
                            label="Przedział wiekowy"
                            type="dropdown"
                            onInput={inputHandler}
                            validators={[VALIDATOR_MINLENGTH(4)]}
                            errorText="Wybierz przedział wiekowy dla wydarzenia!"
                            dropList={ageValues}
                            initialValue={formState.inputs.ageTag.value}
                            initialValid={formState.inputs.ageTag.isValid}
                        />
                        <Input
                            id="limit"
                            label="Limit osób na wydarzeniu"
                            type="input"
                            valueType="number"
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Wprowadź limit osób na wydarzeniu!"
                            initialValue={formState.inputs.limit.value}
                            initialValid={formState.inputs.limit.isValid}
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

export default UpdateEventPage
