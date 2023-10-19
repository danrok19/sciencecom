import React, { useReducer } from 'react';
import { validate } from '../../Util/validators';
import './input.css';


const inputReducer = (state, action) =>{
    switch(action.type){
        case 'CHANGE':
            return{
                ...state,
                value: action.val,
                isValid: true
            };

        default:
            return state;
    }
}

const Input = ({ id, label, type, placeholder, valueType, errorText }) => {

    const [inputState, dispatch] = useReducer(inputReducer, {value: '', isValid: false});

    const changeHandler = e =>{
        dispatch({type: 'CHANGE', val: e.target.value})
    }

    const element = type === "input" ?
        <input id={id} type={valueType} placeholder={placeholder} onChange={changeHandler} value={inputState.value}/>
        :
        <textarea id={id} onChange={changeHandler} value={inputState.value}/>
    return (
        <div className={type === "input" ? 'input-template' : 'textarea-section'}>
            <label htmlFor={id}>{label}</label>
            {element}
            {!inputState.isValid && <p>{errorText}</p>}
        </div>
    )
}

export default Input
