import React from 'react';
import s from './ProfileInfo.module.scss';

const ProfileData = ({ profile, changeEditMode, ...props }) => {
  const { userID } = props.match.params;
  const { authID } = props;
  return (
    <div className={s.statusFont}>
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
        {authID && !userID && <button className={s.btn} onClick={changeEditMode}>Edit</button>}
      </div>
    </div>
  );
};

const Contact = ({ contactKey, contactValue }) => (
  <div>
    {contactKey}
    {' '}
    :
    {' '}
    {contactValue}
  </div>
);

export default ProfileData;
