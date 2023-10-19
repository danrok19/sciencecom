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
        case 'TOUCH':{
            return {
                ...state,
                isTouched: true,
            }
        }
        default:
            return state;
    }
}

const Input = ({ id, label, type, placeholder, valueType, onInput, validators, errorText }) => {

    const [inputState, dispatch] = useReducer(inputReducer, { value: '', isTouched: false, isValid: false });

    const {value, isValid} = inputState

    useEffect(() =>{
        console.log(onInput);
        onInput(id, inputState.value, inputState.isValid)
    }, [id, onInput, value, isValid])

    const changeHandler = e => {
        dispatch({ 
            type: 'CHANGE', 
            val: e.target.value, 
            validators: validators 
        })
    }
    const touchHandler = () =>{
        dispatch({
            type: 'TOUCH'
        });
    }

    const element = type === "input" ?
        <input 
            id={id} 
            type={valueType} 
            placeholder={placeholder} 
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value} />
        :
        <textarea 
            id={id} 
            onChange={changeHandler} 
            value={inputState.value}
            onBlur={touchHandler} />
    return (
        <div className={type === "input" ? 'input-template' : 'textarea-section'}>
            <label htmlFor={id}>{label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
        </div>
    )
}

export default Input
