import React, { useState } from 'react';
import s from './ProfileInfo.module.scss';


const ProfileStatus = (props) => {
  const [ActiveMode, setActiveMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  const onActiveMode = () => {
    setActiveMode(true);
  };
  const offActiveMode = () => {
    setActiveMode(false);
    props.updateStatus(status);
  };
  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };
  return (
    <div>
      {props.authID && props.isOwner ? <span className={s.statusFont}>my status: </span>
        : <span className={s.statusFont}>user status: </span>}
      {ActiveMode
        ? <input onChange={onStatusChange} autoFocus onBlur={offActiveMode} value={status} />
        : <span onDoubleClick={onActiveMode}>{props.status || 'no status'}</span>}
      {props.statusError !== null && <div className={s.error}>{props.statusError}</div>}
    </div>

  );
};
export default ProfileStatus;
