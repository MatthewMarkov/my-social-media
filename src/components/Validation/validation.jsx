import React from "react";
import s from "./validation.module.scss"

export let required = (value) => {
    if (value) return undefined;
    return "Required"
};

export let maxLengthValidation = (max) => (value) => {
    return value &&value.length > max ? `Must be  ${max} characters or less` : undefined
};

export let TextArea = ({input, meta}) => {
    return (
        <div>
            <textarea {...input} />
            {meta.touched && meta.error ? <div>{meta.error}</div> : null}
        </div>
    )
}
export let authInput = ({input, meta}) => {
    const isError = meta.touched && meta.error;
    return (
        <div>
            <input {...input}  className={isError && s.errorBorder}/>
            {isError && <div>{meta.error}</div>}
        </div>
    )
}