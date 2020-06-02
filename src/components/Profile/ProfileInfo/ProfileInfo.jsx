import React, { useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import s from './ProfileInfo.module.scss';
import Loader from '../../Loader/Loader';
import ProfileStatus from './ProfileStatus';
import { updateUserInformation } from '../../../redux/profile-reducer';
import userPhoto from '../../../assets/user.png';
import ProfileData from './ProfileData';
import { MessageReduxForm, ProfileDataFormContainer } from './ProfileDataForms';


const ProfileInfo = (props) => {
  const [editMode, changeEditMode] = useState(false);
  const [input, showInput] = useState(false);
  const [messageInput, showMessageInput] = useState(false);
  const { userID } = props.match.params;
  const onSubmitInfo = (formData) => {
    props.updateUserInformation(formData);
    changeEditMode(false);
  };
  const onSubmitMessage = (formData) => {
    props.sendMessage(userID, formData);
    showMessageInput(false);
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
        { props.isOwner && !input && props.isAuth && <div><button className={s.btn} type="button" onClick={showInput}>change photo</button></div>}
        { props.isOwner && input && <div><input type="file" onChange={onChangePhoto} /></div>}
        {!props.isOwner && !messageInput && props.isAuth && <div><button className={cn(s.btn2, s.btn)} onClick={showMessageInput}>Send message</button></div>}
        {!props.isOwner && messageInput && <MessageReduxForm onSubmit={onSubmitMessage} />}
      </div>
      <div className={s.status}>
        <ProfileStatus {...props} status={props.status} updateStatus={props.updateStatus} />
      </div>
      <div className={s.userInfo}>
        {editMode ? (
          <ProfileDataFormContainer
            initialValues={props.profile}
            onSubmit={onSubmitInfo}
            profile={props.profile}
            changeEditMode={offChangeMode}
          />
        )
          : <ProfileData {...props} profile={props.profile} changeEditMode={onChangeMode} />}
      </div>
    </div>
  );
};

export default connect(null, { updateUserInformation })(ProfileInfo);
