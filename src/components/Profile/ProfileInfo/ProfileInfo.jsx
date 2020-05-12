import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import cn from 'classnames';
import s from './ProfileInfo.module.scss';
import Loader from '../../Loader/Loader';
import ProfileStatus from './ProfileStatus';
import { updateUserInformation } from '../../../redux/profile-reducer';
import userPhoto from '../../../assets/user.png';


const ProfileInfo = (props) => {
  const [editMode, changeEditMode] = useState(false);
  const [input, showInput] = useState(false);
  const onSubmit = (formData) => {
    props.updateUserInformation(formData);
    changeEditMode(false);
  };
  const onChangeMode = () => {
    changeEditMode(true);
  };
  const offChangeMode = () => {
    changeEditMode(false);
  };
  const onChangePhoto = (e) => {
    if (e.target.files.length) {
      props.saveUserPhoto(e.target.files[0]);
    }
    showInput(false);
  };
  if (!props.profile) {
    return <Loader />;
  }
  return (
    <div className={cn(s.gridContainer)}>
      <div className={cn(s.userPhoto)}>
        <img alt="User" src={props.profile.photos.large || userPhoto} />
        { props.isOwner && !input && <div><button className={s.btn} type="button" onClick={showInput}>change photo</button></div>}
        { props.isOwner && input && <div><input type="file" onChange={onChangePhoto} /></div>}
      </div>
      <div className={s.status}>
        <ProfileStatus {...props} status={props.status} updateStatus={props.updateStatus} />
      </div>
      <div className={s.userInfo}>
        {editMode ? (
          <ProfileDataFormContainer
            initialValues={props.profile}
            onSubmit={onSubmit}
            profile={props.profile}
            changeEditMode={offChangeMode}
          />
        )
          : <ProfileData {...props} profile={props.profile} changeEditMode={onChangeMode} />}
      </div>
    </div>
  );
};

const Contact = ({ contactKey, contactValue }) => (
  <div>
    <b>{contactKey}</b>
    {' '}
    :
    {' '}
    {contactValue}
  </div>
);

const ProfileData = ({ profile, changeEditMode, ...props }) => {
  const { userID } = props.match.params;
  const { authID } = props;
  return (
    <div className={s.userInformation}>
      <div className={s.userName}>
        {profile.fullName}
      </div>
      <div>
        <strong>About me: </strong>
        {profile.aboutMe}
      </div>
      <div>
        <strong>Looking for a job: </strong>
        {profile.lookingForAJob ? 'yes' : 'no'}
        {profile.lookingForAJob ? (
          <div>
            <strong>work status:</strong>
            {' '}
            {profile.lookingForAJobDescription}
            {' '}
          </div>
        ) : null}
      </div>
      <div>
        <b>Contacts</b>
        {' '}
        :
        {Object.keys(profile.contacts)
          .map((key) => (
            <Contact
              contactKey={key}
              contactValue={profile.contacts[key]}
            />
          ))}
        {authID && !userID && <button onClick={changeEditMode}>Edit</button>}
      </div>
    </div>
  );
};

const ProfileDataForm = ({
  profile, changeEditMode, error, ...props
}) => (
  <form onSubmit={props.handleSubmit}>
    <div className={s.userInformation}>

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
    <button type="submit">Save</button>
    {error && <div>{error}</div>}
  </form>
);

const ProfileDataFormContainer = reduxForm({ form: 'contacts' })(ProfileDataForm);

export default connect(null, { updateUserInformation })(ProfileInfo);
