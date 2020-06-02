import { Field, reduxForm } from 'redux-form';
import React from 'react';
import cn from 'classnames';
import s from './ProfileInfo.module.scss';

const ProfileDataForm = ({
  profile, changeEditMode, error, ...props
}) => (
  <form onSubmit={props.handleSubmit}>
    <div className={s.statusFont}>
      <div>
        <strong> Name:</strong>
        {' '}
        <Field placeholder="your name" name="fullName" component="input" type="text" />
      </div>
      <div>
        <strong>About me: </strong>
        <Field placeholder="Describe yourself" name="aboutMe" component="textarea" type="text" />
      </div>
      <div>
        <strong>Looking for a job: </strong>
        <Field placeholder="yes/no" name="lookingForAJob" component="input" type="text" />
        <div>
          <strong>work status:</strong>
          <Field placeholder="your current work status" name="lookingForAJobDescription" component="input" type="text" />
        </div>
      </div>
      <div>
        <b>Contacts</b>
        {' '}
        :
        {Object.keys(profile.contacts)
          .map((key) => (
            <div key={key}>
              {' '}
              {key}
              {' '}
              :
              {' '}
              <Field name={`contacts.${key}`} component="input" placeholder={key} />
            </div>
          ))}
      </div>
    </div>
    <button className={s.btn} type="submit">Save</button>
    {error && <div>{error}</div>}
  </form>
);
export const ProfileDataFormContainer = reduxForm({ form: 'contacts' })(ProfileDataForm);

const MessageForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <div>
      <Field type="text" component="textarea" name="body" placeholder="type your message here" />
      <button className={cn(s.btn2, s.btn)} type="submit">Send message</button>
    </div>
  </form>
);
export const MessageReduxForm = reduxForm({ form: 'message' })(MessageForm);
