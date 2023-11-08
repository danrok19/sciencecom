import { useState, useContext, useEffect } from 'react';
import './formOrganizeEvent.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { ImCross } from 'react-icons/im';
import { VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH } from '../../Util/validators';
import useForm from '../../Hooks/form-hook';
import { useHttpClient } from '../../Hooks/http-hook';
import { AuthContext } from '../../Context/auth-context';
import { useNavigate } from 'react-router-dom';

const FormOrganizeEvent = ({festival}) => {

    const [isOnline, setIsOnline] = useState(false);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [festivalData, setFestivalData] = useState([]);

    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        organization: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        },
        startDate: {
            value: '',
            isValid: false
        },
        startTime: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        fieldTag: {
            value: '',
            isValid: true
        },
        ageTag: {
            value: '',
            isValid: true
        },
        festival: {
            value: '',
            isValid: false
        },
        limit: {
            value: '',
            isValid: false
        }

    }, false);

    useEffect(() =>{
        const fetchFestivals = async () =>{
          try{
            const responseData = await sendRequest(`http://localhost:5000/api/festivals/creator/${auth.userId}`);
            setFestivalData(responseData.festivals);
            
          }catch(err){}
        };
        fetchFestivals();
        console.log('festivalData: ', festivalData);
      }, [sendRequest, auth.userId]);

    const [selectedImages, setSelectedImages] = useState([]);

    const setNotOnline = e => {
        e.preventDefault()
        setIsOnline(false);
    }

    const setOnline = e => {
        e.preventDefault()
        setIsOnline(true);

    }
    const fieldValues = [{title: "Matematyka"}, {title: "Informatyka"}, {title: "Fizyka"}, {title: "Filologia"}, {title: "Biologia"}, {title: "Chemia"}];
    const ageValues = [{title: "poniżej 9 lat"}, {title: "od 9 do 13 lat"}, {title: "od 11 do 15 lat"}, {title: "od 13 do 17 lat"},{title: "od 15 do 18 lat"}, {title: "powyżej 18 lat"}];



    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImages([...selectedImages, file]);
        }
    };


    // Function to delete an image by index
    const deleteImage = (index) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };

    console.log('selectedImages', selectedImages);

    const eventSubmitHandler = async event => {
        event.preventDefault();
        if(formState.inputs.festival.value && formState.inputs.festival.value !== "..."){
            const formData = new FormData();
            formData.append('title', formState.inputs.title.value);
            formData.append('organization', formState.inputs.organization.value);
            formData.append('startDate', formState.inputs.startDate.value);
            formData.append('startTime', formState.inputs.startTime.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('fieldTag', formState.inputs.fieldTag.value);
            formData.append('ageTag', formState.inputs.ageTag.value);
            formData.append('address', formState.inputs.address.value);
            formData.append('isOnline', isOnline);
            formData.append('festival', formState.inputs.festival.value);
            formData.append('limit', formState.inputs.limit.value);
            for(let image of selectedImages){
                formData.append('images', image);
            }
            await sendRequest(
                'http://localhost:5000/api/events/create',
                'POST',
                formData,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
        }
        else{
            const formData = new FormData();
            formData.append('title', formState.inputs.title.value);
            formData.append('organization', formState.inputs.organization.value);
            formData.append('startDate', formState.inputs.startDate.value);
            formData.append('startTime', formState.inputs.startTime.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('fieldTag', formState.inputs.fieldTag.value);
            formData.append('ageTag', formState.inputs.ageTag.value);
            formData.append('address', formState.inputs.address.value);
            formData.append('isOnline', isOnline);
            formData.append('limit', formState.inputs.limit.value);
            for(let image of selectedImages){
                formData.append('images', image);
            }
            await sendRequest(
                'http://localhost:5000/api/events/create',
                'POST',
                formData
            );
        }
        navigate('/');
    }
    return (
        <form className="form-template-event" onSubmit={eventSubmitHandler}>
            <div>
                <div className="data-section">
                    <h1>Informacje tytułowe</h1>
                    <hr className="line" />
                    <Input
                        id="title"
                        label="Tytuł wydarznia"
                        type="input"
                        valueType="text"
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(30)]}
                        errorText="Wprowadź tytuł wydarzenia! Maksymalnie 30 znaków."
                    />
                    <Input
                        id="organization"
                        label="Organizatorzy"
                        type="input"
                        valueType="text"
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(30)]}
                        errorText="Wprowadź organizatorów wydarzenia! Maksymalnie 30 znaków."
                    />
                </div>
                <h1>Lokalizacja</h1>
                <hr className="line" />
                <div className="buttons">
                    <Button secondary onClick={setNotOnline}>Miejsce</Button>
                    <Button secondary onClick={setOnline}>Online</Button>
                </div>
                {isOnline ?
                    <div className="online">
                        <Input
                            id="address"
                            label="Informacje na temat miejsca spotkania"
                            type="input"
                            valueType="text"
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Wprowadź miejsce wydarzenia!" />
                    </div>
                    :
                    <div className="not-online">
                        <Input
                            id="address"
                            label="Adres wydarzenia"
                            type="input"
                            valueType="text"
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Wprowadź miejsce wydarzenia!"
                        />
                    </div>}

                <h1>Data i czas</h1>
                <hr className="line" />
                <div className="date-inputs">
                    <Input
                        id="startDate"
                        type="date"
                        label="Poczętek festiwalu"
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Wybierz datę rozpoczęcia wydarzenia!"
                    />
                    <Input
                        id="startTime"
                        type="time"
                        label="Godzina rozpoczęcia"
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Wybierz godzinę rozpoczęcia wydarzenia!"
                    />
                </div>
                <div className="description-section">
                    <h1>Informacje szczegółowe</h1>
                    <hr className="line" />
                    <Input
                        id="description"
                        label="Opis"
                        type="textarea"
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Podaj krótki opis wydarzenia!"
                    />
                    <Input
                        id="fieldTag"
                        label="Dziedzina"
                        type="dropdown"
                        onInput={inputHandler}
                        validators={[VALIDATOR_MINLENGTH(4)]}
                        errorText="Wybierz dziedzinę dla wydarzenia!"
                        dropList={fieldValues}
                    />
                    <Input
                        id="ageTag"
                        label="Przedział wiekowy"
                        type="dropdown"
                        onInput={inputHandler}
                        validators={[VALIDATOR_MINLENGTH(4)]}
                        errorText="Wybierz przedział wiekowy dla wydarzenia!"
                        dropList={ageValues}
                    />
                    <Input
                        id="festival"
                        label="Festiwal"
                        type="dropdown"
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE()]}
                        initialValid={true}
                        dropList={festivalData}
                    />
                    <Input
                            id="limit"
                            label="Limit osób na wydarzeniu"
                            type="input"
                            valueType="number"
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Wprowadź limit osób na wydarzeniu!"
                        />
                    <div>
                    </div>

                    <div className="image-section">
                        <label>Zdjęcie do prezentacji wydarzenia</label>

                        {selectedImages && (
                            <div>
                                <input type="file" accept=".jpg,.png,.jpeg" onChange={handleImageUpload} />
                                <div className="image-list">
                                    {selectedImages?.map((imageUrl, index) => (
                                        <div className="img-wrapper">
                                            <img key={index} src={URL.createObjectURL(imageUrl)} alt={`Image ${index}`} className="img-element" />
                                            <ImCross className="cross-element" onClick={() => deleteImage(index)} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
                <div className="button-section">
                    <Button secondary className="button-next" disabled={!formState.isValid} type='submit'>Dalej</Button>
                </div>
            </div>
            {isLoading && <span>Ładowanie...</span>}
            {/* {error && <span>{error}</span>} */}
        </form>


    )
}

export default FormOrganizeEvent
