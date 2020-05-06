import React from "react";
import s from "./Dialogs.module.css"
import Message from "./Message/Message";
import DialogItem from "./dialogItem/DialogItem";
import { Field, reduxForm } from 'redux-form'
import {maxLengthValidation, required, TextArea} from "../Validation/validation";



const Dialogs = (props) => {
    let addNewMessage = (value) => {
        props.sentMessage(value.dialogInput)
    }

    let state = props.state;


    let dialogElements = state.dialogs.map ( dialog => <DialogItem name={dialog.name} id={dialog.id} />);
    let messagesElements = state.messages.map (message => <Message message={message.message} /> );

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <DialogFormRedux onSubmit={addNewMessage}  />
                </div>
            </div>
        </div>
    )
};
let maxLengthValidationCreator = maxLengthValidation(10)

let DialogForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
        <Field name ={"dialogInput"} component={TextArea} validate={[required, maxLengthValidationCreator ]}/>
            </div>
        <div>
            <button>Отправить</button>
        </div>
        </form>
    )
};
let DialogFormRedux = reduxForm({form: "dialog"}) (DialogForm);



export default Dialogs;