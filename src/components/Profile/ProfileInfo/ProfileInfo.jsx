import React from 'react';
import s from './ProfileInfo.module.css';
import Loader from '../../Loader/Loader';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Loader />;
  }
  return (
    <div className={s.userInformation}>
      <div className={s.userPhoto}>
        <img src={props.profile.photos.large} />
      </div>
      <div>
        <ProfileStatus {...props} status={props.status} updateStatus={props.updateStatus} />
      </div>
      <div>
        <strong> Name:</strong>
        {' '}
        { props.profile.fullName}
      </div>
      <div>
        <strong>About me: </strong>
        { props.profile.aboutMe}
      </div>
      <div>
        <strong>Looking for a job: </strong>
        { props.profile.lookingForAJob ? 'yes' : 'no' }
        { props.profile.lookingForAJob ? (
          <div>
            <strong>work status:</strong>
            {' '}
            { props.profile.lookingForAJobDescription}
            {' '}
          </div>
        ) : null }
      </div>

    </div>
  );
};

export default ProfileInfo;
