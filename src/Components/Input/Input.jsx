import React, { useReducer, useEffect } from 'react';
import { validate } from '../../Util/validators';
import './input.css';


const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH': {
            return {
                ...state,
                isTouched: true,
            }
        }
        case 'FILE': {
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            }
        }
        case 'DATE': {
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            }
        }
        case 'DROP': {
            console.log(action.val);
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            }
        }
        default:
            return state;
    }
}

const Input = ({ id, label, type, placeholder, valueType, onInput, validators, errorText, initialValue, minDate, initialValid, dropList, minValue, maxValue, fileHandler }) => {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: initialValue || '', isTouched: false, isValid: initialValid || false
    });

    const { value, isValid } = inputState

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, onInput, value, isValid])

    const changeHandler = e => {
        dispatch({
            type: 'CHANGE',
            val: e.target.value,
            validators: validators
        })
    }
    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    }
    const changeDate = e => {
        dispatch({
            type: 'DATE',
            val: e.target.value,
            validators: validators
        });
    }

    const changeHandlerDrop = e => {
        dispatch({
            type: 'DROP',
            val: e.target.value,
            validators: validators
        })
    }
    const changeHandlerFile = e => {
        dispatch({
            type: 'CHANGE',
            val: e.target.files[0],
            validators: validators
        })
    }

    const renderList = dropList?.map((element) => {
        return <option key={element.title} value={element.id}>{element.title}</option>
    })


    const element = () => {
        switch (type) {
            case "input":
                return (
                    <input
                        id={id}
                        type={valueType}
                        placeholder={placeholder}
                        onChange={changeHandler}
                        value={inputState.value}
                        onBlur={touchHandler}
                    />
                );
            case "textarea":
                return (
                    <textarea
                        id={id}
                        onChange={changeHandler}
                        value={inputState.value}
                        onBlur={touchHandler} />
                );
            case "time":
                return (
                    <input
                        id={id}
                        type="time"
                        onChange={changeHandler}
                        onBlur={touchHandler}
                        value={inputState.value}
                    />
                )
            case "date":
                return (
                    <input
                        id={id}
                        type="date"
                        onChange={changeDate}
                        onBlur={touchHandler}
                        value={inputState.value}
                        min={minDate}
                    />
                )
            case "file":
                return (
                    <input
                        id={id}
                        type="file"
                        accept=".jpg,.png,.jpeg"
                        onChange={changeHandlerFile} />
                )
            case "dropdown":
                return (
                    <select name="languages"
                        id={id}
                        onChange={changeHandlerDrop}
                        onBlur={touchHandler}
                        value={inputState.value}>
                        <option key={'bez wartosci'} value={'...'}>...</option>
                        {renderList}
                    </select>
                )
                case "range":
                    return (
                        <input id={id}
                        type="range"
                        min={minValue}
                        max={maxValue}
                        value={inputState.value} 
                        onChange={changeHandler}
                         />

                    )
            default:
                return (
                    <>WHAT</>
                )

        };
    };

    return (
        <div className={type === "input" ? 'input-template' : 'textarea-section'}>
            <label htmlFor={id}>{label}</label>
            {element()}
            {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
        </div>
    )
}

export default Input
