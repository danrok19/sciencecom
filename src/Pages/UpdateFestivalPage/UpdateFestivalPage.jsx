import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../Components/Input/Input'
import Button from '../../Components/Button/Button'
import { VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH } from '../../Util/validators';
import useForm from '../../Hooks/form-hook';

const festivalsInfo = [
    {
        id: "1",
        name: 'Nazwa Festiwalu',
        organization: 'Nazwa Organizarota',
        startDate: '2023-03-14',
        endDate: '2023-03-15',
        eventAmount: 4,
        image: 'https://picsum.photos/1920/700',
        describtion: 'Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz!Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam.Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam.'
    },
    {
        id: "2",
        name: 'Nazwa Festiwalu2',
        organization: 'Nazwa Organizarota2',
        startDate: '2023-03-14',
        endDate: '2023-03-15',
        eventAmount: 4,
        image: 'https://picsum.photos/1920/700',
        describtion: 'Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz!Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam.Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam. Co ty na to. Weź udział już teraz! Ten festiwal jest o bla blah i takie tam.'
    }
]

const UpdateFestivalPage = () => {
    const desiredId = useParams().festivalId;
    const [isLoading, setIsLoading] = useState(true);


    const [formState, inputHandler, setFormData] = useForm({
        title:{
            value: '',
            isValid: false
        },
        organizer:{
            value: '',
            isValid: false
        },
        startDate:{
            value: '',
            isValid: false
        },
        endDate:{
            value: '',
            isValid: false
        },
        extraInformation:{
            value: '',
            isValid: false
        }
    },
        false
    );

    const identifiedFestival = festivalsInfo.find(festival => festival.id === desiredId);
    useEffect(()=>{
        if(identifiedFestival){
            setFormData({
                title:{
                    value: identifiedFestival.name,
                    isValid: true
                },
                organizer:{
                    value: identifiedFestival.organization,
                    isValid: true
                },
                startDate:{
                    value: identifiedFestival.startDate,
                    isValid: true
                },
                endDate:{
                    value: identifiedFestival.endDate,
                    isValid: true
                },
                extraInformation:{
                    value: identifiedFestival.describtion,
                    isValid: true
                }
            }, true)
        }
        setIsLoading(false);
    }, [setFormData, identifiedFestival])

    const festivalUpdateSubmitHandler = e =>{
        e.preventDefault()
        console.log(formState.inputs)
    }

    if(!identifiedFestival){
        return (
            <div>
                <h2>Nie istnieje taki festiwal!</h2>
            </div>
        )
    }
    if(isLoading){
        return(
            <div>
                <h2>Ładowanie zawartości...</h2>
            </div>
        )
    }

    return (

        <div>
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
                                id="organizer"
                                label="Organizatorzy"
                                type="input"
                                valueType="text"
                                onInput={inputHandler}
                                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(30)]}
                                errorText="Wprowadź organizatorów festiwalu! Maksymalnie 30 znaków."
                                initialValue={formState.inputs.organizer.value}
                                initialValid={formState.inputs.organizer.isValid}
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
                                    onInput={() => { }}
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
                                    onInput={() => { }}
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
                                id="extraInformation"
                                label="Opis festiwalu"
                                type="textarea"
                                onInput={() => { }}
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Wprowadź krótki opis festiwalu!" 
                                initialValue={formState.inputs.extraInformation.value}
                                initialValid={formState.inputs.extraInformation.isValid}
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
