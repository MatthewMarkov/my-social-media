import React from 'react';
import s from './validation.module.scss';

export const required = (value) => {
  if (value) return undefined;
  return 'Required';
};

export const maxLengthValidation = (max) => (value) => (value && value.length > max ? `Must be  ${max} characters or less` : undefined);

export const TextArea = ({ input, meta }) => (
  <div>
    <textarea {...input} />
    {meta.touched && meta.error ? <div>{meta.error}</div> : null}
  </div>
);
export const authInput = ({ input, meta }) => {
  const isError = meta.touched && meta.error;
  return (
    <div>
      <input {...input} className={isError && s.errorBorder} />
      {isError && <div>{meta.error}</div>}
    </div>
  );
};
