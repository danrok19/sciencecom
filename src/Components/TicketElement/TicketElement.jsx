import React, { useEffect, useContext, useState } from 'react';
import './ticketElement.css';
import Button from '../Button/Button';
import { ImCross } from 'react-icons/im';
import { BsTicketPerforatedFill, BsQuestionLg } from 'react-icons/bs';
import { useHttpClient } from '../../Hooks/http-hook';
import { AuthContext } from '../../Context/auth-context';
import { FaCheck } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import Input from '../Input/Input';
import useForm from '../../Hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_MAXLENGTH, VALIDATOR_REQUIRE } from '../../Util/validators';



const TicketElement = ({ ticket }) => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const [showMail, setShowMail] = useState();
    const [userData, setUserData] = useState();

    const [formState, inputHandler, setFormData] = useForm({
        to: {
            value: '',
            isValid: false
        },
        subject: {
            value: '',
            isValid: false
        },
        text: {
            value: '',
            isValid: false
        }
    },
        false
    );




    const onReject = async e => {
        e.preventDefault();

        await sendRequest(
            `http://localhost:5000/api/tickets/${ticket.id}`,
            'PATCH',
            JSON.stringify({
                rejected: true
            }),
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            }
        );
    }

    const onAccept = async e => {
        e.preventDefault();

        await sendRequest(
            `http://localhost:5000/api/tickets/${ticket.id}`,
            'PATCH',
            JSON.stringify({
                acceptation: true
            }),
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            }
        );
    }

    const onShowMail = async e => {
        e.preventDefault();
        const responseUserData = await sendRequest(`http://localhost:5000/api/users/${ticket.creator}`);
        setUserData(responseUserData);
        setFormData({
            to: {
                value: responseUserData.email,
                isValid: true
            },
            subject: {
                value: '',
                isValid: false
            },
            text: {
                value: '',
                isValid: false
            },
        }, true)

        setShowMail(!showMail);
    }

    const onSendSubmit = async e =>{
        e.preventDefault();
        console.log(formState.inputs)
        await sendRequest(
            'http://localhost:5000/api/emails/send',
            'POST',
            JSON.stringify({
                from: auth.email,
                to: formState.inputs.to.value,
                subject: formState.inputs.subject.value,
                text: formState.inputs.text.value
            }),
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            }
        );
        setShowMail(false);
    }

    let content;
    if (!ticket.rejected && ticket.acceptation) {
        content = <><span className="green"><FaCheck /></span>Zaakceptowane</>
    }
    else if (!ticket.rejected && !ticket.acceptation) {
        content = <><span className="dunno"><BsQuestionLg /></span>Brak akceptacji</>

    }
    else if (ticket.rejected) {
        content = <><span className="red"><ImCross /></span>Odrzucony</>
    }


    return (
        <>
            {!showMail ?
                <div className="ticket-element">
                    <p><BsTicketPerforatedFill />{ticket.id}</p>
                    <div className="personal">
                        <span className="smaller-font">Imię i nazwisko: </span>
                        <span>{ticket.personal}</span>
                        <div>
                            <span className="smaller-font">Rodzaj: </span>
                            <span>{ticket.type}</span>
                        </div>
                        <div>
                            <span className="smaller-font">Ilość: </span>
                            <span>{ticket.quantity}</span>
                        </div>
                        <div>
                            <span className="smaller-font">Opis: </span>{ticket.description}
                        </div>
                    </div>
                    <div style={{ display: 'flex', margin: '.5rem auto' }}>
                        {content}
                    </div>
                    {(!ticket.rejected && !ticket.acceptation) ? <div className="button-section">
                        <Button secondary onClick={onReject}>Odrzuć</Button>
                        <Button accept onClick={onAccept}>Zaakceptuj</Button>
                    </div>
                        : <></>}
                    <Button primary style={{ minWidth: 'fit-content', position: 'absolute', right: '1rem' }} onClick={onShowMail}><MdEmail /></Button>
                </div>
                :
                <div className="ticket-element">
                    <form onSubmit={onSendSubmit}>
                        <Input
                            id="to"
                            label="Odbiorca"
                            type="input"
                            valueType="text"
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                            errorText="Wprowadź email odbiorcy wiadomości."
                            initialValue={formState.inputs.to.value}
                            initialValid={formState.inputs.to.isValid} 
                            />
                        <Input
                            id="subject"
                            label="Temat"
                            type="input"
                            valueType="text"
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(50)]}
                            errorText="Wprowadź temat wiadomości."
                            />
                        <Input
                            id="text"
                            label="Treść wiadomości"
                            type="textarea"
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Wprowadź wiadomość."
                        />
                        <Button accept type="submit">Wyślij</Button>
                    </form>
                    <Button primary style={{ minWidth: 'fit-content', position: 'absolute', right: '1rem' }} onClick={onShowMail}><MdEmail /></Button>
                </div>}</>
    )
}

export default TicketElement
