import { useState, useContext, useEffect } from 'react';
import './formOrganizeEvent.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { ImCross } from 'react-icons/im';
import { BsQuestionCircleFill } from "react-icons/bs";
import { VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH } from '../../Util/validators';
import useForm from '../../Hooks/form-hook';
import { useHttpClient } from '../../Hooks/http-hook';
import { AuthContext } from '../../Context/auth-context';
import { useNavigate } from 'react-router-dom';
import Tag from '../Tag/Tag';
import Loading from '../Loading/Loading';

const FormOrganizeEvent = () => {

    const [isOnline, setIsOnline] = useState(false);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [festivalData, setFestivalData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date() + 5);
    const [additionalFieldTags, setAdditionalFieldTags] = useState([]);
    const [fieldValuesA, setFieldValuesA] = useState([{ title: "Matematyka" }, { title: "Informatyka" }, { title: "Fizyka" }, { title: "Filologia" }, { title: "Biologia" }, { title: "Chemia" }, {title: "Fizjoterapia"}, {title: "Ekonomia"}, {title: "Historia"}, {title: "Muzyka"}, {title: "Mechanika"}, {title: "Wychowanie fizyczne"}]);
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

    useEffect(() => {
        const fetchFestivals = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/festivals/authorized/${auth.userId}`);
                setFestivalData(responseData.festivals);

            } catch (err) { }
        };
        fetchFestivals();
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
    const fieldValues = [{ title: "Matematyka" }, { title: "Informatyka" }, { title: "Fizyka" }, { title: "Filologia" }, { title: "Biologia" }, { title: "Chemia" }, {title: "Fizjoterapia"}, {title: "Ekonomia"}, {title: "Historia"}, {title: "Muzyka"}, {title: "Mechanika"}, {title: "Wychowanie fizyczne"}];
    const ageValues = [{ title: "poniżej 9 lat" }, { title: "od 9 do 13 lat" }, { title: "od 11 do 15 lat" }, { title: "od 13 do 17 lat" }, { title: "od 15 do 18 lat" }, { title: "powyżej 18 lat" }, { title: "dla wszystkich" }];

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

    const renderList = fieldValuesA?.map((element, index) => {
        return <option key={element.title} value={element.title} id={index}>{element.title}</option>
    })

    const renderTags = additionalFieldTags?.map((tag)=>{
        return(
            <Tag key={tag}>{tag}</Tag>
        )
    })

    const onAdd = e =>{
        const selectedOptionsArray = Array.from(e.target.selectedOptions, (option) => option.value);
        setAdditionalFieldTags(selectedOptionsArray);
    }

    const onResetFields = e =>{
        setAdditionalFieldTags([]);
    }

    useEffect(()=>{
        const chosenFestival = festivalData.find((festival)=> festival.id === formState.inputs.festival.value)

        setEndDate(chosenFestival?.endDate);
    }, [formState.inputs.festival.value, festivalData])

    const eventSubmitHandler = async event => {
        event.preventDefault();
        if (formState.inputs.festival.value && formState.inputs.festival.value !== "...") {
            const formData = new FormData();
            formData.append('title', formState.inputs.title.value);
            formData.append('organization', formState.inputs.organization.value);
            formData.append('startDate', formState.inputs.startDate.value);
            formData.append('startTime', formState.inputs.startTime.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('fieldTag', formState.inputs.fieldTag.value);
            formData.append('ageTag', formState.inputs.ageTag.value);
            formData.append('address', formState.inputs.address.value);
            formData.append('isOnline', isOnline.toString());
            formData.append('festival', formState.inputs.festival.value);
            formData.append('limit', formState.inputs.limit.value);
            for(let field of additionalFieldTags){
                if(field !== formState.inputs.fieldTag.value)
                formData.append('fieldTag', field);
            }
            for (let image of selectedImages) {
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
        else {
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
            for(let field of additionalFieldTags){
                if(field !== formState.inputs.fieldTag.value)
                formData.append('fieldTag', field);
            }
            for (let image of selectedImages) {
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
        navigate('/');
    }

    const eventSubmitHandlerWithCopy = async event => {
        event.preventDefault();
        if (formState.inputs.festival.value && formState.inputs.festival.value !== "...") {
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
            for(let field of additionalFieldTags){
                if(field !== formState.inputs.fieldTag.value)
                formData.append('fieldTag', field);
            }
            for (let image of selectedImages) {
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
        else {
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
            for(let field of additionalFieldTags){
                if(field !== formState.inputs.fieldTag.value)
                formData.append('fieldTag', field);
            }
            for (let image of selectedImages) {
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
    }
    return (
        
        <form className="form-template-event" onSubmit={eventSubmitHandler}>
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
                    <Input
                        id="festival"
                        label="Przynależność do imprezy"
                        type="dropdown"
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE()]}
                        initialValid={true}
                        dropList={festivalData}
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
                        >
                        <div className="explanation-wrapper">
                            <BsQuestionCircleFill className='explanation'/>
                            <div className="explanation-info">
                                <span>Podaj adres z google</span>
                            </div>
                        </div>
                        </Input>
                    </div>}

                <h1>Data i czas</h1>
                <hr className="line" />
                <div className="date-inputs">
                <div className="date-picker">
                    <Input
                        id="startDate"
                        type="date"
                        label="Początek wydarzenia"
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Wybierz datę rozpoczęcia wydarzenia!"
                        minDate={startDate.toISOString().slice(0, 10)}
                        maxDate={endDate}
                        style={{width: '50%'}}
                    />
                    </div>
                    <div className="date-picker">
                    <Input
                        id="startTime"
                        type="time"
                        label="Godzina rozpoczęcia"
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Wybierz godzinę rozpoczęcia wydarzenia!"
                    />
                    </div>
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
                    {formState.inputs.fieldTag.isValid &&
                    <>
                    <span style={{width: '75%', display: 'flex', margin: 'auto', fontWeight: '600', fontSize: '18px'}}>Dodatkowe dziedziny</span>
                    <div className="add-fields"> 
                        <select multiple className="droplist-fields" onChange={onAdd}>
                            {renderList}
                        </select>
                    </div>
                    <span className="reset-button" onClick={onResetFields}>RESET</span>
                    <div className="chosen-fields">
                        {renderTags}
                    </div>
                    </>}

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
                        <label>Zdjęcia do prezentacji wydarzenia</label>

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
                    <Button secondary className="button-next" disabled={!formState.isValid} type='submit'>Dalej {isLoading && <Loading />}</Button>
                    <Button secondary className="button next" disabled={!formState.isValid} onClick={eventSubmitHandlerWithCopy}>Utwórz i skopiuj {isLoading && <Loading />}</Button>
                </div>
            </div>
        </form>
    

    )
}

export default FormOrganizeEvent
