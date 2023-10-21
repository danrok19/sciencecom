import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../Components/Input/Input'
import Button from '../../Components/Button/Button'
import { VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH } from '../../Util/validators';
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

    const identifiedFestival = festivalsInfo.find(festival => festival.id === desiredId);

    console.log(identifiedFestival)

    return (

        <div>
            {identifiedFestival ?
                <form className="form-template">
                    <div>
                        <div className="data-section">
                            <h1>Informacje tytułowe</h1>
                            <hr className="line" />
                            <Input
                                id="title"
                                label="Tytuł festiwalu"
                                type="input"
                                valueType="text"
                                onInput={() => { }}
                                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(30)]}
                                errorText="Wprowadź tytuł festiwalu! Maksymalnie 30 znaków."
                                currentValue={identifiedFestival.name}
                                valid={true}
                            />
                            <Input
                                id="organizer"
                                label="Organizatorzy"
                                type="input"
                                valueType="text"
                                onInput={() => { }}
                                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(30)]}
                                errorText="Wprowadź organizatorów festiwalu! Maksymalnie 30 znaków."
                                currentValue={identifiedFestival.organization}
                                valid={true}
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
                                    currentValue={identifiedFestival.startDate}
                                    valid={true}
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
                                    currentValue={identifiedFestival.endDate}
                                    valid={true}
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
                                currentValue={identifiedFestival.describtion}
                                valid={true}
                                />

                        </div>
                        <div className="button-section">
                            <Button secondary className="button-next" type="submit" disabled={true}>Dalej</Button>
                        </div>

                    </div>
                </form>
                :
                <div>
                    <h2>Nie znaleziono festiwalu! wtf</h2>
                </div>
            }
        </div>
    )
}

export default UpdateFestivalPage
